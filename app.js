/* ==========================================================================
   RIB HOUSE - OFFICIAL MENU DATASET & TWO-PART LANDING PAGE LOGIC
   1. BREAKFAST & DRINKS MENU
   2. MAIN DISHES MENU WITH SIDE SELECTION
   ========================================================================== */

// --- 1. BREAKFAST & DRINKS MENU DATASET ---
const BREAKFAST_ITEMS = [
    // SNACKS & SOUPS
    {
        id: 'bk-samosa',
        title: 'BEEF SAMOSA',
        category: 'snacks',
        price: 70,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        badge: 'FRESH BAKED',
        description: 'Crispy golden pastry stuffed with spiced minced beef, spring onions, and coriander.',
        specs: {'FILLING': 'Spiced Beef Mince', 'PASTRY': 'Hand Folded Crispy'}
    },
    {
        id: 'bk-sausage',
        title: 'FARMHOUSE SAUSAGE',
        category: 'snacks',
        price: 70,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
        badge: 'PAN GRILLED',
        description: 'Juicy pan-grilled beef sausage served hot.',
        specs: {'MEAT': '100% Beef', 'COOK': 'Pan Seared'}
    },
    {
        id: 'bk-andazi',
        title: 'COASTAL ANDAZI',
        category: 'snacks',
        price: 50,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
        badge: 'FRESH BATCH',
        description: 'Soft cardamom-scented fried dough pastry.',
        specs: {'FLAVOR': 'Cardamom & Coconut', 'BEST WITH': 'Masala Tea'}
    },
    {
        id: 'bk-kebab',
        title: 'SPECIAL MINCED BEEF KEBAB',
        category: 'snacks',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        badge: 'CHEF FAVORITE',
        description: 'Deep-fried egg-coated spiced minced beef ball loaded with garlic and herbs.',
        specs: {'MEAT': 'Spiced Beef Mince', 'COATING': 'Golden Egg Batter'}
    },
    {
        id: 'bk-chapati',
        title: 'SOFT CHAPATI (WHITE / BROWN)',
        category: 'snacks',
        price: 70,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        badge: 'FLAKY LAYERS',
        description: 'Warm, layered wheat chapati cooked on traditional iron skillet.',
        specs: {'TYPE': 'White or Brown Wheat', 'COOK': 'Traditional Skillet'}
    },
    {
        id: 'bk-bone-soup',
        title: 'TRADITIONAL BONE SOUP',
        category: 'soups',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        badge: 'HERBAL BROTH',
        description: 'Slow-simmered beef bone broth seasoned with fresh ginger, garlic, and peppercorns.',
        specs: {'BROTH': '12-Hr Simmered', 'HERBS': 'Ginger & Garlic'}
    },
    {
        id: 'bk-soup-chemsha',
        title: 'SPECIAL SOUP CHEMSHA',
        category: 'soups',
        price: 150,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        badge: 'RESTORATIVE',
        description: 'Rich boiled beef bone and meat soup with green vegetables and herbs.',
        specs: {'INCLUDES': 'Beef Tender Meat & Herbs', 'SERVED': 'Hot Bowl'}
    },

    // BARISTA & HOT DRINKS
    {
        id: 'hot-dawa',
        title: 'SPECIAL HOUSE DAWA',
        category: 'hot-drinks',
        price: 200,
        currency: 'KSh',
        image: 'old_fashioned.jpg',
        badge: 'BARISTA SPECIAL',
        description: 'Steaming hot blend of pure lemon juice, crushed ginger root, and natural honey.',
        specs: {'INGREDIENTS': 'Ginger, Lemon & Honey', 'TAKEAWAY': 'KSh 250'}
    },
    {
        id: 'hot-tea-masala-white',
        title: 'TEA MASALA WHITE',
        category: 'hot-drinks',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
        badge: 'SPICED TEA',
        description: 'Highland black tea brewed with whole milk and aromatic crushed masala spices.',
        specs: {'MILK': 'Fresh Dairy', 'SPICES': 'Cardamom & Cloves'}
    },
    {
        id: 'hot-tea-masala-black',
        title: 'TEA MASALA BLACK',
        category: 'hot-drinks',
        price: 130,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
        badge: 'HERBAL TEA',
        description: 'Strong Kenyan black tea infused with double masala spice reduction.',
        specs: {'BASE': 'Kenyan Black Tea', 'SPICE': 'Double Masala'}
    },
    {
        id: 'hot-house-coffee-white',
        title: 'HOUSE COFFEE WHITE',
        category: 'hot-drinks',
        price: 150,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        badge: 'ARABICA BREW',
        description: 'Freshly roasted Kenyan coffee served with hot steamed milk.',
        specs: {'BEANS': 'Kenyan Arabica', 'MILK': 'Steamed Milk'}
    },
    {
        id: 'hot-house-coffee-black',
        title: 'HOUSE COFFEE BLACK',
        category: 'hot-drinks',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        badge: 'STRONG BREW',
        description: 'Pure black Kenyan coffee brewed rich and bold.',
        specs: {'BEANS': 'Kenyan Arabica', 'SERVED': 'Black Hot'}
    },
    {
        id: 'hot-cappuccino',
        title: 'CAPPUCCINO',
        category: 'hot-drinks',
        price: 120,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
        badge: 'BARISTA ART',
        description: 'Espresso topped with creamy foamed milk. (Single KSh 120 / Double KSh 180)',
        specs: {'SINGLE': 'KSh 120', 'DOUBLE': 'KSh 180'}
    },
    {
        id: 'hot-espresso',
        title: 'ESPRESSO SHOT',
        category: 'hot-drinks',
        price: 120,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
        badge: 'PURE ESSENCE',
        description: 'Rich, concentrated shot of Kenyan coffee bean blend. (Single KSh 120 / Double KSh 150)',
        specs: {'SINGLE': 'KSh 120', 'DOUBLE': 'KSh 150'}
    },
    {
        id: 'hot-latte-macchiato',
        title: 'LATTE MACCHIATO / MOCHA',
        category: 'hot-drinks',
        price: 180,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
        badge: 'SPECIALTY COFFEE',
        description: 'Layered espresso with steamed milk foam or rich chocolate mocha syrup.',
        specs: {'LATTE MACCHIATO': 'KSh 180', 'LATTE MOCHA': 'KSh 150'}
    },

    // COLD BEVERAGES & SHAKES
    {
        id: 'cold-passion-juice',
        title: 'FRESH PASSION JUICE',
        category: 'cold-drinks',
        price: 150,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
        badge: 'FRESH PRESSED',
        description: 'Cold-pressed fresh local passion fruit juice.',
        specs: {'FRUIT': '100% Passion Fruit', 'TAKEAWAY': 'KSh 200'}
    },
    {
        id: 'cold-cocktail-juice',
        title: 'COCKTAIL JUICE / MANGO',
        category: 'cold-drinks',
        price: 150,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
        badge: 'TROPICAL BLEND',
        description: 'Chilled blend of tropical mango, passion, and orange juices.',
        specs: {'VARIETY': 'Mango / Mixed Cocktail', 'SERVED': 'Iced'}
    },
    {
        id: 'cold-mint-lemonade',
        title: 'MINT LEMONADE',
        category: 'cold-drinks',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
        badge: 'ICED COOLER',
        description: 'Zesty lemon juice muddled with crushed fresh mint leaves.',
        specs: {'HERB': 'Fresh Mint', 'CITRUS': 'Fresh Lemon'}
    },
    {
        id: 'cold-oreo-shake',
        title: 'OREO COOKIE SHAKE',
        category: 'cold-drinks',
        price: 300,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
        badge: 'PREMIUM SHAKE',
        description: 'Thick vanilla ice cream shake blended with real Oreo cookies.',
        specs: {'BASE': 'Vanilla Ice Cream', 'MIX': 'Crushed Oreo'}
    },
    {
        id: 'cold-milkshake-classic',
        title: 'CLASSIC MILKSHAKE (CHOCOLATE / VANILLA / STRAWBERRY / BLUEBERRY)',
        category: 'cold-drinks',
        price: 250,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
        badge: 'RICH & CREAMY',
        description: 'Hand-spun ice cream milkshake in your choice of flavor.',
        specs: {'FLAVORS': 'Chocolate, Vanilla, Strawberry, Blueberry'}
    },
    {
        id: 'cold-smoothie',
        title: 'TROPICAL SMOOTHIE (BANANA / PASSION)',
        category: 'cold-drinks',
        price: 200,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1502741126161-b048400d085d?auto=format&fit=crop&w=800&q=80',
        badge: 'REAL FRUIT',
        description: 'Blended fresh tropical banana, passion fruit, and yoghurt smoothie.',
        specs: {'BASE': 'Fresh Fruit & Yoghurt'}
    }
];

