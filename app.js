/* ==========================================================================
   RIB HOUSE - OFFICIAL DIGITAL MENU (PURE MENU SHOWCASE)
   OFFLINE RIB HOUSE MENU AI ASSISTANT & KNOWLEDGE BASE
   ========================================================================== */

// --- FORCE SCROLL TO TOP ON PAGE LOAD & REFRESH ---
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function forceScrollToTop() {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
}

// Ensure instant scroll to top before unload
window.addEventListener('beforeunload', () => {
    forceScrollToTop();
});

document.addEventListener('DOMContentLoaded', () => {
    forceScrollToTop();
    // Microtask delays to prevent mobile Safari/Chrome anchor jumping on load
    setTimeout(forceScrollToTop, 10);
    setTimeout(forceScrollToTop, 150);

    initLiveInventoryListener();
    initSideDrawerNavigation();
    initMenuDishSearch();
    initScrollNavbar();
    initSectionSlideshows();
    initMenuAIAssistant();
    initCustomerFeedbackSystem();
    initClickableMenuDishes();
    updateSelectionBarUI();
    initLocationSection();
});

window.addEventListener('load', () => {
    forceScrollToTop();
});

window.addEventListener('pageshow', () => {
    forceScrollToTop();
    updateSelectionBarUI();
});

// Helper: Map dish names to their corresponding photo assets (Available globally)
function getDishImage(dishName, dishDesc) {
    const textLower = ((dishName || '') + ' ' + (dishDesc || '')).toLowerCase();
    
    // 1. Bacon orders (e.g. Pancake Breakfast with Bacon, Main Breakfast with Beef Bacon, etc.)
    if (textLower.includes('bacon')) {
        return 'breakfastbreadwithbacon1.webp';
    }
    // 2. Goat Choma
    if (textLower.includes('goat') || textLower.includes('choma goat') || textLower.includes('goat choma')) {
        return 'Goatchoma1kg.webp';
    }
    // 3. Sizzling Beef
    if (textLower.includes('sizzling') || textLower.includes('beef sizzling')) {
        return 'beefsizzling.webp';
    }
    // 4. Chips Special with Meat
    if (textLower.includes('chips special') || textLower.includes('special with meat')) {
        return 'Chips special with meat.webp';
    }
    // 5. Chips Matumbo Combo
    if (textLower.includes('chips matumbo') || textLower.includes('chipsmatumbo') || textLower.includes('matumbo')) {
        return 'Chipsmatumbocombo.webp';
    }
    // 6. Fries with Salad
    if (textLower.includes('fries with salad') || textLower.includes('chips with salad')) {
        return 'Fries with salad.webp';
    }
    // 7. Beef Fry / Stew
    if (textLower.includes('beef fry') || textLower.includes('beef') || textLower.includes('stew')) {
        return 'beef.webp';
    }
    // 8. Sausages
    if (textLower.includes('sausage') || textLower.includes('sauseges')) {
        return 'Sauseges.webp';
    }
    // 9. Coffee & Barista
    if (textLower.includes('coffee') || textLower.includes('cappuccino') || textLower.includes('tea') || textLower.includes('latte') || textLower.includes('espresso')) {
        return 'housecoffee.webp';
    }
    // 10. Ice Cream
    if (textLower.includes('ice cream') || textLower.includes('icecream')) {
        return 'icecream.webp';
    }
    // 11. Bread and Eggs
    if (textLower.includes('bread and eggs') || textLower.includes('eggs') || textLower.includes('egg')) {
        return 'breakfastbreadandeggs1.webp';
    }
    // 12. Brown Bread / Toast
    if (textLower.includes('brown bread') || textLower.includes('toast')) {
        return 'brownbread1.webp';
    }
    // 13. General Breakfast Combos
    if (textLower.includes('breakfast') || textLower.includes('pancake')) {
        return 'Breakfast1.webp';
    }
    return null;
}

// --- 1. LUXURY SIDE DRAWER NAVIGATION LOGIC ---
function initSideDrawerNavigation() {
    const toggleBtn = document.getElementById('side-drawer-toggle');
    const closeBtn = document.getElementById('drawer-close-btn');
    const backdrop = document.getElementById('drawer-backdrop');
    const drawer = document.getElementById('side-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const aiDrawerLink = document.getElementById('drawer-ai-helper-link');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
        drawer.classList.add('active');
        backdrop.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock body scroll when drawer is open
    }

    function closeDrawer() {
        drawer.classList.remove('active');
        backdrop.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Escape key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            closeDrawer();
        }
    });

    // Drawer links auto-close & smooth scroll
    drawerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetSec = document.querySelector(href);
                if (targetSec) {
                    e.preventDefault();
                    closeDrawer();
                    setTimeout(() => {
                        targetSec.scrollIntoView({ behavior: 'smooth' });
                    }, 250);
                }
            } else {
                closeDrawer();
            }
        });
    });
}

// --- 2. LIVE TRIPLE-LAYER FAIL-SAFE DISH SEARCH & AUTO-SUGGEST ENGINE ---
const RIBHOUSE_MASTER_DISHES = [
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-test-dish",
    "id": "dish-test-dish",
    "name": "TEST DISH",
    "price": "1/=",
    "priceNum": 1
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-pancake-breakfast",
    "id": "dish-pancake-breakfast",
    "image": "Breakfast1.webp",
    "name": "PANCAKE BREAKFAST",
    "price": "400/=",
    "priceNum": 400
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-mini-breakfast",
    "id": "dish-mini-breakfast",
    "image": "Breakfast1.webp",
    "name": "MINI BREAKFAST",
    "price": "310/=",
    "priceNum": 310
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-rib-house-breakfast",
    "id": "dish-rib-house-breakfast",
    "image": "Breakfast1.webp",
    "name": "RIB HOUSE BREAKFAST",
    "price": "300/=",
    "priceNum": 300
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-main-breakfast",
    "id": "dish-main-breakfast",
    "image": "Breakfast1.webp",
    "name": "MAIN BREAKFAST",
    "price": "400/=",
    "priceNum": 400
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-goat-soup-breakfast",
    "id": "dish-goat-soup-breakfast",
    "image": "Goatchoma1kg.webp",
    "image": "Goatsoup.webp",
    "name": "GOAT SOUP BREAKFAST",
    "price": "300/=",
    "priceNum": 300
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-chicken-soup-breakfast",
    "id": "dish-chicken-soup-breakfast",
    "image": "Breakfast1.webp",
    "image": "Goatsoup.webp",
    "name": "CHICKEN SOUP BREAKFAST",
    "price": "300/=",
    "priceNum": 300
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-chips-combo",
    "id": "dish-chips-combo",
    "name": "CHIPS COMBO",
    "price": "300/=",
    "priceNum": 300
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-samosa-combo",
    "id": "dish-samosa-combo",
    "image": "Andazisamosawitheggs.webp",
    "name": "SAMOSA COMBO",
    "price": "280/=",
    "priceNum": 280
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-traditional-breakfast",
    "id": "dish-traditional-breakfast",
    "image": "Breakfast1.webp",
    "name": "TRADITIONAL BREAKFAST",
    "price": "300/=",
    "priceNum": 300
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-farmers-choice",
    "id": "dish-farmers-choice",
    "image": "Kebabs.webp",
    "name": "FARMERS CHOICE",
    "price": "380/=",
    "priceNum": 380
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-rib-house-bite",
    "id": "dish-rib-house-bite",
    "image": "Samosa.webp",
    "name": "RIB HOUSE BITE",
    "price": "200/=",
    "priceNum": 200
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-special-breakfast",
    "id": "dish-special-breakfast",
    "image": "Breakfast1.webp",
    "name": "SPECIAL BREAKFAST",
    "price": "220/=",
    "priceNum": 220
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-rib-house-special",
    "id": "dish-rib-house-special",
    "image": "Andazisamosawitheggs.webp",
    "name": "RIB HOUSE SPECIAL",
    "price": "310/=",
    "priceNum": 310
  },
  {
    "category": "Gourmet Breakfast",
    "desc": "",
    "domId": "dish-british-breakfast",
    "id": "dish-british-breakfast",
    "image": "Breakfast1.webp",
    "name": "BRITISH BREAKFAST",
    "price": "320/=",
    "priceNum": 320
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-house-coffee-white",
    "id": "dish-house-coffee-white",
    "image": "housecoffee.webp",
    "name": "House Coffee white",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-house-coffee-black",
    "id": "dish-house-coffee-black",
    "image": "housecoffee.webp",
    "name": "House Coffee Black",
    "price": "100/=",
    "priceNum": 100
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-black-coffee-w-lemon",
    "id": "dish-black-coffee-w-lemon",
    "image": "housecoffee.webp",
    "name": "Black Coffee W lemon",
    "price": "110/=",
    "priceNum": 110
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-americano",
    "id": "dish-americano",
    "name": "Americano",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-latte-mocha",
    "id": "dish-latte-mocha",
    "image": "housecoffee.webp",
    "name": "Latte Mocha",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-latte-machiatto",
    "id": "dish-latte-machiatto",
    "image": "housecoffee.webp",
    "name": "Latte Machiatto",
    "price": "180/=",
    "priceNum": 180
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-coffee-latte",
    "id": "dish-coffee-latte",
    "image": "housecoffee.webp",
    "name": "Coffee Latte",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-lemon-tea",
    "id": "dish-lemon-tea",
    "image": "housecoffee.webp",
    "image": "Lemontea.webp",
    "name": "Lemon Tea",
    "price": "100/=",
    "priceNum": 100
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-lemon-tea-w-honey",
    "id": "dish-lemon-tea-w-honey",
    "image": "housecoffee.webp",
    "image": "Lemontea.webp",
    "name": "Lemon Tea W Honey",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-lemon-water",
    "id": "dish-lemon-water",
    "name": "Lemon Water",
    "price": "70/=",
    "priceNum": 70
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-tea-special",
    "id": "dish-tea-special",
    "image": "housecoffee.webp",
    "name": "Tea special",
    "price": "100/=",
    "priceNum": 100
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-tea-masala-white",
    "id": "dish-tea-masala-white",
    "image": "housecoffee.webp",
    "name": "Tea Masala White",
    "price": "130/=",
    "priceNum": 130
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-tea-masala-black",
    "id": "dish-tea-masala-black",
    "image": "housecoffee.webp",
    "name": "Tea Masala Black",
    "price": "100/=",
    "priceNum": 100
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-ginger-tea",
    "id": "dish-ginger-tea",
    "image": "housecoffee.webp",
    "name": "Ginger Tea",
    "price": "130/=",
    "priceNum": 130
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-dawa",
    "id": "dish-dawa",
    "name": "Dawa",
    "price": "200/=",
    "priceNum": 200
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-honey-espresso",
    "id": "dish-honey-espresso",
    "image": "housecoffee.webp",
    "name": "Honey Espresso",
    "price": "110/=",
    "priceNum": 110
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-hot-milk",
    "id": "dish-hot-milk",
    "name": "Hot Milk",
    "price": "100/=",
    "priceNum": 100
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-honey-cone",
    "id": "dish-honey-cone",
    "name": "Honey Cone",
    "price": "50/=",
    "priceNum": 50
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-cappuccino-single",
    "id": "dish-cappuccino-single",
    "image": "housecoffee.webp",
    "name": "Cappuccino (Single)",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-cappuccino-double",
    "id": "dish-cappuccino-double",
    "image": "housecoffee.webp",
    "name": "Cappuccino (Double)",
    "price": "180/=",
    "priceNum": 180
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-espresso-single",
    "id": "dish-espresso-single",
    "image": "housecoffee.webp",
    "name": "Espresso (Single)",
    "price": "120/=",
    "priceNum": 120
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-espresso-double",
    "id": "dish-espresso-double",
    "image": "housecoffee.webp",
    "name": "Espresso (Double)",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Cold Drinks & Shakes",
    "desc": "",
    "domId": "dish-milkshake-flavored",
    "id": "dish-milkshake-flavored",
    "image": "Oreoshake.webp",
    "name": "Milkshake (Flavored)",
    "price": "250/=",
    "priceNum": 250
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-espresso-cold",
    "id": "dish-espresso-cold",
    "image": "housecoffee.webp",
    "name": "Espresso (Cold)",
    "price": "250/=",
    "priceNum": 250
  },
  {
    "category": "Cold Drinks & Shakes",
    "desc": "",
    "domId": "dish-oreo-shake",
    "id": "dish-oreo-shake",
    "image": "Oreoshake.webp",
    "name": "Oreo shake",
    "price": "300/=",
    "priceNum": 300
  },
  {
    "category": "Cold Drinks & Shakes",
    "desc": "",
    "domId": "dish-smoothies-tropical",
    "id": "dish-smoothies-tropical",
    "name": "Smoothies (Tropical)",
    "price": "200/=",
    "priceNum": 200
  },
  {
    "category": "Cold Drinks & Shakes",
    "desc": "",
    "domId": "dish-ice-cream-scoops",
    "id": "dish-ice-cream-scoops",
    "image": "icecream.webp",
    "name": "Ice Cream Scoops",
    "price": "150/=",
    "priceNum": 150
  },
  {
    "category": "Cold Drinks & Shakes",
    "desc": "",
    "domId": "dish-lemonade-flavor",
    "id": "dish-lemonade-flavor",
    "name": "Lemonade (Flavor)",
    "price": "100/=",
    "priceNum": 100
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-iced-coffee",
    "id": "dish-iced-coffee",
    "image": "housecoffee.webp",
    "name": "Iced Coffee",
    "price": "180/=",
    "priceNum": 180
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-matumbo-fry",
    "id": "dish-matumbo-fry",
    "image": "Chipsmatumbocombo.webp",
    "image": "matumboplainwetfry.webp",
    "name": "MATUMBO FRY",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-beef-stew-fry",
    "id": "dish-beef-stew-fry",
    "image": "beef.webp",
    "name": "BEEF STEW / FRY",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-goat-stew-fry",
    "id": "dish-goat-stew-fry",
    "image": "Goatchoma1kg.webp",
    "name": "GOAT STEW / FRY",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-liver",
    "id": "dish-liver",
    "name": "LIVER",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-chicken-kienyeji-quarter",
    "id": "dish-chicken-kienyeji-quarter",
    "image": "chickenquaterwithchips.webp",
    "name": "CHICKEN KIENYEJI QUARTER",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-chicken-wet-fry",
    "id": "dish-chicken-wet-fry",
    "image": "chickenquaterwithchips.webp",
    "name": "CHICKEN WET FRY",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Barista & Hot Beverages",
    "desc": "",
    "domId": "dish-beef-steak",
    "id": "dish-beef-steak",
    "image": "beef.webp",
    "name": "BEEF STEAK",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-deep-fried-chicken",
    "id": "dish-deep-fried-chicken",
    "image": "chickenquaterwithchips.webp",
    "name": "DEEP FRIED CHICKEN",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-fish-fillet",
    "id": "dish-fish-fillet",
    "image": "fishwetfry.webp",
    "name": "FISH FILLET",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-tilapia-stew",
    "id": "dish-tilapia-stew",
    "image": "beef.webp",
    "image": "fishwetfry.webp",
    "name": "TILAPIA STEW",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-tilapia-fry",
    "id": "dish-tilapia-fry",
    "image": "fishwetfry.webp",
    "name": "TILAPIA FRY",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Sides & Extras",
    "desc": "",
    "domId": "dish-ugali-vegetables",
    "id": "dish-ugali-vegetables",
    "name": "UGALI & VEGETABLES",
    "price": "Price on request",
    "priceNum": 0
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-choma-beef-1-kg",
    "id": "dish-choma-beef-1-kg",
    "image": "beef.webp",
    "name": "CHOMA BEEF (1 KG)",
    "price": "1100/=",
    "priceNum": 1100
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-choma-beef-0-5-kg",
    "id": "dish-choma-beef-0-5-kg",
    "image": "beef.webp",
    "name": "CHOMA BEEF (0.5 KG)",
    "price": "550/=",
    "priceNum": 550
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-choma-goat-1-kg",
    "id": "dish-choma-goat-1-kg",
    "image": "Goatchoma1kg.webp",
    "name": "CHOMA GOAT (1 KG)",
    "price": "1200/=",
    "priceNum": 1200
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-choma-goat-0-5-kg",
    "id": "dish-choma-goat-0-5-kg",
    "image": "Goatchoma1kg.webp",
    "name": "CHOMA GOAT (0.5 KG)",
    "price": "600/=",
    "priceNum": 600
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-chemsha-beef-1-kg",
    "id": "dish-chemsha-beef-1-kg",
    "image": "beef.webp",
    "name": "CHEMSHA BEEF (1 KG)",
    "price": "1200/=",
    "priceNum": 1200
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-chemsha-beef-0-5-kg",
    "id": "dish-chemsha-beef-0-5-kg",
    "image": "beef.webp",
    "name": "CHEMSHA BEEF (0.5 KG)",
    "price": "600/=",
    "priceNum": 600
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-chemsha-goat-1-kg",
    "id": "dish-chemsha-goat-1-kg",
    "image": "Goatchoma1kg.webp",
    "name": "CHEMSHA GOAT (1 KG)",
    "price": "1300/=",
    "priceNum": 1300
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-chemsha-goat-0-5-kg",
    "id": "dish-chemsha-goat-0-5-kg",
    "image": "Goatchoma1kg.webp",
    "name": "CHEMSHA GOAT (0.5 KG)",
    "price": "650/=",
    "priceNum": 650
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-beef-fry-tumbukiza-1-kg",
    "id": "dish-beef-fry-tumbukiza-1-kg",
    "image": "beef.webp",
    "name": "BEEF FRY / TUMBUKIZA (1 KG)",
    "price": "1300/=",
    "priceNum": 1300
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-goat-fry-tumbukiza-1-kg",
    "id": "dish-goat-fry-tumbukiza-1-kg",
    "image": "Goatchoma1kg.webp",
    "name": "GOAT FRY / TUMBUKIZA (1 KG)",
    "price": "1400/=",
    "priceNum": 1400
  },
  {
    "category": "Wood-Fired Choma & Grill",
    "desc": "",
    "domId": "dish-chicken-platter-for-4-on-order",
    "id": "dish-chicken-platter-for-4-on-order",
    "image": "housecoffee.webp",
    "image": "chickenquaterwithchips.webp",
    "name": "CHICKEN PLATTER FOR 4 (ON ORDER)",
    "price": "1900/=",
    "priceNum": 1900
  },
  {
    "category": "Sides & Extras",
    "desc": "",
    "domId": "dish-rice-mukimo-special",
    "id": "dish-rice-mukimo-special",
    "name": "Rice / Mukimo Special",
    "price": "250/=",
    "priceNum": 250
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-pilau-special",
    "id": "dish-pilau-special",
    "image": "Pilauplain.webp",
    "name": "Pilau Special",
    "price": "270/=",
    "priceNum": 270
  },
  {
    "category": "Sides & Extras",
    "desc": "",
    "domId": "dish-chips-plain",
    "id": "dish-chips-plain",
    "name": "Chips Plain",
    "price": "220/=",
    "priceNum": 220
  },
  {
    "category": "Sides & Extras",
    "desc": "",
    "domId": "dish-chips-masala",
    "id": "dish-chips-masala",
    "name": "Chips Masala",
    "price": "270/=",
    "priceNum": 270
  },
  {
    "category": "Sides & Extras",
    "desc": "",
    "domId": "dish-rice-plain",
    "id": "dish-rice-plain",
    "name": "Rice Plain",
    "price": "200/=",
    "priceNum": 200
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-mukimo-plain",
    "id": "dish-mukimo-plain",
    "name": "Mukimo Plain",
    "price": "200/=",
    "priceNum": 200
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-waru",
    "id": "dish-waru",
    "name": "Waru",
    "price": "120/=",
    "priceNum": 120
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-spinach",
    "id": "dish-spinach",
    "name": "Spinach",
    "price": "120/=",
    "priceNum": 120
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-banana",
    "id": "dish-banana",
    "name": "Banana",
    "price": "100/=",
    "priceNum": 100
  },
  {
    "category": "Main Dishes",
    "desc": "",
    "domId": "dish-rib-house-menu-ai",
    "id": "dish-rib-house-menu-ai",
    "name": "RIB HOUSE MENU AI",
    "price": "Price on request",
    "priceNum": 0
  }
];

