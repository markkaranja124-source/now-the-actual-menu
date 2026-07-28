/* ==========================================================================
   RIB HOUSE - BEST QUALITY GRILLED MEAT & HAUTE SMOKEHOUSE
   ACCURATE OFFICIAL MENU DATASET & INTERACTIVE LOGIC
   ========================================================================== */

// --- 1. ACCURATE MENU DATASET ---
const MENU_ITEMS = [
    // --- MAIN DISHES ---
    {
        id: 'main-goat-stew-01',
        title: 'GOAT STEW / FRY WITH UGALI & VEGES',
        category: 'mains',
        price: 470,
        currency: 'KSh',
        image: 'hero_ribs.jpg',
        badge: 'HOUSE SPECIALTY',
        description: 'Tender, slow-simmered local goat meat cooked in rich aromatic tomato gravy, served with hot ugali or fresh chapati.',
        spice: '🌶️ Mild Heat',
        spiceVal: 1,
        featured: true,
        specs: {
            'PORTION': 'Full Serving',
            'PREPARATION': 'Wet Fry / Stew',
            'SERVED WITH': 'Ugali or Chapati',
            'TILL NO': '4977556'
        }
    },
    {
        id: 'main-beef-steak-02',
        title: 'SPECIAL BEEF STEAK WITH CHIPS MASALA',
        category: 'mains',
        price: 800,
        currency: 'KSh',
        image: 'tomahawk.jpg',
        badge: 'CHEF\'S CHOICE',
        description: 'Prime beef steak seared over high heat, served sizzled with seasoned spicy chips masala.',
        spice: '🌶️ Medium Spice',
        spiceVal: 2,
        featured: true,
        specs: {
            'CUT': 'Prime Beef Tenderloin',
            'GRILL': 'High Flame Sear',
            'SIDE': 'Chips Masala',
            'PORTION': 'Hearty Plate'
        }
    },
    {
        id: 'main-chicken-kienyeji-03',
        title: 'CHICKEN KIENYEJI QUARTER WITH PILAU',
        category: 'mains',
        price: 670,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
        badge: 'LOCAL FAVORITE',
        description: 'Authentic free-range Kienyeji quarter chicken braised with herbs, paired with fragrant spiced Swahili pilau.',
        spice: '🌶️ Mild Spice',
        spiceVal: 1,
        featured: true,
        specs: {
            'CHICKEN': 'Organic Kienyeji Qtr',
            'STYLE': 'Pan Fried / Stewed',
            'PAIRING': 'Swahili Spiced Pilau',
            'TILL NO': '4977556'
        }
    },
    {
        id: 'main-chicken-wet-fry-04',
        title: 'CHICKEN WET FRY WITH CHIPS',
        category: 'mains',
        price: 580,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        badge: 'POPULAR DROP',
        description: 'Juicy chicken leg & thigh tossed in rich garlic, onion, and cilantro gravy with golden crispy fries.',
        spice: '🌶️ Mild Heat',
        spiceVal: 1,
        featured: false,
        specs: {
            'PREPARATION': 'Wet Fry Reduction',
            'SIDE': 'Crispy Golden Chips',
            'PORTION': 'Quarter Chicken'
        }
    },
    {
        id: 'main-matumbo-fry-05',
        title: 'MATUMBO FRY WITH RICE & MUKIMO',
        category: 'mains',
        price: 410,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        badge: 'TRADITIONAL',
        description: 'Cleaned and spiced tripe slow-cooked with fresh coriander, spring onion, served with warm traditional mukimo.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'TRIPE': 'Slow Cooked Matumbo',
            'SIDES': 'Rice or Traditional Mukimo',
            'GRAVY': 'Coriander Reduction'
        }
    },
    {
        id: 'main-beef-stew-06',
        title: 'BEEF STEW / FRY WITH UGALI & CHAPATI',
        category: 'mains',
        price: 440,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80',
        badge: 'DAILY CLASSIC',
        description: 'Tender beef cubes braised in savory onion and bell pepper gravy served with soft chapati or ugali.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'BEEF': 'Local Lean Beef Cubes',
            'SERVED WITH': 'Ugali or Soft Chapati',
            'GRAVY': 'House Rich Stew'
        }
    },
    {
        id: 'main-liver-fry-07',
        title: 'LIVER FRY WITH PILAU',
        category: 'mains',
        price: 570,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        badge: 'RICH & NUTRIENT',
        description: 'Fresh beef liver pan-seared with sweet onions and bell peppers, paired with rich spiced pilau rice.',
        spice: '🌶️ Mild Heat',
        spiceVal: 1,
        featured: false,
        specs: {
            'MEAT': 'Pan-Seared Beef Liver',
            'SERVED WITH': 'Pilau Rice',
            'COOK TIME': 'Made Fresh to Order'
        }
    },

    // --- BREAKFAST & SNACKS ---
    {
        id: 'breakfast-samosa-08',
        title: 'BEEF SAMOSA (PAIR)',
        category: 'breakfast',
        price: 70,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        badge: 'MORNING FAVORITE',
        description: 'Crispy golden pastry pockets filled with spiced minced beef, spring onions, and coriander.',
        spice: '🌶️ Mild Spice',
        spiceVal: 1,
        featured: true,
        specs: {
            'FILLING': 'Spiced Minced Beef',
            'PASTRY': 'Crispy Hand-Folded',
            'PORTION': '1 Piece (KSh 70)'
        }
    },
    {
        id: 'breakfast-sausage-09',
        title: 'GRILLED FARMHOUSE SAUSAGE',
        category: 'breakfast',
        price: 70,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
        badge: 'QUICK BITE',
        description: 'Pan-grilled savory beef sausage served hot with tomato dip.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'SAUSAGE': 'Premium Beef',
            'PREPARATION': 'Pan Grilled'
        }
    },
    {
        id: 'breakfast-andazi-10',
        title: 'FRESH COASTAL ANDAZI',
        category: 'breakfast',
        price: 50,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
        badge: 'FRESH BAKE',
        description: 'Soft, cardamom-infused fried dough pastry, perfect when paired with Masala Tea.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'FLAVOR': 'Cardamom & Coconut',
            'BEST PAIRING': 'White Tea Masala'
        }
    },
    {
        id: 'breakfast-kebab-11',
        title: 'SPECIAL MINCED BEEF KEBAB',
        category: 'breakfast',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        badge: 'SNACK SPECIAL',
        description: 'Deep-fried egg-coated spiced minced beef ball packed with garlic and fresh herbs.',
        spice: '🌶️ Mild Heat',
        spiceVal: 1,
        featured: false,
        specs: {
            'MEAT': 'Spiced Beef Mince',
            'COATING': 'Golden Egg Batter'
        }
    },
    {
        id: 'breakfast-bone-soup-12',
        title: 'TRADITIONAL BONE SOUP (CHEMSHA)',
        category: 'breakfast',
        price: 150,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        badge: 'HEALTH & VITALITY',
        description: 'Slow-simmered beef bone broth infused with ginger, garlic, pepper, and local herbs.',
        spice: '🌶️ Pepper Warmth',
        spiceVal: 1,
        featured: true,
        specs: {
            'BROTH': '12-Hour Bone Broth',
            'HERBS': 'Ginger, Garlic & Black Pepper',
            'SERVED': 'Piping Hot Bowl'
        }
    },

    // --- BARISTA & HOT DRINKS ---
    {
        id: 'drink-dawa-13',
        title: 'SPECIAL HOUSE DAWA',
        category: 'hot-drinks',
        price: 200,
        currency: 'KSh',
        image: 'old_fashioned.jpg',
        badge: 'BARISTA SPECIAL',
        description: 'Steaming blend of pure lemon juice, fresh ginger root, and natural honey.',
        spice: '🌶️ Ginger Kick',
        spiceVal: 1,
        featured: true,
        specs: {
            'INGREDIENTS': 'Ginger, Lemon & Honey',
            'SERVED': 'Hot Glass Cup'
        }
    },
    {
        id: 'drink-tea-masala-14',
        title: 'TEA MASALA (WHITE / BLACK)',
        category: 'hot-drinks',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
        badge: 'SIGNATURE SPICE',
        description: 'Kenyan black tea leaves brewed with fresh farm milk and aromatic crushed masala spices.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'TEA': 'Kenyan Highland Tea',
            'SPICES': 'Cardamom, Cinnamon, Cloves'
        }
    },
    {
        id: 'drink-house-coffee-15',
        title: 'HOUSE COFFEE (WHITE / BLACK)',
        category: 'hot-drinks',
        price: 150,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        badge: 'FRESH BREW',
        description: 'Freshly roasted Kenyan Arabica coffee brewed strong black or served with rich steamed milk.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'BEANS': '100% Kenyan Arabica',
            'OPTIONS': 'White Coffee (150) / Black (100)'
        }
    },

    // --- COLD DRINKS & SHAKES ---
    {
        id: 'drink-passion-juice-16',
        title: 'FRESH PASSION JUICE',
        category: 'cold-drinks',
        price: 150,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
        badge: 'CHILLED REFRESHMENT',
        description: 'Cold-pressed natural passion fruit juice served iced.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'FRUIT': 'Real Passion Fruit',
            'SERVED': 'Iced Glass'
        }
    },
    {
        id: 'drink-oreo-shake-17',
        title: 'OREO COOKIE MILKSHAKE',
        category: 'cold-drinks',
        price: 300,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
        badge: 'SWEET TREAT',
        description: 'Thick blended vanilla ice cream shake crushed with Oreo biscuits and chocolate drizzle.',
        spice: 'None',
        spiceVal: 0,
        featured: true,
        specs: {
            'BASE': 'Vanilla Ice Cream',
            'MIX-IN': 'Crushed Oreo Cookies'
        }
    },
    {
        id: 'drink-mint-lemonade-18',
        title: 'FRESH MINT LEMONADE',
        category: 'cold-drinks',
        price: 100,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
        badge: 'COOLER',
        description: 'Zesty lime and lemon juice muddled with crushed fresh mint leaves and sparkling ice.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'HERB': 'Garden Mint',
            'CITRUS': 'Fresh Lemon Juice'
        }
    },

    // --- SIDES & EXTRAS ---
    {
        id: 'side-chips-masala-19',
        title: 'CHIPS MASALA',
        category: 'sides',
        price: 270,
        currency: 'KSh',
        image: 'mac_cheese.jpg',
        badge: 'FAVORITE SIDE',
        description: 'Hand-cut French fries tossed in a spicy garlic, chili, and tomato masala gravy.',
        spice: '🌶️🌶️ Medium Hot',
        spiceVal: 2,
        featured: true,
        specs: {
            'SAUCE': 'Spicy Tomato Masala',
            'PORTION': 'Full Basket'
        }
    },
    {
        id: 'side-mukimo-special-20',
        title: 'SPECIAL TRADITIONAL MUKIMO',
        category: 'sides',
        price: 250,
        currency: 'KSh',
        image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80',
        badge: 'HERITAGE SIDE',
        description: 'Mashed potatoes blended with soft maize, pumpkin leaves, and green peas.',
        spice: 'None',
        spiceVal: 0,
        featured: false,
        specs: {
            'HERITAGE': 'Traditional Kikuyu Recipe',
            'INGREDIENTS': 'Potatoes, Maize, Peas, Greens'
        }
    }
];