// --- 2. MAIN DISHES MENU DATASET (WITH DYNAMIC SIDE OPTIONS) ---
const MAIN_DISHES_ITEMS = [
    {
        id: 'main-goat-stew',
        title: 'GOAT STEW / FRY',
        badge: 'RIB HOUSE SPECIALTY',
        image: 'hero_ribs.jpg',
        description: 'Tender goat meat slow-simmered in rich tomato, garlic, and coriander gravy.',
        options: [
            { side: 'Ugali / Chapati', price: 470 },
            { side: 'Rice / Mukimo', price: 480 },
            { side: 'Pilau', price: 570 },
            { side: 'Chips Plain', price: 620 },
            { side: 'Chips Masala', price: 670 }
        ]
    },
    {
        id: 'main-beef-steak',
        title: 'BEEF STEAK',
        badge: 'FLAME SEARED',
        image: 'tomahawk.jpg',
        description: 'Prime beef steak seared over high fire with signature seasoning and rich reduction.',
        options: [
            { side: 'Ugali / Chapati', price: 590 },
            { side: 'Rice / Mukimo', price: 600 },
            { side: 'Pilau', price: 690 },
            { side: 'Chips Plain', price: 740 },
            { side: 'Chips Masala', price: 800 }
        ]
    },
    {
        id: 'main-chicken-kienyeji',
        title: 'CHICKEN KIENYEJI QUARTER',
        badge: 'ORGANIC FREE RANGE',
        image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
        description: 'Authentic free-range Kienyeji quarter chicken braised with traditional spices.',
        options: [
            { side: 'Ugali / Chapati', price: 570 },
            { side: 'Rice / Mukimo', price: 580 },
            { side: 'Pilau', price: 670 },
            { side: 'Chips Plain', price: 720 },
            { side: 'Chips Masala', price: 750 }
        ]
    },
    {
        id: 'main-chicken-wet-fry',
        title: 'CHICKEN WET FRY',
        badge: 'POPULAR FAVORITE',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        description: 'Succulent chicken pieces tossed in onion, garlic, and fresh herb reduction.',
        options: [
            { side: 'Ugali / Chapati', price: 450 },
            { side: 'Rice / Mukimo', price: 460 },
            { side: 'Pilau', price: 550 },
            { side: 'Chips Plain', price: 580 },
            { side: 'Chips Masala', price: 630 }
        ]
    },
    {
        id: 'main-matumbo-fry',
        title: 'MATUMBO FRY',
        badge: 'TRADITIONAL DELICACY',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Cleaned tripe slow-cooked with fresh tomatoes, green pepper, and herbs.',
        options: [
            { side: 'Ugali / Chapati', price: 400 },
            { side: 'Rice / Mukimo', price: 410 },
            { side: 'Pilau', price: 500 },
            { side: 'Chips Plain', price: 540 },
            { side: 'Chips Masala', price: 600 }
        ]
    },
    {
        id: 'main-beef-stew',
        title: 'BEEF STEW / FRY',
        badge: 'DAILY CLASSIC',
        image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80',
        description: 'Tender beef cubes stewed in rich house gravy.',
        options: [
            { side: 'Ugali / Chapati', price: 440 },
            { side: 'Rice / Mukimo', price: 450 },
            { side: 'Pilau', price: 510 },
            { side: 'Chips Plain', price: 590 },
            { side: 'Chips Masala', price: 630 }
        ]
    },
    {
        id: 'main-liver-fry',
        title: 'LIVER FRY',
        badge: 'NUTRIENT RICH',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Fresh beef liver pan-seared with sweet onions and green peppers.',
        options: [
            { side: 'Ugali / Chapati', price: 470 },
            { side: 'Rice / Mukimo', price: 480 },
            { side: 'Pilau', price: 570 },
            { side: 'Chips Plain', price: 620 },
            { side: 'Chips Masala', price: 630 }
        ]
    }
];