function initMenuDishSearch() {
    const searchInput = document.getElementById('menu-dish-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const countText = document.getElementById('search-count-text');
    const suggestionsDropdown = document.getElementById('search-suggestions-dropdown');

    if (!searchInput) return;

    // Layer 1: Instant In-Memory Embedded Master Catalogue (0ms delay)
    let databaseDishes = (window._ribhouseMenuDishes && window._ribhouseMenuDishes.length > 0)
        ? window._ribhouseMenuDishes
        : [...RIBHOUSE_MASTER_DISHES];

    // Layer 2: Live Firebase RTDB Background Sync (if online and network allows)
    const syncDishesFromFirebase = async () => {
        try {
            const resp = await fetch('https://ribhouse-admin-default-rtdb.firebaseio.com/menu/dishes.json');
            if (resp.ok) {
                const data = await resp.json();
                if (Array.isArray(data) && data.length > 0) {
                    databaseDishes = data;
                    window._ribhouseMenuDishes = data;
                }
            }
        } catch (e) {
            // Fails silently; embedded fallback continues with 0ms interruption
        }
    };
    syncDishesFromFirebase();

    // Layer 3: Scan all live DOM cards across all sections in index.html
    const getDishCards = () => {
        const cardList = [];
        const headings = document.querySelectorAll('section h3, section h4, main h3, main h4');
        headings.forEach(h => {
            const rawName = (h.innerText || '').replace(/\s+/g, ' ').trim().toUpperCase();
            if (rawName.includes('MENU / PART') || rawName.includes('RIB HOUSE') || rawName.includes('AUTHENTIC TASTE') || rawName.includes('OUR HERITAGE')) return;
            let card = h.closest('div[style*="padding"], div[style*="background"], div[style*="border"], [id^="dish-"]') || h.parentElement;
            if (card && !cardList.includes(card)) {
                cardList.push(card);
            }
        });
        return cardList;
    };

    // Calculate YouTube-Style Recommendations from Database
    const get10Recommendations = (query) => {
        const list = (databaseDishes && databaseDishes.length > 0) ? databaseDishes : RIBHOUSE_MASTER_DISHES;

        // If empty query (on click/focus), return top signature dishes
        if (!query || query.trim().length === 0) {
            return list.slice(0, 6);
        }

        const q = query.toLowerCase().trim();
        const qTokens = q.split(/\s+/).filter(t => t.length > 0);

        const scored = list.map(dish => {
            const nameLower = (dish.name || '').toLowerCase();
            const descLower = (dish.desc || '').toLowerCase();
            const catLower = (dish.category || '').toLowerCase();
            let score = 0;

            // 1. Exact prefix match on full name
            if (nameLower.startsWith(q)) {
                score += 150;
            }

            // 2. Word prefix matches in title
            const words = nameLower.split(/[\s\/\(\)]+/).filter(w => w.length > 0);
            words.forEach((word, idx) => {
                if (word.startsWith(q)) {
                    score += (100 - idx * 5);
                } else if (word.includes(q)) {
                    score += 40;
                }
            });

            // 3. Multi-word full inclusion
            if (qTokens.length > 1 && qTokens.every(t => nameLower.includes(t))) {
                score += 120;
            }

            // 4. Description / Ingredients inclusion
            if (descLower.includes(q)) {
                score += 45;
            }

            // 5. Category match
            if (catLower.includes(q)) {
                score += 35;
            }

            return { dish, score };
        });

        // Filter dishes with positive score and sort descending
        const directMatches = scored
            .filter(entry => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(entry => entry.dish);

        // If fewer than 8 matches, fill with closely related dishes from the same categories
        if (directMatches.length < 8 && directMatches.length > 0) {
            const matchedCategories = [...new Set(directMatches.map(d => d.category))];
            list.forEach(dish => {
                if (directMatches.length >= 8) return;
                if (!directMatches.some(d => d.name === dish.name) && matchedCategories.includes(dish.category)) {
                    directMatches.push(dish);
                }
            });
        }

        return directMatches.slice(0, 8);
    };

    // Helper to highlight matching query letters in dish title
    const highlightMatchLetters = (text, query) => {
        if (!query) return text;
        const qClean = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${qClean})`, 'gi');
        return text.replace(regex, '<span class="sugg-match-bold">$1</span>');
    };

    let activeSuggestionIndex = -1;
    let currentRecommendations = [];

    const hideSuggestions = () => {
        if (suggestionsDropdown) {
            suggestionsDropdown.style.setProperty('display', 'none', 'important');
            suggestionsDropdown.innerHTML = '';
        }
        activeSuggestionIndex = -1;
        currentRecommendations = [];
    };

    const renderSuggestions = (recommendations, query) => {
        if (!suggestionsDropdown) return;
        currentRecommendations = recommendations;
        activeSuggestionIndex = -1;

        if (recommendations.length === 0) {
            hideSuggestions();
            return;
        }

        const searchIconSvg = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `;

        let html = '';

        recommendations.forEach((item, index) => {
            const isTop = index === 0;
            const dishImg = item.image || getDishImage(item.name, item.desc);
            const highlightedTitle = highlightMatchLetters(item.name, query);

            if (isTop && dishImg) {
                // Top Featured Entity Row with photo thumbnail
                html += `
                    <div class="search-suggestion-item sugg-featured" data-index="${index}" role="option" tabindex="0">
                        <div class="sugg-row-icon-box">
                            ${searchIconSvg}
                        </div>
                        <div class="sugg-content-box">
                            <div class="sugg-title-line">${highlightedTitle}</div>
                            <div class="sugg-subtitle-line">${item.category || 'Menu'}${item.price ? ` • <strong style="color: #B8860B;">${item.price}</strong>` : ''}</div>
                        </div>
                        <div class="sugg-thumb-box">
                            <img src="${dishImg}" alt="${item.name}" class="sugg-thumb-img">
                        </div>
                    </div>
                `;
            } else {
                // YouTube-Style Autocomplete Keyword Suggestion Row
                html += `
                    <div class="search-suggestion-item" data-index="${index}" role="option" tabindex="0">
                        <div class="sugg-row-icon-box">
                            ${searchIconSvg}
                        </div>
                        <div class="sugg-content-box">
                            <div class="sugg-title-line">${highlightedTitle}</div>
                        </div>
                        ${item.price ? `<span class="sugg-price-pill">${item.price}</span>` : ''}
                    </div>
                `;
            }
        });

        suggestionsDropdown.innerHTML = html;
        suggestionsDropdown.style.setProperty('display', 'flex', 'important');
        suggestionsDropdown.style.setProperty('visibility', 'visible', 'important');
        suggestionsDropdown.style.setProperty('opacity', '1', 'important');

        // Attach click listeners to all suggestion items
        const itemEls = suggestionsDropdown.querySelectorAll('.search-suggestion-item');
        itemEls.forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(el.getAttribute('data-index'), 10);
                if (recommendations[idx]) {
                    selectDishSuggestion(recommendations[idx]);
                }
            });
        });
    };

    const selectDishSuggestion = (dishItem) => {
        searchInput.value = dishItem.name;
        hideSuggestions();
        if (clearBtn) clearBtn.style.display = 'inline-flex';

        // Find the target dish card element by domId or heading name
        let targetCard = dishItem.domId ? document.getElementById(dishItem.domId) : null;
        
        if (!targetCard) {
            const headings = document.querySelectorAll('section h3, section h4, main h3, main h4');
            for (let h of headings) {
                if ((h.innerText || '').replace(/\s+/g, ' ').trim().toLowerCase() === dishItem.name.toLowerCase()) {
                    targetCard = h.closest('div[style*="padding"], div[style*="background"], div[style*="border"], [id^="dish-"]') || h.parentElement;
                    break;
                }
            }
        }

        // Restore visibility on all cards
        document.querySelectorAll('.menu-dish-card, [id^="dish-"]').forEach(c => {
            c.classList.remove('dish-card-hidden');
        });
        document.querySelectorAll('.menu-grid, [id^="bk-"], [id$="-section"]').forEach(el => {
            el.style.display = '';
        });

        if (targetCard) {
            targetCard.classList.remove('dish-card-hidden');
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Golden Spotlight Pulse Glow Animation on selected card
            targetCard.classList.remove('dish-card-pulse-highlight');
            void targetCard.offsetWidth; // Trigger reflow for animation restart
            targetCard.classList.add('dish-card-pulse-highlight');
            setTimeout(() => {
                targetCard.classList.remove('dish-card-pulse-highlight');
            }, 2500);
        }
    };

    const performSearch = (renderDropdown = true) => {
        const rawVal = searchInput.value.trim();
        const query = rawVal.toLowerCase();
        const cards = getDishCards();
        let matchCount = 0;

        if (clearBtn) clearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';

        if (!query) {
            if (countText) countText.textContent = 'All Dishes';
            cards.forEach(card => {
                card.classList.remove('dish-card-hidden', 'dish-card-search-match');
            });

            document.querySelectorAll('.menu-grid, [id^="bk-"], [id$="-section"]').forEach(el => {
                el.style.display = '';
            });

            // Show top recommendations on click / focus
            if (renderDropdown) {
                const recs = get10Recommendations('');
                renderSuggestions(recs, '');
            }
            return;
        }

        // Multi-word matching
        const queryTokens = query.split(/\s+/).filter(t => t.length > 0);

        cards.forEach(card => {
            const content = card.innerText.toLowerCase();
            const isMatch = queryTokens.every(token => content.includes(token));

            if (isMatch) {
                card.classList.remove('dish-card-hidden');
                card.classList.add('dish-card-search-match');
                matchCount++;
            } else {
                card.classList.add('dish-card-hidden');
                card.classList.remove('dish-card-search-match');
            }
        });

        // Hide empty section grids where 0 items match
        document.querySelectorAll('.menu-grid').forEach(grid => {
            const visibleItems = grid.querySelectorAll('> div:not(.dish-card-hidden)');
            if (visibleItems.length === 0) {
                grid.style.display = 'none';
            } else {
                grid.style.display = '';
            }
        });

        if (countText) {
            countText.textContent = matchCount === 0 ? '0 Found' : `${matchCount} Found`;
        }

        if (renderDropdown) {
            const recs = get10Recommendations(query);
            renderSuggestions(recs, query);
        }
    };

    searchInput.addEventListener('input', () => {
        performSearch(true);
    });

    searchInput.addEventListener('keyup', () => {
        performSearch(true);
    });

    searchInput.addEventListener('focus', () => {
        performSearch(true);
    });

    searchInput.addEventListener('click', () => {
        performSearch(true);
    });

    // Keyboard Navigation: ArrowUp, ArrowDown, Enter, Escape
    searchInput.addEventListener('keydown', (e) => {
        const itemEls = suggestionsDropdown ? suggestionsDropdown.querySelectorAll('.search-suggestion-item') : [];

        if (e.key === 'ArrowDown') {
            if (itemEls.length > 0) {
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex + 1) % itemEls.length;
                updateActiveSuggestionUI(itemEls);
            }
        } else if (e.key === 'ArrowUp') {
            if (itemEls.length > 0) {
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex - 1 + itemEls.length) % itemEls.length;
                updateActiveSuggestionUI(itemEls);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeSuggestionIndex >= 0 && currentRecommendations[activeSuggestionIndex]) {
                selectDishSuggestion(currentRecommendations[activeSuggestionIndex]);
            } else if (currentRecommendations.length > 0) {
                selectDishSuggestion(currentRecommendations[0]);
            } else {
                const firstMatch = document.querySelector('.dish-card-search-match');
                if (firstMatch) {
                    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                hideSuggestions();
            }
        } else if (e.key === 'Escape') {
            hideSuggestions();
        }
    });

    function updateActiveSuggestionUI(itemEls) {
        itemEls.forEach((el, idx) => {
            if (idx === activeSuggestionIndex) {
                el.classList.add('active-keyboard-item');
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                el.classList.remove('active-keyboard-item');
            }
        });
    }

    // Dismiss suggestions when clicking anywhere outside
    document.addEventListener('click', (e) => {
        const searchBox = document.querySelector('.nav-search-box');
        if (searchBox && !searchBox.contains(e.target)) {
            hideSuggestions();
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            hideSuggestions();
            performSearch(false);
            searchInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// --- 3. NAVBAR SCROLL OBSERVER ---
function initScrollNavbar() {
    // Navbar moves naturally with scroll
}

// --- 2. SECTION BACKGROUND SLIDESHOWS (KEN BURNS EFFECT) ---
function initSectionSlideshows() {
    const containers = document.querySelectorAll('.bg-slideshow-container');
    containers.forEach(container => {
        const slides = container.querySelectorAll('.bg-slide');
        if (slides.length <= 1) return;

        // Preload all slide images to prevent blank loading delays while gliding
        slides.forEach(slide => {
            const bgUrlMatch = slide.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (bgUrlMatch && bgUrlMatch[1]) {
                const img = new Image();
                img.src = bgUrlMatch[1];
            }
        });

        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 5500);
    });
}

// ==========================================================================
// 3. OFFLINE RIB HOUSE MENU AI ASSISTANT LOGIC & SELECTION ENGINE
// ==========================================================================

// Dining Mode: 'dine_in' (default) vs 'takeaway'
function getDiningType() {
    try {
        return sessionStorage.getItem('ribhouse_dining_type') || 'dine_in';
    } catch(e) {
        return 'dine_in';
    }
}

function setDiningType(type) {
    try {
        sessionStorage.setItem('ribhouse_dining_type', type);
    } catch(e) {}
    if (typeof renderSelectedOrderPage === 'function') renderSelectedOrderPage();
    if (typeof renderOrderSummaryPage === 'function') renderOrderSummaryPage();
    if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
}

window.setDiningType = setDiningType;

// Standardized Takeaway Packaging Fee Calculation Rules:
// 1. Choma & Chemsha (Goat / Beef / Pork / Platters): Meat Foil (20/=) + Soup Cup (20/=) = 40/= flat per meat order
// 2. All Drinks & Soups (Coffee, Tea, Dawa, Shakes, Smoothies, Juices, Soups): Takeaway Cup = 20/= per unit
// 3. All Other Meals & Stews (Breakfasts, Stews, Steaks, Fish, Chips Combos, Sides): Plastic Food Container = 20/= per unit
function getItemPackagingDetails(item) {
    const textLower = ((item.name || '') + ' ' + (item.desc || '') + ' ' + (item.category || '')).toLowerCase();
    
    // Check Choma & Chemsha
    if (textLower.includes('choma') || textLower.includes('chemsha') || textLower.includes('tumbukiza') || textLower.includes('ribs') || textLower.includes('platter')) {
        return {
            type: 'choma_foil_soup',
            label: 'Foil Wrap & Soup Cup',
            feePerUnit: 40,
            isFlat: true,
            totalFee: 40
        };
    }
    
    // Check Drinks & Soups
    if (textLower.includes('coffee') || textLower.includes('tea') || textLower.includes('latte') || textLower.includes('espresso') || textLower.includes('cappuccino') || textLower.includes('dawa') || textLower.includes('shake') || textLower.includes('smoothie') || textLower.includes('juice') || textLower.includes('lemonade') || textLower.includes('soup') || textLower.includes('chocolate') || textLower.includes('milo') || textLower.includes('water') || textLower.includes('drink')) {
        return {
            type: 'drink_cup',
            label: 'Takeaway Cup',
            feePerUnit: 20,
            isFlat: false,
            totalFee: 20 * (item.qty || 1)
        };
    }
    
    // Standard Food Dish
    return {
        type: 'food_container',
        label: 'Plastic Food Container',
        feePerUnit: 20,
        isFlat: false,
        totalFee: 20 * (item.qty || 1)
    };
}

function calculateItemPackagingFee(item, diningType = getDiningType()) {
    if (diningType === 'dine_in') return 0;
    return getItemPackagingDetails(item).totalFee;
}

function calculateCartPackagingTotal(cart, diningType = getDiningType()) {
    if (diningType === 'dine_in' || !cart || cart.length === 0) return 0;
    let total = 0;
    cart.forEach(item => {
        total += calculateItemPackagingFee(item, diningType);
    });
    return total;
}

// SessionStorage Cart Helper Functions (Resets to 0 on fresh page run)
function getSelectedCart() {
    try {
        return JSON.parse(sessionStorage.getItem('ribhouse_selected_cart')) || [];
    } catch(e) {
        return [];
    }
}

function saveSelectedCart(cart) {
    try {
        sessionStorage.setItem('ribhouse_selected_cart', JSON.stringify(cart));
    } catch(e) {}
    updateSelectionBarUI();
}

function isDishSelected(dishName) {
    const cart = getSelectedCart();
    return cart.some(item => item.name === dishName);
}

// Extract accompaniment choices separated by slash '/' (e.g. Ugali / Chapati -> ['Ugali', 'Chapati'], Rice / Mukimo -> ['Rice', 'Mukimo'])
function extractSideOptions(dishName, desc) {
    const text = (dishName || '') + ' ' + (desc || '');
    if (!text.trim()) return [];

    // 1. Check inside parentheses first: e.g. (Ugali / Chapati) or (Rice / Mukimo)
    const parenMatch = text.match(/\(([^)]+)\)/);
    if (parenMatch) {
        const inner = parenMatch[1].trim();
        // Skip fractions/weights like "1/4" or "1/2"
        if (inner.includes('/') && !/^\d+\s*\/\s*\d+$/.test(inner)) {
            const parts = inner.split('/').map(s => s.trim()).filter(s => s.length > 0);
            if (parts.length > 1) {
                return parts;
            }
        }
    }

    // 2. Known sides pair patterns across menu
    const patterns = [
        /ugali\s*\/\s*chapati/i,
        /chapati\s*\/\s*ugali/i,
        /rice\s*\/\s*mukimo/i,
        /mukimo\s*\/\s*rice/i
    ];

    for (const pat of patterns) {
        const m = text.match(pat);
        if (m) {
            return m[0].split('/').map(s => s.trim());
        }
    }

    return [];
}

// Calculate total subtotal of a dish across all its customized portions
function calculateItemSubtotal(item) {
    const base = item.basePrice || parseInt((item.price || '0').toString().replace(/[^0-9]/g, ''), 10) || 0;
    if (!item.portions || item.portions.length === 0) {
        return base * (item.qty || 1);
    }
    let sum = 0;
    item.portions.forEach(p => {
        let extra = 0;
        if (p && p.pairing === 'ugali_managu') extra = 100;
        else if (p && p.pairing === 'ugali_sukuma') extra = 70;
        else if (p && p.pairing === 'ugali_cabbage') extra = 70;
        sum += (base + extra);
    });
    return sum;
}

function toggleSelectItem(dishDataStr) {
    try {
        const dish = typeof dishDataStr === 'string' ? JSON.parse(decodeURIComponent(dishDataStr)) : dishDataStr;
        let cart = getSelectedCart();
        const existingIndex = cart.findIndex(item => item.name === dish.name);
        
        if (existingIndex > -1) {
            cart.splice(existingIndex, 1);
        } else {
            const numericPrice = parseInt(dish.price.toString().replace(/[^0-9]/g, ''), 10) || 0;
            const nameLower = (dish.name || '').toLowerCase();

            // Extract dynamic side choices (e.g. Ugali / Chapati -> ['Ugali', 'Chapati'], Rice / Mukimo -> ['Rice', 'Mukimo'])
            const sideOptions = extractSideOptions(dish.name, dish.desc);
            const hasSide = sideOptions.length > 1;
            const defaultSide = hasSide ? sideOptions[0] : null;

            // Prep option (e.g. Tilapia / Fish)
            const hasPrep = nameLower.includes('tilapia') || nameLower.includes('fish');
            // Pairing option for Choma / Chemsha / Tumbukiza
            const hasPairing = nameLower.includes('choma') || nameLower.includes('chemsha') || nameLower.includes('tumbukiza');

            const defaultPrep = hasPrep ? 'Wet Fry' : null;
            const defaultPairing = hasPairing ? 'none' : null;

            cart.push({
                id: 'dish_' + Math.random().toString(36).substring(2, 9),
                name: dish.name,
                basePrice: numericPrice,
                price: dish.price,
                numericPrice: numericPrice,
                desc: dish.desc || '',
                category: dish.category || 'main',
                hasSide: hasSide,
                sideOptions: sideOptions,
                hasPrep: hasPrep,
                hasPairing: hasPairing,
                qty: 1,
                portions: [
                    { side: defaultSide, prep: defaultPrep, pairing: defaultPairing }
                ]
            });
        }
        saveSelectedCart(cart);

        // Update button UI in AI drawer
        const encodedName = encodeURIComponent(dish.name);
        document.querySelectorAll(`button[data-dish-name="${encodedName}"]`).forEach(btn => {
            const isSel = isDishSelected(dish.name);
            btn.classList.toggle('active', isSel);
            btn.innerHTML = isSel ? '✓ Selected' : '+ Select Item';
        });
    } catch(e) {
        console.error("Selection error:", e);
    }
}

function updateSelectionBarUI() {
    const cart = getSelectedCart();
    const totalDishes = cart.length;
    const totalQuantity = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);

    // Floating View Your Order Button (Bottom Right)
    const floatingBtn = document.getElementById('floating-order-btn');
    const floatingText = document.getElementById('floating-order-text');
    const floatingCount = document.getElementById('floating-order-count');

    if (floatingBtn) {
        if (totalDishes > 0) {
            floatingBtn.style.display = 'inline-flex';
            if (floatingText) {
                floatingText.innerHTML = `Your Order &rarr;`;
            }
        } else {
            floatingBtn.style.display = 'none';
        }
    }

    if (floatingCount) {
        if (totalQuantity > 0) {
            floatingCount.textContent = totalQuantity;
            floatingCount.style.display = 'inline-flex';
        } else {
            floatingCount.style.display = 'none';
        }
    }

    // Top Navigation Cart Count Badge
    const navCartBadge = document.getElementById('nav-cart-badge');
    if (navCartBadge) {
        navCartBadge.textContent = totalQuantity;
        navCartBadge.style.display = totalQuantity > 0 ? 'inline-flex' : 'none';
    }

    // AI Selection Bar (if present)
    const bar = document.getElementById('ai-selection-bar');
    const countEl = document.getElementById('ai-selected-count');
    const totalEl = document.getElementById('ai-selected-total');
    if (bar) {
        if (totalDishes > 0) {
            bar.style.display = 'flex';
            if (countEl) {
                countEl.textContent = `${totalDishes} ${totalDishes === 1 ? 'Dish' : 'Dishes'} (${totalQuantity} ${totalQuantity === 1 ? 'Item' : 'Items'}) Selected`;
            }
            if (totalEl) {
                totalEl.textContent = `Total: KSh ${totalPrice.toLocaleString()}/=`;
            }
        } else {
            bar.style.display = 'none';
        }
    }
}

