/* ==========================================================================
   RIB HOUSE - ZANNY COLLECTION STYLE MENU LANDING PAGE JS LOGIC
   ========================================================================== */

// --- 1. MENU DATASET ---
const MENU_ITEMS = [
    {
        id: 'ribs-signature-01',
        title: 'SIGNATURE HICKORY SMOKED RIBS',
        category: 'ribs',
        price: 34.99,
        image: 'hero_ribs.jpg',
        badge: 'SIGNATURE DROP',
        description: 'St. Louis style pork ribs slow-smoked for 12 hours over real hickory wood with proprietary 14-spice rub and honey bourbon BBQ glaze.',
        spice: '🌶️ Mild Heat',
        spiceVal: 1,
        featured: true,
        specs: {
            'SMOKE TIME': '12 Hours',
            'WOOD TYPE': 'Hickory & Cherry',
            'PORTION': 'Full Rack (2.2 lbs)',
            'RUB': '14-Spice Dry Rub'
        }
    },
    {
        id: 'steak-tomahawk-02',
        title: 'USDA PRIME TOMAHAWK RIBEYE',
        category: 'steaks',
        price: 89.99,
        image: 'tomahawk.jpg',
        badge: 'CHEF\'S SELECTION',
        description: '40oz long-bone ribeye steak dry-aged for 35 days, seared over open white oak fire at 800°F with smoked marrow herb butter.',
        spice: 'None',
        spiceVal: 0,
        featured: true,
        specs: {
            'DRY AGING': '35 Days Aged',
            'WEIGHT': '40 oz Cut',
            'GRILL TEMP': '800°F Oak Sear',
            'SERVES': '2 Persons'
        }
    },
    {
        id: 'sides-mac-cheese-03',
        title: 'SMOKED TRIPLE CHEESE MAC',
        category: 'sides',
        price: 14.50,
        image: 'mac_cheese.jpg',
        badge: 'POPULAR SIDE',
        description: 'Elbow pasta tossed in aged sharp cheddar, smoked gouda, and gruyère cheese sauce, baked with crispy panko BBQ crust.',
        spice: 'None',
        spiceVal: 0,
        featured: true,
        specs: {
            'CHEESE BLEND': 'Cheddar, Gouda, Gruyère',
            'CRUST': 'Smoked Panko',
            'PORTION': 'Shared Skillet',
            'PAIRING': 'Perfect with Ribs'
        }
    },
    {
        id: 'drink-old-fashioned-04',
        title: 'SMOKED CHERRYWOOD OLD FASHIONED',
        category: 'drinks',
        price: 16.00,
        image: 'old_fashioned.jpg',
        badge: 'CRAFT COCKTAIL',
        description: 'Small batch Kentucky bourbon, Angostura bitters, raw cane sugar, infused with real cherrywood smoke under a glass cloche.',
        spice: 'None',
        spiceVal: 0,
        featured: true,
        specs: {
            'BASE SPIRIT': 'Bourbon Whiskey',
            'SMOKE INFUSION': 'Cherrywood Cloche',
            'ICE': 'Hand-Cut Cube',
            'ALC VOL': '45% ABV'
        }
    },
    {
        id: 'steak-brisket-05',
        title: 'TEXAS SLOW-SMOKED BEEF BRISKET',
        category: 'steaks',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        badge: 'LIMITED DROP',
        description: 'Prime Angus beef brisket featuring thick dark bark crust, tender smoke ring, served with house pickles & sliced jalapenos.',
        spice: '🌶️ Medium Spice',
        spiceVal: 2,
        featured: false,
        specs: {
            'SMOKE TIME': '16 Hours',
            'WOOD TYPE': 'Texas Post Oak',
            'CUT': 'Flat & Point',
            'PORTION': '1/2 lb Sliced'
        }
    },
    {
        id: 'starter-wings-06',
        title: 'ORANGE GLAZED SPICY BBQ WINGS',
        category: 'starters',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
        badge: 'HOT & SPICY',
        description: 'Jumbo smoked chicken wings fried extra crisp and tossed in signature honey orange habanero BBQ reduction.',
        spice: '🌶️🌶️ High Heat',
        spiceVal: 3,
        featured: false,
        specs: {
            'COUNT': '10 Jumbo Wings',
            'GLAZE': 'Honey Orange Habanero',
            'DIP INCLUDED': 'Smoked Ranch',
            'COOK METHOD': 'Smoked then Fried'
        }
    },
    {
        id: 'ribs-pulled-pork-07',
        title: 'CAROLINA GOLD PULLED PORK',
        category: 'ribs',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        badge: 'BESTSELLER',
        description: 'Slow-pulled pork shoulder piled high on brioche bun with tangy Carolina mustard sauce and apple cider slaw.',
        spice: '🌶️ Mild Heat',
        spiceVal: 1,
        featured: false,
        specs: {
            'PORK SHOULDER': '10-Hr Smoked',
            'SAUCE': 'Carolina Gold Mustard',
            'BUN': 'Artisanal Brioche',
            'SIDES': 'Waffle Fries Included'
        }
    },
    {
        id: 'steak-pork-chop-08',
        title: 'FLAME GRILLED CHERRYWOOD PORK CHOP',
        category: 'steaks',
        price: 31.00,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        badge: 'NEW SEASONAL',
        description: '14oz bone-in pork chop marinated in apple cider & sage, flame-grilled over cherrywood with caramelized apple chutney.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'CUT': '14oz Bone-In Chop',
            'MARINADE': 'Apple Cider & Sage',
            'WOOD TYPE': 'Cherrywood',
            'CHUTNEY': 'Spiced Roasted Apple'
        }
    },
    {
        id: 'sides-truffle-fries-09',
        title: 'BLACK TRUFFLE PARMESAN FRIES',
        category: 'sides',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
        badge: 'GOURMET SIDE',
        description: 'Hand-cut Russet fries tossed with black truffle oil, fresh chopped rosemary, sea salt, and aged shaved parmesan.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'OIL': 'Italian Black Truffle',
            'CHEESE': 'Aged Parmesan',
            'HERBS': 'Fresh Rosemary',
            'DIP': 'Garlic Aioli'
        }
    },
    {
        id: 'drink-bloody-mary-10',
        title: 'SMOKED SPICY BLOODY MARY',
        category: 'drinks',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
        badge: 'CRAFT DRINK',
        description: 'Smoked tomato juice, pepper vodka, horseradish, Worcestershire, garnished with smoked bacon strip and grilled pepper.',
        spice: '🌶️🌶️ Spicy',
        spiceVal: 2,
        featured: false,
        specs: {
            'BASE': 'Pepper Infused Vodka',
            'MIX': 'House Smoked Tomato',
            'RIM': 'Smoked Chili Salt',
            'GARNISH': 'Smoked Bacon Strip'
        }
    },
    {
        id: 'dessert-lava-cake-11',
        title: 'DARK CHOCOLATE MOLTEN LAVA CAKE',
        category: 'desserts',
        price: 13.50,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
        badge: 'SWEET DROP',
        description: 'Warm 70% dark Valrhona chocolate cake with molten core, topped with smoked sea salt flake and vanilla bean gelato.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'CHOCOLATE': '70% Dark Valrhona',
            'GELATO': 'Madagascar Vanilla',
            'SALT': 'Smoked Maldon Flakes',
            'SERVED': 'Warm Molten'
        }
    }
];