// --- 3. GLOBAL STATE & CART ---
let cart = JSON.parse(localStorage.getItem('ribhouse_cart') || '[]');
let breakfastCategory = 'all';

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    initScrollReveal();
    initBreakfastFilter();
    renderBreakfastMenu();
    renderMainDishesMenu();
    initCartDrawer();
    initModals();
    initFaqAccordion();
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

// --- 7. BREAKFAST MENU FILTER & RENDER ---
function initBreakfastFilter() {
    const pills = document.querySelectorAll('#breakfast-tabs .category-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            pills.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            breakfastCategory = target.dataset.category;
            renderBreakfastMenu();
        });
    });
}

function renderBreakfastMenu() {
    const grid = document.getElementById('breakfast-grid');
    if (!grid) return;

    let items = BREAKFAST_ITEMS.filter(i => (breakfastCategory === 'all') || (i.category === breakfastCategory));

    grid.innerHTML = items.map(item => `
        <div class="menu-card">
            <div class="menu-card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" class="menu-card-img">
                <span class="menu-badge">${item.badge}</span>
            </div>
            <div class="menu-card-body">
                <div class="menu-card-header">
                    <h3 class="menu-card-title">${item.title}</h3>
                    <span class="menu-card-price">KSh ${item.price}</span>
                </div>
                <p class="menu-card-desc">${item.description}</p>
                <div class="menu-specs-tags">
                    ${Object.entries(item.specs).map(([k, v]) => `<span class="spec-tag">${k}: ${v}</span>`).join('')}
                </div>
                <div class="menu-card-actions">
                    <button class="btn-add-bag" onclick="addCustomToCart('${item.title}', ${item.price}, '${item.image}')">ADD TO BAG</button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- 8. MAIN DISHES MENU RENDER (WITH INTERACTIVE SIDE SELECTOR) ---
function renderMainDishesMenu() {
    const grid = document.getElementById('main-dishes-grid');
    if (!grid) return;

    grid.innerHTML = MAIN_DISHES_ITEMS.map((dish, idx) => {
        const defaultOption = dish.options[0];
        return `
            <div class="menu-card" id="dish-card-${idx}">
                <div class="menu-card-img-wrapper">
                    <img src="${dish.image}" alt="${dish.title}" class="menu-card-img">
                    <span class="menu-badge">${dish.badge}</span>
                </div>
                <div class="menu-card-body">
                    <div class="menu-card-header">
                        <h3 class="menu-card-title">${dish.title}</h3>
                        <span class="menu-card-price" id="dish-price-${idx}">KSh ${defaultOption.price}</span>
                    </div>
                    <p class="menu-card-desc">${dish.description}</p>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display:block; font-size: 0.65rem; color: var(--color-gold); letter-spacing: 1.5px; margin-bottom: 6px; text-transform: uppercase;">SELECT YOUR SIDE PAIRING:</label>
                        <select id="dish-select-${idx}" onchange="updateDishPrice(${idx})" style="width:100%; background:var(--color-black); border:1px solid var(--color-border-dark); color:var(--color-cream); padding:8px 12px; font-size:0.8rem; outline:none; cursor:pointer;">
                            ${dish.options.map(opt => `<option value="${opt.price}" data-side="${opt.side}">${opt.side} — KSh ${opt.price}</option>`).join('')}
                        </select>
                    </div>

                    <div class="menu-card-actions">
                        <button class="btn-add-bag" onclick="addDishToCart(${idx})">ADD DISH TO BAG</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateDishPrice(idx) {
    const select = document.getElementById(`dish-select-${idx}`);
    const priceEl = document.getElementById(`dish-price-${idx}`);
    if (select && priceEl) {
        priceEl.textContent = `KSh ${select.value}`;
    }
}

function addDishToCart(idx) {
    const dish = MAIN_DISHES_ITEMS[idx];
    const select = document.getElementById(`dish-select-${idx}`);
    const selectedOption = select.options[select.selectedIndex];
    const side = selectedOption.dataset.side;
    const price = parseFloat(select.value);

    const title = `${dish.title} WITH ${side.toUpperCase()}`;
    addCustomToCart(title, price, dish.image);
}

// --- 9. CART SYSTEM ---
function addCustomToCart(title, price, image) {
    const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const existing = cart.find(c => c.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, title, price, image, qty: 1 });
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
                    <p style="font-size: 0.8rem;">Explore the Breakfast or Main Dishes menu to add items.</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div style="display: flex; gap: 12px; align-items: center; border-bottom: 1px solid var(--color-border-dark); padding-bottom: 12px;">
                <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover;">
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

// --- 10. DRAWER & MODAL LOGIC ---
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

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        const content = item.querySelector('.faq-content');

        if (button && content) {
            button.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const c = i.querySelector('.faq-content');
                    if (c) c.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });
}