// --- DISH AVAILABILITY & INVENTORY HELPERS ---
function getDishInventoryState() {
    return JSON.parse(localStorage.getItem('ribhouse_dish_inventory') || '{}');
}

const DISH_NAME_TO_INVENTORY_KEY = {
    "test dish": "test_dish",
    "test dish (1/=)": "test_dish",
    "pancake breakfast": "pancake_breakfast",
    "mini breakfast": "mini_breakfast",
    "rib house breakfast": "rib_house_breakfast",
    "main breakfast": "main_breakfast",
    "goat soup breakfast": "goat_soup_breakfast",
    "chicken soup breakfast": "chicken_soup_breakfast",
    "chips combo": "chips_combo",
    "samosa combo": "samosa_combo",
    "traditional breakfast": "traditional_breakfast",
    "farmers choice": "farmers_choice",
    "rib house bite": "rib_house_bite",
    "special breakfast": "special_breakfast",
    "rib house special": "rib_house_special",
    "british breakfast": "british_breakfast",
    "house coffee white": "house_coffee_white",
    "house coffee black": "house_coffee_black",
    "black coffee w lemon": "black_coffee_lemon",
    "black coffee with lemon": "black_coffee_lemon",
    "americano": "americano",
    "latte mocha": "latte_mocha",
    "latte machiatto": "latte_macchiato",
    "latte macchiato": "latte_macchiato",
    "coffee latte": "coffee_latte",
    "lemon tea": "lemon_tea",
    "lemon tea w honey": "lemon_tea_honey",
    "lemon tea with honey": "lemon_tea_honey",
    "lemon water": "lemon_water",
    "tea special": "tea_special",
    "tea masala white": "tea_masala_white",
    "tea masala black": "tea_masala_black",
    "ginger tea": "ginger_tea",
    "dawa": "dawa_tea",
    "dawa (lemon, ginger & honey)": "dawa_tea",
    "dawa tea": "dawa_tea",
    "honey espresso": "honey_espresso",
    "hot milk": "hot_milk",
    "honey cone": "honey_cone",
    "cappuccino (single)": "cappuccino_single",
    "cappuccino (double)": "cappuccino_double",
    "cappuccino single": "cappuccino_single",
    "cappuccino double": "cappuccino_double",
    "espresso (single)": "espresso_single",
    "espresso (double)": "espresso_double",
    "espresso single": "espresso_single",
    "espresso double": "espresso_double",
    "espresso (cold)": "espresso_cold",
    "espresso cold": "espresso_cold",
    "milkshake (flavored)": "milkshake_flavored",
    "milkshake flavored": "milkshake_flavored",
    "oreo shake": "oreo_shake",
    "smoothies (tropical)": "smoothies_tropical",
    "smoothies tropical": "smoothies_tropical",
    "ice cream scoops": "ice_cream_scoops",
    "lemonade (flavor)": "lemonade_flavor",
    "lemonade flavor": "lemonade_flavor",
    "iced coffee": "iced_coffee",
    "matumbo fry": "matumbo_fry",
    "matumbo fry (all sides)": "matumbo_fry",
    "beef stew / fry": "beef_stew_fry",
    "beef stew / fry (all sides)": "beef_stew_fry",
    "goat stew / fry": "goat_stew_fry",
    "goat stew / fry (all sides)": "goat_stew_fry",
    "liver": "liver",
    "liver (all sides)": "liver",
    "chicken kienyeji quarter": "chicken_kienyeji_quarter",
    "chicken wet fry": "chicken_wet_fry",
    "chicken wet fry (all sides)": "chicken_wet_fry",
    "beef steak": "beef_steak",
    "beef steak (all sides)": "beef_steak",
    "deep fried chicken": "deep_fried_chicken",
    "fish fillet": "fish_fillet",
    "fish fillet (all sides)": "fish_fillet",
    "tilapia stew": "tilapia_stew",
    "tilapia stew (all sides)": "tilapia_stew",
    "tilapia fry": "tilapia_fry",
    "tilapia fry (all sides)": "tilapia_fry",
    "ugali with sukuma / cabbage": "ugali_sukuma_cabbage",
    "ugali with managu": "ugali_managu",
    "ugali & vegetables": "ugali_sukuma_cabbage",
    "choma beef (1 kg)": "choma_beef_1kg",
    "choma beef (0.5 kg)": "choma_beef_half_kg",
    "choma beef 1kg": "choma_beef_1kg",
    "choma beef 0.5kg": "choma_beef_half_kg",
    "choma goat (1 kg)": "choma_goat_1kg",
    "choma goat (0.5 kg)": "choma_goat_half_kg",
    "choma goat 1kg": "choma_goat_1kg",
    "choma goat 0.5kg": "choma_goat_half_kg",
    "chemsha beef (1 kg)": "chemsha_beef_1kg",
    "chemsha beef (0.5 kg)": "chemsha_beef_half_kg",
    "chemsha beef 1kg": "chemsha_beef_1kg",
    "chemsha beef 0.5kg": "chemsha_beef_half_kg",
    "chemsha goat (1 kg)": "chemsha_goat_1kg",
    "chemsha goat (0.5 kg)": "chemsha_goat_half_kg",
    "chemsha goat 1kg": "chemsha_goat_1kg",
    "chemsha goat 0.5kg": "chemsha_goat_half_kg",
    "beef fry / tumbukiza (1 kg)": "beef_fry_tumbukiza_1kg",
    "goat fry / tumbukiza (1 kg)": "goat_fry_tumbukiza_1kg",
    "beef fry / tumbukiza": "beef_fry_tumbukiza_1kg",
    "goat fry / tumbukiza": "goat_fry_tumbukiza_1kg",
    "chicken platter for 4 (on order)": "chicken_platter_4",
    "chicken platter for 4": "chicken_platter_4",
    "rice / mukimo special": "extra_rice_mukimo_special",
    "pilau special": "extra_pilau_special",
    "chips plain": "extra_chips_plain",
    "chips masala": "extra_chips_masala",
    "rice plain": "extra_rice_plain",
    "mukimo plain": "extra_mukimo_plain",
    "waru": "extra_waru",
    "spinach": "extra_spinach",
    "banana": "extra_banana",
    "ugali / chapati": "side_ugali_chapati",
    "ugali / chapati (side)": "side_ugali_chapati",
    "rice / mukimo": "side_rice_mukimo",
    "rice / mukimo (side)": "side_rice_mukimo",
    "pilau": "side_pilau",
    "pilau (side)": "side_pilau",
    "chips": "side_chips",
    "chips / fries": "side_chips",
    "chips / fries (side)": "side_chips",
    "chips masala (side)": "side_chips_masala",
    "side chips masala": "side_chips_masala",
    "side rice plain": "side_rice_plain",
    "side mukimo plain": "side_mukimo_plain",
    "side rice mukimo special": "side_rice_mukimo_special",
    "side pilau special": "side_pilau_special",
    "waru (side)": "side_waru",
    "spinach (side)": "side_spinach",
    "banana (side)": "side_banana",
    "kachumbari": "side_kachumbari",
    "kachumbari (salad)": "side_kachumbari",
    "sukuma": "side_sukuma",
    "sukuma wiki": "side_sukuma",
    "sukuma wiki (greens)": "side_sukuma",
    "cabbage": "side_cabbage",
    "cabbage (greens)": "side_cabbage",
    "managu": "side_managu",
    "managu (greens)": "side_managu"
};

function resolveInventoryKey(name) {
    if (!name) return '';
    const clean = name.toLowerCase().trim().replace(/\s+/g, ' ');
    if (DISH_NAME_TO_INVENTORY_KEY[clean]) {
        return DISH_NAME_TO_INVENTORY_KEY[clean];
    }
    // Strict exact equality search
    for (const [title, key] of Object.entries(DISH_NAME_TO_INVENTORY_KEY)) {
        if (clean === title || clean.startsWith(title + ' ') || clean.endsWith(' ' + title)) {
            return key;
        }
    }
    return clean.replace(/[^a-z0-9]/g, '_');
}

// --- LIVE CLOUD INVENTORY SYNC ENGINE ---
const RIBHOUSE_CLOUD_SYNC_URL = 'https://ribhouse-admin-default-rtdb.firebaseio.com/inventory.json';

// Fetch latest inventory from cloud on load & listen in real-time
async function fetchCloudInventory() {
    try {
        const res = await fetch(RIBHOUSE_CLOUD_SYNC_URL);
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data === 'object') {
                const local = getDishInventoryState();
                const merged = { ...local, ...data };
                localStorage.setItem('ribhouse_dish_inventory', JSON.stringify(merged));
                refreshAllDishCardsUI();
                if (typeof renderSelectedOrderPage === 'function') {
                    renderSelectedOrderPage();
                }
            }
        }
    } catch (e) {
        // Fallback to local storage
    }
}

// Push status to cloud from admin portal
async function pushCloudInventoryItem(itemId, status) {
    try {
        await fetch(RIBHOUSE_CLOUD_SYNC_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [itemId]: status })
        });
    } catch (e) {
        // Fallback to local storage
    }
}

