/* ==========================================================================
   RIB HOUSE - OFFICIAL DIGITAL MENU (PURE MENU SHOWCASE)
   OFFLINE RIB HOUSE MENU AI ASSISTANT & KNOWLEDGE BASE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollNavbar();
    initSectionSlideshows();
    initMenuAIAssistant();
});

// --- 1. NAVBAR SCROLL OBSERVER ---
function initScrollNavbar() {
    // Navbar moves naturally with scroll
}

// --- 2. SECTION BACKGROUND SLIDESHOWS (KEN BURNS EFFECT) ---
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

// ==========================================================================
// 3. OFFLINE RIB HOUSE MENU AI ASSISTANT LOGIC & SELECTION ENGINE
// ==========================================================================

// LocalStorage Cart Helper Functions
function getSelectedCart() {
    try {
        return JSON.parse(localStorage.getItem('ribhouse_selected_cart')) || [];
    } catch(e) {
        return [];
    }
}

function saveSelectedCart(cart) {
    try {
        localStorage.setItem('ribhouse_selected_cart', JSON.stringify(cart));
    } catch(e) {}
    updateSelectionBarUI();
}

function isDishSelected(dishName) {
    const cart = getSelectedCart();
    return cart.some(item => item.name === dishName);
}

function toggleSelectItem(dishDataStr) {
    try {
        const dish = JSON.parse(decodeURIComponent(dishDataStr));
        let cart = getSelectedCart();
        const existingIndex = cart.findIndex(item => item.name === dish.name);
        
        if (existingIndex > -1) {
            cart.splice(existingIndex, 1);
        } else {
            const numericPrice = parseInt(dish.price.replace(/[^0-9]/g, ''), 10) || 0;
            cart.push({
                id: 'dish_' + Math.random().toString(36).substring(2, 9),
                name: dish.name,
                price: dish.price,
                numericPrice: numericPrice,
                desc: dish.desc || '',
                category: dish.category || 'main',
                qty: 1
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
    const bar = document.getElementById('ai-selection-bar');
    const countEl = document.getElementById('ai-selected-count');
    const totalEl = document.getElementById('ai-selected-total');
    if (!bar) return;

    const cart = getSelectedCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.numericPrice * item.qty), 0);

    if (totalItems > 0) {
        bar.style.display = 'flex';
        if (countEl) countEl.textContent = `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'} Selected`;
        if (totalEl) totalEl.textContent = `Total: ${totalPrice}/=`;
    } else {
        bar.style.display = 'none';
    }
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

    // --- A. ROTATING SPEECH TEASER BUBBLE ---
    const teaserPrompts = [
        '💡 Ask me: "Dishes under 400/="',
        '☕ Ask me: "What comes in Pancake Breakfast?"',
        '🍗 Ask me: "Best platter for 4 people?"',
        '🔥 Ask me: "Show spicy & grilled meat"',
        '📞 Ask me: "M-Pesa Till Number"'
    ];
    let teaserIndex = 0;
    let teaserInterval = setInterval(() => {
        if (teaser && !teaser.classList.contains('hidden')) {
            teaserIndex = (teaserIndex + 1) % teaserPrompts.length;
            teaserText.style.opacity = '0';
            setTimeout(() => {
                teaserText.textContent = teaserPrompts[teaserIndex];
                teaserText.style.opacity = '1';
            }, 300);
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

    function processUserQuery(userText) {
        appendMessage(userText, 'user');

        const typingEl = document.createElement('div');
        typingEl.className = 'ai-msg ai-msg-bot';
        typingEl.innerHTML = `<div class="ai-msg-bubble"><p style="opacity: 0.7;"><em>Analyzing menu recommendations...</em></p></div>`;
        messagesFeed.appendChild(typingEl);
        messagesFeed.scrollTop = messagesFeed.scrollHeight;

        setTimeout(() => {
            typingEl.remove();
            const replyData = generateAIReply(userText);
            appendMessage(replyData.text, 'bot', replyData.cards);
        }, 350);
    }

    function appendMessage(text, sender, cards = []) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ai-msg-${sender}`;

        let html = `<div class="ai-msg-bubble">${formatMarkdownText(text)}</div>`;

        if (cards && cards.length > 0) {
            cards.forEach(card => {
                const isSel = isDishSelected(card.name);
                const encodedData = encodeURIComponent(JSON.stringify(card));
                const encodedName = encodeURIComponent(card.name);

                html += `
                    <div class="ai-dish-card">
                        <div class="ai-dish-header">
                            <span class="ai-dish-name">${card.name}</span>
                            <span class="ai-dish-price">${card.price}</span>
                        </div>
                        ${card.desc ? `<p class="ai-dish-desc">${card.desc}</p>` : ''}
                        <div class="ai-card-actions">
                            <button class="btn-select-dish ${isSel ? 'active' : ''}" data-dish-name="${encodedName}" onclick="toggleSelectItem('${encodedData}')">
                                ${isSel ? '✓ Selected' : '+ Select Item'}
                            </button>
                            ${card.targetId ? `<button class="ai-dish-link-btn" onclick="scrollToDishSection('${card.targetId}')">View in Menu &darr;</button>` : ''}
                        </div>
                    </div>
                `;
            });
        }

        msgDiv.innerHTML = html;
        messagesFeed.appendChild(msgDiv);
        messagesFeed.scrollTop = messagesFeed.scrollHeight;
    }

    function formatMarkdownText(str) {
        return str
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    // --- E. KNOWLEDGE BASE & AI MATCHING LOGIC ---
    const KNOWLEDGE = [
        // Breakfast Combos
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

        // Hot Beverages & Barista
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

        // Cold Drinks & Shakes / Desserts
        { name: "Milkshake (Flavored)", price: "250/=", category: "cold-drinks", tags: ["shake", "milkshake", "dessert", "sweet", "cold"], desc: "Creamy thick milkshake", targetId: "bk-cold" },
        { name: "Lemonade (Flavor)", price: "100/=", category: "cold-drinks", tags: ["lemonade", "cold", "drink"], desc: "Chilled flavored lemonade", targetId: "bk-cold" },
        { name: "Oreo Shake", price: "300/=", category: "cold-drinks", tags: ["oreo", "shake", "dessert", "chocolate", "sweet"], desc: "Rich crushed Oreo chocolate shake", targetId: "bk-cold" },
        { name: "Smoothies (Tropical)", price: "200/=", category: "cold-drinks", tags: ["smoothie", "fruit", "cold"], desc: "Fresh blended tropical fruits", targetId: "bk-cold" },
        { name: "Ice Cream Scoops", price: "150/=", category: "cold-drinks", tags: ["ice cream", "dessert", "cold", "sweet"], desc: "Chilled gourmet ice cream", targetId: "bk-cold" },
        { name: "Iced Coffee", price: "180/=", category: "cold-drinks", tags: ["coffee", "cold", "iced"], desc: "Cold brewed espresso over ice", targetId: "bk-cold" },

        // Main Dishes & Spicy / Vegetarian
        { name: "MATUMBO FRY", price: "From 400/=", category: "main", tags: ["matumbo", "spicy", "fry"], desc: "Ugali/Chapati (400/=), Rice/Mukimo (410/=), Pilau (500/=), Chips (540/=)", targetId: "main-dishes-grid" },
        { name: "BEEF STEW / FRY", price: "From 440/=", category: "main", tags: ["beef", "stew", "fry"], desc: "Ugali/Chapati (440/=), Rice/Mukimo (450/=), Pilau (550/=), Chips (580/=)", targetId: "main-dishes-grid" },
        { name: "GOAT STEW / FRY", price: "From 490/=", category: "main", tags: ["goat", "stew", "fry", "spicy"], desc: "Ugali/Chapati (490/=), Rice/Mukimo (500/=), Pilau (600/=), Chips (630/=)", targetId: "main-dishes-grid" },
        { name: "BEEF STEAK GRILLED", price: "From 580/=", category: "main", tags: ["beef", "steak", "grilled", "spicy"], desc: "Tender wood-fired beef steak served with side of choice", targetId: "main-dishes-grid" },
        { name: "CHICKEN WET / DRY FRY", price: "From 500/=", category: "main", tags: ["chicken", "fry", "spicy"], desc: "Pan fried chicken with your choice of side dish", targetId: "main-dishes-grid" },
        { name: "TILAPIA FRY WHOLE", price: "From 570/=", category: "main", tags: ["fish", "tilapia", "fry"], desc: "Crispy whole fried tilapia with side", targetId: "main-dishes-grid" },

        // Choma & Platters
        { name: "CHOMA BEEF (1 KG)", price: "1100/=", category: "choma", tags: ["beef", "choma", "grilled", "popular"], desc: "Slow roasted tender beef choma per KG", targetId: "meat-portions-grid" },
        { name: "CHOMA GOAT (1 KG)", price: "1200/=", category: "choma", tags: ["goat", "choma", "grilled", "popular", "spicy"], desc: "Juicy grilled goat choma per KG", targetId: "meat-portions-grid" },
        { name: "CHEMSHA GOAT (1 KG)", price: "1300/=", category: "choma", tags: ["goat", "chemsha", "soup"], desc: "Boiled flavorful goat stew/soup per KG", targetId: "meat-portions-grid" },
        { name: "BEEF / GOAT TUMBUKIZA (1 KG)", price: "1300/= / 1400/=", category: "choma", tags: ["tumbukiza", "goat", "beef", "spicy"], desc: "Rich wood-fired meat tumbukiza on order", targetId: "meat-portions-grid" },
        { name: "CHICKEN PLATTER FOR 4", price: "1900/=", category: "choma", tags: ["chicken", "platter", "group", "popular"], desc: "Includes 2 Chicken Wet Fry, 2 Beef Fry, 1 Chips, 2 Ugali/Chapati, 2 Veggies & 4 Juices", targetId: "meat-portions-grid" }
    ];

    function generateAIReply(rawQuery) {
        const q = rawQuery.toLowerCase().trim();

        // 1. Greetings
        if (q.match(/^(hi|hello|hey|habari|mambo|sasa|good morning|good afternoon)/)) {
            return {
                text: "Habari! 😊 I am ready to help you choose the best meal. Ask me about **chicken dishes**, **spicy foods**, **vegetarian meals**, **desserts**, **drinks**, or **budget meals**!",
                cards: []
            };
        }

        // 2. Till Number & Contact
        if (q.includes("till") || q.includes("mpesa") || q.includes("pay") || q.includes("phone") || q.includes("hotline") || q.includes("order") || q.includes("contact")) {
            return {
                text: "💳 **Payment & Order Hotline Information**:\n\n• **M-Pesa Till Number:** 4977556\n• **Direct Order Hotline:** 0724 594 204\n• **Email:** ribhouseke@gmail.com\n\nAll meals are cooked fresh daily!",
                cards: []
            };
        }

        // 3. Spicy Foods query
        if (q.includes("spicy") || q.includes("chili") || q.includes("pepper") || q.includes("hot food")) {
            const spicyMatches = KNOWLEDGE.filter(item => item.tags && item.tags.includes("spicy"));
            return {
                text: "🔥 **Recommended Spicy & Wood-Fired Specialties:**\nThese dishes feature authentic Kenya roast spices and rich pan frying:",
                cards: spicyMatches.slice(0, 4)
            };
        }

        // 4. Vegetarian / Veges query
        if (q.includes("veg") || q.includes("vegetarian") || q.includes("greens") || q.includes("spinach")) {
            const vegMatches = KNOWLEDGE.filter(item => 
                (item.tags && item.tags.includes("vegetarian")) || 
                item.name.includes("TRADITIONAL") || 
                item.desc.toLowerCase().includes("veges")
            );
            return {
                text: "🥗 **Vegetarian & Healthy Traditional Options:**",
                cards: vegMatches.slice(0, 4)
            };
        }

        // 5. Desserts & Sweet Treats query
        if (q.includes("dessert") || q.includes("sweet") || q.includes("ice cream") || q.includes("oreo") || q.includes("shake")) {
            const dessertMatches = KNOWLEDGE.filter(item => item.tags && item.tags.includes("dessert"));
            return {
                text: "🍨 **Delicious Desserts & Chilled Shakes:**",
                cards: dessertMatches
            };
        }

        // 6. Dynamic Price & Budget Filter (handles "150", "under 400", "budget 500", etc.)
        const numberMatch = q.match(/(\d+)/);
        const isBudgetQuery = q.includes("budget") || q.includes("under") || q.includes("cheap") || q.includes("less than") || q.includes("shilling") || q.includes("ksh") || q.includes("kes") || q.includes("price") || numberMatch;

        if (isBudgetQuery && numberMatch) {
            const userBudget = parseInt(numberMatch[1], 10);
            
            if (userBudget >= 30 && userBudget <= 5000) {
                const matches = KNOWLEDGE.filter(item => {
                    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
                    return priceNum && priceNum <= userBudget;
                }).slice(0, 5);

                if (matches.length > 0) {
                    return {
                        text: `Here are top recommendations for your budget of **${userBudget}/=** or less:`,
                        cards: matches
                    };
                } else {
                    return {
                        text: `Sorry, we don't have items under **${userBudget}/=**. Our lowest priced item is **50/=** (Honey Cone) followed by **70/=** (Lemon Water) and **100/=** (House Coffee Black, Lemon Tea, Hot Milk).`,
                        cards: KNOWLEDGE.filter(i => parseInt(i.price.replace(/[^0-9]/g, ''), 10) <= 150).slice(0, 3)
                    };
                }
            }
        }

        // 7. Group / Family Platter queries
        if (q.includes("4 people") || q.includes("group") || q.includes("family") || q.includes("platter") || q.includes("many people")) {
            const platter = KNOWLEDGE.find(item => item.name.includes("PLATTER FOR 4"));
            return {
                text: "🍗 **Best Option for Groups & Families:**\n\nOur **CHICKEN PLATTER FOR 4 (1900/=)** is designed for sharing! It comes fully loaded with chicken fry, beef fry, chips, ugali/chapati, veggies, and 4 juices.",
                cards: platter ? [platter] : []
            };
        }

        // 8. Chicken dishes
        if (q.includes("chicken") || q.includes("kienyeji") || q.includes("poultry")) {
            const chickenMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("chicken"));
            return {
                text: "🍗 **Signature Chicken Meals:**",
                cards: chickenMatches
            };
        }

        // 9. Beef dishes
        if (q.includes("beef") || q.includes("steak") || q.includes("burger")) {
            const beefMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("beef"));
            return {
                text: "🥩 **Juicy Grilled Beef & Steaks:**",
                cards: beefMatches.slice(0, 4)
            };
        }

        // 10. Goat Meat dishes
        if (q.includes("goat") || q.includes("mbuzi")) {
            const goatMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("goat"));
            return {
                text: "🐐 **Our Signature Goat Meat Dishes:**",
                cards: goatMatches
            };
        }

        // 11. Fish / Tilapia dishes
        if (q.includes("fish") || q.includes("tilapia") || q.includes("seafood")) {
            const fishMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("tilapia") || (item.tags && item.tags.includes("fish")));
            return {
                text: "🐟 **Fresh Whole Tilapia Dish:**",
                cards: fishMatches
            };
        }

        // 12. Shakes & Drinks
        if (q.includes("drink") || q.includes("coffee") || q.includes("tea") || q.includes("dawa") || q.includes("beverage")) {
            const drinkMatches = KNOWLEDGE.filter(item => item.category === "hot-drinks" || item.category === "cold-drinks").slice(0, 4);
            return {
                text: "🥤 **Barista Coffee, Brewed Teas & Shakes:**",
                cards: drinkMatches
            };
        }

        // 13. Breakfast & Combos
        if (q.includes("breakfast") || q.includes("morning") || q.includes("pancake") || q.includes("combo")) {
            const bMatches = KNOWLEDGE.filter(item => item.category === "breakfast").slice(0, 4);
            return {
                text: "☕ **Top Breakfast Combos & Specials:**\nAll breakfasts are served hot & fresh with tea!",
                cards: bMatches
            };
        }

        // Default Smart Search across knowledge base tags & descriptions
        const generalMatches = KNOWLEDGE.filter(item => 
            item.name.toLowerCase().includes(q) || 
            item.desc.toLowerCase().includes(q) ||
            (item.tags && item.tags.some(t => q.includes(t)))
        ).slice(0, 4);

        if (generalMatches.length > 0) {
            return {
                text: `Here are delicious recommendations matching "**${rawQuery}**":`,
                cards: generalMatches
            };
        }

        // Fallback response with popular choices
        return {
            text: `I couldn't find an exact match for "${rawQuery}", but here are some of our customer favorites:`,
            cards: [
                KNOWLEDGE[0], // Pancake Breakfast
                KNOWLEDGE[KNOWLEDGE.length - 1], // Chicken Platter for 4
                KNOWLEDGE.find(i => i.name.includes("BEEF STEAK"))
            ].filter(Boolean)
        };
    }
}

// Global helper function for "View in Menu" buttons inside chat
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

// ==========================================================================
// 4. "YOUR SELECTED ORDER" PAGE LOGIC (order.html)
// ==========================================================================
function renderSelectedOrderPage() {
    const listContainer = document.getElementById('selected-order-items-list');
    const itemsCountEl = document.getElementById('summary-items-count');
    const totalAmountEl = document.getElementById('summary-total-amount');
    const checkoutBtn = document.getElementById('btn-proceed-checkout');

    if (!listContainer) return;

    const cart = getSelectedCart();

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 0;">
                <p style="font-size: 1.1rem; color: var(--color-cream); margin-bottom: 12px;">Your selection is currently empty!</p>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 24px;">Use our AI Dish Helper or browse the menu to select food items.</p>
                <a href="index.html" class="btn-continue-order" style="display: inline-block;">&larr; Browse Full Menu</a>
            </div>
        `;
        if (itemsCountEl) itemsCountEl.textContent = "0 Items";
        if (totalAmountEl) totalAmountEl.textContent = "0/=";
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
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        const itemSubtotal = item.numericPrice * item.qty;
        totalItems += item.qty;
        totalPrice += itemSubtotal;

        html += `
            <div class="order-item-row" data-id="${item.id}">
                <div class="order-item-details" style="flex: 1;">
                    <h4>${item.name}</h4>
                    <p>${item.desc || 'Freshly prepared'}</p>
                    <span class="order-item-price">${item.price} each</span>
                </div>

                <div class="quantity-controls">
                    <button class="btn-qty" onclick="changeCartItemQty('${item.id}', -1)">&minus;</button>
                    <span class="qty-number">${item.qty}</span>
                    <button class="btn-qty" onclick="changeCartItemQty('${item.id}', 1)">&plus;</button>
                </div>

                <div style="text-align: right; min-width: 80px;">
                    <span class="order-item-price">${itemSubtotal}/=</span>
                </div>

                <button class="btn-remove-item" onclick="removeCartItem('${item.id}')" title="Remove item">&times;</button>
            </div>
        `;
    });

    listContainer.innerHTML = html;

    if (itemsCountEl) itemsCountEl.textContent = `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'}`;
    if (totalAmountEl) totalAmountEl.textContent = `${totalPrice}/=`;
}

// Global Quantity & Remove Handlers for order.html
window.changeCartItemQty = function(id, delta) {
    let cart = getSelectedCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
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

    if (cart.length === 0) {
        summaryItemsEl.innerHTML = `<p style="color: var(--color-text-muted);">No items selected. <a href="index.html" class="text-gold">Return to Menu</a></p>`;
        if (totalAmountEl) totalAmountEl.textContent = "0/=";
        return;
    }

    let html = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemSubtotal = item.numericPrice * item.qty;
        totalPrice += itemSubtotal;
        html += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>${item.qty}x ${item.name}</span>
                <strong style="color: var(--color-cream);">${itemSubtotal}/=</strong>
            </div>
        `;
    });

    summaryItemsEl.innerHTML = html;
    if (totalAmountEl) totalAmountEl.textContent = `${totalPrice}/=`;
}


