/* ==========================================================================
   RIB HOUSE - OFFICIAL BREAKFAST & BARISTA MENU + MAIN DISHES
   STRICT WORD-FOR-WORD ACCURACY (NO PICTURES FOR BREAKFAST MENU)
   ========================================================================== */

// --- 1. OFFICIAL BREAKFAST COMBOS & SPECIALS (PAGES 2 & 3) ---
const BREAKFAST_COMBOS = [
    {
        name: 'PANCAKE BREAKFAST',
        price: 400,
        desc: 'Tea, 2 pancakes and pan Fried Bacon',
        category: 'combos'
    },
    {
        name: 'MINI BREAKFAST',
        price: 310,
        desc: 'Tea, 2 fried egg, Toast and sausage, A Small Glass Of Juice',
        category: 'combos'
    },
    {
        name: 'RIB HOUSE BREAKFAST',
        price: 300,
        desc: 'Tea, Liver and Chapati',
        category: 'combos'
    },
    {
        name: 'MAIN BREAKFAST',
        price: 400,
        desc: 'Tea, 2 Eggs, Beef Bacon/Sausages, Toast and a glass of juice',
        category: 'combos'
    },
    {
        name: 'GOAT SOUP BREAKFAST',
        price: 300,
        desc: 'Served with a piece of goat meat, goat soup, chapati and veges.',
        category: 'combos'
    },
    {
        name: 'CHICKEN SOUP BREAKFAST',
        price: 300,
        desc: 'Served With: A Piece Of Chicken Kienyeji, Chicken Soup, Chapati And Veges',
        category: 'combos'
    },
    {
        name: 'CHIPS COMBO',
        price: 300,
        desc: 'Chips Served With Tea / Egg / Andazi / Kachumbari',
        category: 'combos'
    },
    {
        name: 'SAMOSA COMBO',
        price: 280,
        desc: '1 Egg / Samosa / Andazi / Tea',
        category: 'combos'
    },
    {
        name: 'TRADITION BREAK',
        price: 300,
        desc: 'Tea, Nduma / Ngwaci, Egg Kienyeji, veges',
        category: 'combos'
    },
    {
        name: 'FARMERS CHOICE',
        price: 380,
        desc: 'Tea, Beef bacon/Sausage and a Toast',
        category: 'combos'
    },
    {
        name: 'RIB HOUSE BITE',
        price: 200,
        desc: 'Tea, Andazi and a Sausage',
        category: 'combos'
    },
    {
        name: 'SPECIAL BREAKFAST',
        price: 220,
        desc: 'Tea, one fried egg, toast and a sausage',
        category: 'combos'
    },
    {
        name: 'RIB HOUSE SPECIAL',
        price: 310,
        desc: 'Tea, Bacon/ 2 Sausages and Chapati',
        category: 'combos'
    },
    {
        name: 'BRITISH BREAKFAST',
        price: 320,
        desc: 'Tea, Liver and Toast',
        category: 'combos'
    }
];

// --- 2. BARISTA MENU (PAGE 4: HOT & COLD BEVERAGES) ---
const BARISTA_DRINKS = [
    // HOT BEVERAGES
    { name: 'House Coffee white', price: 150, category: 'hot' },
    { name: 'House Coffee Black', price: 100, category: 'hot' },
    { name: 'Black Coffee W lemon', price: 110, category: 'hot' },
    { name: 'Americano', price: 150, category: 'hot' },
    { name: 'Latte Mocha', price: 150, category: 'hot' },
    { name: 'Latte Machiatto', price: 180, category: 'hot' },
    { name: 'Coffee Latte', price: 150, category: 'hot' },
    { name: 'Lemon Tea', price: 100, category: 'hot' },
    { name: 'Lemon Tea W Honey', price: 150, category: 'hot' },
    { name: 'Lemon Water', price: 70, category: 'hot' },
    { name: 'Tea special', price: 100, category: 'hot' },
    { name: 'Tea Masala White', price: 130, category: 'hot' },
    { name: 'Tea Masala Black', price: 100, category: 'hot' },
    { name: 'Ginger Tea', price: 130, category: 'hot' },
    { name: 'Dawa', price: 200, category: 'hot' },
    { name: 'Honey Espresso', price: 110, category: 'hot' },
    { name: 'Hot Milk', price: 100, category: 'hot' },
    { name: 'Honey Cone', price: 50, category: 'hot' },
    { name: 'Cappuccino (Single)', price: 150, category: 'hot' },
    { name: 'Cappuccino (Double)', price: 180, category: 'hot' },
    { name: 'Espresso (Single)', price: 120, category: 'hot' },
    { name: 'Espresso (Double)', price: 150, category: 'hot' },

    // COLD BEVERAGES
    { name: 'Milkshake (Chocolate, Blueberry, Strawberry, vanilla)', price: 250, category: 'cold' },
    { name: 'Espresso (Cold)', price: 250, category: 'cold' },
    { name: 'Oreo shake', price: 300, category: 'cold' },
    { name: 'Smoothies (banana, passion, Tropical)', price: 200, category: 'cold' },
    { name: 'Ice Cream Scoops', price: 150, category: 'cold' },
    { name: 'Lemonade (blue, classic, Mint)', price: 100, category: 'cold' },
    { name: 'Iced Coffee', price: 180, category: 'cold' }
];

