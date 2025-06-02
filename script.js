// ===========================
// SLIDESHOW FUNCTIONALITY
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // Hero slideshow
  const slides = document.querySelectorAll('#slideshow .slide');
  const prevBtn = document.querySelector('.prev-slide-btn');
  const nextBtn = document.querySelector('.next-slide-btn');
  let currentSlide = 0;

  function showHeroSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
  }
  // Initial display
  if (slides.length > 0) {
    showHeroSlide(currentSlide);
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showHeroSlide(currentSlide);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide + 1) % slides.length;
      showHeroSlide(currentSlide);
    });
    // Auto-advance every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showHeroSlide(currentSlide);
    }, 5000);
  }

  // Testimonial slideshow
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialPrev = document.querySelector('.prev-btn');
  const testimonialNext = document.querySelector('.next-btn');
  let testimonialIndex = 0;

  function showTestimonial(index) {
    testimonialSlides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }
  if (testimonialSlides.length > 0) {
    showTestimonial(testimonialIndex);
    testimonialPrev.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
      showTestimonial(testimonialIndex);
    });
    testimonialNext.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
      showTestimonial(testimonialIndex);
    });
    setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
      showTestimonial(testimonialIndex);
    }, 5000);
  }

  // FAQ TOGGLE
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // GALLERY LIGHTBOX
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtnLB = document.getElementById('lightbox-prev');
  const nextBtnLB = document.getElementById('lightbox-next');
  let galleryIndex = 0;

  function showLightbox(index) {
    galleryIndex = index;
    lightbox.style.display = 'flex';
    lightboxImg.src = galleryItems[index].src;
  }
  function closeLightbox() {
    lightbox.style.display = 'none';
  }
  function showNextImage() {
    galleryIndex = (galleryIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[galleryIndex].src;
  }
  function showPrevImage() {
    galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[galleryIndex].src;
  }

  galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => showLightbox(index));
  });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtnLB) nextBtnLB.addEventListener('click', showNextImage);
  if (prevBtnLB) prevBtnLB.addEventListener('click', showPrevImage);
});

// ===========================
// VIBRATE FLOATING BUTTONS
// ===========================
function vibrateButtons() {
  document.querySelectorAll('.float-btn').forEach(btn => {
    btn.classList.add('vibrate');
    setTimeout(() => btn.classList.remove('vibrate'), 800);
  });
}
// Repeat every 5 seconds
setInterval(vibrateButtons, 5000);

// ===========================
// ─────────────────────────────────────────────────────────────────────────────
// NEW HEADER / HERO SCROLLING + MOBILE MENU + CONTACT TOGGLE
// ─────────────────────────────────────────────────────────────────────────────
// UPDATED HEADER SCROLL/SHOW‐HIDE LOGIC (no hamburger/mobile‐menu handling)
// ─────────────────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  const topHeader       = document.querySelector('#top-header');
  const mainNav         = document.querySelector('#main-nav');
  const contentWrapper  = document.querySelector('#content-wrapper');
  // Remove the 10px gap on mobile (≤768px)
  const gap = window.innerWidth <= 768 ? 0 : 10;
  let lastScrollTop = 0;

  function updatePositions() {
    const topHeaderHeight = topHeader ? topHeader.offsetHeight : 0;
    const mainNavHeight   = mainNav ? mainNav.offsetHeight : 0;

    if (topHeader && topHeader.classList.contains('hidden')) {
      // Header is hidden → nav sticks to top, hero sits below nav
      if (mainNav) mainNav.style.top = '0px';
      if (contentWrapper)
        contentWrapper.style.paddingTop = mainNavHeight + 'px';
    } else {
      // Header is visible → nav under header (no extra gap on mobile)
      if (mainNav) 
        mainNav.style.top = (topHeaderHeight + gap) + 'px';
      if (contentWrapper)
        contentWrapper.style.paddingTop =
          topHeaderHeight + mainNavHeight + gap + 'px';
    }
  }

  // INITIALIZE
  updatePositions();

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // scrolling down → hide header
      if (topHeader) topHeader.classList.add('hidden');
    } else {
      // scrolling up → show header
      if (topHeader) topHeader.classList.remove('hidden');
    }
    updatePositions();
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  window.addEventListener('resize', updatePositions);

  // (…your existing mobile‐nav toggle code, if any, can remain here…)
});



    function updatePositions() {
    const topHeaderHeight = topHeader ? topHeader.offsetHeight : 0;
    const mainNavHeight = mainNav ? mainNav.offsetHeight : 0;

    if (topHeader && topHeader.classList.contains('hidden')) {
      // When the header is hidden, the nav should stick to y=0, 
      // and the content (hero) sits directly below the nav.
      if (mainNav) mainNav.style.top = '0px';
      if (contentWrapper) 
        contentWrapper.style.paddingTop = mainNavHeight + 'px';
    } else {
      // When the header is visible, the nav sits directly under the header (no extra gap on mobile).
      if (mainNav) 
        mainNav.style.top = (topHeaderHeight + gap) + 'px';
      if (contentWrapper)
        contentWrapper.style.paddingTop = 
          topHeaderHeight + mainNavHeight + gap + 'px';
    }
  }


  // 1) On load, adjust spacing
  updatePositions();

  // 2) On scroll: hide header when scrolling down, show it when scrolling up
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // scrolling down
      if (topHeader) topHeader.classList.add('hidden');
    } else {
      // scrolling up
      if (topHeader) topHeader.classList.remove('hidden');
    }
    updatePositions();
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // 3) On resize: recalculate positions
  window.addEventListener('resize', updatePositions);




  // Contact options toggle
  if (phoneNumber) {
    phoneNumber.addEventListener('click', (e) => {
      e.preventDefault();
      const options = phoneNumber.nextElementSibling;
      if (options) {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
      }
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.contact-info')) {
        const allOptions = document.querySelectorAll('.contact-options');
        allOptions.forEach(opt => { opt.style.display = 'none'; });
      }
    });
  }