// --- 2. GLOBAL STATE ---
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let cart = JSON.parse(localStorage.getItem('ribhouse_cart') || '[]');

// --- 3. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    initScrollReveal();
    initMenuFilter();
    initCartDrawer();
    initModals();
    initFaqAccordion();
    renderMenu();
    updateCartUI();
});

// --- 4. NAVBAR SCROLL EFFECT ---
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

// --- 5. SCROLL REVEAL ANIMATION ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
}

// --- 6. MENU FILTERING & RENDERING ---
function initMenuFilter() {
    const categoryPills = document.querySelectorAll('.category-pill');
    const quickSearchInput = document.getElementById('quick-search');
    const sortSelect = document.getElementById('sort-select');

    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            categoryPills.forEach(btn => btn.classList.remove('active'));
            const targetPill = e.currentTarget;
            targetPill.classList.add('active');
            currentCategory = targetPill.dataset.category;
            renderMenu();
        });
    });

    if (quickSearchInput) {
        quickSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderMenu();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderMenu();
        });
    }
}

function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    const visibleCountEl = document.getElementById('visible-count');
    if (!menuGrid) return;

    let filtered = MENU_ITEMS.filter(item => {
        const matchesCategory = (currentCategory === 'all') || (item.category === currentCategory);
        const matchesSearch = item.title.toLowerCase().includes(searchQuery) ||
                              item.description.toLowerCase().includes(searchQuery) ||
                              item.badge.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Sorting
    if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'spicy') {
        filtered.sort((a, b) => b.spiceVal - a.spiceVal);
    } else {
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    if (visibleCountEl) visibleCountEl.textContent = filtered.length;

    menuGrid.innerHTML = '';

    if (filtered.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <p style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-cream);">No Menu Items Found</p>
                <p style="color: var(--color-text-muted); font-size: 0.9rem;">Try searching for a different dish or category.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="menu-card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" class="menu-card-img">
                <span class="menu-badge">${item.badge}</span>
            </div>
            <div class="menu-card-body">
                <div class="menu-card-header">
                    <h3 class="menu-card-title">${item.title}</h3>
                    <span class="menu-card-price">${item.currency} ${item.price}</span>
                </div>
                <p class="menu-card-desc">${item.description}</p>
                <div class="menu-specs-tags">
                    ${Object.entries(item.specs).map(([key, val]) => `<span class="spec-tag">${key}: ${val}</span>`).join('')}
                </div>
                <div class="menu-card-actions">
                    <button class="btn-add-bag" onclick="addToCart('${item.id}')">ADD TO BAG</button>
                    <button class="btn-quick-view" onclick="openQuickView('${item.id}')">VIEW</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// --- 7. CART DRAWER & ORDER BAG LOGIC ---
function initCartDrawer() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    const checkoutBtn = document.getElementById('checkout-btn');
    const addBundleBtn = document.getElementById('add-bundle-btn');

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
            alert('Order Bag Submitted! Please pay via M-Pesa Till No. 4977556 or at counter upon delivery.');
        });
    }

    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', () => {
            addToCart('main-goat-stew-01');
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }
}