// --- 2. GLOBAL STATE ---
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let cart = JSON.parse(localStorage.getItem('ribhouse_cart') || '[]');
let activeQuickViewItem = null;
let activeQuickViewQty = 1;

// --- 3. DOM ELEMENTS ---
const menuGrid = document.getElementById('menu-grid');
const categoryButtons = document.querySelectorAll('.category-pill');
const quickSearchInput = document.getElementById('quick-search');
const clearSearchBtn = document.getElementById('clear-search');
const sortSelect = document.getElementById('sort-select');
const visibleCountEl = document.getElementById('visible-count');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const emptyStateEl = document.getElementById('empty-state');
const emptyResetBtn = document.getElementById('empty-reset-btn');

// Cart Drawer DOM
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-drawer-overlay');
const cartBadgeCount = document.getElementById('cart-badge-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTaxEl = document.getElementById('cart-tax');
const cartTotalEl = document.getElementById('cart-total');
const drawerItemCount = document.getElementById('drawer-item-count');
const checkoutBtn = document.getElementById('checkout-btn');

// QuickView Modal DOM
const qvOverlay = document.getElementById('quickview-modal-overlay');
const qvCloseBtn = document.getElementById('modal-close-btn');
const qvImg = document.getElementById('qv-img');
const qvBadge = document.getElementById('qv-badge');
const qvCategory = document.getElementById('qv-category');
const qvTitle = document.getElementById('qv-title');
const qvPrice = document.getElementById('qv-price');
const qvSpice = document.getElementById('qv-spice');
const qvDescription = document.getElementById('qv-description');
const qvSpecsGrid = document.getElementById('qv-specs-grid');
const qvQtyVal = document.getElementById('qv-qty-val');
const qvQtyMinus = document.getElementById('qv-qty-minus');
const qvQtyPlus = document.getElementById('qv-qty-plus');
const qvAddToCartBtn = document.getElementById('qv-add-to-cart-btn');

// Checkout Modal DOM
const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
const checkoutModalClose = document.getElementById('checkout-modal-close');
const checkoutForm = document.getElementById('checkout-form');
const checkoutModalTotal = document.getElementById('checkout-modal-total');

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    updateCategoryCounts();
    renderFilteredMenu();
    updateCartUI();
    initScrollHeader();
    createEmberParticles();
    bindEvents();
});

