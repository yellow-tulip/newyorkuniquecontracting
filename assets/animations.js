/**
 * Home page microinteractions and animations
 * Uses Anime.js for choreography, IntersectionObserver for reveals,
 * and requestAnimationFrame for parallax effects
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animation state
  let isAnimating = false;
  let parallaxRaf = null;

  // Initialize all animations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Wait for fonts to be ready before starting animations
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        // Always initialize hero animations (handles reduced motion internally)
        initHeroAnimations();
        // Ensure ticker visibility only on bento draft
        if (isBentoPage()) {
          placeTickerAtViewportBottom();
        }
        
        // Skip other animations for reduced motion users
        if (prefersReducedMotion) return;
        
        initScrollRevealAnimations();
        if (isBentoPage()) {
          initParallaxEffects();
        }
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(() => {
        // Always initialize hero animations (handles reduced motion internally)
        initHeroAnimations();
        // Ensure ticker visibility only on bento draft
        if (isBentoPage()) {
          placeTickerAtViewportBottom();
        }
        
        // Skip other animations for reduced motion users
        if (prefersReducedMotion) return;
        
        initScrollRevealAnimations();
        if (isBentoPage()) {
          initParallaxEffects();
        }
      }, 200);
    }
  }

  /**
   * Hero section animations - Apple-esque living gradient for "Unique"
   */
  function initHeroAnimations() {
    const accentWord = document.querySelector('.accent-word');
    
    if (!accentWord) return;

    // Feature detection for background-clip: text
    const supportsBackgroundClip = CSS.supports('-webkit-background-clip', 'text') || 
                                   CSS.supports('background-clip', 'text');
    
    // Apply fallback class for browsers without background-clip support
    if (!supportsBackgroundClip) {
      accentWord.classList.add('no-clip');
      return; // Skip animations for unsupported browsers
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Static gradient for reduced motion users
      accentWord.classList.add('static');
      return; // Skip animations but keep gradient visible
    }

    // Animation configuration
    const config = {
      driftSpeed: 24000, // 24 seconds for full 360° rotation
      lerpFactor: 0.08,  // Smoothing for mouse follow
      hoverIntensity: 1.0,
      baseIntensity: 0.85
    };

    // Continuous subtle drift animation
    anime({
      targets: accentWord,
      '--angle': ['0deg', '360deg'],
      duration: config.driftSpeed,
      easing: 'linear',
      loop: true
    });

    // Mouse interaction (desktop only)
    if (window.innerWidth >= 1024) {
      let isHovering = false;
      let animationFrame = null;
      let targetMx = 50;
      let targetMy = 50;
      let currentMx = 50;
      let currentMy = 50;

      function updateGradientPosition(event) {
        if (!isHovering) return;

        const rect = accentWord.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Convert to percentages
        targetMx = Math.max(10, Math.min(90, (x / rect.width) * 100));
        targetMy = Math.max(10, Math.min(90, (y / rect.height) * 100));
      }

      function lerpUpdate() {
        if (!isHovering) return;

        // Smooth interpolation toward target
        currentMx += (targetMx - currentMx) * config.lerpFactor;
        currentMy += (targetMy - currentMy) * config.lerpFactor;

        // Update CSS variables
        accentWord.style.setProperty('--mx', currentMx + '%');
        accentWord.style.setProperty('--my', currentMy + '%');

        animationFrame = requestAnimationFrame(lerpUpdate);
      }

      // Mouse enter: enhance and start tracking
      accentWord.addEventListener('mouseenter', () => {
        isHovering = true;
        
        // Boost intensity slightly on hover
        anime({
          targets: accentWord,
          '--intensity': config.hoverIntensity,
          duration: 250,
          easing: 'easeOutQuad'
        });

        // Start smooth position updates
        animationFrame = requestAnimationFrame(lerpUpdate);
      });

      // Mouse move: update target position
      accentWord.addEventListener('mousemove', updateGradientPosition);

      // Mouse leave: return to neutral
      accentWord.addEventListener('mouseleave', () => {
        isHovering = false;
        
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }

        // Return to center and reduce intensity
        anime({
          targets: accentWord,
          '--mx': '50%',
          '--my': '50%',
          '--intensity': config.baseIntensity,
          duration: 500,
          easing: 'easeOutQuad'
        });
      });
    }
  }

  // Detect bento draft page
  function isBentoPage() {
    return document.body?.getAttribute('data-page') === 'bento' || !!document.querySelector('.quad-hero');
  }

  /**
   * Scroll-triggered reveal animations
   */
  function initScrollRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-animate="reveal"]');
    if (!revealElements.length) return;

    // Pre-seed metrics numbers to avoid flash\n    // Disabled per request - initMetricsNumbers();

    // Set initial state for reveal elements (micro-settle style without blur/scale)
    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    });

    // Create intersection observer for reveals
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
          entry.target.setAttribute('data-animated', 'true');
          animateReveal(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /**
   * Pre-seed metrics numbers to prevent flash before count-up
   */
  function initMetricsNumbers() {
    const metrics = document.querySelectorAll('.metric .number');
    
    metrics.forEach(metric => {
      const originalText = metric.textContent.trim();
      const numberMatch = originalText.match(/(\d+)/);
      
      if (numberMatch) {
        const targetNumber = parseInt(numberMatch[1]);
        const prefix = originalText.split(numberMatch[1])[0];
        const suffix = originalText.split(numberMatch[1])[1];
        
        // Store target data
        metric.setAttribute('data-target', targetNumber);
        metric.setAttribute('data-prefix', prefix);
        metric.setAttribute('data-suffix', suffix);
        
        // Set initial state to 0
        metric.textContent = prefix + '0' + suffix;
      }
    });
  }

  /**
   * Animate element reveal with micro-settle effect
   */
  function animateReveal(element) {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Special handling for about-metrics section - make main text appear immediately
    if (element.classList.contains('about-metrics')) {
      // Make the main text (about-lead and about-caption) visible immediately
      const aboutText = element.querySelector('.about-text');
      if (aboutText) {
        const leadText = aboutText.querySelector('.about-lead');
        const captionText = aboutText.querySelector('.about-caption');
        
        if (leadText) {
          leadText.style.opacity = '1';
          leadText.style.transform = 'translateY(0)';
        }
        
        if (captionText) {
          captionText.style.opacity = '1';
          captionText.style.transform = 'translateY(0)';
        }
      }
      
      // But still animate the grid items with stagger effect
      const staggerElements = element.querySelectorAll('.metric, .faq-item, .form-group, .detail');
      if (staggerElements.length && !prefersReducedMotion) {
        // Set initial state for stagger elements
        staggerElements.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(4px)';
        });
        
        anime({
          targets: staggerElements,
          opacity: [0, 1],
          translateY: [4, 0],
          duration: 360,
          delay: anime.stagger(60, {start: 120}),
          easing: 'easeOutCubic'
        });
      } else if (prefersReducedMotion) {
        // For reduced motion, just make everything visible
        staggerElements.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      }
      
      return;
    }
    
    if (prefersReducedMotion) {
      // Instant reveal for reduced motion users
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      
      return;
    }

    // Micro-settle reveal animation (no blur, no scale)
    anime({
      targets: element,
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 480,
      easing: 'easeOutCubic'
    });

    // Stagger child elements with micro-settle (no scale)
    const staggerElements = element.querySelectorAll('.metric, .faq-item, .form-group, .detail');
    if (staggerElements.length) {
      anime({
        targets: staggerElements,
        opacity: [0, 1],
        translateY: [4, 0],
        duration: 360,
        delay: anime.stagger(60, {start: 120}),
        easing: 'easeOutCubic'
      });
    }
  }

  /**
   * Set metrics to final values instantly (for reduced motion)
   */
  function setMetricsToFinalValues() {
    const metrics = document.querySelectorAll('.metric .number');
    
    metrics.forEach(metric => {
      const target = metric.getAttribute('data-target');
      const prefix = metric.getAttribute('data-prefix') || '';
      const suffix = metric.getAttribute('data-suffix') || '';
      
      if (target) {
        metric.textContent = prefix + target + suffix;
      }
    });
  }

  /**
   * Animate metrics count-up using pre-seeded data
   */
  // Disabled per request - function animateMetricsCountUp() {
    // Disabled per request - const metrics = document.querySelectorAll('.metric .number');
    // Disabled per request - if (!metrics.length) return;

    // Disabled per request - metrics.forEach(metric => {
      // Disabled per request - const target = parseInt(metric.getAttribute('data-target'));
      // Disabled per request - const prefix = metric.getAttribute('data-prefix') || '';
      // Disabled per request - const suffix = metric.getAttribute('data-suffix') || '';
      
      // Disabled per request - if (!target) return;

      // Disabled per request - // Animate from 0 to target number using stored data
      // Disabled per request - anime({
        // Disabled per request - targets: { count: 0 },
        // Disabled per request - count: target,
        // Disabled per request - duration: 1600,
        // Disabled per request - easing: 'easeOutCubic',
        // Disabled per request - update: function(anim) {
          // Disabled per request - const currentCount = Math.floor(anim.animatables[0].target.count);
          // Disabled per request - metric.textContent = prefix + currentCount + suffix;
        // Disabled per request - },
        // Disabled per request - complete: function() {
          // Disabled per request - metric.textContent = prefix + target + suffix; // Ensure final value is exact
        // Disabled per request - }
      // Disabled per request - });
    // Disabled per request - });
  // Disabled per request - }

  /**
   * Perceptual smoothing for bento hero — eased element motion relative to native scroll
   */
  function initParallaxEffects() {
    const hero = document.querySelector('.quad-hero');
    const labels = document.querySelectorAll('.quad-hero .slice__label');
    const media = document.querySelectorAll('.quad-hero .slice__media');
    if (!hero || (!labels.length && !media.length)) return;

    const config = {
      stageHeight: () => Math.max(500, Math.min(window.innerHeight, 1200)), // map across ~100vh
      lerp: 0.18,          // floatier glide
      labelMaxY: -36,      // stronger, obvious
      mediaMaxY: -18,      // stronger, obvious
      mediaMaxZ: -96,      // deeper depth
      tiltMaxDeg: 0.9,     // subtle tilt
      heroDriftY: -10,     // scene cohesion
      heroTiltX: 0.6       // small camera tilt
    };

    let real = 0, virt = 0; let running = false; let scrolling = false; let scrollTimer = null;
    const tiltMap = new WeakMap(); // slice => {rx, ry, dx}
    function easeInOutSine(t) { return 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t))); }
    function readRealProgress() {
      const y = (window.pageYOffset || document.documentElement.scrollTop || 0) - (hero.offsetTop || 0);
      const h = config.stageHeight();
      return Math.max(0, Math.min(1, y / h));
    }
    function applyTransforms(p) {
      const e = easeInOutSine(p);
      // Hero-wide camera drift (small and classy)
      hero.style.transform = `translateY(${e * config.heroDriftY}px) rotateX(${e * config.heroTiltX}deg)`;
      // For each slice, apply combined smoothing + optional tilt
      document.querySelectorAll('.quad-hero .slice').forEach(slice => {
        const label = slice.querySelector('.slice__label');
        const med = slice.querySelector('.slice__media');
        const t = tiltMap.get(slice) || { rx: 0, ry: 0, dx: 0 };
        if (label) label.style.transform = `translateY(${e * config.labelMaxY}px) translateX(${t.dx * 6}px)`;
        if (med) med.style.transform = `translateZ(${e * config.mediaMaxZ}px) translateY(${e * config.mediaMaxY}px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`;
      });
    }
    function loop(){ if (!running) return; real = readRealProgress(); virt += (real - virt) * config.lerp; applyTransforms(virt); parallaxRaf = requestAnimationFrame(loop); }
    function start(){ if (running) return; running = true; loop(); }
    start();
    window.addEventListener('scroll', () => { 
      if (!running) start();
      // Mark scrolling to suppress hover visuals/tilt
      if (!scrolling) { scrolling = true; document.body.classList.add('is-scrolling'); }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; document.body.classList.remove('is-scrolling'); }, 180);
    }, { passive: true });
    window.addEventListener('resize', () => { /* dynamic getter */ }, { passive: true });

    // Hover tilt/magnet (pointer: fine only)
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine) {
      document.querySelectorAll('.quad-hero .slice').forEach(slice => {
        const label = slice.querySelector('.slice__label');
        const med = slice.querySelector('.slice__media');
        if (!label && !med) return;
        function onMove(ev){
          if (scrolling) return; // disable hover effects during scroll
          const r = slice.getBoundingClientRect();
          const cx = r.left + r.width/2; const cy = r.top + r.height/2;
          const dx = (ev.clientX - cx) / (r.width/2); // -1..1
          const dy = (ev.clientY - cy) / (r.height/2);
          const rx = Math.max(-config.tiltMaxDeg, Math.min(config.tiltMaxDeg, -dy * config.tiltMaxDeg));
          const ry = Math.max(-config.tiltMaxDeg, Math.min(config.tiltMaxDeg, dx * config.tiltMaxDeg));
          tiltMap.set(slice, { rx, ry, dx });
        }
        function onLeave(){
          tiltMap.delete(slice);
        }
        slice.addEventListener('mousemove', onMove);
        slice.addEventListener('mouseleave', onLeave);
      });
    }
  }

  /**
   * Compute hero image height so the ticker aligns with bottom viewport edge on load
   * Non-sticky; we only size the hero image to fit the first fold.
   */
  function placeTickerAtViewportBottom() {
    const quadHero = document.querySelector('.quad-hero');
    const ticker = document.querySelector('.ticker');
    if (!quadHero || !ticker) return;

    function measure(el) { return el ? el.getBoundingClientRect().height : 0; }
    function updateHeight() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const hTicker = measure(ticker);
      let target = Math.round(vh - hTicker);
      const minH = 360; const maxH = Math.max(420, Math.min(900, vh));
      target = Math.max(minH, Math.min(maxH, target));
      quadHero.style.height = target + 'px';
    }
    updateHeight();
    let t=null; window.addEventListener('resize', ()=>{ clearTimeout(t); t=setTimeout(updateHeight, 120); });
  }

  /**
   * Cleanup function (if needed for SPA-style navigation)
   */
  window.cleanupAnimations = function() {
    if (parallaxRaf) {
      cancelAnimationFrame(parallaxRaf);
    }
  };

})();