function closeCartDrawer() {
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

function addToCart(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const existingIndex = cart.findIndex(c => c.id === itemId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    saveCart();
    updateCartUI();

    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
}

function changeQty(itemId, delta) {
    const index = cart.findIndex(c => c.id === itemId);
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
    const cartTaxEl = document.getElementById('cart-tax');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = subtotal;

    if (cartBadgeCount) cartBadgeCount.textContent = totalQty;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `KSh ${subtotal.toFixed(0)}`;
    if (cartTaxEl) cartTaxEl.textContent = `Included`;
    if (cartTotalEl) cartTotalEl.textContent = `KSh ${total.toFixed(0)}`;

    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 0; color: var(--color-text-muted);">
                    <p style="font-family: var(--font-serif); font-size: 1.2rem;">Your Order Bag is Empty</p>
                    <p style="font-size: 0.8rem;">Add your favorite dishes or drinks from the catalog.</p>
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

// --- 8. MODAL LOGIC (RESERVATION & QUICK VIEW) ---
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
            alert('Reservation Request Received! Call 0724 594 204 or M-Pesa Till No. 4977556 for special bookings.');
            closeResModal();
        });
    }

    const qvModal = document.getElementById('quickview-modal');
    const qvOverlay = document.getElementById('quickview-modal-overlay');
    const qvClose = document.getElementById('qv-modal-close');

    if (qvClose) {
        qvClose.addEventListener('click', () => {
            if (qvModal) qvModal.classList.remove('active');
            if (qvOverlay) qvOverlay.classList.remove('active');
        });
    }
}

function openQuickView(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const qvModal = document.getElementById('quickview-modal');
    const qvOverlay = document.getElementById('quickview-modal-overlay');

    document.getElementById('qv-img').src = item.image;
    document.getElementById('qv-category').textContent = item.category;
    document.getElementById('qv-title').textContent = item.title;
    document.getElementById('qv-price').textContent = `${item.currency} ${item.price}`;
    document.getElementById('qv-description').textContent = item.description;

    const addBtn = document.getElementById('qv-add-to-cart-btn');
    addBtn.onclick = () => {
        addToCart(item.id);
        if (qvModal) qvModal.classList.remove('active');
        if (qvOverlay) qvOverlay.classList.remove('active');
    };

    if (qvModal && qvOverlay) {
        qvModal.classList.add('active');
        qvOverlay.classList.add('active');
    }
}

// --- 9. FAQ ACCORDION LOGIC ---
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
