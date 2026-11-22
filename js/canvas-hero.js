/**
 * Muzaffargarh City Hub - 3D Canvas Hero Engine
 * Apple-Style Scroll-Scrubbed Procedural 3D Frame Animation
 * Driven by GSAP ScrollTrigger (Frame 0 -> 180)
 */

(function () {
  'use strict';

  // Device capability check (low-core or mobile viewport)
  function detectLowEndDevice() {
    const cores = navigator.hardwareConcurrency || 4;
    return Boolean(cores <= 4 || window.innerWidth < 768);
  }
  let isLowEndDevice = detectLowEndDevice();

  // Master State (Capped at DPR 1.5 to prevent GPU fill-rate exhaustion on mobile)
  const canvasState = {
    frame: 0,
    idleTime: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: Math.min(window.devicePixelRatio || 1, 1.5)
  };

  let canvas = null;
  let ctx = null;
  let animFrameId = null;
  let isHeroVisible = true;
  let isLoopRunning = false;

  // 3D Geometry Containers
  let gyroscopeRings = [];
  let sphereNodes = [];
  let sphereEdges = [];
  let warpParticles = [];
  let cityLandmarks = [];
  let horizonGridLines = [];
  let horizonEmbers = [];

  /**
   * Helper Math & Projection
   */
  function rotateX(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x,
      y: p.y * cos - p.z * sin,
      z: p.y * sin + p.z * cos
    };
  }

  function rotateY(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x * cos + p.z * sin,
      y: p.y,
      z: -p.x * sin + p.z * cos
    };
  }

  function rotateZ(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x * cos - p.y * sin,
      y: p.x * sin + p.y * cos,
      z: p.z
    };
  }

  let activeMobileScale = 1.0;

  function project(p, cx, cy, fov) {
    const s = activeMobileScale;
    const depth = (p.z * s) + fov;
    if (depth <= 10) return null; // Behind camera
    const scale = fov / depth;
    return {
      x: cx + (p.x * s) * scale,
      y: cy + (p.y * s) * scale,
      scale: scale * s,
      z: p.z
    };
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  /**
   * Generate 3D Geometries & Particles
   */
  function buildSceneData() {
    gyroscopeRings = [];
    sphereNodes = [];
    sphereEdges = [];
    warpParticles = [];
    cityLandmarks = [];
    horizonGridLines = [];
    horizonEmbers = [];

    // Adaptive density scaling for low-core / mobile devices (~45% reduction)
    const densityFactor = isLowEndDevice ? 0.55 : 1.0;

    // --- 1. Gyroscope Rings (Phase 1) ---
    const ringConfigs = [
      { radius: 260, points: Math.max(28, Math.round(64 * densityFactor)), tiltX: 0.45, tiltZ: 0.25, color: '#f59e0b', width: 1.8 },
      { radius: 210, points: Math.max(24, Math.round(54 * densityFactor)), tiltX: -0.6, tiltZ: -0.35, color: '#fbbf24', width: 1.4 },
      { radius: 165, points: Math.max(20, Math.round(44 * densityFactor)), tiltX: 0.85, tiltZ: -0.5, color: '#10b981', width: 1.6 }
    ];

    ringConfigs.forEach((cfg, rIdx) => {
      const ringPts = [];
      for (let i = 0; i < cfg.points; i++) {
        const theta = (i / cfg.points) * Math.PI * 2;
        let p = {
          x: Math.cos(theta) * cfg.radius,
          y: Math.sin(theta) * cfg.radius,
          z: 0
        };
        p = rotateX(p, cfg.tiltX);
        p = rotateZ(p, cfg.tiltZ);
        ringPts.push({
          base: p,
          origRadius: cfg.radius,
          rIdx: rIdx,
          angle: theta,
          hasTick: i % 4 === 0,
          isMajorNode: i % 8 === 0
        });
      }
      gyroscopeRings.push({ config: cfg, points: ringPts });
    });

    // --- 2. Wireframe Sphere Core (Phase 1) ---
    const sphereRadius = 115;
    const lats = isLowEndDevice ? 5 : 7;
    const lons = isLowEndDevice ? 8 : 12;

    for (let i = 0; i <= lats; i++) {
      const latAngle = (i / lats) * Math.PI - Math.PI / 2; // -PI/2 to PI/2
      const y = Math.sin(latAngle) * sphereRadius;
      const r = Math.cos(latAngle) * sphereRadius;

      for (let j = 0; j < lons; j++) {
        const lonAngle = (j / lons) * Math.PI * 2;
        const x = Math.cos(lonAngle) * r;
        const z = Math.sin(lonAngle) * r;

        const nodeIndex = sphereNodes.length;
        sphereNodes.push({
          x: x,
          y: y,
          z: z,
          origX: x,
          origY: y,
          origZ: z,
          lat: i,
          lon: j,
          pulse: Math.random() * Math.PI * 2
        });

        // Add longitudinal connection
        if (j > 0) {
          sphereEdges.push([nodeIndex - 1, nodeIndex]);
        }
        if (j === lons - 1) {
          sphereEdges.push([nodeIndex, nodeIndex - lons + 1]);
        }
        // Add latitudinal connection
        if (i > 0) {
          sphereEdges.push([nodeIndex - lons, nodeIndex]);
        }
      }
    }

    // --- 3. Warp Particles & City Nodes (Phase 2 - Reduced ~45% on low-end/mobile) ---
    const totalWarp = isLowEndDevice ? 230 : 420;
    for (let i = 0; i < totalWarp; i++) {
      // Cylinder distribution around camera path
      const angle = Math.random() * Math.PI * 2;
      const radius = 90 + Math.random() * 680;
      const zPos = Math.random() * 2600 - 400; // -400 to 2200

      warpParticles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.75, // slight elliptical compression
        z: zPos,
        baseZ: zPos,
        speed: 1.2 + Math.random() * 1.8,
        size: 1.0 + Math.random() * 2.2,
        isEmerald: Math.random() > 0.65,
        streakLength: 40 + Math.random() * 80,
        sparkle: Math.random() * Math.PI * 2
      });
    }

    // --- 4. Muzaffargarh Landmark HUD Markers (Phase 2) ---
    cityLandmarks = [
      { name: 'CHENAB CORRIDOR', tag: 'SECTOR-01', x: -280, y: -130, z: 850, color: '#fbbf24' },
      { name: 'CENTRAL BAZAAR', tag: 'HUB-PRIME', x: 260, y: -90, z: 1250, color: '#10b981' },
      { name: 'KOT ADDU LINK', tag: 'GRID-NORTH', x: -220, y: 140, z: 1650, color: '#fbbf24' },
      { name: 'AGRO ECO-ZONE', tag: 'CHAUNSA BELT', x: 290, y: 120, z: 2050, color: '#34d399' }
    ];

    // --- 5. Luminous Horizon Perspective Grid (Phase 3) ---
    const gridRays = isLowEndDevice ? 14 : 22;
    for (let i = 0; i <= gridRays; i++) {
      const rayFactor = (i / gridRays) * 2 - 1; // -1 to +1
      horizonGridLines.push({
        xOffset: rayFactor * 1200,
        color: i % 3 === 0 ? 'rgba(245, 158, 11, 0.45)' : 'rgba(16, 185, 129, 0.25)'
      });
    }

    // Horizon Embers
    const totalEmbers = isLowEndDevice ? 30 : 60;
    for (let i = 0; i < totalEmbers; i++) {
      horizonEmbers.push({
        x: (Math.random() - 0.5) * 1400,
        y: 120 + Math.random() * 260,
        z: 300 + Math.random() * 900,
        size: 1.0 + Math.random() * 2.5,
        speed: 0.4 + Math.random() * 0.8,
        color: Math.random() > 0.5 ? '#f59e0b' : '#10b981'
      });
    }
  }

  /**
   * Render Engine - Frame 0 to 180
   */
  function render() {
    if (!ctx) return;

    const w = canvasState.width;
    const h = canvasState.height;
    const cx = w / 2;
    const cy = h / 2;
    activeMobileScale = w < 768 ? 0.6 : 1.0;
    const fov = Math.max(w, h) * (w < 768 ? 0.66 : 0.72);
    const frame = canvasState.frame; // 0 to 180
    const idle = canvasState.idleTime;

    // Clear canvas
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, w, h);

    // =========================================================================
    // PHASE 1: Sleek Golden Wireframe Gyroscope & Core (Frames 0 -> 60)
    // =========================================================================
    const phase1Alpha = clamp(1.0 - (frame - 48) / 14, 0, 1);
    if (phase1Alpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = phase1Alpha;

      // Camera push & rotation driven by frame + gentle idle breath
      const camZ = lerp(0, 220, frame / 60);
      const rotY = idle * 0.4 + (frame / 60) * Math.PI * 1.2;
      const rotX = Math.sin(idle * 0.25) * 0.15 + (frame / 60) * 0.4;
      const rotZ = Math.cos(idle * 0.2) * 0.1;

      // Render Central Emerald Beacon
      const corePulse = Math.sin(idle * 3.5) * 0.18 + 0.82;
      const core3D = { x: 0, y: 0, z: -camZ };
      const coreProj = project(core3D, cx, cy, fov);
      if (coreProj) {
        const rad = 28 * coreProj.scale * corePulse;
        const grad = ctx.createRadialGradient(coreProj.x, coreProj.y, 0, coreProj.x, coreProj.y, rad * 3);
        grad.addColorStop(0, 'rgba(52, 211, 153, 0.95)');
        grad.addColorStop(0.35, 'rgba(16, 185, 129, 0.45)');
        grad.addColorStop(1, 'rgba(5, 5, 7, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(coreProj.x, coreProj.y, rad * 3, 0, Math.PI * 2);
        ctx.fill();

        // Solid core diamond
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(coreProj.x, coreProj.y, rad * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Wireframe Sphere
      const projectedSphereNodes = [];
      sphereNodes.forEach((node) => {
        let p = { x: node.origX, y: node.origY, z: node.origZ };
        p = rotateX(p, rotX);
        p = rotateY(p, rotY);
        p = rotateZ(p, rotZ);
        p.z -= camZ;
        projectedSphereNodes.push(project(p, cx, cy, fov));
      });

      // Sphere Edges
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)';
      ctx.beginPath();
      sphereEdges.forEach(([i, j]) => {
        const p1 = projectedSphereNodes[i];
        const p2 = projectedSphereNodes[j];
        if (p1 && p2 && p1.z > -fov + 10 && p2.z > -fov + 10) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      });
      ctx.stroke();

      // Sphere Nodes (Golden Sparkles)
      projectedSphereNodes.forEach((proj, idx) => {
        if (!proj) return;
        const node = sphereNodes[idx];
        const shimmer = Math.sin(idle * 2 + node.pulse) * 0.4 + 0.6;
        const nSize = Math.max(1.2, 2.8 * proj.scale * shimmer);
        ctx.fillStyle = node.lat === 3 ? '#34d399' : '#fbbf24';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, nSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Gyroscope Orbital Rings
      gyroscopeRings.forEach((ring) => {
        const ringSpin = ring.config.color === '#10b981' ? -rotY * 1.3 : rotY * 0.8;
        const projRingPoints = [];

        ring.points.forEach((pt) => {
          let p = { ...pt.base };
          p = rotateY(p, ringSpin);
          p = rotateX(p, rotX * 0.5);
          p.z -= camZ;
          projRingPoints.push({ proj: project(p, cx, cy, fov), pt: pt });
        });

        // Connect ring loop
        ctx.strokeStyle = ring.config.color;
        ctx.lineWidth = ring.config.width;
        if (!isLowEndDevice) {
          ctx.shadowColor = ring.config.color;
          ctx.shadowBlur = 8;
        }
        ctx.beginPath();
        let first = true;
        projRingPoints.forEach(({ proj }) => {
          if (!proj) return;
          if (first) {
            ctx.moveTo(proj.x, proj.y);
            first = false;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        });
        if (projRingPoints[0] && projRingPoints[0].proj) {
          ctx.lineTo(projRingPoints[0].proj.x, projRingPoints[0].proj.y);
        }
        ctx.stroke();
        if (!isLowEndDevice) {
          ctx.shadowBlur = 0; // reset
        }

        // Draw ring tick markers and glowing satellites
        projRingPoints.forEach(({ proj, pt }) => {
          if (!proj) return;
          if (pt.isMajorNode) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 3.2 * proj.scale, 0, Math.PI * 2);
            ctx.fill();

            // Halo around major ring node
            ctx.fillStyle = ring.config.color;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 6.5 * proj.scale, 0, Math.PI * 2);
            ctx.globalAlpha = 0.3 * phase1Alpha;
            ctx.fill();
            ctx.globalAlpha = phase1Alpha;
          }
        });
      });

      ctx.restore();
    }

    // =========================================================================
    // PHASE 2: 3D Warp Starfield & City Node Network (Frames 50 -> 130)
    // =========================================================================
    const phase2Alpha = clamp(
      frame < 85 ? (frame - 48) / 22 : 1.0 - (frame - 116) / 16,
      0,
      1
    );

    if (phase2Alpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = phase2Alpha;

      // Warp speed parameter linked to frame scrub
      const warpSpeed = lerp(8, 38, clamp((frame - 60) / 40, 0, 1));
      const cameraRoll = (frame - 60) * 0.008;

      const projectedWarp = [];

      warpParticles.forEach((p, idx) => {
        // Continuous travel through Z space driven by frame progression + idle drift
        const zDisplacement = (frame - 60) * 24 + idle * 80;
        let effectiveZ = ((p.baseZ - zDisplacement) % 2600 + 2600) % 2600 - 400; // -400 to 2200

        let pt = { x: p.x, y: p.y, z: effectiveZ };
        pt = rotateZ(pt, cameraRoll);

        const proj = project(pt, cx, cy, fov);
        if (proj) {
          projectedWarp.push({ proj, p, effectiveZ });

          // Draw warp streak (motion trail)
          const streakZ = effectiveZ + p.streakLength * (warpSpeed / 10);
          let tailPt = { x: p.x, y: p.y, z: streakZ };
          tailPt = rotateZ(tailPt, cameraRoll);
          const tailProj = project(tailPt, cx, cy, fov);

          if (tailProj) {
            const streakGrad = ctx.createLinearGradient(proj.x, proj.y, tailProj.x, tailProj.y);
            const headColor = p.isEmerald ? 'rgba(52, 211, 153, 0.9)' : 'rgba(251, 191, 36, 0.9)';
            const tailColor = p.isEmerald ? 'rgba(16, 185, 129, 0)' : 'rgba(245, 158, 11, 0)';

            streakGrad.addColorStop(0, headColor);
            streakGrad.addColorStop(1, tailColor);

            ctx.strokeStyle = streakGrad;
            ctx.lineWidth = Math.max(0.8, p.size * proj.scale);
            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(tailProj.x, tailProj.y);
            ctx.stroke();
          }

          // Node head point
          ctx.fillStyle = p.isEmerald ? '#34d399' : '#fbbf24';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(1, p.size * proj.scale * 1.3), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Constellation Network Mesh (Interconnecting nearby warp nodes)
      ctx.lineWidth = 0.8;
      const sampleCount = isLowEndDevice ? Math.min(projectedWarp.length, 60) : Math.min(projectedWarp.length, 120);
      for (let i = 0; i < sampleCount; i++) {
        for (let j = i + 1; j < sampleCount; j++) {
          const p1 = projectedWarp[i].proj;
          const p2 = projectedWarp[j].proj;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 7200) { // ~85px threshold
            const alpha = (1 - distSq / 7200) * 0.28 * phase2Alpha;
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Muzaffargarh Landmark HUD Markers
      cityLandmarks.forEach((lm) => {
        const lmZ = lm.z - (frame - 60) * 18;
        if (lmZ > 100 && lmZ < 2200) {
          let lmPt = { x: lm.x, y: lm.y, z: lmZ };
          lmPt = rotateZ(lmPt, cameraRoll);
          const lmProj = project(lmPt, cx, cy, fov);
          if (lmProj) {
            ctx.save();
            ctx.globalAlpha = phase2Alpha * clamp((2000 - lmZ) / 1000, 0, 1);

            // Target reticle
            ctx.strokeStyle = lm.color;
            ctx.lineWidth = 1.2;
            ctx.strokeRect(lmProj.x - 12, lmProj.y - 12, 24, 24);

            // Dot
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(lmProj.x, lmProj.y, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Label text
            ctx.font = '500 10px "JetBrains Mono", monospace';
            ctx.fillStyle = lm.color;
            ctx.fillText(lm.name, lmProj.x + 18, lmProj.y - 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '400 8px "JetBrains Mono", monospace';
            ctx.fillText(lm.tag, lmProj.x + 18, lmProj.y + 10);

            // Connecting lead line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.moveTo(lmProj.x + 12, lmProj.y);
            ctx.lineTo(lmProj.x + 16, lmProj.y);
            ctx.stroke();

            ctx.restore();
          }
        }
      });

      ctx.restore();
    }

    // =========================================================================
    // PHASE 3: Horizon Convergence & Digital Topography (Frames 115 -> 180)
    // =========================================================================
    const phase3Alpha = clamp((frame - 115) / 24, 0, 1);

    if (phase3Alpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = phase3Alpha;

      const horizonY = cy + h * 0.12; // Lower third horizon level

      // 1. Radiant Atmospheric Horizon Bloom
      const bloomGrad = ctx.createRadialGradient(
        cx,
        horizonY,
        0,
        cx,
        horizonY,
        Math.max(w, h) * 0.65
      );
      bloomGrad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
      bloomGrad.addColorStop(0.25, 'rgba(16, 185, 129, 0.18)');
      bloomGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.05)');
      bloomGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');

      ctx.fillStyle = bloomGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Crisp Horizon Vanishing Line
      const horizonLineGrad = ctx.createLinearGradient(0, horizonY, w, horizonY);
      horizonLineGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
      horizonLineGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.7)');
      horizonLineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      horizonLineGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.7)');
      horizonLineGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.strokeStyle = horizonLineGrad;
      ctx.lineWidth = 2.0;
      if (!isLowEndDevice) {
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 14;
      }
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(w, horizonY);
      ctx.stroke();
      if (!isLowEndDevice) {
        ctx.shadowBlur = 0;
      }

      // 3. Perspective Terrain Grid Lines (Radiating toward viewer)
      const gridProgression = ((frame - 120) * 0.04 + idle * 0.15) % 1;
      ctx.lineWidth = 1.0;

      horizonGridLines.forEach((ray) => {
        ctx.strokeStyle = ray.color;
        ctx.beginPath();
        ctx.moveTo(cx, horizonY);
        // Radiate downwards across screen bottom
        ctx.lineTo(cx + ray.xOffset * 1.5, h);
        ctx.stroke();
      });

      // Latitudinal Distance Bars sweeping forward
      const numDistanceBars = 10;
      for (let i = 0; i < numDistanceBars; i++) {
        const barT = (i / numDistanceBars + gridProgression) % 1;
        const barY = horizonY + Math.pow(barT, 2.2) * (h - horizonY);
        const barAlpha = Math.pow(barT, 1.4) * 0.45 * phase3Alpha;

        ctx.strokeStyle = `rgba(245, 158, 11, ${barAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, barY);
        ctx.lineTo(w, barY);
        ctx.stroke();
      }

      // 4. Horizon Embers rising into sky
      horizonEmbers.forEach((ember) => {
        const emberY = horizonY - ((ember.y + idle * 30 * ember.speed) % (h * 0.4));
        const emberX = cx + ember.x * (1 - (horizonY - emberY) / (h * 0.4) * 0.4);
        const emberAlpha = clamp((horizonY - emberY) / (h * 0.2), 0, 1) *
                           clamp(1 - (horizonY - emberY) / (h * 0.4), 0, 1) * phase3Alpha;

        ctx.fillStyle = ember.color;
        ctx.globalAlpha = emberAlpha;
        ctx.beginPath();
        ctx.arc(emberX, emberY, ember.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }
  }

  /**
   * Continuous Animation Loop
   * Automatically pauses when the hero section scrolls out of view via IntersectionObserver
   */
  function startLoop() {
    isLoopRunning = true;
    function tick() {
      if (!isHeroVisible) {
        isLoopRunning = false;
        return;
      }
      canvasState.idleTime += 0.016; // ~60fps
      render();
      animFrameId = requestAnimationFrame(tick);
    }
    cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(tick);
  }

  /**
   * IntersectionObserver: Automatically stops requestAnimationFrame when hero scrolls out of view
   */
  function setupVisibilityObserver() {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible) {
            if (!isLoopRunning) {
              startLoop();
            }
          } else {
            if (isLoopRunning) {
              cancelAnimationFrame(animFrameId);
              isLoopRunning = false;
            }
          }
        });
      },
      { root: null, rootMargin: '100px 0px', threshold: 0 }
    );

    observer.observe(heroSection);
  }

  /**
   * Handle Resize with DPR Capping & Low-Core Adaptation
   */
  function handleResize() {
    if (!canvas) return;
    isLowEndDevice = detectLowEndDevice();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvasState.dpr = dpr;
    canvasState.width = window.innerWidth;
    canvasState.height = window.innerHeight;

    canvas.width = Math.floor(canvasState.width * dpr);
    canvas.height = Math.floor(canvasState.height * dpr);
    canvas.style.width = canvasState.width + 'px';
    canvas.style.height = canvasState.height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Rebuild scene data based on updated viewport / density factor
    buildSceneData();
    render();
  }

  /**
   * GSAP ScrollTrigger Integration
   * Binds user scroll to `canvasState.frame` (0 -> 180)
   * And scrub-animates the 3 kinetic typography overlay beats
   */
  function setupScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded yet.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Master Hero Scrub Timeline
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        pin: true,
        start: 'top top',
        end: '+=2800',
        scrub: 1.2,
        anticipatePin: 1
      }
    });

    // 1. Scrub Virtual Canvas Frame 0 -> 180
    heroTl.to(canvasState, {
      frame: 180,
      ease: 'none',
      duration: 180
    }, 0);

    // 2. Kinetic Typography Beat 1 (0% to 30% scroll -> frames 0 to 55)
    // Headline "MUZAFFARGARH" / Subtext / Scroll Indicator
    gsap.set('#hero-beat-1', { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
    heroTl.to('#hero-beat-1', {
      opacity: 0,
      scale: 1.22,
      y: -90,
      filter: 'blur(12px)',
      pointerEvents: 'none',
      ease: 'power2.in',
      duration: 25
    }, 30);

    // 3. Kinetic Typography Beat 2 (35% to 65% scroll -> frames 60 to 118)
    // "CURATED LOCAL BRANDS" / Direct WhatsApp Connect / Verified Shops
    gsap.set('#hero-beat-2', { opacity: 0, scale: 0.92, y: 60, filter: 'blur(10px)', pointerEvents: 'none' });
    heroTl.to('#hero-beat-2', {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      pointerEvents: 'auto',
      ease: 'power2.out',
      duration: 18
    }, 55);

    heroTl.to('#hero-beat-2', {
      opacity: 0,
      scale: 1.08,
      y: -60,
      filter: 'blur(10px)',
      pointerEvents: 'none',
      ease: 'power2.in',
      duration: 22
    }, 96);

    // 4. Kinetic Typography Beat 3 (70% to 95% scroll -> frames 122 to 180)
    // "EXPLORE THE DIRECTORY" / Downward kinetic arrow
    gsap.set('#hero-beat-3', { opacity: 0, scale: 0.94, y: 60, filter: 'blur(10px)', pointerEvents: 'none' });
    heroTl.to('#hero-beat-3', {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      pointerEvents: 'auto',
      ease: 'power2.out',
      duration: 22
    }, 120);

    // Subtle downward pulse to bridge into #directory-section at the very end
    heroTl.to('#hero-beat-3', {
      y: 15,
      ease: 'power1.out',
      duration: 25
    }, 155);
  }

  /**
   * Main Initialization Entrypoint
   */
  function initHeroCanvas() {
    canvas = document.getElementById('hero-canvas');
    if (!canvas) {
      console.error('Canvas #hero-canvas not found in DOM.');
      return;
    }

    ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      console.error('Canvas 2D context could not be created.');
      return;
    }

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    startLoop();
    setupScrollTrigger();
    setupVisibilityObserver();
  }

  // Expose globally
  window.initHeroCanvas = initHeroCanvas;
})();