// --- 5. CATEGORY COUNTS UPDATE ---
function updateCategoryCounts() {
    const counts = {
        all: MENU_ITEMS.length,
        ribs: 0,
        steaks: 0,
        starters: 0,
        sides: 0,
        drinks: 0,
        desserts: 0
    };

    MENU_ITEMS.forEach(item => {
        if (counts[item.category] !== undefined) {
            counts[item.category]++;
        }
    });

    Object.keys(counts).forEach(cat => {
        const el = document.getElementById(`count-${cat}`);
        if (el) el.textContent = counts[cat];
    });
}

// --- 6. RENDER MENU ITEMS GRID ---
function renderFilteredMenu() {
    let items = MENU_ITEMS.filter(item => {
        const matchesCategory = (currentCategory === 'all') || (item.category === currentCategory);
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.badge.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sorting
    if (currentSort === 'price-low') {
        items.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        items.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'spicy') {
        items.sort((a, b) => b.spiceVal - a.spiceVal);
    } else {
        // Featured
        items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // Update UI counters
    visibleCountEl.textContent = items.length;
    resetFiltersBtn.style.display = (currentCategory !== 'all' || searchQuery !== '') ? 'inline-block' : 'none';

    if (items.length === 0) {
        menuGrid.style.display = 'none';
        emptyStateEl.style.display = 'block';
    } else {
        menuGrid.style.display = 'grid';
        emptyStateEl.style.display = 'none';
        menuGrid.innerHTML = items.map(item => createMenuCardHTML(item)).join('');
    }
}

function createMenuCardHTML(item) {
    return `
        <div class="menu-card" data-id="${item.id}">
            <div class="card-image-wrapper">
                <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy">
                <span class="card-badge">${item.badge}</span>
                <button class="card-quickview-btn" onclick="openQuickView('${item.id}')">QUICK VIEW</button>
            </div>
            <div class="card-body">
                <span class="card-category-tag">${item.category.toUpperCase()}</span>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.description}</p>
                <div class="card-footer">
                    <span class="card-price">$${item.price.toFixed(2)}</span>
                    <button class="card-add-btn" onclick="quickAddToCart('${item.id}')">+ ADD TO BAG</button>
                </div>
            </div>
        </div>
    `;
}

// --- 7. CART LOGIC (Zanny Collection Bag) ---
function quickAddToCart(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    addToCart(item, 1, []);
    showToast(`🔥 ${item.title} added to order bag!`);
}

function addToCart(item, qty = 1, addons = []) {
    const addonPriceSum = addons.reduce((sum, a) => sum + parseFloat(a.price), 0);
    const unitPrice = item.price + addonPriceSum;
    const cartItemId = item.id + (addons.length ? '-' + addons.map(a => a.name).join('-') : '');

    const existingIndex = cart.findIndex(c => c.cartItemId === cartItemId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({
            cartItemId,
            id: item.id,
            title: item.title,
            image: item.image,
            unitPrice,
            qty,
            addons
        });
    }

    saveCart();
    updateCartUI();
    openCartDrawer();
}

function updateCartQuantity(cartItemId, delta) {
    const item = cart.find(c => c.cartItemId === cartItemId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(c => c.cartItemId !== cartItemId);
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(cartItemId) {
    cart = cart.filter(c => c.cartItemId !== cartItemId);
    saveCart();
    updateCartUI();
    showToast('Item removed from order bag');
}

function saveCart() {
    localStorage.setItem('ribhouse_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    cartBadgeCount.textContent = totalQty;
    drawerItemCount.textContent = `${totalQty} item${totalQty !== 1 ? 's' : ''}`;
    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    checkoutModalTotal.textContent = `$${total.toFixed(2)}`;

    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 10px; color: var(--color-text-sub);">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🛍️</div>
                <p style="font-family: var(--font-subheading); letter-spacing: 1px;">YOUR ORDER BAG IS EMPTY</p>
                <small>Explore our menu drops and add your favorite dishes!</small>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    ${item.addons && item.addons.length ? `<div class="cart-item-addons">+ ${item.addons.map(a => a.name).join(', ')}</div>` : ''}
                    <span class="cart-item-price">$${(item.unitPrice * item.qty).toFixed(2)}</span>
                    <div class="cart-qty-controls">
                        <button class="cart-qty-btn" onclick="updateCartQuantity('${item.cartItemId}', -1)">-</button>
                        <span class="cart-qty-val">${item.qty}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity('${item.cartItemId}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.cartItemId}')">&times;</button>
            </div>
        `).join('');
    }
}

function openCartDrawer() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// --- 8. QUICK VIEW LIGHTBOX MODAL ---
function openQuickView(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    activeQuickViewItem = item;
    activeQuickViewQty = 1;

    qvImg.src = item.image;
    qvBadge.textContent = item.badge;
    qvCategory.textContent = item.category.toUpperCase();
    qvTitle.textContent = item.title;
    qvPrice.textContent = `$${item.price.toFixed(2)}`;
    qvSpice.textContent = item.spice !== 'None' ? item.spice : '';
    qvDescription.textContent = item.description;

    // Specs
    qvSpecsGrid.innerHTML = Object.entries(item.specs).map(([key, val]) => `
        <div class="spec-item">
            <strong>${key}</strong>
            <span>${val}</span>
        </div>
    `).join('');

    // Reset Checkboxes & Qty
    document.querySelectorAll('.addon-checkbox').forEach(cb => cb.checked = false);
    qvQtyVal.textContent = activeQuickViewQty;

    qvOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    qvOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// --- 9. EVENT BINDINGS ---
function bindEvents() {
    // Category Tabs
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderFilteredMenu();
        });
    });

    // Quick Search
    quickSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
        renderFilteredMenu();
    });

    clearSearchBtn.addEventListener('click', () => {
        quickSearchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderFilteredMenu();
    });

    // Sort Dropdown
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderFilteredMenu();
    });

    // Reset Buttons
    resetFiltersBtn.addEventListener('click', resetAllFilters);
    emptyResetBtn.addEventListener('click', resetAllFilters);

    // Cart Controls
    cartToggleBtn.addEventListener('click', openCartDrawer);
    cartCloseBtn.addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', closeCartDrawer);

    // QuickView Qty Buttons
    qvQtyMinus.addEventListener('click', () => {
        if (activeQuickViewQty > 1) {
            activeQuickViewQty--;
            qvQtyVal.textContent = activeQuickViewQty;
        }
    });

    qvQtyPlus.addEventListener('click', () => {
        activeQuickViewQty++;
        qvQtyVal.textContent = activeQuickViewQty;
    });

    qvAddToCartBtn.addEventListener('click', () => {
        if (!activeQuickViewItem) return;
        const selectedAddons = [];
        document.querySelectorAll('.addon-checkbox:checked').forEach(cb => {
            selectedAddons.push({
                name: cb.getAttribute('data-name'),
                price: parseFloat(cb.value)
            });
        });

        addToCart(activeQuickViewItem, activeQuickViewQty, selectedAddons);
        closeQuickView();
        showToast(`🔥 Added ${activeQuickViewQty}x ${activeQuickViewItem.title} to bag!`);
    });

    qvCloseBtn.addEventListener('click', closeQuickView);
    qvOverlay.addEventListener('click', (e) => {
        if (e.target === qvOverlay) closeQuickView();
    });

    // Featured Bundle Button
    const addBundleBtn = document.getElementById('add-bundle-btn');
    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', () => {
            const tomahawk = MENU_ITEMS.find(i => i.id === 'steak-tomahawk-02');
            const ribs = MENU_ITEMS.find(i => i.id === 'ribs-signature-01');
            if (tomahawk && ribs) {
                addToCart(tomahawk, 1, []);
                addToCart(ribs, 1, []);
                showToast('🔥 Ultimate Tomahawk & Rib Platter bundle added!');
            }
        });
    }

    // Reservation & Checkout Modals
    checkoutBtn.addEventListener('click', () => {
        closeCartDrawer();
        checkoutModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    checkoutModalClose.addEventListener('click', () => {
        checkoutModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;

        checkoutModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        cart = [];
        saveCart();
        updateCartUI();

        showToast(`✅ Thank you, ${name}! Your order has been placed successfully.`);
    });

    // Reserve Table Triggers
    const reserveBtns = [
        document.getElementById('hero-reserve-btn'),
        document.getElementById('footer-reserve-btn'),
        document.getElementById('mobile-reserve-trigger')
    ];

    reserveBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                checkoutModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuToggle && mobileNavOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('active');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
            });
        });
    }

    // Footer Category Links
    document.querySelectorAll('.footer-cat-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = link.getAttribute('data-cat');
            if (cat) {
                categoryButtons.forEach(b => {
                    if (b.getAttribute('data-category') === cat) b.click();
                });
            }
        });
    });
}

function resetAllFilters() {
    currentCategory = 'all';
    searchQuery = '';
    quickSearchInput.value = '';
    clearSearchBtn.style.display = 'none';
    categoryButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === 'all');
    });
    renderFilteredMenu();
}

// --- 10. SCROLL HEADER & EMBER EFFECTS ---
function initScrollHeader() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function createEmberParticles() {
    const container = document.getElementById('embers-container');
    if (!container) return;

    for (let i = 0; i < 25; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember-particle';
        const size = Math.random() * 4 + 2;
        ember.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #FF6B00;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            bottom: -10px;
            opacity: ${Math.random() * 0.7 + 0.3};
            box-shadow: 0 0 10px #FF5500;
            animation: floatEmber ${Math.random() * 4 + 4}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(ember);
    }

    // Add keyframe style dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatEmber {
            0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
            50% { transform: translateY(-300px) translateX(${Math.random() * 40 - 20}px) scale(0.8); opacity: 0.5; }
            100% { transform: translateY(-600px) translateX(${Math.random() * 80 - 40}px) scale(0.2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// --- 11. TOAST NOTIFICATIONS ---
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
