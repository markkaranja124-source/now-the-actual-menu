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
                                ${isSel ? '✓ Added to Order' : '+ Add to Order'}
                            </button>
                            ${card.targetId ? `<button class="ai-dish-link-btn" onclick="scrollToDishSection('${card.targetId}')">View in Menu &darr;</button>` : ''}
                        </div>
                    </div>
                `;
            });
        }

        msgDiv.innerHTML = html;
        messagesFeed.appendChild(msgDiv);

        if (sender === 'bot') {
            msgDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            messagesFeed.scrollTop = messagesFeed.scrollHeight;
        }
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
        { name: "CHOMA BEEF (1 KG)", price: "1100/=", category: "choma", tags: ["beef", "choma", "grilled", "popular"], desc: "Slow roasted tender beef choma per KG", targetId: "meat-portions-grid" },
        { name: "CHOMA GOAT (1 KG)", price: "1200/=", category: "choma", tags: ["goat", "choma", "grilled", "popular", "spicy"], desc: "Juicy grilled goat choma per KG", targetId: "meat-portions-grid" },
        { name: "CHEMSHA GOAT (1 KG)", price: "1300/=", category: "choma", tags: ["goat", "chemsha", "soup"], desc: "Boiled flavorful goat stew/soup per KG", targetId: "meat-portions-grid" },
        { name: "BEEF / GOAT TUMBUKIZA (1 KG)", price: "1300/= / 1400/=", category: "choma", tags: ["tumbukiza", "goat", "beef", "spicy"], desc: "Rich wood-fired meat tumbukiza on order", targetId: "meat-portions-grid" },
        { name: "CHICKEN PLATTER FOR 4", price: "1900/=", category: "choma", tags: ["chicken", "platter", "group", "popular"], desc: "Includes 2 Chicken Wet Fry, 2 Beef Fry, 1 Chips, 2 Ugali/Chapati, 2 Veggies & 4 Juices", targetId: "meat-portions-grid" }
    ];

    function generateAIReply(rawQuery) {
        const q = rawQuery.toLowerCase().trim();

        if (q.match(/^(hi|hello|hey|habari|mambo|sasa|good morning|good afternoon)/)) {
            return {
                text: "Habari! 😊 I am ready to help you choose the best meal. Ask me about **everything under a budget**, **chicken dishes**, **spicy foods**, **vegetarian meals**, **desserts**, or **drinks**!",
                cards: []
            };
        }

        if (q.includes("till") || q.includes("mpesa") || q.includes("pay") || q.includes("phone") || q.includes("hotline") || q.includes("order") || q.includes("contact")) {
            return {
                text: "💳 **Payment & Order Hotline Information**:\n\n• **M-Pesa Till Number:** 4977556\n• **Direct Order Hotline:** 0724 594 204\n• **Email:** ribhouseke@gmail.com\n\nAll meals are cooked fresh daily!",
                cards: []
            };
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

// ==========================================================================
// 4. "YOUR SELECTED ORDER" PAGE LOGIC (order.html) - SINGLE VERTICAL COLUMN
// ==========================================================================
function renderSelectedOrderPage() {
    const listContainer = document.getElementById('selected-order-items-list');
    const itemsCountEl = document.getElementById('summary-items-count');
    const totalQtyEl = document.getElementById('summary-total-qty');
    const totalAmountEl = document.getElementById('summary-total-amount');
    const checkoutBtn = document.getElementById('btn-proceed-checkout');

    if (!listContainer) return;

    const cart = getSelectedCart();

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.2rem; color: var(--color-cream); margin-bottom: 12px;">Your order selection is currently empty!</p>
                <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 24px;">Use our AI Dish Helper or browse the menu to add delicious meals.</p>
                <a href="index.html" class="btn-continue-order" style="display: inline-block;">&larr; Return to Menu</a>
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

    cart.forEach(item => {
        const itemSubtotal = item.numericPrice * item.qty;
        totalQuantity += item.qty;
        totalPrice += itemSubtotal;

        // Determine Dish Artwork Thumbnail & Category Badge
        const nameLower = item.name.toLowerCase();
        let dishImg = 'logo.png';
        let categoryBadge = '🥩 Main Dish';

        if (nameLower.includes('choma') || nameLower.includes('beef') || nameLower.includes('goat') || nameLower.includes('steak') || nameLower.includes('platter') || nameLower.includes('tumbukiza') || nameLower.includes('chemsha')) {
            dishImg = 'order_dish_choma.png';
            categoryBadge = '🔥 Wood-Fired Choma';
        } else if (nameLower.includes('breakfast') || nameLower.includes('pancake') || nameLower.includes('egg') || nameLower.includes('toast') || nameLower.includes('bite') || nameLower.includes('samosa') || nameLower.includes('combo')) {
            dishImg = 'order_dish_breakfast.png';
            categoryBadge = '🥞 Gourmet Breakfast';
        } else if (nameLower.includes('coffee') || nameLower.includes('tea') || nameLower.includes('shake') || nameLower.includes('drink') || nameLower.includes('dawa') || nameLower.includes('lemonade') || nameLower.includes('smoothie')) {
            dishImg = 'logo.png';
            categoryBadge = '🥤 Barista Brew & Shake';
        } else if (nameLower.includes('tilapia') || nameLower.includes('fish')) {
            dishImg = 'order_dish_choma.png';
            categoryBadge = '🐟 Fresh Tilapia';
        }

        html += `
            <div class="order-item-row-luxury" data-id="${item.id}">
                <div class="order-item-main-info">
                    <div class="order-dish-image-frame">
                        <img src="${dishImg}" alt="${item.name}" class="dish-row-thumbnail">
                        <span class="order-badge-pill">${categoryBadge}</span>
                    </div>
                    <div class="order-dish-text-block">
                        <h3 class="order-dish-title">${item.name}</h3>
                        ${item.desc ? `<p class="order-dish-desc">${item.desc}</p>` : ''}
                        <div class="order-dish-price-tag">Unit Price: <strong>KSh ${item.price}</strong></div>
                    </div>
                </div>

                <div class="order-item-actions-block">
                    <div class="quantity-controls-pill">
                        <span class="qty-pill-label">Qty</span>
                        <div class="quantity-controls">
                            <button class="btn-qty-round" onclick="changeCartItemQty('${item.id}', -1)" aria-label="Decrease quantity">&minus;</button>
                            <span class="qty-number">${item.qty}</span>
                            <button class="btn-qty-round" onclick="changeCartItemQty('${item.id}', 1)" aria-label="Increase quantity">&plus;</button>
                        </div>
                    </div>

                    <div class="order-subtotal-box">
                        <span class="subtotal-label">Subtotal</span>
                        <span class="order-subtotal-amount">KSh ${itemSubtotal}/=</span>
                    </div>

                    <button class="btn-remove-pill" onclick="removeCartItem('${item.id}')" title="Remove Dish">
                        <span>Remove Item</span>
                    </button>
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;

    if (itemsCountEl) itemsCountEl.textContent = `${totalDishes} ${totalDishes === 1 ? 'Dish' : 'Dishes'}`;
    if (totalQtyEl) totalQtyEl.textContent = `${totalQuantity} ${totalQuantity === 1 ? 'Item' : 'Items'}`;
    if (totalAmountEl) totalAmountEl.textContent = `KSh ${totalPrice}/=`;
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
        if (totalAmountEl) totalAmountEl.textContent = "KSh 0/=";
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
                <strong style="color: var(--color-cream);">KSh ${itemSubtotal}/=</strong>
            </div>
        `;
    });

    summaryItemsEl.innerHTML = html;
    if (totalAmountEl) totalAmountEl.textContent = `KSh ${totalPrice}/=`;
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

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.25rem; color: var(--color-cream); margin-bottom: 12px;">Your order is currently empty.</p>
                <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 24px;">Explore our menu and add your favorite meals to view your order summary.</p>
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

    cart.forEach(item => {
        const itemSubtotal = item.numericPrice * item.qty;
        totalQuantity += item.qty;
        totalPrice += itemSubtotal;

        // Determine Dish Artwork Thumbnail & Category Badge
        const nameLower = item.name.toLowerCase();
        let dishImg = 'logo.png';
        let categoryBadge = '🥩 Main Dish';

        if (nameLower.includes('choma') || nameLower.includes('beef') || nameLower.includes('goat') || nameLower.includes('steak') || nameLower.includes('platter') || nameLower.includes('tumbukiza') || nameLower.includes('chemsha')) {
            dishImg = 'order_dish_choma.png';
            categoryBadge = '🔥 Wood-Fired Choma';
        } else if (nameLower.includes('breakfast') || nameLower.includes('pancake') || nameLower.includes('egg') || nameLower.includes('toast') || nameLower.includes('bite') || nameLower.includes('samosa') || nameLower.includes('combo')) {
            dishImg = 'order_dish_breakfast.png';
            categoryBadge = '🥞 Gourmet Breakfast';
        } else if (nameLower.includes('coffee') || nameLower.includes('tea') || nameLower.includes('shake') || nameLower.includes('drink') || nameLower.includes('dawa') || nameLower.includes('lemonade') || nameLower.includes('smoothie')) {
            dishImg = 'logo.png';
            categoryBadge = '🥤 Barista Brew & Shake';
        } else if (nameLower.includes('tilapia') || nameLower.includes('fish')) {
            dishImg = 'order_dish_choma.png';
            categoryBadge = '🐟 Fresh Tilapia';
        }

        html += `
            <div class="order-item-row-luxury" style="pointer-events: none;">
                <div class="order-item-main-info">
                    <div class="order-dish-image-frame">
                        <img src="${dishImg}" alt="${item.name}" class="dish-row-thumbnail">
                        <span class="order-badge-pill">${categoryBadge}</span>
                    </div>
                    <div class="order-dish-text-block">
                        <h3 class="order-dish-title">${item.name}</h3>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">
                            Quantity Selected: <strong style="color: var(--color-gold); font-size: 0.95rem;">${item.qty}</strong>
                        </div>
                        <div class="order-dish-price-tag">Unit Price: <strong>KSh ${item.price}</strong></div>
                    </div>
                </div>

                <div class="order-item-actions-block">
                    <div class="order-subtotal-box" style="align-items: flex-end;">
                        <span class="subtotal-label">Subtotal</span>
                        <span class="order-subtotal-amount" style="font-size: 1.5rem;">KSh ${itemSubtotal.toLocaleString()}/=</span>
                    </div>
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;

    if (dishesCountEl) dishesCountEl.textContent = `${totalDishes} ${totalDishes === 1 ? 'Dish' : 'Dishes'}`;
    if (totalQtyEl) totalQtyEl.textContent = `${totalQuantity} ${totalQuantity === 1 ? 'Item' : 'Items'}`;
    if (grandTotalEl) grandTotalEl.textContent = `KSh ${totalPrice.toLocaleString()}/=`;
}

