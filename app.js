/* ==========================================================================
   RIB HOUSE - STRICT OFFICIAL MENU DATASET & INTERACTIVE LOGIC
   STRICTLY MATCHES PHYSICAL MENU SHEETS WITH ZERO ASSUMPTIONS
   ========================================================================== */

// --- 1. DRINKS AND SNACKS MENU (EXACT MATCH TO PHYSICAL MENU PAGE) ---
const DRINKS_AND_SNACKS = [
    // SNACKS & SOUPS
    { id: 'ds-samosa', name: 'Samosa', category: 'snacks', price: 70 },
    { id: 'ds-sausage', name: 'Sausage', category: 'snacks', price: 70 },
    { id: 'ds-andazi', name: 'Andazi', category: 'snacks', price: 50 },
    { id: 'ds-kebab', name: 'Kebab', category: 'snacks', price: 100 },
    { id: 'ds-chapati', name: 'Chapati white/brown', category: 'snacks', price: 70 },
    { id: 'ds-bone-soup', name: 'Bone soup', category: 'snacks', price: 100 },
    { id: 'ds-soup-chemsha', name: 'Soup Chemsha', category: 'snacks', price: 150 },

    // COLD BEVERAGES
    { id: 'ds-soda', name: 'Soda', category: 'cold', price: 70 },
    { id: 'ds-pepsi', name: 'Pepsi', category: 'cold', price: 70 },
    { id: 'ds-minute-maid', name: 'Minute Maid', category: 'cold', price: 100 },
    { id: 'ds-dasani-1l', name: 'Dasani 1 Ltr', category: 'cold', price: 150 },
    { id: 'ds-dasani-500ml', name: 'Dasani 500ml', category: 'cold', price: 100 },
    { id: 'ds-kereita-500ml', name: 'Kereita Water 500ml', category: 'cold', price: 60 },
    { id: 'ds-kereita-1l', name: 'Kereita Water 1 Ltr', category: 'cold', price: 100 },
    { id: 'ds-passion-juice', name: 'Passion Juice', category: 'cold', price: 150 },
    { id: 'ds-cocktail-juice', name: 'Cocktail Juice', category: 'cold', price: 150 },
    { id: 'ds-mango', name: 'Mango', category: 'cold', price: 150 },
    { id: 'ds-mint-lemonade', name: 'Mint Lemonade', category: 'cold', price: 100 },
    { id: 'ds-juice-takeaway', name: 'Juice Take Away', category: 'cold', price: 200 },
    { id: 'ds-lemonade-varieties', name: 'Lemonade (blue, classic, Mint)', category: 'cold', price: 100 },
    { id: 'ds-iced-coffee', name: 'Iced Coffee', category: 'cold', price: 200 },

    // MILKSHAKE & SMOOTHIES
    { id: 'ds-milkshake', name: 'Milkshake (Chocolate, Blueberry, Strawberry, Vanilla)', category: 'shakes', price: 250 },
    { id: 'ds-oreo-shake', name: 'Oreo shake', category: 'shakes', price: 300 },
    { id: 'ds-smoothies', name: 'Smoothies (banana, passion, Tropical)', category: 'shakes', price: 200 },
    { id: 'ds-ice-cream', name: 'Ice Cream Scoops', category: 'shakes', price: 150 },

    // BARISTA SPECIAL
    { id: 'ds-dawa', name: 'Dawa', category: 'barista', price: 200 },
    { id: 'ds-dawa-taway', name: 'Dawa T/Away', category: 'barista', price: 250 },
    { id: 'ds-tea-special', name: 'Tea Special', category: 'barista', price: 100 },
    { id: 'ds-house-coffee-white', name: 'House Coffee White', category: 'barista', price: 150 },
    { id: 'ds-house-coffee-black', name: 'House Coffee Black', category: 'barista', price: 100 },

    // HOT BEVERAGES
    { id: 'ds-cappuccino-single', name: 'Cappuccino (Single)', category: 'hot', price: 120 },
    { id: 'ds-cappuccino-double', name: 'Cappuccino (Double)', category: 'hot', price: 180 },
    { id: 'ds-espresso-single', name: 'Espresso (Single)', category: 'hot', price: 120 },
    { id: 'ds-espresso-double', name: 'Espresso (Double)', category: 'hot', price: 150 },
    { id: 'ds-americano', name: 'Americano', category: 'hot', price: 150 },
    { id: 'ds-latte-machiatto', name: 'Latte Machiatto', category: 'hot', price: 180 },
    { id: 'ds-latte-mocha', name: 'Latte Mocha', category: 'hot', price: 150 },
    { id: 'ds-coffee-latte', name: 'Coffee Latte', category: 'hot', price: 150 },
    { id: 'ds-white-coffee', name: 'White Coffee', category: 'hot', price: 100 },
    { id: 'ds-black-coffee', name: 'Black Coffee', category: 'hot', price: 80 },
    { id: 'ds-black-coffee-lemon', name: 'Black Coffee W Lemon', category: 'hot', price: 110 },
    { id: 'ds-tea-masala-white', name: 'Tea Masala White', category: 'hot', price: 100 },
    { id: 'ds-tea-masala-black', name: 'Tea Masala Black', category: 'hot', price: 130 },
    { id: 'ds-milk', name: 'Milk', category: 'hot', price: 100 },
    { id: 'ds-lemon-water', name: 'Lemon water', category: 'hot', price: 70 },
    { id: 'ds-lemon-tea', name: 'Lemon Tea', category: 'hot', price: 100 },
    { id: 'ds-lemon-tea-honey', name: 'Lemon Tea W Honey', category: 'hot', price: 150 },
    { id: 'ds-white-chocolate', name: 'White Chocolate', category: 'hot', price: 100 },
    { id: 'ds-black-chocolate', name: 'Black Chocolate', category: 'hot', price: 80 },
    { id: 'ds-black-milo', name: 'Black Milo', category: 'hot', price: 90 },
    { id: 'ds-honey-cone', name: 'Honey Cone', category: 'hot', price: 50 }
];

