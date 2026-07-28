/* ==========================================================================
   RIB HOUSE - COMPLETE MAIN DISHES & BREAKFAST MENU
   STRICT WORD-FOR-WORD ACCURACY MATCHING ALL PHYSICAL MENU SHEETS
   ========================================================================== */

// --- 1. MAIN DISHES DATASET (PAGES 1 & 2) ---
const MAIN_DISHES_EXPANDED = [
    // STAPLE MEAT DISHES WITH SIDES
    {
        name: 'MATUMBO FRY',
        category: 'mains',
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
        category: 'mains',
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
        category: 'mains',
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
        category: 'mains',
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
        category: 'mains',
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
        category: 'mains',
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
        category: 'mains',
        options: [
            { side: 'Ugali / Chapati', price: 590 },
            { side: 'Rice / Mukimo', price: 600 },
            { side: 'Pilau', price: 690 },
            { side: 'Chips', price: 740 },
            { side: 'Chips Masala', price: 800 }
        ]
    },

    // DEEP FRIED CHICKEN & FISH
    {
        name: 'DEEP FRIED CHICKEN',
        category: 'fish-poultry',
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
        category: 'fish-poultry',
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
        category: 'fish-poultry',
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
        category: 'fish-poultry',
        options: [
            { side: 'Ugali / Chapati', price: 570 },
            { side: 'Rice / Mukimo', price: 580 },
            { side: 'Pilau', price: 680 },
            { side: 'Chips', price: 700 },
            { side: 'Chips Masala', price: 750 }
        ]
    }
];

// --- 2. CHOMA, CHEMSHA, TUMBUKIZA & PLATTERS ---
const MEAT_PORTIONS_AND_PLATTERS = [
    // CHOMA ZONE
    { name: 'CHOMA BEEF (1 KG)', price: 1100, cat: 'choma' },
    { name: 'CHOMA BEEF (0.5 KG)', price: 550, cat: 'choma' },
    { name: 'CHOMA GOAT (1 KG)', price: 1200, cat: 'choma' },
    { name: 'CHOMA GOAT (0.5 KG)', price: 600, cat: 'choma' },

    // CHEMSHA ZONE
    { name: 'CHEMSHA BEEF (1 KG)', price: 1200, cat: 'chemsha' },
    { name: 'CHEMSHA BEEF (0.5 KG)', price: 600, cat: 'chemsha' },
    { name: 'CHEMSHA GOAT (1 KG)', price: 1300, cat: 'chemsha' },
    { name: 'CHEMSHA GOAT (0.5 KG)', price: 650, cat: 'chemsha' },

    // FRY / TUMBUKIZA ON ORDER
    { name: 'BEEF FRY / TUMBUKIZA (1 KG)', price: 1300, cat: 'tumbukiza' },
    { name: 'BEEF FRY / TUMBUKIZA (0.5 KG)', price: 650, cat: 'tumbukiza' },
    { name: 'GOAT FRY / TUMBUKIZA (1 KG)', price: 1400, cat: 'tumbukiza' },
    { name: 'GOAT FRY / TUMBUKIZA (0.5 KG)', price: 700, cat: 'tumbukiza' },

    // SPECIAL PLATTER
    { 
        name: 'CHICKEN PLATTER FOR 4 (ON ORDER)', 
        price: 1900, 
        cat: 'platter',
        desc: 'Includes 2 Portions Chicken Wet Fry, 2 Portions Beef Fry, 1 Portion Chips, 2 Portions Ugali/Chapati, 2 Portions Veggies-spinach, 4 Small Glasses of Juice' 
    }
];

// --- 3. EXTRA SIDES & VEGES ---
const MAIN_EXTRA_SIDES = [
    { name: 'Rice / Mukimo Special', price: 250 },
    { name: 'Pilau Special', price: 270 },
    { name: 'Chips Plain', price: 220 },
    { name: 'Chips Masala', price: 270 },
    { name: 'Rice Plain', price: 200 },
    { name: 'Mukimo Plain', price: 200 },
    { name: 'Waru', price: 120 },
    { name: 'Spinach', price: 120 },
    { name: 'Banana', price: 100 }
];

// --- 4. STATE & CART ---
let cart = JSON.parse(localStorage.getItem('ribhouse_cart') || '[]');

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    renderMainDishes();
    renderMeatPortions();
    renderExtraSides();
    initCartDrawer();
    initModals();
    updateCartUI();
});

// --- 6. NAVBAR SCROLL OBSERVER ---
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

