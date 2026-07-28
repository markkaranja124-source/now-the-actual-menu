/* ==========================================================================
   RIB HOUSE - OFFICIAL DIGITAL MENU (PURE MENU SHOWCASE)
   STRICT WORD-FOR-WORD ACCURACY MATCHING ALL PHYSICAL MENU SHEETS
   ========================================================================== */

// --- 1. MAIN DISHES DATASET ---
const MAIN_DISHES_EXPANDED = [
    {
        name: 'MATUMBO FRY',
        options: [
            { side: 'Ugali / Chapati', price: 400 },
            { side: 'Rice / Mukimo', price: 410 },
            { side: 'Pilau', price: 500 },
            { side: 'Chips', price: 540 },
            { side: 'Chips Masala', price: 600 }
        ]
    },
    {
        name: 'BEEF STEW / FRY',
        options: [
            { side: 'Ugali / Chapati', price: 440 },
            { side: 'Rice / Mukimo', price: 450 },
            { side: 'Pilau', price: 510 },
            { side: 'Chips', price: 590 },
            { side: 'Chips Masala', price: 630 }
        ]
    },
    {
        name: 'GOAT STEW / FRY',
        options: [
            { side: 'Ugali / Chapati', price: 470 },
            { side: 'Rice / Mukimo', price: 480 },
            { side: 'Pilau', price: 570 },
            { side: 'Chips', price: 620 },
            { side: 'Chips Masala', price: 670 }
        ]
    },
    {
        name: 'LIVER',
        options: [
            { side: 'Ugali / Chapati', price: 470 },
            { side: 'Rice / Mukimo', price: 480 },
            { side: 'Pilau', price: 570 },
            { side: 'Chips', price: 620 },
            { side: 'Chips Masala', price: 630 }
        ]
    },
    {
        name: 'CHICKEN KIENYEJI QUARTER',
        options: [
            { side: 'Ugali / Chapati', price: 570 },
            { side: 'Rice / Mukimo', price: 580 },
            { side: 'Pilau', price: 670 },
            { side: 'Chips', price: 720 },
            { side: 'Chips Masala', price: 750 }
        ]
    },
    {
        name: 'CHICKEN WET FRY',
        options: [
            { side: 'Ugali / Chapati', price: 450 },
            { side: 'Rice / Mukimo', price: 460 },
            { side: 'Pilau', price: 550 },
            { side: 'Chips', price: 580 },
            { side: 'Chips Masala', price: 630 }
        ]
    },
    {
        name: 'BEEF STEAK',
        options: [
            { side: 'Ugali / Chapati', price: 590 },
            { side: 'Rice / Mukimo', price: 600 },
            { side: 'Pilau', price: 690 },
            { side: 'Chips', price: 740 },
            { side: 'Chips Masala', price: 800 }
        ]
    },
    {
        name: 'DEEP FRIED CHICKEN',
        options: [
            { side: 'Ugali / Chapati', price: 390 },
            { side: 'Rice / Mukimo', price: 400 },
            { side: 'Pilau', price: 490 },
            { side: 'Chips', price: 600 },
            { side: 'Chips Masala', price: 630 }
        ]
    },
    {
        name: 'FISH FILLET',
        options: [
            { side: 'Ugali / Chapati', price: 490 },
            { side: 'Rice / Mukimo', price: 480 },
            { side: 'Pilau', price: 570 },
            { side: 'Chips', price: 600 },
            { side: 'Chips Masala', price: 650 }
        ]
    },
    {
        name: 'TILAPIA STEW',
        options: [
            { side: 'Ugali / Chapati', price: 590 },
            { side: 'Rice / Mukimo', price: 600 },
            { side: 'Pilau', price: 690 },
            { side: 'Chips', price: 720 },
            { side: 'Chips Masala', price: 770 }
        ]
    },
    {
        name: 'TILAPIA FRY',
        options: [
            { side: 'Ugali / Chapati', price: 570 },
            { side: 'Rice / Mukimo', price: 580 },
            { side: 'Pilau', price: 680 },
            { side: 'Chips', price: 700 },
            { side: 'Chips Masala', price: 750 }
        ]
    }
];

// --- 2. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    initModals();
});

// --- 3. NAVBAR SCROLL OBSERVER ---
function initScrollNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- 4. DYNAMIC PRICE SELECTOR FOR MAIN DISHES ---
function updateMainPrice(idx) {
    const select = document.getElementById(`main-select-${idx}`);
    const priceEl = document.getElementById(`main-price-${idx}`);
    if (select && priceEl) {
        priceEl.textContent = `${select.value}/=`;
    }
}

// --- 5. RESERVATION & ORDER MODALS ---
function initModals() {
    const resModal = document.getElementById('reservation-modal');
    const resOverlay = document.getElementById('reservation-modal-overlay');
    const resClose = document.getElementById('res-modal-close');
    const navReserveBtn = document.getElementById('nav-reserve-btn');
    const heroReserveBtn = document.getElementById('hero-reserve-btn');
    const locReserveBtn = document.getElementById('location-reserve-btn');
    const resForm = document.getElementById('reservation-form');

    function openResModal() {
        if (resModal && resOverlay) {
            resModal.classList.add('active');
            resOverlay.classList.add('active');
        }
    }

    function closeResModal() {
        if (resModal && resOverlay) {
            resModal.classList.remove('active');
            resOverlay.classList.remove('active');
        }
    }

    if (navReserveBtn) navReserveBtn.addEventListener('click', openResModal);
    if (heroReserveBtn) heroReserveBtn.addEventListener('click', openResModal);
    if (locReserveBtn) locReserveBtn.addEventListener('click', openResModal);
    if (resClose) resClose.addEventListener('click', closeResModal);
    if (resOverlay) resOverlay.addEventListener('click', closeResModal);

    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Reservation / Order Request Received! Pay via M-Pesa Buy Goods Till No. 4977556. Direct Hotline: 0724 594 204');
            closeResModal();
        });
    }
}
