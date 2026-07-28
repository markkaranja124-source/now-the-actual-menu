/* ==========================================================================
   RIB HOUSE - HAUTE SMOKEHOUSE & WOOD-FIRED GRILL
   INTERACTIVE JAVASCRIPT LOGIC & ANIMATIONS
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

// --- 5. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER) ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

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
                <p style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-cream);">No Drops Found</p>
                <p style="color: var(--color-text-muted); font-size: 0.9rem;">Try broadening your filter query.</p>
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
                    <span class="menu-card-price">$${item.price.toFixed(2)}</span>
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

    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', closeCartDrawer);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartDrawer);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Order checkout initialized. Presenting order confirmation summary.');
        });
    }

    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', () => {
            addToCart('steak-tomahawk-02');
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

    // Auto open cart drawer
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
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (cartBadgeCount) cartBadgeCount.textContent = totalQty;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTaxEl) cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 0; color: var(--color-text-muted);">
                    <p style="font-family: var(--font-serif); font-size: 1.2rem;">Your Order Bag is Empty</p>
                    <p style="font-size: 0.8rem;">Explore the catalog drops to add menu items.</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div style="display: flex; gap: 12px; align-items: center; border-bottom: 1px solid var(--color-border-dark); padding-bottom: 12px;">
                <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover;">
                <div style="flex: 1;">
                    <h4 style="font-family: var(--font-serif); font-size: 1rem; color: var(--color-cream);">${item.title}</h4>
                    <span style="font-size: 0.8rem; color: var(--color-gold);">$${(item.price * item.qty).toFixed(2)}</span>
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
    // Reservation Modal
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
            alert('Thank you for reserving a table at Rib House. A confirmation message has been recorded.');
            closeResModal();
        });
    }

    // Quick View Modal
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
    document.getElementById('qv-price').textContent = `$${item.price.toFixed(2)}`;
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
