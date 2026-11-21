/**
 * Muzaffargarh City Hub - Application Entry & Controller
 * Phase 4: Production Ready — Preloader, Progress Bar, Back-to-Top, Interactive Footer & Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // =========================================================================
  // Phase 4: Fast Cinematic Preloader (~0.8s, non-blocking)
  // =========================================================================
  const preloader = document.getElementById('preloader');
  const preloaderLine = document.getElementById('preloader-line');

  if (preloader && preloaderLine) {
    if (typeof gsap !== 'undefined') {
      const preloaderTl = gsap.timeline({
        onComplete: () => {
          preloader.style.pointerEvents = 'none';
          preloader.style.display = 'none';
        }
      });

      preloaderTl
        .to(preloaderLine, {
          width: '100%',
          duration: 0.45,
          ease: 'power2.inOut'
        })
        .to(preloader, {
          opacity: 0,
          y: -20,
          duration: 0.35,
          ease: 'power2.in'
        });
    } else {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 750);
    }
  }

  // 2. Initialize Lenis Smooth Scroll
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false
    });

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function fallbackRaf(time) {
        lenis.raf(time);
        requestAnimationFrame(fallbackRaf);
      }
      requestAnimationFrame(fallbackRaf);
    }
  }

  // Expose lenis instance globally
  window.lenis = lenis;

  // 3. Initialize 3D Hero Canvas Engine
  if (typeof window.initHeroCanvas === 'function') {
    window.initHeroCanvas();
  }

  // =========================================================================
  // Phase 4: Top Glowing Scroll Progress Bar & Floating Back-to-Top Button
  // =========================================================================
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const headerContainer = document.getElementById('header-pill');

  function handleScrollMetrics(scrollY) {
    // 1. Update Header Compacting
    if (headerContainer) {
      if (scrollY > 50) {
        headerContainer.classList.add('glass-header-compact');
        headerContainer.classList.remove('glass-header');
        headerContainer.classList.add('py-2', 'px-5');
        headerContainer.classList.remove('py-3.5', 'px-6');
      } else {
        headerContainer.classList.remove('glass-header-compact');
        headerContainer.classList.add('glass-header');
        headerContainer.classList.remove('py-2', 'px-5');
        headerContainer.classList.add('py-3.5', 'px-6');
      }
    }

    // 2. Update Top Glowing Scroll Progress Bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    // 3. Update Floating Back to Top Button
    if (backToTopBtn) {
      if (scrollY > 600) {
        if (backToTopBtn.classList.contains('hidden')) {
          backToTopBtn.classList.remove('hidden');
          backToTopBtn.classList.add('flex');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(backToTopBtn, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25 });
          }
        }
      } else {
        if (!backToTopBtn.classList.contains('hidden')) {
          if (typeof gsap !== 'undefined') {
            gsap.to(backToTopBtn, {
              opacity: 0,
              scale: 0.8,
              duration: 0.2,
              onComplete: () => {
                backToTopBtn.classList.add('hidden');
                backToTopBtn.classList.remove('flex');
              }
            });
          } else {
            backToTopBtn.classList.add('hidden');
            backToTopBtn.classList.remove('flex');
          }
        }
      }
    }
  }

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => {
      handleScrollMetrics(scroll);
    });
  } else {
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        handleScrollMetrics(scrollY);
      },
      { passive: true }
    );
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 5. Mobile Navigation Drawer Controller
  const mobileToggleBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.35, ease: 'power2.out' }
      );
    }
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // 6. Smooth Scroll on Anchor Clicks via Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -30, duration: 1.4 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // 7. Interactive List Business Modal Controller
  const listBusinessBtns = document.querySelectorAll('.trigger-list-business');
  const listModal = document.getElementById('list-business-modal');
  const listModalClose = document.getElementById('list-modal-close');

  function openListModal() {
    if (!listModal) return;
    if (lenis && typeof lenis.stop === 'function') lenis.stop();
    document.body.style.overflow = 'hidden';

    listModal.classList.remove('hidden');
    listModal.classList.add('flex');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(listModal, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        '#list-modal-content',
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }
      );
    }
  }

  function closeListModal() {
    if (!listModal || listModal.classList.contains('hidden')) return;
    if (typeof gsap !== 'undefined') {
      gsap.to('#list-modal-content', {
        scale: 0.92,
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          listModal.classList.add('hidden');
          listModal.classList.remove('flex');
          if (lenis && typeof lenis.start === 'function') lenis.start();
          document.body.style.overflow = '';
        }
      });
    } else {
      listModal.classList.add('hidden');
      listModal.classList.remove('flex');
      if (lenis && typeof lenis.start === 'function') lenis.start();
      document.body.style.overflow = '';
    }
  }

  listBusinessBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileDrawer();
      openListModal();
    });
  });

  if (listModalClose) {
    listModalClose.addEventListener('click', closeListModal);
  }

  if (listModal) {
    listModal.addEventListener('click', (e) => {
      if (e.target === listModal) {
        closeListModal();
      }
    });
  }

  // 8. Live Clock for Muzaffargarh, Pakistan (UTC+5)
  function updateLiveClock() {
    const clockEl = document.getElementById('live-city-clock');
    if (!clockEl) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now) + ' PKT';
  }

  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // =========================================================================
  // Phase 3 & 4: Floating Toast Notification System
  // =========================================================================
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;

    toast.classList.remove('pointer-events-none', 'translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('pointer-events-none', 'translate-y-12', 'opacity-0');
    }, 2500);
  }

  // =========================================================================
  // Phase 3 & Upgrade: 100% Smooth Infinite Seamless Marquee Strip
  // =========================================================================
  function initMarquee() {
    const marqueeTrack = document.getElementById('marquee-track');
    if (!marqueeTrack || typeof businesses === 'undefined' || businesses.length === 0) return;

    // Ensure a rich sequence of items so one group is wide enough to exceed 2x viewport width
    const sourceList = businesses.length < 16 ? [...businesses, ...businesses] : businesses;

    const singleGroupHtml = sourceList
      .map(
        (b) => `
        <div class="inline-flex items-center space-x-3 mx-4 text-xs sm:text-sm font-display tracking-wider text-gray-200 uppercase whitespace-nowrap">
          <span class="text-white font-bold">${b.name}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono border" style="border-color:${b.accent}45; color:${b.accent}; background:${b.accent}15">${b.category}</span>
          <span class="text-amber-400 font-serif text-sm">✦</span>
        </div>
      `
      )
      .join('');

    // Two identical flex containers: the loop moves 0% to -50% with ZERO jump, gap, or stutter
    marqueeTrack.innerHTML = `
      <div class="marquee-group flex items-center shrink-0">
        ${singleGroupHtml}
      </div>
      <div class="marquee-group flex items-center shrink-0" aria-hidden="true">
        ${singleGroupHtml}
      </div>
    `;
  }

  // =========================================================================
  // Directory & Cards Engine
  // =========================================================================

  const businessGrid = document.getElementById('business-grid');
  const categoryPillsContainer = document.getElementById('category-pills-container');
  const searchInput = document.getElementById('business-search');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const counterBadge = document.getElementById('business-counter');
  const emptyState = document.getElementById('empty-state');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');

  // Detail Modal Elements
  const detailModal = document.getElementById('business-detail-modal');
  const detailModalBody = document.getElementById('detail-modal-body');
  const detailModalClose = document.getElementById('detail-modal-close');

  let activeCategory = 'All';
  let searchQuery = '';

  /**
   * Render Category Filter Pills
   */
  function initCategoryPills() {
    if (!categoryPillsContainer || typeof businesses === 'undefined') return;

    const categories = ['All', ...new Set(businesses.map((b) => b.category))];
    categoryPillsContainer.innerHTML = '';

    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.className =
        'category-pill px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200 cursor-pointer';

      if (cat === activeCategory) {
        btn.classList.add('category-pill-active');
      } else {
        btn.classList.add('bg-white/5', 'border-white/10', 'text-gray-300', 'hover:border-amber-500/40', 'hover:text-white');
      }

      const count =
        cat === 'All'
          ? businesses.length
          : businesses.filter((b) => b.category === cat).length;

      btn.innerHTML = `<span>${cat}</span> <span class="text-[10px] opacity-60 ml-1">(${count})</span>`;

      btn.addEventListener('click', () => {
        if (activeCategory === cat) return;
        activeCategory = cat;

        document.querySelectorAll('.category-pill').forEach((p) => {
          p.classList.remove('category-pill-active');
          p.classList.add('bg-white/5', 'border-white/10', 'text-gray-300');
        });
        btn.classList.add('category-pill-active');
        btn.classList.remove('bg-white/5', 'border-white/10', 'text-gray-300');

        renderBusinessCards(true);
      });

      categoryPillsContainer.appendChild(btn);
    });
  }

  /**
   * Filter & Render Business Cards
   */
  function renderBusinessCards(shouldAnimate = false) {
    if (!businessGrid || typeof businesses === 'undefined') return;

    const query = searchQuery.trim().toLowerCase();

    const filtered = businesses.filter((b) => {
      const matchesCategory =
        activeCategory === 'All' ||
        b.category.toLowerCase() === activeCategory.toLowerCase();

      if (!matchesCategory) return false;
      if (!query) return true;

      const nameMatch = b.name.toLowerCase().includes(query);
      const categoryMatch = b.category.toLowerCase().includes(query);
      const addressMatch = b.address.toLowerCase().includes(query);
      const contactMatch = b.contactPerson && b.contactPerson.toLowerCase().includes(query);
      const productsMatch = b.products.some((p) => {
        const pName = typeof p === 'string' ? p : p.name;
        const pDesc = typeof p === 'object' && p.description ? p.description : '';
        return pName.toLowerCase().includes(query) || pDesc.toLowerCase().includes(query);
      });

      return nameMatch || categoryMatch || addressMatch || contactMatch || productsMatch;
    });

    // Update Counter Badge
    if (counterBadge) {
      if (filtered.length === businesses.length) {
        counterBadge.textContent = `Showing ${businesses.length} Verified Businesses in Muzaffargarh`;
      } else if (filtered.length > 0) {
        counterBadge.textContent = `Showing ${filtered.length} of ${businesses.length} Verified Businesses in Muzaffargarh`;
      } else {
        counterBadge.textContent = `0 Businesses Found in Muzaffargarh`;
      }
    }

    // Toggle Empty State
    if (filtered.length === 0) {
      businessGrid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    // Build Cards HTML
    businessGrid.innerHTML = filtered
      .map((b) => {
        const waMsg = encodeURIComponent(
          `Assalam o Alaikum ${b.name}, I found your business on Muzaffargarh City Hub!`
        );
        const waUrl = `https://wa.me/${b.whatsapp}?text=${waMsg}`;

        const displayProducts = b.products.slice(0, 3);
        const remainingCount = b.products.length - 3;

        const productTagsHtml = displayProducts
          .map((p) => {
            const pName = typeof p === 'string' ? p : p.name;
            return `<span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] text-gray-300 font-medium truncate max-w-[130px]">${pName}</span>`;
          })
          .join('');

        const overflowBadge =
          remainingCount > 0
            ? `<a href="store.html?id=${b.id}" class="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-400 font-mono font-semibold hover:bg-amber-500/20 transition-colors cursor-pointer" title="View all ${b.products.length} products in store">+${remainingCount} more</a>`
            : '';

        const contactPersonHtml = b.contactPerson
          ? `<div class="inline-flex items-center space-x-1 text-xs font-mono text-amber-400/90 mt-1">
               <i data-lucide="user-check" class="w-3 h-3 text-amber-400"></i>
               <span>Contact: ${b.contactPerson}</span>
             </div>`
          : '';

        return `
        <article class="business-card flex flex-col justify-between group rounded-2xl overflow-hidden p-0" data-id="${b.id}">
          <div>
            <!-- Top Media Header (16:9 ratio, h-28 on mobile, h-44 on desktop, overflow-hidden, relative - Links to Storefront) -->
            <a href="store.html?id=${b.id}" class="card-media-header block h-28 sm:h-44 overflow-hidden relative w-full bg-[#0c0d14] cursor-pointer" title="Visit ${b.name} Storefront">
              ${
                b.image
                  ? `<img
                       src="${b.image}"
                       alt="${b.name}"
                       loading="lazy"
                       class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"
                     >`
                  : ''
              }
              <div
                class="card-fallback-banner w-full h-full ${b.image ? 'hidden' : 'flex'} items-center justify-center relative overflow-hidden"
                style="display: ${b.image ? 'none' : 'flex'}; background: radial-gradient(circle at 50% 45%, ${b.accent}33 0%, rgba(13, 15, 22, 0.95) 75%), #0a0b10;"
              >
                <div class="card-grid-pattern absolute inset-0 opacity-25 pointer-events-none"></div>
                <div class="relative z-10 w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border backdrop-blur-sm transition-transform duration-500 group-hover:scale-110" style="background: ${b.accent}18; border-color: ${b.accent}45; color: ${b.accent}; box-shadow: 0 0 28px ${b.accent}35;">
                  <i data-lucide="${b.icon}" class="w-4 h-4 sm:w-7 sm:h-7"></i>
                </div>
              </div>

              <!-- Top Glassmorphic Badges Overlay -->
              <div class="absolute inset-x-0 top-0 p-2 sm:p-3.5 flex items-center justify-between pointer-events-none z-10">
                <span class="inline-flex items-center space-x-1 sm:space-x-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold font-mono backdrop-blur-md" style="background: ${b.accent}22; border: 1px solid ${b.accent}55; color: ${b.accent}; box-shadow: 0 4px 14px rgba(0,0,0,0.45);">
                  <i data-lucide="${b.icon}" class="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"></i>
                  <span class="truncate max-w-[65px] sm:max-w-none">${b.category}</span>
                </span>

                <span class="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-gray-200 text-[9px] sm:text-[11px] font-mono shadow-md truncate max-w-[70px] sm:max-w-none">
                  ${b.priceRange}
                </span>
              </div>

              <!-- Bottom Vignette Blend into Card Body -->
              <div class="absolute inset-x-0 bottom-0 h-8 sm:h-10 bg-gradient-to-t from-[#0d0f16] to-transparent pointer-events-none z-10"></div>
            </a>

            <!-- Card Content Body (Compact p-2.5 on mobile, p-5 on desktop) -->
            <div class="p-2.5 sm:p-5">
              <!-- Business Name (Links to Storefront) -->
              <a href="store.html?id=${b.id}" class="inline-block group-hover:text-amber-400 transition-colors w-full">
                <h3 class="font-display font-bold text-sm sm:text-xl text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  ${b.name}
                </h3>
              </a>

              <!-- Contact Person Tag -->
              ${b.contactPerson ? `<div class="inline-flex items-center space-x-1 text-[10px] sm:text-xs font-mono text-amber-400/90 mt-0.5 sm:mt-1 truncate max-w-full"><i data-lucide="user-check" class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0"></i><span class="truncate">${b.contactPerson}</span></div>` : ''}

              <!-- Exact Address with Map Pin (1-line clamp on mobile) -->
              <div class="flex items-start space-x-1 sm:space-x-1.5 text-[11px] sm:text-xs text-gray-400 mt-1 sm:mt-2.5">
                <i data-lucide="map-pin" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0 mt-0.5"></i>
                <span class="line-clamp-1 leading-relaxed">${b.address}</span>
              </div>

              <!-- Product Pills (Hidden on mobile < 640px to keep 2-column cards clean) -->
              <div class="flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-white/10 hidden sm:flex">
                ${productTagsHtml}
                ${overflowBadge}
              </div>
            </div>
          </div>

          <!-- Bottom Action Bar (Compact on mobile) -->
          <div class="px-2.5 pb-2.5 pt-1 sm:px-5 sm:pb-5 sm:pt-2 flex items-center space-x-1.5 sm:space-x-2 border-t border-white/10">
            <a
              href="${waUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp-sweep flex-1 py-1.5 sm:py-2.5 px-1.5 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold font-display flex items-center justify-center space-x-1 sm:space-x-1.5 shadow-md shadow-emerald-950/40 cursor-pointer"
              aria-label="Connect via WhatsApp with ${b.name}"
            >
              <i data-lucide="message-circle" class="w-3 h-3 sm:w-4 sm:h-4 shrink-0"></i>
              <span class="truncate">${b.phoneDisplay}</span>
            </a>

            <a
              href="store.html?id=${b.id}"
              class="py-1.5 sm:py-2.5 px-2 sm:px-3.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-gray-200 hover:text-white text-[10px] sm:text-xs font-semibold flex items-center justify-center space-x-1 transition-all cursor-pointer whitespace-nowrap shrink-0"
              title="View Store & Full Products"
            >
              <i data-lucide="store" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400"></i>
              <span>Store</span>
            </a>
          </div>
        </article>
      `;
      })
      .join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    attachCardTiltAndSpotlight();
    attachDetailModalTriggers();

    if (shouldAnimate && typeof gsap !== 'undefined') {
      animateCardsEntrance();
    }

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  /**
   * GSAP Staggered 3D Perspective Lift Entrance
   */
  function animateCardsEntrance() {
    if (typeof gsap === 'undefined') return;

    gsap.killTweensOf('.business-card');
    gsap.fromTo(
      '.business-card',
      {
        opacity: 0,
        y: 50,
        rotateX: 8,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    );
  }

  /**
   * Interactive Cursor Spotlight & Subtle 3D Perspective Tilt
   */
  function attachCardTiltAndSpotlight() {
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
      return; // Touch device, skip 3D tilt calculations to save CPU/battery
    }
    const cards = document.querySelectorAll('.business-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((y - centerY) / centerY) * -5.5;
        const tiltY = ((x - centerX) / centerX) * 5.5;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // =========================================================================
  // Cinematic Business Details Modal Controller
  // =========================================================================

  function attachDetailModalTriggers() {
    const detailBtns = document.querySelectorAll('.trigger-business-detail');

    detailBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const bizId = parseInt(btn.getAttribute('data-business-id'), 10);
        const biz = businesses.find((item) => item.id === bizId);
        if (biz) {
          openDetailModal(biz);
        }
      });
    });
  }

  function openDetailModal(biz) {
    if (!detailModal || !detailModalBody) return;

    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }
    document.body.style.overflow = 'hidden';

    const waMsg = encodeURIComponent(
      `Assalam o Alaikum ${biz.name}, I found your business on Muzaffargarh City Hub!`
    );
    const waUrl = `https://wa.me/${biz.whatsapp}?text=${waMsg}`;

    const mapsQuery = encodeURIComponent(`${biz.name}, ${biz.address}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    const allProductsHtml = biz.products
      .map((p) => {
        const pName = typeof p === 'string' ? p : p.name;
        const pPrice = typeof p === 'object' && p.price ? `<span class="text-amber-400 font-mono text-[10px] ml-1.5 font-bold">${p.price}</span>` : '';
        return `<span class="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-200 font-medium transition-colors flex items-center">${pName}${pPrice}</span>`;
      })
      .join('');

    const bannerImageHtml = biz.image
      ? `<div class="mb-5 overflow-hidden rounded-xl border border-white/10 relative h-48 sm:h-52 w-full bg-[#0c0d14]">
           <img
             src="${biz.image}"
             alt="${biz.name}"
             class="w-full h-full object-cover"
             onerror="this.parentElement.style.display='none';"
           >
         </div>`
      : '';

    detailModalBody.innerHTML = `
      ${bannerImageHtml}
      <!-- Modal Header -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3 pr-8">
        <div class="flex items-center space-x-2">
          <span class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono" style="background: ${biz.accent}18; border: 1px solid ${biz.accent}45; color: ${biz.accent};">
            <i data-lucide="${biz.icon}" class="w-3.5 h-3.5"></i>
            <span>${biz.category}</span>
          </span>
          <span class="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-1">
            <i data-lucide="check-circle" class="w-3 h-3"></i>
            <span>Verified</span>
          </span>
        </div>

        <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono">
          ${biz.priceRange}
        </span>
      </div>

      <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-white">
        ${biz.name}
      </h2>

      <!-- Info Grid -->
      <div class="mt-6 space-y-3.5">
        
        <!-- Address -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
          <div class="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <i data-lucide="map-pin" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Physical Address</div>
            <div class="text-sm text-gray-200 font-medium mt-0.5 leading-snug">${biz.address}</div>
          </div>
        </div>

        <!-- Contact Person & Phone Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          <!-- Contact Person -->
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <i data-lucide="user-check" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Representative</div>
              <div class="text-sm text-gray-200 font-medium mt-0.5">
                ${biz.contactPerson ? biz.contactPerson : 'Direct Shop Desk'}
              </div>
            </div>
          </div>

          <!-- Phone with One-Click Copy Button -->
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <i data-lucide="phone" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Phone / WhatsApp</div>
                <div class="text-sm font-mono font-bold text-white mt-0.5">${biz.phoneDisplay}</div>
              </div>
            </div>

            <button
              id="modal-copy-phone-btn"
              data-phone="${biz.phoneDisplay}"
              class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 text-xs font-mono font-medium transition-colors cursor-pointer"
              title="Copy Phone Number"
              aria-label="Copy Phone Number"
            >
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Copy</span>
            </button>
          </div>

        </div>

        <!-- Full Products & Offerings -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span class="flex items-center space-x-1.5">
              <i data-lucide="layers" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Complete Catalog / Offerings (${biz.products.length})</span>
            </span>
            <span class="text-emerald-400 text-[10px]">Verified Stock</span>
          </div>
          <div class="flex flex-wrap gap-2">
            ${allProductsHtml}
          </div>
        </div>

      </div>

      <!-- Action Buttons Footer -->
      <div class="mt-6 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3">
        <a
          href="store.html?id=${biz.id}"
          class="sm:col-span-12 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold font-display text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all cursor-pointer"
        >
          <i data-lucide="store" class="w-4 h-4"></i>
          <span>Open Full Storefront & Product Catalog</span>
        </a>

        <a
          href="${waUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="sm:col-span-6 btn-whatsapp-sweep py-3 px-4 rounded-xl text-xs sm:text-sm font-bold font-display flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
        >
          <i data-lucide="message-circle" class="w-4 h-4 shrink-0"></i>
          <span class="truncate">Chat: ${biz.phoneDisplay}</span>
        </a>

        <a
          href="tel:${biz.phoneDisplay.replace(/-/g, '')}"
          class="sm:col-span-3 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-gray-200 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
        >
          <i data-lucide="phone-call" class="w-4 h-4 text-amber-400 shrink-0"></i>
          <span>Call</span>
        </a>

        <a
          href="${mapsUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="sm:col-span-3 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-gray-200 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
        >
          <i data-lucide="map-pinned" class="w-4 h-4 text-emerald-400 shrink-0"></i>
          <span>Maps</span>
        </a>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    const copyBtn = document.getElementById('modal-copy-phone-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const num = copyBtn.getAttribute('data-phone');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(num)
            .then(() => {
              showToast(`Copied ${num} to clipboard!`);
            })
            .catch(() => {
              showToast(`Phone: ${num}`);
            });
        } else {
          showToast(`Phone: ${num}`);
        }
      });
    }

    detailModal.classList.remove('hidden');
    detailModal.classList.add('flex');

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(detailModal, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.out' });
      gsap.fromTo(
        '#business-detail-content',
        { scale: 0.88, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }
  }

  function closeDetailModal() {
    if (!detailModal || detailModal.classList.contains('hidden')) return;

    if (typeof gsap !== 'undefined') {
      gsap.to('#business-detail-content', {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: 'power2.in'
      });
      gsap.to(detailModal, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          detailModal.classList.add('hidden');
          detailModal.classList.remove('flex');
          if (lenis && typeof lenis.start === 'function') {
            lenis.start();
          }
          document.body.style.overflow = '';
        }
      });
    } else {
      detailModal.classList.add('hidden');
      detailModal.classList.remove('flex');
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
      document.body.style.overflow = '';
    }
  }

  if (detailModalClose) {
    detailModalClose.addEventListener('click', closeDetailModal);
  }

  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) {
        closeDetailModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeListModal();
      closeMobileDrawer();
    }
  });

  // =========================================================================
  // Scroll-Triggered City Stats Counter
  // =========================================================================
  function initStatsCounters() {
    const statsSection = document.getElementById('stats-section');
    if (!statsSection || typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;

    const verifiedCounterEl = document.querySelector('.stat-counter[data-target]');
    if (verifiedCounterEl && typeof businesses !== 'undefined') {
      verifiedCounterEl.setAttribute('data-target', businesses.length.toString());
    }

    ScrollTrigger.create({
      trigger: '#stats-section',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          '.stat-card',
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: 'power2.out' }
        );

        document.querySelectorAll('.stat-counter').forEach((el) => {
          const target = parseFloat(el.getAttribute('data-target')) || 0;
          const suffix = el.getAttribute('data-suffix') || '';
          const counterObj = { val: 0 };

          gsap.to(counterObj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(counterObj.val) + suffix;
            }
          });
        });
      }
    });
  }

  // =========================================================================
  // Phase 4: Interactive Footer Category Links
  // =========================================================================
  function initFooterCategories() {
    const footerContainer = document.getElementById('footer-category-links');
    const verifiedCountEl = document.getElementById('footer-verified-count');

    if (verifiedCountEl && typeof businesses !== 'undefined') {
      verifiedCountEl.textContent = businesses.length.toString();
    }

    if (!footerContainer || typeof businesses === 'undefined') return;

    const categories = [...new Set(businesses.map((b) => b.category))];
    footerContainer.innerHTML = '';

    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.className =
        'text-left text-gray-400 hover:text-amber-400 transition-colors flex items-center space-x-1.5 py-1 cursor-pointer';
      btn.innerHTML = `
        <i data-lucide="chevron-right" class="w-3 h-3 text-amber-500/60 shrink-0"></i>
        <span class="truncate">${cat}</span>
      `;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        activeCategory = cat;

        // Sync category pills
        document.querySelectorAll('.category-pill').forEach((p) => {
          p.classList.remove('category-pill-active');
          p.classList.add('bg-white/5', 'border-white/10', 'text-gray-300');
        });

        const matchingPill = Array.from(document.querySelectorAll('.category-pill')).find(
          (p) => p.textContent.includes(cat)
        );
        if (matchingPill) {
          matchingPill.classList.add('category-pill-active');
          matchingPill.classList.remove('bg-white/5', 'border-white/10', 'text-gray-300');
        }

        renderBusinessCards(true);

        const dirSection = document.getElementById('directory-section');
        if (dirSection) {
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(dirSection, { offset: -40, duration: 1.3 });
          } else {
            dirSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });

      footerContainer.appendChild(btn);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Search input listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        if (searchQuery.length > 0) {
          searchClearBtn.classList.remove('hidden');
        } else {
          searchClearBtn.classList.add('hidden');
        }
      }
      renderBusinessCards(false);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClearBtn.classList.add('hidden');
      renderBusinessCards(false);
      searchInput.focus();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      activeCategory = 'All';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (searchClearBtn) searchClearBtn.classList.add('hidden');

      document.querySelectorAll('.category-pill').forEach((p) => {
        p.classList.remove('category-pill-active');
        p.classList.add('bg-white/5', 'border-white/10', 'text-gray-300');
      });
      const allPill = document.querySelector('.category-pill');
      if (allPill) {
        allPill.classList.add('category-pill-active');
        allPill.classList.remove('bg-white/5', 'border-white/10', 'text-gray-300');
      }

      renderBusinessCards(true);
    });
  }

  // Mount All Components
  initMarquee();
  initCategoryPills();
  renderBusinessCards(true);
  initStatsCounters();
  initFooterCategories();

  // ScrollTrigger for initial card entrance
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: '#business-grid',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        animateCardsEntrance();
      }
    });
  }
});