// Live listener for all customer devices across Kenya (Zero-Latency Real-Time SSE Stream)
function initLiveInventoryListener() {
    fetchCloudInventory();
    
    // Auto sync periodically in background every 2 seconds as backup
    if (!window._ribhouse_sync_interval) {
        window._ribhouse_sync_interval = setInterval(fetchCloudInventory, 45000);
    }

    // Native Realtime EventSource (SSE Stream) for 0.05-second instant live updates
    try {
        if (window.EventSource && !window._ribhouse_eventsource) {
            const evtSource = new EventSource(RIBHOUSE_CLOUD_SYNC_URL);
            window._ribhouse_eventsource = evtSource;

            function processLiveCloudPayload(e) {
                try {
                    const parsed = JSON.parse(e.data);
                    if (!parsed) return;
                    const local = getDishInventoryState();
                    let hasChanged = false;

                    if (parsed.path === '/' || parsed.path === '') {
                        if (parsed.data && typeof parsed.data === 'object') {
                            Object.assign(local, parsed.data);
                            hasChanged = true;
                        }
                    } else if (parsed.path) {
                        // Single item key updated e.g. path: "/choma_goat_1kg", data: "hold"
                        const cleanKey = parsed.path.replace(/^\//, '').split('/')[0];
                        if (cleanKey && parsed.data !== undefined) {
                            local[cleanKey] = parsed.data;
                            hasChanged = true;
                        }
                    }

                    if (hasChanged) {
                        localStorage.setItem('ribhouse_dish_inventory', JSON.stringify(local));
                        refreshAllDishCardsUI();
                        if (typeof renderSelectedOrderPage === 'function') {
                            renderSelectedOrderPage();
                        }
                    }
                } catch(err) {}
            }

            evtSource.addEventListener('put', processLiveCloudPayload);
            evtSource.addEventListener('patch', processLiveCloudPayload);
            evtSource.onmessage = processLiveCloudPayload;
        }
    } catch (e) {}
}

if (typeof window !== 'undefined') {
    initLiveInventoryListener();
}

function getItemAvailability(name) {
    const inv = getDishInventoryState();
    const key = resolveInventoryKey(name);
    return inv[key] || 'ready'; // 'ready', 'hold', 'unavailable'
}

// --- 4. CLICKABLE DISH CARDS & ADD TO ORDER SYSTEM ---
function initClickableMenuDishes() {
    // Globally clean up any old status pills or badges
    document.querySelectorAll('.dish-status-pill, [class*="status-pill"], [class*="pill-hold"], [class*="pill-unavailable"]').forEach(el => el.remove());

    const allCards = document.querySelectorAll('.menu-grid > div');

    allCards.forEach(card => {
        const h3Header = card.querySelector('h3, h4');
        const mainTitle = h3Header ? h3Header.innerText.replace(/\s+/g, ' ').trim() : 'Dish';

        // Detect if this card has sub-item option rows (like Matumbo Fry with sides)
        const subContainers = card.querySelectorAll('div > div');
        const optionRows = [];

        subContainers.forEach(div => {
            const spans = div.querySelectorAll('span');
            if (spans.length >= 2 && !div.querySelector('h3, h4')) {
                optionRows.push(div);
            }
        });

        if (optionRows.length === 0) {
            const directDivs = card.querySelectorAll(':scope > div > div, :scope > div');
            directDivs.forEach(div => {
                const spans = div.querySelectorAll('span');
                if (spans.length >= 2 && !div.querySelector('h3, h4')) {
                    if (!optionRows.includes(div)) optionRows.push(div);
                }
            });
        }

        if (optionRows.length >= 2) {
            // MULTI-OPTION CARD (e.g. Matumbo Fry, Beef Stew, Goat Stew, etc.)
            let visibleOptionCount = 0;
            let firstAvailableOption = null;

            optionRows.forEach(row => {
                const spans = row.querySelectorAll('span');
                if (spans.length < 2) return;

                const sideName = spans[0].innerText.replace(/\s+/g, ' ').trim();
                const sidePrice = spans[1].innerText.replace(/\s+/g, ' ').trim();

                if (!sideName || !sidePrice) return;
                const fullDishName = `${mainTitle} (${sideName})`;

                // Check Inventory Status for this option / side
                let itemStatus = getItemAvailability(fullDishName);
                if (itemStatus === 'ready') {
                    itemStatus = getItemAvailability(sideName);
                }

                // If Unavailable: Disappear completely from the customer's view!
                if (itemStatus === 'unavailable') {
                    row.style.display = 'none';
                    return;
                }

                visibleOptionCount++;
                if (!firstAvailableOption && itemStatus !== 'hold') {
                    firstAvailableOption = { name: fullDishName, price: sidePrice, desc: mainTitle, side: sideName };
                }

                row.style.display = 'flex';
                row.style.justifyContent = 'space-between';
                row.style.alignItems = 'center';
                row.style.borderRadius = '0 !important';
                row.style.padding = '8px 10px';
                row.style.margin = '3px 0';
                row.style.transition = 'all 0.2s ease';

                // Find or create inline action pill button inside the row
                let rowPill = row.querySelector('.row-order-pill');
                if (!rowPill) {
                    rowPill = document.createElement('button');
                    rowPill.className = 'row-order-pill';
                    rowPill.style.marginLeft = '12px';
                    rowPill.style.padding = '4px 10px';
                    rowPill.style.borderRadius = '0 !important';
                    rowPill.style.fontSize = '0.75rem';
                    rowPill.style.fontWeight = '700';
                    rowPill.style.border = '1px solid #B8860B';
                    rowPill.style.transition = 'all 0.2s ease';
                    rowPill.style.flexShrink = '0';
                    row.appendChild(rowPill);
                }

                spans[0].style.fontFamily = 'var(--font-serif)';
                spans[0].style.fontSize = '1.05rem';
                spans[0].style.color = '#111114';

                spans[1].style.fontFamily = 'var(--font-serif)';
                spans[1].style.fontSize = '1.25rem';
                spans[1].style.fontWeight = 'bold';
                spans[1].style.color = '#B8860B';

                // If on Hold: Show Hold badge and disable clicking
                if (itemStatus === 'hold') {
                    row.style.opacity = '0.65';
                    row.style.cursor = 'not-allowed';
                    row.style.background = '#FFFBEB';
                    rowPill.innerHTML = 'Hold';
                    rowPill.style.background = '#F59E0B';
                    rowPill.style.color = '#000000';
                    rowPill.style.borderColor = '#D97706';
                    rowPill.style.cursor = 'not-allowed';
                    return;
                }

                // Normal Available / Ready state
                row.style.opacity = '1';
                row.style.cursor = 'pointer';
                rowPill.style.cursor = 'pointer';

                const isSel = isDishSelected(fullDishName);
                if (isSel) {
                    row.style.background = 'rgba(184, 134, 11, 0.12)';
                    rowPill.innerHTML = '✓ Added';
                    rowPill.style.background = '#B8860B';
                    rowPill.style.color = '#FFFFFF';
                } else {
                    row.style.background = 'transparent';
                    rowPill.innerHTML = '+ Add';
                    rowPill.style.background = 'transparent';
                    rowPill.style.color = '#B8860B';
                }

                if (!row.dataset.hasClickListener) {
                    row.dataset.hasClickListener = 'true';
                    row.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (getItemAvailability(fullDishName) === 'hold' || getItemAvailability(sideName) === 'hold') return;
                        const dishObj = {
                            name: fullDishName,
                            price: sidePrice,
                            desc: mainTitle,
                            category: 'main'
                        };
                        toggleSelectItem(JSON.stringify(dishObj));
                        refreshAllDishCardsUI();
                    });
                }
            });

            // Also add full-width action button to the bottom of the card
            let cardBtn = card.querySelector('.card-order-action-btn');
            if (!cardBtn) {
                cardBtn = document.createElement('button');
                cardBtn.className = 'card-order-action-btn';
                cardBtn.style.marginTop = '16px';
                cardBtn.style.width = '100%';
                cardBtn.style.padding = '10px 14px';
                cardBtn.style.borderRadius = '0 !important';
                cardBtn.style.fontSize = '0.82rem';
                cardBtn.style.fontWeight = '700';
                cardBtn.style.border = '1px solid #B8860B';
                cardBtn.style.transition = 'all 0.2s ease';
                card.appendChild(cardBtn);
            }

            if (visibleOptionCount === 0) {
                card.style.opacity = '1';
                cardBtn.style.display = 'none';
            } else if (!firstAvailableOption) {
                card.style.opacity = '1';
                cardBtn.style.display = 'block';
                cardBtn.innerHTML = 'On Hold';
                cardBtn.style.background = '#F59E0B';
                cardBtn.style.color = '#000000';
                cardBtn.style.borderColor = '#D97706';
                cardBtn.style.cursor = 'not-allowed';
            } else {
                card.style.opacity = '1';
                cardBtn.style.display = 'block';
                cardBtn.style.cursor = 'pointer';

                // Check if any option of this dish is selected
                const anySelected = optionRows.some(row => {
                    const spans = row.querySelectorAll('span');
                    if (spans.length < 2) return false;
                    const sideName = spans[0].innerText.replace(/\s+/g, ' ').trim();
                    return isDishSelected(`${mainTitle} (${sideName})`);
                });

                if (anySelected) {
                    cardBtn.innerHTML = '✓ Added to Order';
                    cardBtn.style.background = '#B8860B';
                    cardBtn.style.color = '#FFFFFF';
                } else {
                    cardBtn.innerHTML = `+ Add to Order`;
                    cardBtn.style.background = 'transparent';
                    cardBtn.style.color = '#B8860B';
                }

                if (!cardBtn.dataset.hasClickListener) {
                    cardBtn.dataset.hasClickListener = 'true';
                    cardBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (firstAvailableOption) {
                            toggleSelectItem(JSON.stringify({
                                name: firstAvailableOption.name,
                                price: firstAvailableOption.price,
                                desc: firstAvailableOption.desc,
                                category: 'main'
                            }));
                            refreshAllDishCardsUI();
                        }
                    });
                }
            }

        } else {
            // SINGLE DISH CARD (e.g., Pancake Breakfast, Barista Hot & Cold Drinks, Extra Sides, Meat Portions)
            const priceSpan = card.querySelector('span');
            const descP = card.querySelector('p');

            if (!h3Header || !priceSpan) return;

            const dishName = mainTitle;
            const priceText = priceSpan.innerText.replace(/\s+/g, ' ').trim();
            const descText = descP ? descP.innerText.replace(/\s+/g, ' ').trim() : '';

            // Check Inventory Status
            const itemStatus = getItemAvailability(dishName);

            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.justifyContent = 'space-between';
            card.style.alignItems = 'stretch';
            card.style.borderRadius = '0 !important';

            // Remove any status badges if present
            const existingBadge = card.querySelector('.dish-status-pill');
            if (existingBadge) existingBadge.remove();

            let orderBtn = card.querySelector('.card-order-action-btn');
            if (!orderBtn) {
                orderBtn = document.createElement('button');
                orderBtn.className = 'card-order-action-btn';
                orderBtn.style.marginTop = '12px';
                orderBtn.style.width = '100%';
                orderBtn.style.padding = '8px 12px';
                orderBtn.style.borderRadius = '0 !important';
                orderBtn.style.fontSize = '0.8rem';
                orderBtn.style.fontWeight = '700';
                orderBtn.style.border = '1px solid #B8860B';
                orderBtn.style.transition = 'all 0.2s ease';
                card.appendChild(orderBtn);
            }

            // 1. UNAVAILABLE STATE -> Remove add button completely, dish stays normally visible but unclickable
            if (itemStatus === 'unavailable') {
                card.style.opacity = '1';
                card.style.cursor = 'default';
                card.style.border = '1px solid var(--color-border-gold)';
                card.style.background = 'var(--color-card-bg)';
                orderBtn.style.display = 'none';
                return;
            }

            // 2. HOLD STATE -> Shows "On Hold" button, disabled
            if (itemStatus === 'hold') {
                card.style.opacity = '1';
                card.style.cursor = 'not-allowed';
                card.style.border = '1px solid var(--color-border-gold)';
                card.style.background = 'var(--color-card-bg)';
                orderBtn.style.display = 'block';
                orderBtn.innerHTML = 'On Hold';
                orderBtn.style.background = '#F59E0B';
                orderBtn.style.color = '#000000';
                orderBtn.style.borderColor = '#D97706';
                orderBtn.style.cursor = 'not-allowed';
                return;
            }

            // 3. READY STATE -> Normal ordering
            card.style.opacity = '1';
            card.style.cursor = 'pointer';
            card.style.border = '1px solid var(--color-border-gold)';
            card.style.background = 'var(--color-card-bg)';
            orderBtn.style.display = 'block';
            orderBtn.style.cursor = 'pointer';

            const selected = isDishSelected(dishName);
            if (selected) {
                orderBtn.innerHTML = '✓ Added to Order';
                orderBtn.style.background = '#B8860B';
                orderBtn.style.color = '#FFFFFF';
                card.style.borderColor = '#B8860B';
            } else {
                orderBtn.innerHTML = '+ Add to Order';
                orderBtn.style.background = 'transparent';
                orderBtn.style.color = '#B8860B';
                card.style.borderColor = 'var(--color-border-gold)';
            }

            if (!card.dataset.hasClickListener) {
                card.dataset.hasClickListener = 'true';
                card.addEventListener('click', (e) => {
                    if (getItemAvailability(dishName) === 'hold' || getItemAvailability(dishName) === 'unavailable') return;
                    const dishObj = {
                        name: dishName,
                        price: priceText,
                        desc: descText,
                        category: 'main'
                    };
                    toggleSelectItem(JSON.stringify(dishObj));
                    refreshAllDishCardsUI();
                });
            }
        }
    });
}

// Live Multi-Window & Multi-Tab Synchronization Listener
window.addEventListener('storage', (e) => {
    if (e.key === 'ribhouse_dish_inventory' || e.key === 'ribhouse_selected_cart') {
        refreshAllDishCardsUI();
        if (typeof renderSelectedOrderPage === 'function') {
            renderSelectedOrderPage();
        }
    }
});

function refreshAllDishCardsUI() {
    initClickableMenuDishes();
    updateSelectionBarUI();
}