// --- 2. MAIN DISHES MENU (EXACT MATCH TO PHYSICAL MENU PAGE) ---
const MAIN_DISHES = [
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
    }
];

const MAIN_PLAIN_SIDES = [
    { name: 'Rice / Mukimo Special', price: 250 },
    { name: 'Pilau Special', price: 270 },
    { name: 'Chips Plain', price: 220 },
    { name: 'Chips Masala', price: 270 },
    { name: 'Rice Plain', price: 200 },
    { name: 'Mukimo Plain', price: 200 }
];

// --- 3. STATE & CART ---
let cart = JSON.parse(localStorage.getItem('ribhouse_cart') || '[]');
let activeSnackFilter = 'all';

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    initScrollReveal();
    initSnackFilter();
    renderDrinksAndSnacks();
    renderMainDishes();
    renderPlainSides();
    initCartDrawer();
    initModals();
    updateCartUI();
});

// --- 5. NAVBAR SCROLL EFFECT ---
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

// --- 6. SCROLL REVEAL OBSERVER ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// --- 7. FILTER & RENDER DRINKS AND SNACKS ---
function initSnackFilter() {
    const pills = document.querySelectorAll('#snack-tabs .category-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            pills.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            activeSnackFilter = target.dataset.category;
            renderDrinksAndSnacks();
        });
    });
}

function renderDrinksAndSnacks() {
    const grid = document.getElementById('drinks-snacks-grid');
    if (!grid) return;

    let items = DRINKS_AND_SNACKS.filter(i => (activeSnackFilter === 'all') || (i.category === activeSnackFilter));

    grid.innerHTML = items.map(item => `
        <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-dark); padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-cream);">${item.name}</h3>
                    <span style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-gold); font-weight: 600;">KSh ${item.price}</span>
                </div>
            </div>
            <button class="btn-add-bag" style="width: 100%; margin-top: 12px;" onclick="addCustomToCart('${item.name}', ${item.price})">ADD TO BAG</button>
        </div>
    `).join('');
}

// --- 8. RENDER MAIN DISHES WITH EXACT PRICES ---
function renderMainDishes() {
    const grid = document.getElementById('main-dishes-grid');
    if (!grid) return;

    grid.innerHTML = MAIN_DISHES.map((dish, idx) => {
        const defaultOption = dish.options[0];
        return `
            <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-gold); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-cream); margin-bottom: 8px; text-transform: uppercase;">${dish.name}</h3>
                    <div style="margin-bottom: 16px;">
                        <label style="display:block; font-size: 0.65rem; color: var(--color-gold); letter-spacing: 1.5px; margin-bottom: 6px; text-transform: uppercase;">SELECT SIDE OPTION:</label>
                        <select id="main-select-${idx}" onchange="updateMainPrice(${idx})" style="width:100%; background:var(--color-black); border:1px solid var(--color-border-dark); color:var(--color-cream); padding:10px 12px; font-size:0.85rem; outline:none; cursor:pointer;">
                            ${dish.options.map(opt => `<option value="${opt.price}" data-side="${opt.side}">${opt.side} — KSh ${opt.price}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; border-top: 1px solid var(--color-border-dark); padding-top: 12px;">
                    <span style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-gold); font-weight: bold;" id="main-price-${idx}">KSh ${defaultOption.price}</span>
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
        priceEl.textContent = `KSh ${select.value}`;
    }
}

function addMainDishToCart(idx) {
    const dish = MAIN_DISHES[idx];
    const select = document.getElementById(`main-select-${idx}`);
    const selectedOption = select.options[select.selectedIndex];
    const side = selectedOption.dataset.side;
    const price = parseFloat(select.value);

    const title = `${dish.name} WITH ${side.toUpperCase()}`;
    addCustomToCart(title, price);
}

// --- 9. RENDER PLAIN SIDES ---
function renderPlainSides() {
    const grid = document.getElementById('plain-sides-grid');
    if (!grid) return;

    grid.innerHTML = MAIN_PLAIN_SIDES.map(side => `
        <div style="background: var(--color-dark-surface); border: 1px solid var(--color-border-dark); padding: 16px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-cream);">${side.name}</h4>
                <span style="font-size: 0.9rem; color: var(--color-gold);">KSh ${side.price}</span>
            </div>
            <button class="btn-add-bag" style="padding: 6px 12px; font-size: 0.65rem;" onclick="addCustomToCart('${side.name}', ${side.price})">ADD TO BAG</button>
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
    if (cartSubtotalEl) cartSubtotalEl.textContent = `KSh ${subtotal.toFixed(0)}`;
    if (cartTotalEl) cartTotalEl.textContent = `KSh ${subtotal.toFixed(0)}`;

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
                    <span style="font-size: 0.8rem; color: var(--color-gold);">KSh ${item.price * item.qty}</span>
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
