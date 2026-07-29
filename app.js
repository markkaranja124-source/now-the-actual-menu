/* ==========================================================================
   RIB HOUSE - OFFICIAL DIGITAL MENU (PURE MENU SHOWCASE)
   STRICT WORD-FOR-WORD ACCURACY MATCHING ALL PHYSICAL MENU SHEETS
   ========================================================================== */

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    initSectionSlideshows();
});

// --- 2. NAVBAR SCROLL OBSERVER ---
function initScrollNavbar() {
    // Navbar moves up naturally with page scroll
}

// --- 3. SECTION BACKGROUND SLIDESHOWS (KEN BURNS EFFECT) ---
function initSectionSlideshows() {
    const containers = document.querySelectorAll('.bg-slideshow-container');
    containers.forEach(container => {
        const slides = container.querySelectorAll('.bg-slide');
        if (slides.length <= 1) return;

        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 5500);
    });
}