function initMenuAIAssistant() {
    const triggerBtn = document.getElementById('ai-flaming-trigger');
    const drawer = document.getElementById('ai-chat-drawer');
    const overlay = document.getElementById('ai-drawer-overlay');
    const closeBtn = document.getElementById('ai-close-btn');
    const form = document.getElementById('ai-input-form');
    const input = document.getElementById('ai-input-field');
    const messagesFeed = document.getElementById('ai-messages-feed');
    const chips = document.querySelectorAll('.ai-chip');
    const teaser = document.getElementById('ai-speech-teaser');
    const teaserText = document.getElementById('teaser-text');
    const teaserClose = document.getElementById('teaser-close');

    updateSelectionBarUI();

    if (!triggerBtn || !drawer) return;

    // --- LIVE NAIROBI WEATHER & TIME-OF-DAY ENGINE ---
    let currentNairobiWeather = { temp: 19, condition: "Partly Cloudy", isCold: true, isRainy: false };

    async function fetchNairobiWeather() {
        try {
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-1.286389&longitude=36.817223&current_weather=true');
            if (res.ok) {
                const data = await res.json();
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);
                const isCold = temp < 21;
                
                let conditionStr = isRainy ? 'Rainy' : (temp >= 24 ? 'Sunny' : 'Partly Cloudy');

                currentNairobiWeather = { temp, condition: conditionStr, isCold, isRainy };

                const badge = document.getElementById('nairobi-weather-badge');
                if (badge) {
                    badge.innerHTML = `Nairobi ${temp}°C (${conditionStr})`;
                }
            }
        } catch (e) {
            console.log('Using default Nairobi weather fallback');
        }
    }

    fetchNairobiWeather();

    // --- A. ROTATING SPEECH TEASER BUBBLE ---
    const teaserPrompts = [
        'Ask me: "Dishes under 400/="',
        'Ask me: "What comes in Pancake Breakfast?"',
        'Ask me: "Best platter for 4 people?"',
        'Ask me: "Show spicy & grilled meat"',
        'Ask me: "M-Pesa Till Number"'
    ];
    let teaserIndex = 0;
    let teaserInterval = setInterval(() => {
        if (teaser && !teaser.classList.contains('hidden')) {
            teaserIndex = (teaserIndex + 1) % teaserPrompts.length;
            teaserText.classList.add('text-transitioning');
            setTimeout(() => {
                teaserText.textContent = teaserPrompts[teaserIndex];
                teaserText.classList.remove('text-transitioning');
            }, 450);
        }
    }, 4500);

    if (teaserClose) {
        teaserClose.addEventListener('click', (e) => {
            e.stopPropagation();
            teaser.classList.add('hidden');
            clearInterval(teaserInterval);
        });
    }

    // --- B. TOGGLE DRAWER OPEN / CLOSE ---
    function openDrawer() {
        drawer.classList.add('active');
        overlay.classList.add('active');
        if (teaser) teaser.classList.add('hidden');
        input.focus();
        updateSelectionBarUI();
    }

    function closeDrawer() {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }

    triggerBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // --- C. QUICK CHIPS HANDLER ---
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            if (query) {
                processUserQuery(query);
            }
        });
    });

    // --- D. FORM SUBMIT HANDLER ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = input.value.trim();
        if (!userText) return;
        input.value = '';
        processUserQuery(userText);
    });

    const typingCaptions = [
        "Thinking...",
        "Searching Rib House menu...",
        "Checking prices & specials...",
        "Consulting chef recommendations...",
        "Calculating dish combinations..."
    ];

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-msg ai-msg-bot ai-msg-typing';
        
        const randomCaption = typingCaptions[Math.floor(Math.random() * typingCaptions.length)];
        
        typingDiv.innerHTML = `
            <div class="ai-msg-bubble">
                <div class="ai-typing-container">
                    <div class="ai-typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span class="ai-typing-caption">${randomCaption}</span>
                </div>
            </div>
        `;
        messagesFeed.appendChild(typingDiv);
        messagesFeed.scrollTop = messagesFeed.scrollHeight;
        return typingDiv;
    }

    function processUserQuery(userText) {
        appendUserMessage(userText);

        const typingIndicator = showTypingIndicator();
        const prepDelay = Math.floor(Math.random() * 250) + 450;

        setTimeout(() => {
            if (typingIndicator) typingIndicator.remove();
            const replyData = generateAIReply(userText);
            streamBotMessage(replyData.text, replyData.cards);
        }, prepDelay);
    }

    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'ai-msg ai-msg-user';
        msgDiv.innerHTML = `<div class="ai-msg-bubble">${escapeHTML(text)}</div>`;
        messagesFeed.appendChild(msgDiv);
        messagesFeed.scrollTop = messagesFeed.scrollHeight;
    }

    function streamBotMessage(text, cards = []) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'ai-msg ai-msg-bot';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'ai-msg-bubble';

        const textSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'ai-streaming-cursor';

        bubbleDiv.appendChild(textSpan);
        bubbleDiv.appendChild(cursorSpan);
        msgDiv.appendChild(bubbleDiv);

        messagesFeed.appendChild(msgDiv);
        messagesFeed.scrollTop = messagesFeed.scrollHeight;

        const formattedHtml = formatMarkdownText(text);
        const tokens = tokenizeHTML(formattedHtml);

        let tokenIndex = 0;
        const typingSpeed = 22; // Natural, rapid streaming speed

        const streamInterval = setInterval(() => {
            if (tokenIndex < tokens.length) {
                textSpan.innerHTML += tokens[tokenIndex];
                tokenIndex++;
                messagesFeed.scrollTop = messagesFeed.scrollHeight;
            } else {
                clearInterval(streamInterval);
                cursorSpan.remove();

                if (cards && cards.length > 0) {
                    cards.forEach((card, idx) => {
                        setTimeout(() => {
                            const cardDiv = document.createElement('div');
                            cardDiv.className = 'ai-dish-card ai-dish-card-animated';
                            const isSel = isDishSelected(card.name);
                            const encodedData = encodeURIComponent(JSON.stringify(card));
                            const encodedName = encodeURIComponent(card.name);

                            cardDiv.innerHTML = `
                                <div class="ai-dish-header">
                                    <span class="ai-dish-name">${card.name}</span>
                                    <span class="ai-dish-price">${card.price}</span>
                                </div>
                                ${card.desc ? `<p class="ai-dish-desc">${card.desc}</p>` : ''}
                                <div class="ai-card-actions">
                                    <button class="btn-select-dish ${isSel ? 'active' : ''}" data-dish-name="${encodedName}" onclick="toggleSelectItem('${encodedData}')">
                                        ${isSel ? '✓ Added to Order' : '+ Add to Order'}
                                    </button>
                                    ${card.targetId ? `<button class="ai-dish-link-btn" onclick="scrollToDishSection('${card.targetId}')">View in Menu &darr;</button>` : ''}
                                </div>
                            `;
                            msgDiv.appendChild(cardDiv);
                            messagesFeed.scrollTop = messagesFeed.scrollHeight;
                        }, (idx + 1) * 140);
                    });
                }
            }
        }, typingSpeed);
    }

    function escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }

    function tokenizeHTML(html) {
        const tokens = [];
        const tagRegex = /(<[^>]+>)/g;
        const parts = html.split(tagRegex);

        parts.forEach(part => {
            if (!part) return;
            if (part.startsWith('<') && part.endsWith('>')) {
                tokens.push(part);
            } else {
                const words = part.split(/(\s+)/);
                words.forEach(w => {
                    if (w) tokens.push(w);
                });
            }
        });
        return tokens;
    }

    function formatMarkdownText(str) {
        return str
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    // --- E. KNOWLEDGE BASE & AI MATCHING LOGIC ---
    const KNOWLEDGE = [
        { name: "PANCAKE BREAKFAST", price: "400/=", category: "breakfast", tags: ["pancake", "sweet", "breakfast"], desc: "Tea, 2 pancakes and pan Fried Bacon", targetId: "bk-combos" },
        { name: "MINI BREAKFAST", price: "310/=", category: "breakfast", tags: ["egg", "breakfast", "combo"], desc: "Tea, 2 fried egg, Toast, sausage, Small Glass Of Juice", targetId: "bk-combos" },
        { name: "RIB HOUSE BREAKFAST", price: "300/=", category: "breakfast", tags: ["liver", "chapati", "breakfast"], desc: "Tea, Liver and Chapati", targetId: "bk-combos" },
        { name: "MAIN BREAKFAST", price: "400/=", category: "breakfast", tags: ["egg", "bacon", "sausage", "juice"], desc: "Tea, 2 Eggs, Beef Bacon/Sausages, Toast and glass of juice", targetId: "bk-combos" },
        { name: "GOAT SOUP BREAKFAST", price: "300/=", category: "breakfast", tags: ["goat", "soup", "hot", "breakfast"], desc: "Piece of goat meat, goat soup, chapati and veges", targetId: "bk-combos" },
        { name: "CHICKEN SOUP BREAKFAST", price: "300/=", category: "breakfast", tags: ["chicken", "soup", "kienyeji", "breakfast"], desc: "Piece of Chicken Kienyeji, chicken soup, chapati and veges", targetId: "bk-combos" },
        { name: "CHIPS COMBO", price: "300/=", category: "breakfast", tags: ["chips", "fries", "breakfast"], desc: "Chips served with Tea / Egg / Andazi / Kachumbari", targetId: "bk-combos" },
        { name: "SAMOSA COMBO", price: "280/=", category: "breakfast", tags: ["samosa", "snack", "breakfast"], desc: "1 Egg / Samosa / Andazi / Tea", targetId: "bk-combos" },
        { name: "TRADITIONAL BREAKFAST", price: "300/=", category: "breakfast", tags: ["traditional", "nduma", "ngwaci", "kienyeji", "vegetarian"], desc: "Tea, Nduma / Ngwaci, Egg Kienyeji, veges", targetId: "bk-combos" },
        { name: "FARMERS CHOICE", price: "380/=", category: "breakfast", tags: ["bacon", "sausage", "toast"], desc: "Tea, Beef bacon/Sausage and Toast", targetId: "bk-combos" },
        { name: "RIB HOUSE BITE", price: "200/=", category: "breakfast", tags: ["bite", "snack", "andazi"], desc: "Tea, Andazi and a Sausage", targetId: "bk-combos" },
        { name: "SPECIAL BREAKFAST", price: "220/=", category: "breakfast", tags: ["egg", "toast", "sausage"], desc: "Tea, 1 fried egg, toast and a sausage", targetId: "bk-combos" },
        { name: "RIB HOUSE SPECIAL", price: "310/=", category: "breakfast", tags: ["bacon", "chapati"], desc: "Tea, Bacon/ 2 Sausages and Chapati", targetId: "bk-combos" },
        { name: "BRITISH BREAKFAST", price: "320/=", category: "breakfast", tags: ["liver", "toast"], desc: "Tea, Liver and Toast", targetId: "bk-combos" },
        { name: "House Coffee White", price: "150/=", category: "hot-drinks", tags: ["coffee", "drink", "hot"], desc: "Rich brewed hot white coffee", targetId: "bk-hot" },
        { name: "House Coffee Black", price: "100/=", category: "hot-drinks", tags: ["coffee", "drink", "hot"], desc: "Pure black coffee brew", targetId: "bk-hot" },
        { name: "Black Coffee w Lemon", price: "110/=", category: "hot-drinks", tags: ["coffee", "lemon", "hot"], desc: "Black coffee with fresh lemon slice", targetId: "bk-hot" },
        { name: "Americano", price: "150/=", category: "hot-drinks", tags: ["coffee", "espresso"], desc: "Classic rich espresso diluting with hot water", targetId: "bk-hot" },
        { name: "Coffee Latte", price: "150/=", category: "hot-drinks", tags: ["coffee", "latte", "milk"], desc: "Espresso with steamed milk", targetId: "bk-hot" },
        { name: "Latte Machiatto", price: "180/=", category: "hot-drinks", tags: ["coffee", "latte", "foam"], desc: "Espresso with velvety steamed milk foam", targetId: "bk-hot" },
        { name: "Lemon Tea", price: "100/=", category: "hot-drinks", tags: ["tea", "lemon", "hot"], desc: "Fresh hot lemon infusion tea", targetId: "bk-hot" },
        { name: "Lemon Tea w Honey", price: "150/=", category: "hot-drinks", tags: ["tea", "lemon", "honey"], desc: "Hot lemon tea sweetened with natural honey", targetId: "bk-hot" },
        { name: "Lemon Water", price: "70/=", category: "hot-drinks", tags: ["water", "lemon", "healthy"], desc: "Refreshing warm lemon water", targetId: "bk-hot" },
        { name: "Tea Special", price: "100/=", category: "hot-drinks", tags: ["tea", "special"], desc: "Signature spiced house tea", targetId: "bk-hot" },
        { name: "Tea Masala White", price: "130/=", category: "hot-drinks", tags: ["tea", "masala", "spiced"], desc: "Spiced Kenya milk tea", targetId: "bk-hot" },
        { name: "Tea Masala Black", price: "100/=", category: "hot-drinks", tags: ["tea", "masala", "spiced"], desc: "Black tea spiced with masala", targetId: "bk-hot" },
        { name: "Ginger Tea", price: "130/=", category: "hot-drinks", tags: ["tea", "ginger", "spicy"], desc: "Warm infused ginger brew", targetId: "bk-hot" },
        { name: "Dawa", price: "200/=", category: "hot-drinks", tags: ["dawa", "immunity", "honey", "ginger", "lemon"], desc: "Traditional immunity remedy brew (Lemon, Ginger & Honey)", targetId: "bk-hot" },
        { name: "Honey Espresso", price: "110/=", category: "hot-drinks", tags: ["coffee", "espresso", "honey"], desc: "Rich espresso shot with natural honey", targetId: "bk-hot" },
        { name: "Hot Milk", price: "100/=", category: "hot-drinks", tags: ["milk", "hot"], desc: "Steamed fresh hot milk", targetId: "bk-hot" },
        { name: "Honey Cone", price: "50/=", category: "hot-drinks", tags: ["sweet", "snack", "dessert"], desc: "Sweet honey waffle cone treat", targetId: "bk-hot" },
        { name: "Cappuccino (Single)", price: "150/=", category: "hot-drinks", tags: ["coffee", "cappuccino"], desc: "Single shot cappuccino with foam", targetId: "bk-hot" },
        { name: "Espresso (Single)", price: "120/=", category: "hot-drinks", tags: ["coffee", "espresso"], desc: "Single shot concentrated coffee espresso", targetId: "bk-hot" },
        { name: "Milkshake (Flavored)", price: "250/=", category: "cold-drinks", tags: ["shake", "milkshake", "dessert", "sweet", "cold"], desc: "Creamy thick milkshake", targetId: "bk-cold" },
        { name: "Lemonade (Flavor)", price: "100/=", category: "cold-drinks", tags: ["lemonade", "cold", "drink"], desc: "Chilled flavored lemonade", targetId: "bk-cold" },
        { name: "Oreo Shake", price: "300/=", category: "cold-drinks", tags: ["oreo", "shake", "dessert", "chocolate", "sweet"], desc: "Rich crushed Oreo chocolate shake", targetId: "bk-cold" },
        { name: "Smoothies (Tropical)", price: "200/=", category: "cold-drinks", tags: ["smoothie", "fruit", "cold"], desc: "Fresh blended tropical fruits", targetId: "bk-cold" },
        { name: "Ice Cream Scoops", price: "150/=", category: "cold-drinks", tags: ["ice cream", "dessert", "cold", "sweet"], desc: "Chilled gourmet ice cream", targetId: "bk-cold" },
        { name: "Iced Coffee", price: "180/=", category: "cold-drinks", tags: ["coffee", "cold", "iced"], desc: "Cold brewed espresso over ice", targetId: "bk-cold" },
        { name: "MATUMBO FRY", price: "From 400/=", category: "main", tags: ["matumbo", "spicy", "fry"], desc: "Ugali/Chapati (400/=), Rice/Mukimo (410/=), Pilau (500/=), Chips (540/=)", targetId: "main-dishes-grid" },
        { name: "BEEF STEW / FRY", price: "From 440/=", category: "main", tags: ["beef", "stew", "fry"], desc: "Ugali/Chapati (440/=), Rice/Mukimo (450/=), Pilau (550/=), Chips (580/=)", targetId: "main-dishes-grid" },
        { name: "GOAT STEW / FRY", price: "From 490/=", category: "main", tags: ["goat", "stew", "fry", "spicy"], desc: "Ugali/Chapati (490/=), Rice/Mukimo (500/=), Pilau (600/=), Chips (630/=)", targetId: "main-dishes-grid" },
        { name: "BEEF STEAK GRILLED", price: "From 580/=", category: "main", tags: ["beef", "steak", "grilled", "spicy"], desc: "Tender wood-fired beef steak served with side of choice", targetId: "main-dishes-grid" },
        { name: "CHICKEN WET / DRY FRY", price: "From 500/=", category: "main", tags: ["chicken", "fry", "spicy"], desc: "Pan fried chicken with your choice of side dish", targetId: "main-dishes-grid" },
        { name: "TILAPIA FRY WHOLE", price: "From 570/=", category: "main", tags: ["fish", "tilapia", "fry"], desc: "Crispy whole fried tilapia with side", targetId: "main-dishes-grid" },
        { name: "UGALI WITH SUKUMA / CABBAGE", price: "170/=", category: "main", tags: ["ugali", "sukuma", "cabbage", "veges", "vegetarian", "cheap", "budget"], desc: "Fresh white ugali served with Sukuma Wiki or Cabbage", targetId: "main-dishes-grid" },
        { name: "UGALI WITH MANAGU", price: "220/=", category: "main", tags: ["ugali", "managu", "veges", "traditional", "vegetarian", "budget"], desc: "Traditional white ugali served with fresh Managu greens", targetId: "main-dishes-grid" },
        { name: "CHOMA BEEF (1 KG)", price: "1100/=", category: "choma", tags: ["beef", "choma", "grilled", "popular"], desc: "Slow roasted tender beef choma per KG", targetId: "meat-portions-grid" },
        { name: "CHOMA GOAT (1 KG)", price: "1200/=", category: "choma", tags: ["goat", "choma", "grilled", "popular", "spicy"], desc: "Juicy grilled goat choma per KG", targetId: "meat-portions-grid" },
        { name: "CHEMSHA GOAT (1 KG)", price: "1300/=", category: "choma", tags: ["goat", "chemsha", "soup"], desc: "Boiled flavorful goat stew/soup per KG", targetId: "meat-portions-grid" },
        { name: "BEEF / GOAT TUMBUKIZA (1 KG)", price: "1300/= / 1400/=", category: "choma", tags: ["tumbukiza", "goat", "beef", "spicy"], desc: "Rich wood-fired meat tumbukiza on order", targetId: "meat-portions-grid" },
        { name: "CHICKEN PLATTER FOR 4", price: "1900/=", category: "choma", tags: ["chicken", "platter", "group", "popular"], desc: "Includes 2 Chicken Wet Fry, 2 Beef Fry, 1 Chips, 2 Ugali/Chapati, 2 Veggies & 4 Juices", targetId: "meat-portions-grid" },
        { name: "TEST DISH", price: "1/=", category: "main", tags: ["test", "dish", "cheap", "1", "testing"], desc: "Developer testing dish for 1 Shilling M-Pesa testing", targetId: "bk-combos" }
    ];

    function generateAIReply(rawQuery) {
        const q = rawQuery.toLowerCase().trim();

        // --- 1. RICHI MULTI-ITEM CALCULATION ENGINE (Multiplication & Addition) ---
        const isCalculationQuery = q.includes("richi") || q.includes("richie") || q.includes("how much") || q.includes("cost") || q.includes("total") || q.includes("price") || q.includes("and") || q.includes("+") || q.includes("plus");

        if (isCalculationQuery) {
            const itemCalculations = [];

            KNOWLEDGE.forEach(item => {
                const itemNameLower = item.name.toLowerCase();
                const terms = itemNameLower.split(/\s+/).filter(w => w.length >= 3 && !['with', 'from', 'whole', 'spicy', 'dry', 'wet'].includes(w));
                
                const matchesItem = terms.length > 0 && terms.some(term => q.includes(term));

                if (matchesItem) {
                    let qty = 1;
                    const primaryTerm = terms[0];
                    
                    const regexBefore = new RegExp(`(\\d+)\\s*(?:x|of|order|portion|kg|pieces?)?\\s*(?:[a-z\\s]*)\\b${primaryTerm}\\b`, 'i');
                    const regexAfter = new RegExp(`\\b${primaryTerm}\\b\\s*(?:x|of|order|portion|kg|pieces?)?\\s*(\\d+)`, 'i');
                    
                    const matchBefore = q.match(regexBefore);
                    const matchAfter = q.match(regexAfter);
                    
                    if (matchBefore && matchBefore[1]) {
                        qty = parseInt(matchBefore[1], 10);
                    } else if (matchAfter && matchAfter[1]) {
                        qty = parseInt(matchAfter[1], 10);
                    }

                    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
                    if (numericPrice > 0) {
                        if (!itemCalculations.some(c => c.item.name === item.name)) {
                            const subtotal = numericPrice * qty;
                            itemCalculations.push({
                                item: item,
                                qty: qty,
                                unitPrice: numericPrice,
                                subtotal: subtotal
                            });
                        }
                    }
                }
            });

            if (itemCalculations.length >= 2) {
                let grandTotal = 0;
                const namesArr = [];
                const subtotalArr = [];

                itemCalculations.forEach(calc => {
                    grandTotal += calc.subtotal;
                    const label = calc.qty > 1 ? `${calc.qty}x ${calc.item.name}` : calc.item.name;
                    namesArr.push(label);
                    subtotalArr.push(`KSh ${calc.subtotal.toLocaleString()}`);
                });

                const mealsSentence = namesArr.slice(0, -1).join(', ') + ' and ' + namesArr[namesArr.length - 1];
                const pricesFormula = subtotalArr.join(' + ');

                let textBreakdown = `**${mealsSentence} will cost you ${pricesFormula} = KSh ${grandTotal.toLocaleString()}/=!**\n\n`;
                textBreakdown += "**Calculation Breakdown:**\n";
                itemCalculations.forEach(calc => {
                    textBreakdown += `• **${calc.qty}x** ${calc.item.name} @ KSh ${calc.unitPrice.toLocaleString()} = **KSh ${calc.subtotal.toLocaleString()}/=**\n`;
                });
                textBreakdown += `\n**Grand Total Cost:** **KSh ${grandTotal.toLocaleString()}/=**`;

                return {
                    text: textBreakdown,
                    cards: itemCalculations.map(c => c.item)
                };
            }
        }

        if (q.match(/^(hi|hello|hey|habari|mambo|sasa|good morning|good afternoon|good evening|weather|recommend|suggest|richi|richie)/)) {
            const hour = new Date().getHours();
            const isMorning = hour >= 0 && hour < 12;
            const timeGreeting = isMorning ? "Good Morning" : (hour < 17 ? "Good Afternoon" : "Good Evening");

            let weatherRec = "";
            let recommendedCards = [];

            if (isMorning) {
                weatherRec = `\n\n**Morning Recommendation:** Try our hot **PANCAKE BREAKFAST (400/=)**, **GOAT SOUP BREAKFAST (300/=)**, or **HOT LEMON DAWA TEA (1200/=)** to start your day!`;
                recommendedCards = KNOWLEDGE.filter(k => k.category === 'breakfast' || k.name.includes('SOUP'));
            } else if (currentNairobiWeather.isRainy || currentNairobiWeather.isCold) {
                weatherRec = `\n\n**Nairobi Weather Alert (${currentNairobiWeather.temp}°C Chilly):** I highly recommend our steaming **GOAT TUMBUKIZA (1400/=)**, **MATUMBO FRY (400/=)**, or **BEEF STEAK GRILLED (580/=)** to keep you warm!`;
                recommendedCards = KNOWLEDGE.filter(k => k.tags.includes('tumbukiza') || k.tags.includes('spicy') || k.name.includes('MATUMBO'));
            } else {
                weatherRec = `\n\n**Nairobi Weather Alert (${currentNairobiWeather.temp}°C Sunny/Warm):** Cool down with our chilled **OREO MILKSHAKE (300/=)**, **TROPICAL SMOOTHIES (200/=)**, or juicy **CHOMA GOAT (1 KG)**!`;
                recommendedCards = KNOWLEDGE.filter(k => k.category === 'cold-drinks' || k.category === 'choma');
            }

            return {
                text: `${timeGreeting}! Welcome to **Rib House**. The weather today is **${currentNairobiWeather.temp}°C (${currentNairobiWeather.condition})**.${weatherRec}`,
                cards: recommendedCards.slice(0, 3)
            };
        }

        if (q.includes("till") || q.includes("mpesa") || q.includes("pay") || q.includes("phone") || q.includes("hotline") || q.includes("order") || q.includes("contact")) {
            return {
                text: "**Payment & Order Hotline Information**:\n\n• **M-Pesa Till Number:** 4977556\n• **Direct Order Hotline:** 0724 594 204\n• **Email:** ribhouseke@gmail.com\n\nAll meals are cooked fresh daily!",
                cards: []
            };
        }

        // --- DYNAMIC AI LEARNING FROM CUSTOMER REVIEWS ---
        if (q.includes("popular") || q.includes("recommended") || q.includes("review") || q.includes("feedback") || q.includes("top dish") || q.includes("what do people love")) {
            const feedbacks = JSON.parse(localStorage.getItem('ribhouse_customer_feedback') || '[]');
            if (feedbacks.length > 0) {
                const dishCounts = {};
                feedbacks.forEach(f => {
                    if (f.dish && f.dish !== 'General Experience') {
                        dishCounts[f.dish] = (dishCounts[f.dish] || 0) + 1;
                    }
                });
                const topDishes = Object.keys(dishCounts).sort((a, b) => dishCounts[b] - dishCounts[a]);
                if (topDishes.length > 0) {
                    const topName = topDishes[0];
                    const count = dishCounts[topName];
                    const matchedItem = KNOWLEDGE.find(k => k.name.toLowerCase().includes(topName.toLowerCase()));
                    
                    return {
                        text: `**Top Customer Recommendation!**\n\nBased on **${feedbacks.length}** recent guest reviews, our #1 most loved dish is **${topName}** (chosen by ${count} guests)!\n\nEvery meal is prepared fresh to order at Rib House.`,
                        cards: matchedItem ? [matchedItem] : []
                    };
                }
            }
        }

        const numberMatches = q.match(/\d+/g);
        const isBudgetQuery = q.includes("budget") || q.includes("under") || q.includes("below") || q.includes("cheap") || q.includes("less than") || q.includes("between") || q.includes("buy with") || q.includes("shilling") || q.includes("ksh") || q.includes("kes") || q.includes("price") || numberMatches;

        // Intent Category Scoping (Meal/Dish vs Drinks vs Breakfast)
        const isMealQuery = q.includes("meal") || q.includes("dish") || q.includes("food") || q.includes("eat") || q.includes("lunch") || q.includes("dinner") || q.includes("choma") || q.includes("chemsha") || q.includes("main");
        const isDrinkQuery = q.includes("drink") || q.includes("coffee") || q.includes("tea") || q.includes("dawa") || q.includes("juice") || q.includes("shake") || q.includes("beverage") || q.includes("soda");
        const isBreakfastQuery = q.includes("breakfast") || q.includes("morning") || q.includes("pancake");

        if (isBudgetQuery && numberMatches && numberMatches.length > 0) {
            const numbers = numberMatches.map(n => parseInt(n, 10)).filter(n => n >= 30 && n <= 10000);
            
            if (numbers.length > 0) {
                let matches = [];
                let headerText = '';

                let pool = KNOWLEDGE;
                if (isMealQuery) {
                    pool = KNOWLEDGE.filter(item => item.category === "main" || item.category === "choma");
                } else if (isDrinkQuery) {
                    pool = KNOWLEDGE.filter(item => item.category === "hot-drinks" || item.category === "cold-drinks");
                } else if (isBreakfastQuery) {
                    pool = KNOWLEDGE.filter(item => item.category === "breakfast");
                }

                if (q.includes("between") && numbers.length >= 2) {
                    const minP = Math.min(numbers[0], numbers[1]);
                    const maxP = Math.max(numbers[0], numbers[1]);
                    
                    matches = pool.filter(item => {
                        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
                        return priceNum && priceNum >= minP && priceNum <= maxP;
                    });
                    
                    const scopeLabel = isMealQuery ? "Main Dishes & Choma meals" : isDrinkQuery ? "Barista Drinks" : "items";
                    headerText = `Found **${matches.length}** ${scopeLabel} between **KSh ${minP}** and **KSh ${maxP}**:`;
                } else {
                    const maxBudget = numbers[0];
                    matches = pool.filter(item => {
                        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
                        return priceNum && priceNum <= maxBudget;
                    });

                    const scopeLabel = isMealQuery ? "Main Dishes & Wood-Fired Choma meals" : isDrinkQuery ? "Barista Drinks" : "items";
                    headerText = `Found **${matches.length}** ${scopeLabel} under **KSh ${maxBudget}**:`;
                }

                matches.sort((a, b) => {
                    const numA = parseInt(a.price.replace(/[^0-9]/g, ''), 10) || 0;
                    const numB = parseInt(b.price.replace(/[^0-9]/g, ''), 10) || 0;
                    return numA - numB;
                });

                if (matches.length > 0) {
                    return {
                        text: headerText,
                        cards: matches
                    };
                } else {
                    const higherMatches = pool.map(item => ({
                        item,
                        num: parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0
                    }))
                    .filter(x => x.num > numbers[0])
                    .sort((a, b) => a.num - b.num)
                    .slice(0, 5)
                    .map(x => x.item);

                    return {
                        text: `No matching options were found within KSh ${numbers[0]}. Here are the closest options:`,
                        cards: higherMatches
                    };
                }
            }
        }

        if (q.includes("spicy") || q.includes("chili") || q.includes("pepper") || q.includes("hot food")) {
            const spicyMatches = KNOWLEDGE.filter(item => item.tags && item.tags.includes("spicy"));
            return {
                text: `Found **${spicyMatches.length}** Spicy & Wood-Fired Specialties:`,
                cards: spicyMatches
            };
        }

        if (q.includes("veg") || q.includes("vegetarian") || q.includes("greens") || q.includes("spinach")) {
            const vegMatches = KNOWLEDGE.filter(item => 
                (item.tags && item.tags.includes("vegetarian")) || 
                item.name.includes("TRADITIONAL") || 
                item.desc.toLowerCase().includes("veges")
            );
            return {
                text: `Found **${vegMatches.length}** Vegetarian & Healthy Options:`,
                cards: vegMatches
            };
        }

        if (q.includes("dessert") || q.includes("sweet") || q.includes("ice cream") || q.includes("oreo") || q.includes("shake")) {
            const dessertMatches = KNOWLEDGE.filter(item => item.tags && item.tags.includes("dessert"));
            return {
                text: `Found **${dessertMatches.length}** Desserts & Chilled Shakes:`,
                cards: dessertMatches
            };
        }

        if (q.includes("4 people") || q.includes("group") || q.includes("family") || q.includes("platter") || q.includes("many people")) {
            const platter = KNOWLEDGE.find(item => item.name.includes("PLATTER FOR 4"));
            return {
                text: "🍗 **Best Option for Groups & Families:**\n\nOur **CHICKEN PLATTER FOR 4 (1900/=)** is designed for sharing! It comes fully loaded with chicken fry, beef fry, chips, ugali/chapati, veggies, and 4 juices.",
                cards: platter ? [platter] : []
            };
        }

        if (q.includes("chicken") || q.includes("kienyeji") || q.includes("poultry")) {
            const chickenMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("chicken"));
            return {
                text: `Found **${chickenMatches.length}** Signature Chicken Meals:`,
                cards: chickenMatches
            };
        }

        if (q.includes("beef") || q.includes("steak") || q.includes("burger")) {
            const beefMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("beef"));
            return {
                text: `Found **${beefMatches.length}** Grilled Beef & Steak Options:`,
                cards: beefMatches
            };
        }

        if (q.includes("goat") || q.includes("mbuzi")) {
            const goatMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("goat"));
            return {
                text: `Found **${goatMatches.length}** Signature Goat Meat Dishes:`,
                cards: goatMatches
            };
        }

        if (q.includes("fish") || q.includes("tilapia") || q.includes("seafood")) {
            const fishMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("tilapia") || (item.tags && item.tags.includes("fish")));
            return {
                text: `Found **${fishMatches.length}** Fresh Whole Tilapia Dish:`,
                cards: fishMatches
            };
        }

        if (q.includes("drink") || q.includes("coffee") || q.includes("tea") || q.includes("dawa") || q.includes("beverage")) {
            const drinkMatches = KNOWLEDGE.filter(item => item.category === "hot-drinks" || item.category === "cold-drinks");
            return {
                text: `Found **${drinkMatches.length}** Barista Coffee, Teas & Shakes:`,
                cards: drinkMatches
            };
        }

        if (q.includes("breakfast") || q.includes("morning") || q.includes("pancake") || q.includes("combo")) {
            const bMatches = KNOWLEDGE.filter(item => item.category === "breakfast");
            return {
                text: `Found **${bMatches.length}** Breakfast Combos & Specials:`,
                cards: bMatches
            };
        }

        const generalMatches = KNOWLEDGE.filter(item => 
            item.name.toLowerCase().includes(q) || 
            item.desc.toLowerCase().includes(q) ||
            (item.tags && item.tags.some(t => q.includes(t)))
        );

        if (generalMatches.length > 0) {
            return {
                text: `Found **${generalMatches.length}** recommendations matching "**${rawQuery}**":`,
                cards: generalMatches
            };
        }

        return {
            text: `I couldn't find an exact match for "${rawQuery}", but here are popular recommendations:`,
            cards: [
                KNOWLEDGE[0],
                KNOWLEDGE[KNOWLEDGE.length - 1],
                KNOWLEDGE.find(i => i.name.includes("BEEF STEAK"))
            ].filter(Boolean)
        };
    }
}