// --- 3. MAIN DISHES MENU ---
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

// --- 4. STATE & CART ---
let cart = JSON.parse(localStorage.getItem('ribhouse_cart') || '[]');
let activeBreakfastTab = 'combos';

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    initScrollReveal();
    initBreakfastFilter();
    renderBreakfastMenuTextOnly();
    renderMainDishes();
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

// --- 7. BREAKFAST MENU FILTER & RENDER (NO PICTURES, STRICT WORDS ONLY) ---
function initBreakfastFilter() {
    const pills = document.querySelectorAll('#bk-tabs .category-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            pills.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            activeBreakfastTab = target.dataset.category;
            renderBreakfastMenuTextOnly();
        });
    });
}

function renderBreakfastMenuTextOnly() {
    const grid = document.getElementById('breakfast-text-grid');
    if (!grid) return;

    if (activeBreakfastTab === 'combos') {
        grid.innerHTML = BREAKFAST_COMBOS.map(item => `
            <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-gold); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-cream); text-transform: uppercase;">${item.name}</h3>
                        <span style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-gold); font-weight: bold;">${item.price}/=</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 16px;">${item.desc}</p>
                </div>
                <button class="btn-add-bag" style="width: 100%;" onclick="addCustomToCart('${item.name}', ${item.price})">ADD TO BAG</button>
            </div>
        `).join('');
    } else if (activeBreakfastTab === 'hot') {
        const hotItems = BARISTA_DRINKS.filter(d => d.category === 'hot');
        grid.innerHTML = hotItems.map(item => `
            <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-dark); padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-cream);">${item.name}</h4>
                    <span style="font-size: 0.95rem; color: var(--color-gold); font-weight: 500;">${item.price}/=</span>
                </div>
                <button class="btn-add-bag" style="padding: 6px 14px; font-size: 0.7rem;" onclick="addCustomToCart('${item.name}', ${item.price})">ADD TO BAG</button>
            </div>
        `).join('');
    } else if (activeBreakfastTab === 'cold') {
        const coldItems = BARISTA_DRINKS.filter(d => d.category === 'cold');
        grid.innerHTML = coldItems.map(item => `
            <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-dark); padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-cream);">${item.name}</h4>
                    <span style="font-size: 0.95rem; color: var(--color-gold); font-weight: 500;">${item.price}/=</span>
                </div>
                <button class="btn-add-bag" style="padding: 6px 14px; font-size: 0.7rem;" onclick="addCustomToCart('${item.name}', ${item.price})">ADD TO BAG</button>
            </div>
        `).join('');
    }
}

// --- 8. RENDER MAIN DISHES MENU ---
function renderMainDishes() {
    const grid = document.getElementById('main-dishes-grid');
    if (!grid) return;

    grid.innerHTML = MAIN_DISHES.map((dish, idx) => {
        const defaultOption = dish.options[0];
        return `
            <div style="background: var(--color-card-bg); border: 1px solid var(--color-border-gold); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-cream); margin-bottom: 12px; text-transform: uppercase;">${dish.name}</h3>
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
    const dish = MAIN_DISHES[idx];
    const select = document.getElementById(`main-select-${idx}`);
    const selectedOption = select.options[select.selectedIndex];
    const side = selectedOption.dataset.side;
    const price = parseFloat(select.value);

    const title = `${dish.name} WITH ${side.toUpperCase()}`;
    addCustomToCart(title, price);
}

// --- 9. CART SYSTEM ---
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

// --- 10. DRAWER & MODALS ---
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
