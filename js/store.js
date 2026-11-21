/**
 * Muzaffargarh City Hub - Dedicated Business Storefront Engine
 * File: js/store.js
 * Renders verified merchant storefronts with full product catalogs, live search, and direct WhatsApp ordering.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Lenis Smooth Scrolling & GSAP Synchronization
  // =========================================================================
  const lenis =
    typeof Lenis !== 'undefined'
      ? new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false,
          touchMultiplier: 1.5
        })
      : null;

  if (lenis && typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // =========================================================================
  // 2. Metrics & Floating Controls (Progress Bar & Back to Top)
  // =========================================================================
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function handleScrollMetrics(scrollY) {
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
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
    lenis.on('scroll', ({ scroll }) => handleScrollMetrics(scroll));
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
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // =========================================================================
  // 3. Live City Clock (Muzaffargarh, Pakistan - PKT UTC+5)
  // =========================================================================
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
  // 4. Toast Notification Controller
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

  const shareBtn = document.getElementById('share-store-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.location.href) {
          await navigator.clipboard.writeText(window.location.href);
          showToast('Storefront link copied to clipboard!');
        } else {
          showToast('Store link: ' + window.location.href);
        }
      } catch (err) {
        showToast('Link copied!');
      }
    });
  }

  // =========================================================================
  // 5. Business Lookup from URL Query Parameter (?id=...)
  // =========================================================================
  const loadingState = document.getElementById('store-loading-state');
  const notFoundState = document.getElementById('store-not-found-state');
  const storeView = document.getElementById('store-view');

  const urlParams = new URLSearchParams(window.location.search);
  const rawId = urlParams.get('id');
  const businessId = rawId ? parseInt(rawId, 10) : null;

  const currentBusiness =
    typeof businesses !== 'undefined' && Array.isArray(businesses)
      ? businesses.find((b) => b.id === businessId)
      : null;

  if (!currentBusiness) {
    // Show Not Found State
    if (loadingState) loadingState.classList.add('hidden');
    if (notFoundState) notFoundState.classList.remove('hidden');
    if (storeView) storeView.classList.add('hidden');
    document.title = 'Business Not Found | Muzaffargarh City Hub';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  // Hide loading, reveal store view
  if (loadingState) loadingState.classList.add('hidden');
  if (notFoundState) notFoundState.classList.add('hidden');
  if (storeView) storeView.classList.remove('hidden');

  // Update Page Title
  document.title = `${currentBusiness.name} | Muzaffargarh City Hub Storefront`;

  // =========================================================================
  // 6. Populate Header & Storefront Hero Banner
  // =========================================================================
  const navStoreName = document.getElementById('nav-store-name');
  if (navStoreName) navStoreName.textContent = currentBusiness.name;

  const navWhatsappBtn = document.getElementById('nav-whatsapp-btn');
  const defaultWaMsg = encodeURIComponent(
    `Assalam o Alaikum ${currentBusiness.name}, I found your storefront on Muzaffargarh City Hub!`
  );
  if (navWhatsappBtn) {
    navWhatsappBtn.href = `https://wa.me/${currentBusiness.whatsapp}?text=${defaultWaMsg}`;
  }

  // Hero Cover Image / Accent Banner
  const coverContainer = document.getElementById('store-cover-container');
  if (coverContainer) {
    coverContainer.innerHTML = `
      ${
        currentBusiness.image
          ? `<img
               src="${currentBusiness.image}"
               alt="${currentBusiness.name}"
               class="w-full h-full object-cover"
               onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"
             >`
          : ''
      }
      <div
        class="w-full h-full ${currentBusiness.image ? 'hidden' : 'flex'} items-center justify-center relative overflow-hidden"
        style="display: ${currentBusiness.image ? 'none' : 'flex'}; background: radial-gradient(circle at 50% 50%, ${currentBusiness.accent}35 0%, rgba(10, 11, 16, 0.95) 75%), #050507;"
      >
        <div class="card-grid-pattern absolute inset-0 opacity-25 pointer-events-none"></div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/40 to-transparent pointer-events-none"></div>
    `;
  }

  // Storefront Monogram Avatar / Category Icon
  const avatarContainer = document.getElementById('store-badge-avatar');
  if (avatarContainer) {
    avatarContainer.innerHTML = `
      <div
        class="w-full h-full rounded-xl flex items-center justify-center border backdrop-blur-md"
        style="background: ${currentBusiness.accent}18; border-color: ${currentBusiness.accent}45; color: ${currentBusiness.accent}; box-shadow: 0 0 35px ${currentBusiness.accent}35;"
      >
        <i data-lucide="${currentBusiness.icon}" class="w-10 h-10 sm:w-12 sm:h-12"></i>
      </div>
    `;
  }

  // Category Pill
  const categoryPill = document.getElementById('store-category-pill');
  if (categoryPill) {
    categoryPill.style.backgroundColor = `${currentBusiness.accent}20`;
    categoryPill.style.borderColor = `${currentBusiness.accent}50`;
    categoryPill.style.color = currentBusiness.accent;
    categoryPill.innerHTML = `
      <i data-lucide="${currentBusiness.icon}" class="w-3.5 h-3.5"></i>
      <span>${currentBusiness.category}</span>
    `;
  }

  // Price Range
  const priceRange = document.getElementById('store-price-range');
  if (priceRange) priceRange.textContent = currentBusiness.priceRange;

  // Title
  const storeTitle = document.getElementById('store-title');
  if (storeTitle) storeTitle.textContent = currentBusiness.name;

  // Representative
  const repContainer = document.getElementById('store-rep-container');
  const storeRepresentative = document.getElementById('store-representative');
  if (storeRepresentative) {
    storeRepresentative.textContent = currentBusiness.contactPerson
      ? `Representative: ${currentBusiness.contactPerson}`
      : 'Direct Shop Desk';
  }

  // Address
  const storeAddress = document.getElementById('store-address');
  if (storeAddress) storeAddress.textContent = currentBusiness.address;

  // Hero Action Buttons
  const waPrimaryBtn = document.getElementById('store-wa-primary-btn');
  if (waPrimaryBtn) {
    waPrimaryBtn.href = `https://wa.me/${currentBusiness.whatsapp}?text=${defaultWaMsg}`;
  }

  const callBtn = document.getElementById('store-call-btn');
  if (callBtn) {
    callBtn.href = `tel:${currentBusiness.phoneDisplay.replace(/-/g, '')}`;
  }

  const mapsBtn = document.getElementById('store-maps-btn');
  if (mapsBtn) {
    const mapsQuery = encodeURIComponent(`${currentBusiness.name}, ${currentBusiness.address}`);
    mapsBtn.href = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  }

  // =========================================================================
  // 7. Product Catalog Engine
  // =========================================================================
  const productsGrid = document.getElementById('products-grid');
  const productSearchInput = document.getElementById('product-search-input');
  const productSearchClear = document.getElementById('product-search-clear');
  const counterBadge = document.getElementById('catalog-counter-badge');
  const emptyState = document.getElementById('product-empty-state');
  const resetSearchBtn = document.getElementById('reset-product-search-btn');

  let activeProductQuery = '';

  function renderProducts(query = '', shouldAnimate = false) {
    if (!productsGrid) return;

    const trimmed = query.trim().toLowerCase();
    const productsList = currentBusiness.products || [];

    const filtered = productsList.filter((p) => {
      if (!trimmed) return true;
      const nameMatch = p.name && p.name.toLowerCase().includes(trimmed);
      const descMatch = p.description && p.description.toLowerCase().includes(trimmed);
      const priceMatch = p.price && p.price.toLowerCase().includes(trimmed);
      return nameMatch || descMatch || priceMatch;
    });

    // Update Counter Badge
    if (counterBadge) {
      if (filtered.length === productsList.length) {
        counterBadge.textContent = `${productsList.length} Verified Products in Catalog`;
      } else {
        counterBadge.textContent = `Showing ${filtered.length} of ${productsList.length} Products`;
      }
    }

    // Toggle Empty State
    if (filtered.length === 0) {
      productsGrid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    // Render Product Cards
    productsGrid.innerHTML = filtered
      .map((p) => {
        const waOrderMsg = encodeURIComponent(
          `Assalam o Alaikum ${currentBusiness.name}, I want to order: ${p.name} (${p.price}) - found on Muzaffargarh City Hub.`
        );
        const waOrderUrl = `https://wa.me/${currentBusiness.whatsapp}?text=${waOrderMsg}`;

        return `
        <div class="business-card flex flex-col justify-between group rounded-2xl overflow-hidden p-0" data-name="${p.name}">
          <div>
            <!-- Product Media Header (h-28 on mobile, h-48 on desktop, relative overflow-hidden) -->
            <div class="card-media-header h-28 sm:h-48 overflow-hidden relative w-full bg-[#0c0d14]">
              ${
                p.image
                  ? `<img
                       src="${p.image}"
                       alt="${p.name}"
                       loading="lazy"
                       class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"
                     >`
                  : ''
              }
              <div
                class="card-fallback-banner w-full h-full ${p.image ? 'hidden' : 'flex'} items-center justify-center relative overflow-hidden"
                style="display: ${p.image ? 'none' : 'flex'}; background: radial-gradient(circle at 50% 45%, ${currentBusiness.accent}33 0%, rgba(13, 15, 22, 0.95) 75%), #0a0b10;"
              >
                <div class="card-grid-pattern absolute inset-0 opacity-25 pointer-events-none"></div>
                <div class="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border backdrop-blur-sm transition-transform duration-500 group-hover:scale-110" style="background: ${currentBusiness.accent}18; border-color: ${currentBusiness.accent}45; color: ${currentBusiness.accent}; box-shadow: 0 0 25px ${currentBusiness.accent}35;">
                  <i data-lucide="${currentBusiness.icon}" class="w-4 h-4 sm:w-6 sm:h-6"></i>
                </div>
              </div>

              <!-- Floating Price Badge on Header (electric gold, compact on mobile) -->
              <div class="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                <span class="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/50 text-amber-400 font-mono font-bold text-[10px] sm:text-xs shadow-lg shadow-black/80">
                  ${p.price}
                </span>
              </div>

              <!-- Subtle bottom vignette -->
              <div class="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0d0f16] to-transparent pointer-events-none z-10"></div>
            </div>

            <!-- Card Body (Compact p-2.5 on mobile, p-5 on desktop) -->
            <div class="p-2.5 sm:p-5">
              <h3 class="font-display font-bold text-xs sm:text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                ${p.name}
              </h3>
              <p class="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                ${p.description}
              </p>
            </div>
          </div>

          <!-- Direct Order on WhatsApp Button (Compact on mobile) -->
          <div class="px-2.5 pb-2.5 pt-1 sm:px-5 sm:pb-5 sm:pt-1">
            <a
              href="${waOrderUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp-sweep w-full py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold font-display flex items-center justify-center space-x-1 sm:space-x-2 shadow-md shadow-emerald-950/40 cursor-pointer"
              aria-label="Order ${p.name} on WhatsApp"
            >
              <i data-lucide="message-circle" class="w-3 h-3 sm:w-4 sm:h-4 shrink-0"></i>
              <span>Order</span><span class="hidden sm:inline">&nbsp;on WhatsApp</span>
            </a>
          </div>
        </div>
      `;
      })
      .join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    attachCardTiltAndSpotlight();

    if (shouldAnimate && typeof gsap !== 'undefined') {
      gsap.killTweensOf('.business-card');
      gsap.fromTo(
        '.business-card',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.45, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }

  // Cursor Spotlight & Tilt on Product Cards
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
        const tiltX = ((y - centerY) / centerY) * -4.5;
        const tiltY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-3px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // Live Product Search Listener
  if (productSearchInput) {
    productSearchInput.placeholder = `Search products in ${currentBusiness.name}...`;

    productSearchInput.addEventListener('input', (e) => {
      activeProductQuery = e.target.value;
      if (productSearchClear) {
        if (activeProductQuery) {
          productSearchClear.classList.remove('hidden');
        } else {
          productSearchClear.classList.add('hidden');
        }
      }
      renderProducts(activeProductQuery, false);
    });
  }

  if (productSearchClear) {
    productSearchClear.addEventListener('click', () => {
      if (productSearchInput) productSearchInput.value = '';
      activeProductQuery = '';
      productSearchClear.classList.add('hidden');
      renderProducts('', true);
      if (productSearchInput) productSearchInput.focus();
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      if (productSearchInput) productSearchInput.value = '';
      activeProductQuery = '';
      if (productSearchClear) productSearchClear.classList.add('hidden');
      renderProducts('', true);
    });
  }

  // Initial Product Catalog Render
  renderProducts('', true);

  // Initial Lucide Icon Pass
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