window.scrollToDishSection = function(sectionId) {
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
        const drawer = document.getElementById('ai-chat-drawer');
        const overlay = document.getElementById('ai-drawer-overlay');
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');

        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Per-Portion Customization Setters
window.setPortionSideOption = function(id, portionIndex, side) {
    let cart = getSelectedCart();
    const item = cart.find(i => i.id === id);
    if (item && item.portions && item.portions[portionIndex]) {
        item.portions[portionIndex].side = side;
        saveSelectedCart(cart);
        if (typeof renderSelectedOrderPage === 'function') {
            renderSelectedOrderPage();
        }
    }
};

window.setPortionPrepOption = function(id, portionIndex, prep) {
    let cart = getSelectedCart();
    const item = cart.find(i => i.id === id);
    if (item && item.portions && item.portions[portionIndex]) {
        item.portions[portionIndex].prep = prep;
        saveSelectedCart(cart);
        if (typeof renderSelectedOrderPage === 'function') {
            renderSelectedOrderPage();
        }
    }
};

window.setPortionPairingOption = function(id, portionIndex, pairingKey) {
    let cart = getSelectedCart();
    const item = cart.find(i => i.id === id);
    if (item && item.portions && item.portions[portionIndex]) {
        item.portions[portionIndex].pairing = pairingKey;
        saveSelectedCart(cart);
        if (typeof renderSelectedOrderPage === 'function') {
            renderSelectedOrderPage();
        }
    }
};

// ==========================================================================
// 4. "YOUR SELECTED ORDER" PAGE LOGIC (order.html) - SINGLE VERTICAL COLUMN
// ==========================================================================
function renderSelectedOrderPage() {
    const listContainer = document.getElementById('selected-order-items-list');
    const itemsCountEl = document.getElementById('summary-items-count');
    const totalQtyEl = document.getElementById('summary-total-qty');
    const totalAmountEl = document.getElementById('summary-total-amount');
    const checkoutBtn = document.getElementById('btn-proceed-order-summary') || document.getElementById('btn-proceed-checkout');

    if (!listContainer) return;

    const cart = getSelectedCart();
    const diningType = getDiningType();

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.2rem; color: #0F172A; margin-bottom: 12px; font-weight: 700;">Your order selection is currently empty!</p>
                <p style="font-size: 0.9rem; color: #475569; margin-bottom: 24px;">Browse the menu to add your favorite wood-fired dishes and brews.</p>
                <a href="index.html" class="btn-hero-secondary" style="display: inline-flex; padding: 14px 28px;">&larr; Return to Menu</a>
            </div>
        `;
        if (itemsCountEl) itemsCountEl.textContent = "0 Dishes";
        if (totalQtyEl) totalQtyEl.textContent = "0 Items";
        if (totalAmountEl) totalAmountEl.textContent = "KSh 0/=";
        if (checkoutBtn) {
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
        }
        return;
    }

    if (checkoutBtn) {
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';
    }

    let html = '';
    let totalDishes = cart.length;
    let totalQuantity = 0;
    let totalPrice = 0;
    let packagingTotal = calculateCartPackagingTotal(cart, diningType);

    // Dining Mode Selector Card (Dine-In vs Takeaway)
    html += `
        <div class="dining-mode-container">
            <div class="dining-mode-header">
                <div>
                    <span class="dining-mode-title">Order Dining Mode</span>
                    <div class="dining-mode-subtitle">Choose whether to dine at Rib House or pack your order to go</div>
                </div>
            </div>
            <div class="dining-toggle-pills">
                <button type="button" class="dining-pill ${diningType === 'dine_in' ? 'active' : ''}" onclick="setDiningType('dine_in')">
                    <span class="pill-radio">${diningType === 'dine_in' ? '■' : '□'}</span> Dine In
                </button>
                <button type="button" class="dining-pill ${diningType === 'takeaway' ? 'active' : ''}" onclick="setDiningType('takeaway')">
                    <span class="pill-radio">${diningType === 'takeaway' ? '■' : '□'}</span> Takeaway
                </button>
            </div>
        </div>
    `;

    cart.forEach(item => {
        const itemSubtotal = calculateItemSubtotal(item);
        totalQuantity += item.qty;
        totalPrice += itemSubtotal;

        const pkgDetails = getItemPackagingDetails(item);

        // Resolve side options dynamically for this item
        const sideOptions = (item.sideOptions && item.sideOptions.length > 0) 
            ? item.sideOptions 
            : extractSideOptions(item.name, item.desc);
        const hasSide = sideOptions.length > 1;
        const defaultSide = hasSide ? sideOptions[0] : null;

        // Ensure portions array matches item.qty
        if (!item.portions) item.portions = [];
        while (item.portions.length < item.qty) {
            item.portions.push({
                side: defaultSide,
                prep: item.hasPrep ? 'Wet Fry' : null,
                pairing: item.hasPairing ? 'none' : null
            });
        }
        while (item.portions.length > item.qty) {
            item.portions.pop();
        }

        // Build Custom Option UI for each individual portion (Plate 1, Plate 2, etc.)
        let portionsHtml = '';

        if (hasSide || item.hasPrep || item.hasPairing) {
            portionsHtml += `
                <div class="multi-portion-container">
                    <span class="multi-portion-header">Custom Options for Each Portion (${item.qty} ${item.qty === 1 ? 'Plate' : 'Plates'}):</span>
            `;

            item.portions.forEach((portion, pIdx) => {
                const portionLabel = item.qty > 1 ? `Plate ${pIdx + 1}:` : 'Your Choice:';
                let pControls = '';

                // Dynamic Side Choice (e.g. Ugali vs Chapati, or Rice vs Mukimo)
                if (hasSide && sideOptions.length > 0) {
                    const availableSides = sideOptions.filter(opt => getItemAvailability(opt) !== 'unavailable');
                    const validOptions = availableSides.length > 0 ? availableSides : sideOptions;

                    if (!portion.side || !validOptions.includes(portion.side)) {
                        portion.side = validOptions[0];
                    }
                    const currentSide = portion.side;
                    pControls += `<div class="custom-choice-pills">`;
                    validOptions.forEach(opt => {
                        const isHold = (getItemAvailability(opt) === 'hold');
                        const isActive = (currentSide === opt);
                        const escapedOpt = opt.replace(/'/g, "\\'");
                        pControls += `
                            <button type="button" class="choice-pill ${isActive ? 'active' : ''} ${isHold ? 'disabled-hold' : ''}" ${isHold ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} onclick="setPortionSideOption('${item.id}', ${pIdx}, '${escapedOpt}')">
                                <span class="pill-radio">${isActive ? '■' : '□'}</span> ${opt}${isHold ? ' (Hold)' : ''}
                            </button>
                        `;
                    });
                    pControls += `</div>`;
                }

                // Prep Style (Wet Fry / Dry Fry)
                if (item.hasPrep) {
                    const currentPrep = portion.prep || 'Wet Fry';
                    pControls += `
                        <div class="custom-choice-pills">
                            <button type="button" class="choice-pill ${currentPrep === 'Wet Fry' ? 'active' : ''}" onclick="setPortionPrepOption('${item.id}', ${pIdx}, 'Wet Fry')">
                                <span class="pill-radio">${currentPrep === 'Wet Fry' ? '■' : '□'}</span> Wet Fry
                            </button>
                            <button type="button" class="choice-pill ${currentPrep === 'Dry Fry' ? 'active' : ''}" onclick="setPortionPrepOption('${item.id}', ${pIdx}, 'Dry Fry')">
                                <span class="pill-radio">${currentPrep === 'Dry Fry' ? '■' : '□'}</span> Dry Fry
                            </button>
                        </div>
                    `;
                }

                // Choma & Chemsha Pairing & Greens Selector
                if (item.hasPairing) {
                    const currentPairing = portion.pairing || 'none';
                    pControls += `
                        <div class="custom-choice-pills">
                            <button type="button" class="choice-pill ${currentPairing === 'none' ? 'active' : ''}" onclick="setPortionPairingOption('${item.id}', ${pIdx}, 'none')">
                                <span class="pill-radio">${currentPairing === 'none' ? '■' : '□'}</span> Meat Only
                            </button>
                            <button type="button" class="choice-pill ${currentPairing === 'ugali_managu' ? 'active' : ''}" onclick="setPortionPairingOption('${item.id}', ${pIdx}, 'ugali_managu')">
                                <span class="pill-radio">${currentPairing === 'ugali_managu' ? '■' : '□'}</span> Ugali + Managu (+100/=)
                            </button>
                            <button type="button" class="choice-pill ${currentPairing === 'ugali_sukuma' ? 'active' : ''}" onclick="setPortionPairingOption('${item.id}', ${pIdx}, 'ugali_sukuma')">
                                <span class="pill-radio">${currentPairing === 'ugali_sukuma' ? '■' : '□'}</span> Ugali + Sukuma Wiki (+70/=)
                            </button>
                            <button type="button" class="choice-pill ${currentPairing === 'ugali_cabbage' ? 'active' : ''}" onclick="setPortionPairingOption('${item.id}', ${pIdx}, 'ugali_cabbage')">
                                <span class="pill-radio">${currentPairing === 'ugali_cabbage' ? '■' : '□'}</span> Ugali + Cabbage (+70/=)
                            </button>
                        </div>
                    `;
                }

                portionsHtml += `
                    <div class="portion-selector-card">
                        <span class="portion-badge">${portionLabel}</span>
                        ${pControls}
                    </div>
                `;
            });

            portionsHtml += `</div>`;
        }

        const baseVal = item.basePrice || parseInt((item.price || '0').toString().replace(/[^0-9]/g, ''), 10) || 0;
        const dishImg = getDishImage(item.name, item.desc);
        const imageHtml = dishImg 
            ? `<img src="${dishImg}" alt="${item.name}" class="order-dish-img">`
            : `<div class="dish-placeholder-box"><span class="dish-placeholder-label">PHOTO</span></div>`;

        // Packaging badge if takeaway
        const packagingBadgeHtml = (diningType === 'takeaway') 
            ? `<div class="item-packaging-tag">Takeaway Packaging: ${pkgDetails.label} (+KSh ${pkgDetails.totalFee.toLocaleString()}/=)</div>`
            : '';

        html += `
            <div class="order-item-row-luxury" data-id="${item.id}">
                <div class="order-item-main-info">
                    <div class="order-dish-image-frame">
                        ${imageHtml}
                    </div>
                    <div class="order-dish-text-block">
                        <h3 class="order-dish-title">${item.name}</h3>
                        ${item.desc ? `<p class="order-dish-desc">${item.desc}</p>` : ''}
                        <div class="order-dish-price-tag">Base Price: <strong>KSh ${baseVal.toLocaleString()}/=</strong></div>
                        ${packagingBadgeHtml}
                        ${portionsHtml}
                    </div>
                </div>

                <div class="order-item-actions-block">
                    <div class="quantity-controls-pill">
                        <span class="qty-pill-label">Qty</span>
                        <div class="quantity-controls">
                            <button type="button" class="btn-qty-round" onclick="changeCartItemQty('${item.id}', -1)" aria-label="Decrease quantity">&minus;</button>
                            <span class="qty-number">${item.qty}</span>
                            <button type="button" class="btn-qty-round" onclick="changeCartItemQty('${item.id}', 1)" aria-label="Increase quantity">&plus;</button>
                        </div>
                    </div>

                    <div class="order-subtotal-box">
                        <span class="subtotal-label">Subtotal</span>
                        <span class="order-subtotal-amount">KSh ${itemSubtotal.toLocaleString()}/=</span>
                    </div>

                    <button type="button" class="btn-remove-pill" onclick="removeCartItem('${item.id}')" title="Remove Dish">
                        <span>&times; Remove Item</span>
                    </button>
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;

    const grandTotal = totalPrice + packagingTotal;

    if (itemsCountEl) itemsCountEl.textContent = `${totalDishes} ${totalDishes === 1 ? 'Dish' : 'Dishes'}`;
    if (totalQtyEl) totalQtyEl.textContent = `${totalQuantity} ${totalQuantity === 1 ? 'Item' : 'Items'}`;
    if (totalAmountEl) {
        if (diningType === 'takeaway') {
            totalAmountEl.innerHTML = `KSh ${grandTotal.toLocaleString()}/= <span style="font-size: 0.85rem; font-weight: 500; color: #64748B; display: block; margin-top: 4px;">(Includes KSh ${packagingTotal.toLocaleString()}/= Takeaway Packaging)</span>`;
        } else {
            totalAmountEl.innerHTML = `<span style="color: #EA580C !important; font-weight: 800;">KSh ${grandTotal.toLocaleString()}/=</span>`;
        }
    }
}

// Global Quantity & Remove Handlers for order.html
window.changeCartItemQty = function(id, delta) {
    let cart = getSelectedCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (!item.portions) item.portions = [];
        
        const sideOptions = (item.sideOptions && item.sideOptions.length > 0) ? item.sideOptions : extractSideOptions(item.name, item.desc);
        const hasSide = sideOptions.length > 1;
        const defaultSide = hasSide ? sideOptions[0] : null;

        if (delta > 0) {
            for (let d = 0; d < delta; d++) {
                item.portions.push({
                    side: defaultSide,
                    prep: item.hasPrep ? 'Wet Fry' : null,
                    pairing: item.hasPairing ? 'none' : null
                });
            }
        } else if (delta < 0) {
            for (let d = 0; d < Math.abs(delta); d++) {
                if (item.portions.length > 1) {
                    item.portions.pop();
                }
            }
        }

        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveSelectedCart(cart);
        renderSelectedOrderPage();
    }
};

