// script.js

// Mobile Menu Toggle (already working, included for completeness)
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNav.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') && 
        !mobileNav.contains(e.target) && 
        !hamburger.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
} else {
  console.error('Hamburger or mobile-nav not found in the DOM');
}

// Homepage Slideshow Functionality
const slides = document.querySelectorAll('#slideshow .slide');
const prevSlideBtn = document.querySelector('.prev-slide-btn');
const nextSlideBtn = document.querySelector('.next-slide-btn');
let currentSlideIndex = 0;
let slideInterval;

// Debugging: Log if elements are found
if (!slides.length) {
  console.error('No slides found in #slideshow. Check .slide elements in HTML.');
}
if (!prevSlideBtn) {
  console.warn('Previous slide button not found. Manual navigation may be disabled.');
}
if (!nextSlideBtn) {
  console.warn('Next slide button not found. Manual navigation may be disabled.');
}

// Function to show a specific slide
function showSlide(index) {
  if (slides.length === 0) return;
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
      console.log(`Showing slide ${i}`); // Debug: Confirm slide change
    }
  });
  currentSlideIndex = index;
}

// Function to start automatic slideshow
function startSlideshow() {
  slideInterval = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }, 5000); // Change slide every 5 seconds
}

// Function to stop automatic slideshow (e.g., when user interacts)
function stopSlideshow() {
  clearInterval(slideInterval);
}

// Initialize first slide and start slideshow
if (slides.length > 0) {
  showSlide(currentSlideIndex);
  startSlideshow();
}

// Previous button click (if buttons exist)
if (prevSlideBtn) {
  prevSlideBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    stopSlideshow(); // Stop auto-slideshow on user interaction
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
    console.log('Previous slide button clicked, current slide:', currentSlideIndex);
  });
}

// Next button click (if buttons exist)
if (nextSlideBtn) {
  nextSlideBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    stopSlideshow(); // Stop auto-slideshow on user interaction
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
    console.log('Next slide button clicked, current slide:', currentSlideIndex);
  });
}