// --- 7. RENDER MAIN DISHES WITH SELECTABLE SIDES ---
function renderMainDishes() {
    const grid = document.getElementById('main-dishes-grid');
    if (!grid) return;

    grid.innerHTML = MAIN_DISHES_EXPANDED.map((dish, idx) => {
        const defaultOption = dish.options[0];
        return `
            <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-gold); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-cream); margin-bottom: 12px; text-transform: uppercase;">${dish.name}</h3>
                    <div style="margin-bottom: 16px;">
                        <label style="display:block; font-size: 0.65rem; color: var(--color-gold); letter-spacing: 1.5px; margin-bottom: 6px; text-transform: uppercase;">SELECT SIDE OPTION:</label>
                        <select id="main-select-${idx}" onchange="updateMainPrice(${idx})" style="width:100%; background:var(--color-black); border:1px solid var(--color-border-dark); color:var(--color-cream); padding:10px 12px; font-size:0.85rem; outline:none; cursor:pointer;">
                            ${dish.options.map(opt => `<option value="${opt.price}" data-side="${opt.side}">${opt.side} — ${opt.price}/=</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; border-top: 1px solid var(--color-border-dark); padding-top: 12px;">
                    <span style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-gold); font-weight: bold;" id="main-price-${idx}">${defaultOption.price}/=</span>
                    <button class="btn-add-bag" onclick="addMainDishToCart(${idx})">ADD TO BAG</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateMainPrice(idx) {
    const select = document.getElementById(`main-select-${idx}`);
    const priceEl = document.getElementById(`main-price-${idx}`);
    if (select && priceEl) {
        priceEl.textContent = `${select.value}/=`;
    }
}

function addMainDishToCart(idx) {
    const dish = MAIN_DISHES_EXPANDED[idx];
    const select = document.getElementById(`main-select-${idx}`);
    const selectedOption = select.options[select.selectedIndex];
    const side = selectedOption.dataset.side;
    const price = parseFloat(select.value);

    const title = `${dish.name} WITH ${side.toUpperCase()}`;
    addCustomToCart(title, price);
}

// --- 8. RENDER CHOMA, CHEMSHA & PLATTERS ---
function renderMeatPortions() {
    const grid = document.getElementById('meat-portions-grid');
    if (!grid) return;

    grid.innerHTML = MEAT_PORTIONS_AND_PLATTERS.map(item => `
        <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-dark); padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-cream); text-transform: uppercase;">${item.name}</h4>
                    <span style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-gold); font-weight: bold;">${item.price}/=</span>
                </div>
                ${item.desc ? `<p style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 12px;">${item.desc}</p>` : ''}
            </div>
            <button class="btn-add-bag" style="width: 100%;" onclick="addCustomToCart('${item.name}', ${item.price})">ADD TO BAG</button>
        </div>
    `).join('');
}

// --- 9. RENDER EXTRA SIDES ---
function renderExtraSides() {
    const grid = document.getElementById('extra-sides-grid');
    if (!grid) return;

    grid.innerHTML = MAIN_EXTRA_SIDES.map(side => `
        <div style="background: var(--color-dark-surface); border: 1px solid var(--color-border-dark); padding: 16px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-cream);">${side.name}</h4>
                <span style="font-size: 0.9rem; color: var(--color-gold);">${side.price}/=</span>
            </div>
            <button class="btn-add-bag" style="padding: 6px 14px; font-size: 0.7rem;" onclick="addCustomToCart('${side.name}', ${side.price})">ADD TO BAG</button>
        </div>
    `).join('');
}

// --- 10. CART SYSTEM ---
function addCustomToCart(title, price) {
    const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const existing = cart.find(c => c.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, title, price, qty: 1 });
    }

    saveCart();
    updateCartUI();

    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
}

function changeQty(id, delta) {
    const index = cart.findIndex(c => c.id === id);
    if (index === -1) return;

    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('ribhouse_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartBadgeCount = document.getElementById('cart-badge-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartBadgeCount) cartBadgeCount.textContent = totalQty;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `${subtotal.toFixed(0)}/=`;
    if (cartTotalEl) cartTotalEl.textContent = `${subtotal.toFixed(0)}/=`;

    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 0; color: var(--color-text-muted);">
                    <p style="font-family: var(--font-serif); font-size: 1.2rem;">Your Order Bag is Empty</p>
                    <p style="font-size: 0.8rem;">Add your favorite items from the menu.</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div style="display: flex; gap: 12px; align-items: center; border-bottom: 1px solid var(--color-border-dark); padding-bottom: 12px;">
                <div style="flex: 1;">
                    <h4 style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--color-cream);">${item.title}</h4>
                    <span style="font-size: 0.8rem; color: var(--color-gold);">${item.price * item.qty}/=</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="changeQty('${item.id}', -1)" style="color: var(--color-gold); border: 1px solid var(--color-border-dark); width: 24px; height: 24px;">-</button>
                    <span style="font-size: 0.85rem; color: var(--color-cream);">${item.qty}</span>
                    <button onclick="changeQty('${item.id}', 1)" style="color: var(--color-gold); border: 1px solid var(--color-border-dark); width: 24px; height: 24px;">+</button>
                </div>
            </div>
        `).join('');
    }
}

// --- 11. DRAWER & MODALS ---
function initCartDrawer() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Order Bag Submitted! Please pay via M-Pesa Buy Goods Till No. 4977556 or at counter upon delivery.');
        });
    }
}

function closeCartDrawer() {
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

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
            alert('Order / Reservation Received! M-Pesa Till No. 4977556. Call 0724 594 204 for delivery updates.');
            closeResModal();
        });
    }
}