window.removeCartItem = function(id) {
    let cart = getSelectedCart();
    cart = cart.filter(i => i.id !== id);
    saveSelectedCart(cart);
    renderSelectedOrderPage();
};

// ==========================================================================
// 5. "CHECKOUT PAGE" LOGIC (checkout.html)
// ==========================================================================
function renderCheckoutPage() {
    const summaryItemsEl = document.getElementById('checkout-summary-items');
    const totalAmountEl = document.getElementById('checkout-total-amount');

    if (!summaryItemsEl) return;

    const cart = getSelectedCart();
    const diningType = getDiningType();

    if (cart.length === 0) {
        summaryItemsEl.innerHTML = `<p style="color: #475569;">No items selected. <a href="index.html" class="text-gold">Return to Menu</a></p>`;
        if (totalAmountEl) totalAmountEl.textContent = "KSh 0/=";
        return;
    }

    let html = '';
    let totalPrice = 0;
    let packagingTotal = calculateCartPackagingTotal(cart, diningType);

    cart.forEach(item => {
        const itemSubtotal = calculateItemSubtotal(item);
        totalPrice += itemSubtotal;
        html += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>${item.qty}x ${item.name}</span>
                <strong style="color: #0F172A;">KSh ${itemSubtotal.toLocaleString()}/=</strong>
            </div>
        `;
    });

    if (diningType === 'takeaway' && packagingTotal > 0) {
        html += `
            <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 8px; border-top: 1px dashed #CBD5E1; color: #B8860B; font-weight: 600;">
                <span>Takeaway Packaging Fee</span>
                <span>+KSh ${packagingTotal.toLocaleString()}/=</span>
            </div>
        `;
    }

    summaryItemsEl.innerHTML = html;
    const grandTotal = totalPrice + packagingTotal;
    if (totalAmountEl) totalAmountEl.textContent = `KSh ${grandTotal.toLocaleString()}/=`;
}

// ==========================================================================
// 6. "ORDER SUMMARY" OVERVIEW PAGE LOGIC (order-summary.html)
// ==========================================================================
function renderOrderSummaryPage() {
    const listContainer = document.getElementById('summary-items-overview-list');
    const dishesCountEl = document.getElementById('summary-overview-dishes-count');
    const totalQtyEl = document.getElementById('summary-overview-total-qty');
    const grandTotalEl = document.getElementById('summary-overview-grand-total');

    if (!listContainer) return;

    const cart = getSelectedCart();
    const diningType = getDiningType();

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.25rem; color: #0F172A; margin-bottom: 12px; font-weight: 700;">Your order is currently empty.</p>
                <p style="font-size: 0.9rem; color: #475569; margin-bottom: 24px;">Explore our menu and add your favorite meals to view your order summary.</p>
                <a href="index.html" class="btn-hero-secondary" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px;">
                    <span>Browse Menu</span>
                </a>
            </div>
        `;
        if (dishesCountEl) dishesCountEl.textContent = "0 Dishes";
        if (totalQtyEl) totalQtyEl.textContent = "0 Items";
        if (grandTotalEl) grandTotalEl.textContent = "KSh 0/=";
        return;
    }

    let html = '';
    let totalDishes = cart.length;
    let totalQuantity = 0;
    let totalPrice = 0;
    let packagingTotal = calculateCartPackagingTotal(cart, diningType);

    // Dining Mode Selector Card (Dine-In vs Takeaway)
    html += `
        <div class="dining-mode-container">
            <div class="dining-mode-header">
                <div>
                    <span class="dining-mode-title">Order Dining Mode</span>
                    <div class="dining-mode-subtitle">Choose whether to dine at Rib House or pack your order to go</div>
                </div>
            </div>
            <div class="dining-toggle-pills">
                <button type="button" class="dining-pill ${diningType === 'dine_in' ? 'active' : ''}" onclick="setDiningType('dine_in')">
                    <span class="pill-radio">${diningType === 'dine_in' ? '■' : '□'}</span> Dine In
                </button>
                <button type="button" class="dining-pill ${diningType === 'takeaway' ? 'active' : ''}" onclick="setDiningType('takeaway')">
                    <span class="pill-radio">${diningType === 'takeaway' ? '■' : '□'}</span> Takeaway
                </button>
            </div>
        </div>
    `;

    cart.forEach(item => {
        const itemSubtotal = calculateItemSubtotal(item);
        totalQuantity += item.qty;
        totalPrice += itemSubtotal;

        const pkgDetails = getItemPackagingDetails(item);

        // Render portion breakdowns
        let breakdownHtml = '';
        const sideOptions = (item.sideOptions && item.sideOptions.length > 0) ? item.sideOptions : extractSideOptions(item.name, item.desc);
        const hasSide = sideOptions.length > 1;

        if (item.portions && item.portions.length > 0 && (hasSide || item.hasPrep || item.hasPairing)) {
            breakdownHtml += `<div class="summary-portion-breakdown">`;
            item.portions.forEach((p, idx) => {
                const label = item.qty > 1 ? `Plate ${idx + 1}` : 'Selected Option';
                let details = [];
                if (hasSide && p && p.side) details.push(`Side: ${p.side}`);
                if (item.hasPrep && p && p.prep) details.push(`Style: ${p.prep}`);
                if (item.hasPairing && p && p.pairing && p.pairing !== 'none') {
                    if (p.pairing === 'ugali_managu') details.push(`Pairing: Ugali + Managu (+100/=)`);
                    else if (p.pairing === 'ugali_sukuma') details.push(`Pairing: Ugali + Sukuma Wiki (+70/=)`);
                    else if (p.pairing === 'ugali_cabbage') details.push(`Pairing: Ugali + Cabbage (+70/=)`);
                } else if (item.hasPairing && p && p.pairing === 'none') {
                    details.push(`Meat Only`);
                }
                if (details.length > 0) {
                    breakdownHtml += `
                        <div class="summary-portion-row">
                            <span class="summary-portion-tag">${label}:</span>
                            <span class="summary-portion-val">${details.join(' • ')}</span>
                        </div>
                    `;
                }
            });
            breakdownHtml += `</div>`;
        }

        const baseVal = item.basePrice || parseInt((item.price || '0').toString().replace(/[^0-9]/g, ''), 10) || 0;
        const dishImg = getDishImage(item.name, item.desc);
        const imageHtml = dishImg 
            ? `<img src="${dishImg}" alt="${item.name}" class="order-dish-img">`
            : `<div class="dish-placeholder-box"><span class="dish-placeholder-label">PHOTO</span></div>`;

        const packagingBadgeHtml = (diningType === 'takeaway') 
            ? `<div class="item-packaging-tag">Takeaway Packaging: ${pkgDetails.label} (+KSh ${pkgDetails.totalFee.toLocaleString()}/=)</div>`
            : '';

        html += `
            <div class="order-item-row-luxury" style="pointer-events: none;">
                <div class="order-item-main-info">
                    <div class="order-dish-image-frame">
                        ${imageHtml}
                    </div>
                    <div class="order-dish-text-block">
                        <h3 class="order-dish-title">${item.name}</h3>
                        <div style="font-size: 0.85rem; color: #475569;">
                            Total Quantity: <strong style="color: #B8860B; font-size: 0.95rem;">${item.qty} ${item.qty === 1 ? 'Plate' : 'Plates'}</strong>
                        </div>
                        <div class="order-dish-price-tag">Base Price: <strong>KSh ${baseVal.toLocaleString()}/=</strong></div>
                        ${packagingBadgeHtml}
                        ${breakdownHtml}
                    </div>
                </div>

                <div class="order-item-actions-block">
                    <div class="quantity-controls-pill" style="border: 1px solid var(--color-border-gold); background: rgba(230, 126, 34, 0.08);">
                        <span class="qty-pill-label">Qty</span>
                        <span class="qty-number" style="font-size: 1.1rem; color: var(--color-dark);">${item.qty}</span>
                    </div>

                    <div class="order-subtotal-box">
                        <span class="subtotal-label">Total Subtotal</span>
                        <span class="order-subtotal-amount">KSh ${itemSubtotal.toLocaleString()}/=</span>
                    </div>
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;

    const grandTotal = totalPrice + packagingTotal;

    if (dishesCountEl) dishesCountEl.textContent = `${totalDishes} ${totalDishes === 1 ? 'Dish' : 'Dishes'}`;
    if (totalQtyEl) totalQtyEl.textContent = `${totalQuantity} ${totalQuantity === 1 ? 'Item' : 'Items'}`;
    if (grandTotalEl) {
        if (diningType === 'takeaway') {
            grandTotalEl.innerHTML = `KSh ${grandTotal.toLocaleString()}/= <span style="font-size: 0.82rem; font-weight: 500; color: #64748B; display: block; margin-top: 4px;">(Includes KSh ${packagingTotal.toLocaleString()}/= Takeaway Packaging)</span>`;
        } else {
            grandTotalEl.innerHTML = `<span style="color: #EA580C !important; font-weight: 800;">KSh ${grandTotal.toLocaleString()}/=</span>`;
        }
    }
}

// --- 4. CUSTOMER FEEDBACK SYSTEM (CONNECTED TO SERVER DATABASE) ---
function initCustomerFeedbackSystem() {
    const feedbackTrigger = document.getElementById('feedback-trigger-btn');
    const feedbackModalOverlay = document.getElementById('feedback-modal-overlay');
    const feedbackCloseBtn = document.getElementById('feedback-close-btn');
    const feedbackForm = document.getElementById('customer-feedback-form');
    const dishSelect = document.getElementById('fb-dish-select');
    const customDishInput = document.getElementById('fb-custom-dish');
    const starRatingContainer = document.getElementById('star-rating-input');
    const ratingValInput = document.getElementById('fb-rating-val');
    const successMsgContainer = document.getElementById('feedback-success-msg');
    const closeSuccessBtn = document.getElementById('btn-close-success');

    // A. TRACK DAILY UNIQUE VISITORS
    function trackDailyUniqueVisitor() {
        const todayISO = new Date().toISOString().split('T')[0];
        const sessionKey = `ribhouse_visited_day_${todayISO}`;

        if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, 'true');

            const visitorData = JSON.parse(localStorage.getItem('ribhouse_daily_unique_visitors') || '{}');
            visitorData[todayISO] = (visitorData[todayISO] || 0) + 1;
            localStorage.setItem('ribhouse_daily_unique_visitors', JSON.stringify(visitorData));
        }
    }

    trackDailyUniqueVisitor();

    // B. CUSTOMER FEEDBACK MODAL OPEN / CLOSE
    window.openCustomerFeedbackModal = function() {
        const overlay = document.getElementById('feedback-modal-overlay');
        const form = document.getElementById('customer-feedback-form');
        const success = document.getElementById('feedback-success-msg');
        if (overlay) {
            overlay.classList.add('active');
            if (form) form.style.display = 'flex';
            if (success) success.style.display = 'none';
        } else {
            window.location.href = 'index.html?open=feedback';
        }
    };

    window.closeCustomerFeedbackModal = function() {
        const overlay = document.getElementById('feedback-modal-overlay');
        if (overlay) overlay.classList.remove('active');
    };

    if (feedbackTrigger && feedbackModalOverlay) {
        feedbackTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            window.openCustomerFeedbackModal();
        });
    }

    if (feedbackCloseBtn && feedbackModalOverlay) {
        feedbackCloseBtn.addEventListener('click', () => {
            window.closeCustomerFeedbackModal();
        });
        feedbackModalOverlay.addEventListener('click', (e) => {
            if (e.target === feedbackModalOverlay) window.closeCustomerFeedbackModal();
        });
    }

    if (closeSuccessBtn && feedbackModalOverlay) {
        closeSuccessBtn.addEventListener('click', () => {
            window.closeCustomerFeedbackModal();
        });
    }

    // Auto-open modal if URL contains ?open=feedback or hash #feedback/#reviews
    if (window.location.search.includes('open=feedback') || window.location.hash === '#feedback' || window.location.hash === '#reviews') {
        setTimeout(() => {
            window.openCustomerFeedbackModal();
        }, 300);
    }

    // C. CUSTOM DISH INPUT TOGGLE
    if (dishSelect && customDishInput) {
        dishSelect.addEventListener('change', () => {
            if (dishSelect.value === 'Other / Custom') {
                customDishInput.style.display = 'block';
                customDishInput.focus();
            } else {
                customDishInput.style.display = 'none';
            }
        });
    }

    // D. STAR RATING INTERACTION
    if (starRatingContainer && ratingValInput) {
        const stars = starRatingContainer.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'), 10) || 5;
                ratingValInput.value = rating;
                stars.forEach((s, idx) => {
                    if (idx < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    // E. SUBMIT FEEDBACK FORM (PERSIST DIRECTLY TO CLOUD REALTIME & SERVER DATABASE)
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let chosenDish = dishSelect ? dishSelect.value : '';
            if (chosenDish === 'Other / Custom' && customDishInput && customDishInput.value.trim()) {
                chosenDish = customDishInput.value.trim();
            }

            const selectedGroupEl = document.querySelector('input[name="dining_group"]:checked');
            const diningGroup = selectedGroupEl ? selectedGroupEl.value : 'Solo Diners';
            const rating = parseInt(ratingValInput ? ratingValInput.value : '5', 10);
            const comments = document.getElementById('fb-comments') ? document.getElementById('fb-comments').value.trim() : '';
            const customerName = document.getElementById('fb-customer-name') ? document.getElementById('fb-customer-name').value.trim() : 'Anonymous';

            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            const feedbackId = 'fb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

            const payload = {
                id: feedbackId,
                dish: chosenDish || 'General Experience',
                group: diningGroup,
                rating: rating,
                comments: comments,
                author: customerName || 'Valued Guest',
                date: formattedDate,
                timestamp: Date.now()
            };

            const submitBtn = feedbackForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
            }

            // 1. Broadcast locally for instant same-browser multi-tab sync
            try {
                const existing = JSON.parse(localStorage.getItem('ribhouse_feedbacks_queue') || '[]');
                existing.unshift(payload);
                localStorage.setItem('ribhouse_feedbacks_queue', JSON.stringify(existing.slice(0, 100)));
                localStorage.setItem('ribhouse_last_feedback_event', JSON.stringify({ event: 'NEW_FEEDBACK', data: payload, time: Date.now() }));
                if ('BroadcastChannel' in window) {
                    const bc = new BroadcastChannel('ribhouse_realtime_feedback');
                    bc.postMessage({ type: 'NEW_FEEDBACK', feedback: payload });
                }
            } catch(err) {}

            // 2. Push in real-time to Global Firebase Realtime Cloud Database
            try {
                fetch('https://ribhouse-admin-default-rtdb.firebaseio.com/feedbacks.json', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).catch(() => {});
            } catch(err) {}

            // 3. Send feedback directly to backend server database
            try {
                await fetch('/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } catch (err) {
                console.warn('[Feedback Notice] Feedback stored offline.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Feedback';
                }

                // Reset Form & Show Success Message
                feedbackForm.reset();
                if (customDishInput) customDishInput.style.display = 'none';
                if (ratingValInput) ratingValInput.value = '5';
                if (starRatingContainer) {
                    starRatingContainer.querySelectorAll('.star').forEach(s => s.classList.add('active'));
                }

                feedbackForm.style.display = 'none';
                if (successMsgContainer) successMsgContainer.style.display = 'block';
            }
        });
    }
}


// ==========================================================================
// VISIT RIB HOUSE - LOCATION, LIVE DIRECTIONS & SHARING LOGIC
// ==========================================================================
function initLocationSection() {
    const statusBadge = document.getElementById('location-live-status');
    const statusText = document.getElementById('location-status-text');
    const shareBtn = document.getElementById('btn-share-location');
    const copyBtn = document.getElementById('btn-copy-address');
    const toast = document.getElementById('location-toast');
    const toastMsg = document.getElementById('location-toast-msg');

    // 1. Operating Hours Live Status Check (5:30 AM to 11:00 PM)
    function updateLocationStatus() {
        if (!statusBadge || !statusText) return;
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const totalMinutes = hour * 60 + minute;
        
        const openMinutes = 5 * 60 + 30; // 5:30 AM
        const closeMinutes = 23 * 60;    // 11:00 PM

        const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

        if (isOpen) {
            statusBadge.className = 'hours-status-badge open';
            statusText.textContent = 'Open Now';
        } else {
            statusBadge.className = 'hours-status-badge closed';
            statusText.textContent = 'Opens at 5:30 AM';
        }
    }

    updateLocationStatus();

    // 2. Toast Notification Controller
    let toastTimer = null;
    function showLocationToast(message) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // 3. Copy Address Helper
    const addressFullText = 'Rib House Restaurant, Development House along Moi Avenue, Opposite Naivas Supermarket, Nairobi - https://maps.app.goo.gl/QfEwSbmx5faAciNN6';

    function copyAddress() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(addressFullText).then(() => {
                showLocationToast('Address copied to clipboard');
            }).catch(() => {
                fallbackCopy(addressFullText);
            });
        } else {
            fallbackCopy(addressFullText);
        }
    }

    function fallbackCopy(text) {
        try {
            const tempInput = document.createElement('textarea');
            tempInput.value = text;
            tempInput.style.position = 'fixed';
            tempInput.style.left = '-9999px';
            tempInput.style.opacity = '0';
            document.body.appendChild(tempInput);
            tempInput.focus();
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            showLocationToast('Address copied to clipboard');
        } catch (e) {
            showLocationToast('Address: Development House along Moi Avenue, Nairobi');
        }
    }

    // 4. Native Device Share Sheet / Fallback
    if (shareBtn) {
        shareBtn.onclick = async function(e) {
            e.preventDefault();
            const shareData = {
                title: 'Rib House Restaurant',
                text: 'Meet me at Rib House Restaurant at Development House along Moi Avenue, Opposite Naivas Supermarket, Nairobi.',
                url: 'https://maps.app.goo.gl/QfEwSbmx5faAciNN6'
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    // User canceled or closed share sheet
                }
            } else {
                // Fallback: Copy address to clipboard
                copyAddress();
            }
        };
    }

    // 5. Copy Address Button Event
    if (copyBtn) {
        copyBtn.onclick = function(e) {
            e.preventDefault();
            copyAddress();
        };
    }
}




// ==========================================================================

// ==========================================================================
// ALL-WHITE & ORANGE OFFICIAL DIGITAL ORDER RECEIPT GENERATOR (CLEAN - NO EMOJIS)
// ==========================================================================

function openWaiterSlipModal(customData = {}) {
    const cart = getCartItems();
    if (!cart || cart.length === 0) {
        alert('Your order selection is empty. Please select dishes from the menu first.');
        return;
    }

    const diningType = customData.diningType || getSelectedDiningType();
    let locationNote = customData.locationNote || '';
    const specialNotes = customData.specialNotes || '';
    const custName = customData.name || '';

    // Retrieve from input or default seamlessly without any intrusive prompts
    if (!locationNote) {
        const tableInput = document.getElementById('cust-table-location') || document.getElementById('table-notes');
        if (tableInput && tableInput.value.trim()) {
            locationNote = tableInput.value.trim();
        } else {
            locationNote = (diningType === 'dine_in') ? 'Table Service' : 'Pickup';
        }
    }

    // Timestamp & Receipt Ref
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const seq = Math.floor(10 + Math.random() * 90);
    const receiptRef = 'REC-RH' + yy + mm + dd + hh + min + seq;

    // Totals & Items HTML
    let grandTotal = 0;
    let itemsHtml = '';

    cart.forEach(item => {
        const itemSubtotal = calculateItemSubtotal(item);
        grandTotal += itemSubtotal;

        let sideHtml = '';
        if (item.sideOption) {
            sideHtml = `<div class="waiter-slip-item-side">&bull; Side Choice: <strong>${item.sideOption}</strong></div>`;
        }

        itemsHtml += `
            <div class="waiter-slip-item-row">
                <div class="waiter-slip-item-main">
                    <div class="waiter-slip-item-title-row">
                        <span class="waiter-slip-qty-tag">x${item.qty}</span>
                        <span class="waiter-slip-item-name">${item.name}</span>
                    </div>
                    ${sideHtml}
                </div>
                <div class="waiter-slip-item-price">KSh ${itemSubtotal.toLocaleString()}/=</div>
            </div>
        `;
    });

    // Handle Packaging fee if takeaway
    let packagingHtml = '';
    if (diningType === 'takeaway') {
        const pkgDetails = getOrderPackagingSummary(cart);
        if (pkgDetails && pkgDetails.totalPackagingFee > 0) {
            grandTotal += pkgDetails.totalPackagingFee;
            packagingHtml = `
                <div class="waiter-slip-item-row" style="background: #FFF7ED; padding: 8px; margin-top: 4px;">
                    <div class="waiter-slip-item-main">
                        <span class="waiter-slip-item-name" style="color: #EA580C; font-size: 0.88rem;">Takeaway Eco-Packaging</span>
                    </div>
                    <div class="waiter-slip-item-price" style="color: #EA580C;">+KSh ${pkgDetails.totalPackagingFee.toLocaleString()}/=</div>
                </div>
            `;
        }
    }

    // Badge Title
    let badgeText = '';
    if (diningType === 'dine_in') {
        badgeText = locationNote ? `DINE IN &bull; ${locationNote.toUpperCase()}` : 'DINE IN &bull; TABLE SERVICE';
    } else {
        badgeText = locationNote ? `TAKEAWAY &bull; ${locationNote.toUpperCase()}` : 'TAKEAWAY &bull; PICKUP';
    }

    // Notes Box
    let notesHtml = '';
    if (specialNotes) {
        notesHtml = `
            <div class="waiter-slip-notes-box">
                <strong>Kitchen Instructions / Customer Notes:</strong>
                ${specialNotes}
            </div>
        `;
    }

    // Modal Markup
    let overlay = document.getElementById('waiter-slip-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'waiter-slip-modal-overlay';
        overlay.className = 'waiter-slip-overlay';
        document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
        <div class="waiter-slip-modal" role="dialog" aria-modal="true" aria-label="Official Order Receipt">
            <button type="button" class="waiter-slip-close-btn" onclick="closeWaiterSlipModal()" aria-label="Close Receipt">&times;</button>
            
            <div class="waiter-slip-brand">
                <img src="logo.webp" alt="Rib House Logo" width="48" height="48" decoding="async">
                <div class="waiter-slip-brand-title">RIB HOUSE</div>
                <div class="waiter-slip-brand-sub">WOOD-FIRED GRILL &bull; ORDER RECEIPT</div>
            </div>

            <div class="waiter-slip-badge-bar">
                <div class="waiter-slip-table-badge">${badgeText}</div>
            </div>

            <div class="waiter-slip-meta-row">
                <span>Receipt No: <strong style="color: #0F172A;">${receiptRef}</strong></span>
                <span>${dateStr} &bull; ${timeStr}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #475569; margin-bottom: 8px; font-weight: 600;">
                <span>Till Number: <strong style="color: #EA580C;">4977556</strong></span>
                <span>Tel: <strong>0724 594 204</strong></span>
            </div>

            <div class="waiter-slip-dashed-line"></div>

            <div class="waiter-slip-items-header">
                <span>Ordered Courses</span>
                <span>Amount</span>
            </div>

            <div class="waiter-slip-items-list">
                ${itemsHtml}
                ${packagingHtml}
            </div>

            ${notesHtml}

            <div class="waiter-slip-dashed-line"></div>

            <div class="waiter-slip-total-banner">
                <div>
                    <span class="waiter-slip-total-title">TOTAL RECEIPT AMOUNT</span>
                    <span style="display: block; font-size: 0.75rem; color: #64748B; font-weight: 500; margin-top: 2px;">All Prices Inclusive of VAT</span>
                </div>
                <span class="waiter-slip-total-amount">KSh ${grandTotal.toLocaleString()}/=</span>
            </div>

            <div class="waiter-slip-notice">
                <strong>Customer Order Receipt</strong><br>
                Please present this receipt to your waiter or cashier to place and serve your order.
            </div>

            <div class="waiter-slip-actions-grid">
                <button type="button" class="btn-slip-action secondary" onclick="printOrderReceipt()">Print / Save Receipt</button>
                <button type="button" class="btn-slip-action primary" onclick="handleFinishWaiterOrder()">Done / Placed</button>
            </div>
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function printOrderReceipt() {
    window.print();
}

function closeWaiterSlipModal() {
    const overlay = document.getElementById('waiter-slip-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

function handleFinishWaiterOrder() {
    closeWaiterSlipModal();
    alert('Thank you! Your order receipt has been noted. Your food is being prepared freshly over the wood-fired grill.');
}
