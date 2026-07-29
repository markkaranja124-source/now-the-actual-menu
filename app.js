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
// 3. OFFLINE RIB HOUSE MENU AI ASSISTANT LOGIC
// ==========================================================================
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

    if (!triggerBtn || !drawer) return;

    // --- A. ROTATING SPEECH TEASER BUBBLE ---
    const teaserPrompts = [
        '💡 Ask me: "Dishes under 400/="',
        '☕ Ask me: "What comes in Pancake Breakfast?"',
        '🍗 Ask me: "Best platter for 4 people?"',
        '🔥 Ask me: "Goat vs Beef Choma prices"',
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

        // Show typing indicator momentarily for realism
        const typingEl = document.createElement('div');
        typingEl.className = 'ai-msg ai-msg-bot';
        typingEl.innerHTML = `<div class="ai-msg-bubble"><p style="opacity: 0.7;"><em>Thinking...</em></p></div>`;
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
                html += `
                    <div class="ai-dish-card">
                        <div class="ai-dish-header">
                            <span class="ai-dish-name">${card.name}</span>
                            <span class="ai-dish-price">${card.price}</span>
                        </div>
                        ${card.desc ? `<p class="ai-dish-desc">${card.desc}</p>` : ''}
                        ${card.targetId ? `<button class="ai-dish-link-btn" onclick="scrollToDishSection('${card.targetId}')">View in Menu &darr;</button>` : ''}
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
        { name: "PANCAKE BREAKFAST", price: "400/=", category: "breakfast", desc: "Tea, 2 pancakes and pan Fried Bacon", targetId: "bk-combos" },
        { name: "MINI BREAKFAST", price: "310/=", category: "breakfast", desc: "Tea, 2 fried egg, Toast, sausage, Small Glass Of Juice", targetId: "bk-combos" },
        { name: "RIB HOUSE BREAKFAST", price: "300/=", category: "breakfast", desc: "Tea, Liver and Chapati", targetId: "bk-combos" },
        { name: "MAIN BREAKFAST", price: "400/=", category: "breakfast", desc: "Tea, 2 Eggs, Beef Bacon/Sausages, Toast and glass of juice", targetId: "bk-combos" },
        { name: "GOAT SOUP BREAKFAST", price: "300/=", category: "breakfast", desc: "Piece of goat meat, goat soup, chapati and veges", targetId: "bk-combos" },
        { name: "CHICKEN SOUP BREAKFAST", price: "300/=", category: "breakfast", desc: "Piece of Chicken Kienyeji, chicken soup, chapati and veges", targetId: "bk-combos" },
        { name: "CHIPS COMBO", price: "300/=", category: "breakfast", desc: "Chips served with Tea / Egg / Andazi / Kachumbari", targetId: "bk-combos" },
        { name: "SAMOSA COMBO", price: "280/=", category: "breakfast", desc: "1 Egg / Samosa / Andazi / Tea", targetId: "bk-combos" },
        { name: "TRADITIONAL BREAKFAST", price: "300/=", category: "breakfast", desc: "Tea, Nduma / Ngwaci, Egg Kienyeji, veges", targetId: "bk-combos" },
        { name: "FARMERS CHOICE", price: "380/=", category: "breakfast", desc: "Tea, Beef bacon/Sausage and Toast", targetId: "bk-combos" },
        { name: "RIB HOUSE BITE", price: "200/=", category: "breakfast", desc: "Tea, Andazi and a Sausage", targetId: "bk-combos" },
        { name: "SPECIAL BREAKFAST", price: "220/=", category: "breakfast", desc: "Tea, 1 fried egg, toast and a sausage", targetId: "bk-combos" },
        { name: "RIB HOUSE SPECIAL", price: "310/=", category: "breakfast", desc: "Tea, Bacon/ 2 Sausages and Chapati", targetId: "bk-combos" },
        { name: "BRITISH BREAKFAST", price: "320/=", category: "breakfast", desc: "Tea, Liver and Toast", targetId: "bk-combos" },

        // Hot Beverages & Barista
        { name: "House Coffee White", price: "150/=", category: "hot-drinks", desc: "Rich brewed hot white coffee", targetId: "bk-hot" },
        { name: "House Coffee Black", price: "100/=", category: "hot-drinks", desc: "Pure black coffee brew", targetId: "bk-hot" },
        { name: "Black Coffee w Lemon", price: "110/=", category: "hot-drinks", desc: "Black coffee with fresh lemon slice", targetId: "bk-hot" },
        { name: "Latte Machiatto", price: "180/=", category: "hot-drinks", desc: "Espresso with velvety steamed milk foam", targetId: "bk-hot" },
        { name: "Lemon Tea w Honey", price: "150/=", category: "hot-drinks", desc: "Hot lemon tea sweetened with natural honey", targetId: "bk-hot" },
        { name: "Dawa", price: "200/=", category: "hot-drinks", desc: "Traditional immunity remedy brew (Lemon, Ginger & Honey)", targetId: "bk-hot" },
        { name: "Tea Masala White", price: "130/=", category: "hot-drinks", desc: "Spiced Kenya milk tea", targetId: "bk-hot" },
        { name: "Ginger Tea", price: "130/=", category: "hot-drinks", desc: "Warm infused ginger brew", targetId: "bk-hot" },

        // Cold Drinks & Shakes
        { name: "Milkshake (Flavored)", price: "250/=", category: "cold-drinks", desc: "Creamy thick milkshake", targetId: "bk-cold" },
        { name: "Oreo Shake", price: "300/=", category: "cold-drinks", desc: "Rich crushed Oreo chocolate shake", targetId: "bk-cold" },
        { name: "Smoothies (Tropical)", price: "200/=", category: "cold-drinks", desc: "Fresh blended tropical fruits", targetId: "bk-cold" },
        { name: "Ice Cream Scoops", price: "150/=", category: "cold-drinks", desc: "Chilled gourmet ice cream", targetId: "bk-cold" },
        { name: "Iced Coffee", price: "180/=", category: "cold-drinks", desc: "Cold brewed espresso over ice", targetId: "bk-cold" },

        // Main Dishes
        { name: "MATUMBO FRY", price: "From 400/=", category: "main", desc: "Ugali/Chapati (400/=), Rice/Mukimo (410/=), Pilau (500/=), Chips (540/=)", targetId: "main-dishes-grid" },
        { name: "BEEF STEW / FRY", price: "From 440/=", category: "main", desc: "Ugali/Chapati (440/=), Rice/Mukimo (450/=), Pilau (550/=), Chips (580/=)", targetId: "main-dishes-grid" },
        { name: "GOAT STEW / FRY", price: "From 490/=", category: "main", desc: "Ugali/Chapati (490/=), Rice/Mukimo (500/=), Pilau (600/=), Chips (630/=)", targetId: "main-dishes-grid" },
        { name: "BEEF STEAK GRILLED", price: "From 580/=", category: "main", desc: "Tender wood-fired beef steak served with side of choice", targetId: "main-dishes-grid" },
        { name: "CHICKEN WET / DRY FRY", price: "From 500/=", category: "main", desc: "Pan fried chicken with your choice of side dish", targetId: "main-dishes-grid" },
        { name: "TILAPIA FRY WHOLE", price: "From 570/=", category: "main", desc: "Crispy whole fried tilapia with side", targetId: "main-dishes-grid" },

        // Choma & Platters
        { name: "CHOMA BEEF (1 KG)", price: "1100/=", category: "choma", desc: "Slow roasted tender beef choma per KG", targetId: "meat-portions-grid" },
        { name: "CHOMA GOAT (1 KG)", price: "1200/=", category: "choma", desc: "Juicy grilled goat choma per KG", targetId: "meat-portions-grid" },
        { name: "CHEMSHA GOAT (1 KG)", price: "1300/=", category: "choma", desc: "Boiled flavorful goat stew/soup per KG", targetId: "meat-portions-grid" },
        { name: "BEEF / GOAT TUMBUKIZA (1 KG)", price: "1300/= / 1400/=", category: "choma", desc: "Rich wood-fired meat tumbukiza on order", targetId: "meat-portions-grid" },
        { name: "CHICKEN PLATTER FOR 4", price: "1900/=", category: "choma", desc: "Includes 2 Chicken Wet Fry, 2 Beef Fry, 1 Chips, 2 Ugali/Chapati, 2 Veggies & 4 Juices", targetId: "meat-portions-grid" }
    ];

    function generateAIReply(rawQuery) {
        const q = rawQuery.toLowerCase().trim();

        // 1. Greetings
        if (q.match(/^(hi|hello|hey|habari|mambo|sasa|good morning|good afternoon)/)) {
            return {
                text: "Habari! 😊 I am ready to help you choose the best meal. You can ask about **breakfast combos**, **choma & platters**, **dishes under a specific budget**, or **hot & cold drinks**!",
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

        // 3. Price Filter queries (e.g. "under 400", "under 500", "cheap", "budget")
        if (q.includes("under") || q.includes("cheap") || q.includes("budget") || q.includes("less than") || q.includes("400") || q.includes("500") || q.includes("300")) {
            let maxPrice = 500;
            if (q.includes("400")) maxPrice = 400;
            if (q.includes("300")) maxPrice = 300;
            if (q.includes("200")) maxPrice = 200;

            const matches = KNOWLEDGE.filter(item => {
                const num = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
                return num && num <= maxPrice;
            }).slice(0, 4);

            return {
                text: `Here are top delicious recommendations for your budget (**under ${maxPrice}/=**):`,
                cards: matches
            };
        }

        // 4. Group / Family Platter queries
        if (q.includes("4 people") || q.includes("group") || q.includes("family") || q.includes("platter") || q.includes("many people")) {
            const platter = KNOWLEDGE.find(item => item.name.includes("PLATTER FOR 4"));
            return {
                text: "🍗 **Best Option for Groups & Families:**\n\nOur **CHICKEN PLATTER FOR 4 (1900/=)** is designed for sharing! It comes fully loaded with chicken fry, beef fry, chips, ugali/chapati, veggies, and 4 juices.",
                cards: platter ? [platter] : []
            };
        }

        // 5. Breakfast & Combos
        if (q.includes("breakfast") || q.includes("morning") || q.includes("pancake") || q.includes("combo")) {
            const bMatches = KNOWLEDGE.filter(item => item.category === "breakfast").slice(0, 4);
            return {
                text: "☕ **Top Breakfast Combos & Specials:**\nAll breakfasts are served hot & fresh with tea!",
                cards: bMatches
            };
        }

        // 6. Choma & Chemsha & Tumbukiza
        if (q.includes("choma") || q.includes("chemsha") || q.includes("tumbukiza") || q.includes("kg") || q.includes("roasted")) {
            const cMatches = KNOWLEDGE.filter(item => item.category === "choma").slice(0, 4);
            return {
                text: "🔥 **Choma, Chemsha & Meat Portions by KG:**\nPrepared wood-fired over open flames:",
                cards: cMatches
            };
        }

        // 7. Goat Meat dishes
        if (q.includes("goat") || q.includes("mbuzi")) {
            const goatMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("goat"));
            return {
                text: "🐐 **Our Signature Goat Meat Dishes:**",
                cards: goatMatches
            };
        }

        // 8. Beef dishes
        if (q.includes("beef") || q.includes("steak")) {
            const beefMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("beef"));
            return {
                text: "🥩 **Juicy Beef Dishes & Steaks:**",
                cards: beefMatches.slice(0, 4)
            };
        }

        // 9. Chicken dishes
        if (q.includes("chicken") || q.includes("kienyeji")) {
            const chickenMatches = KNOWLEDGE.filter(item => item.name.toLowerCase().includes("chicken"));
            return {
                text: "🍗 **Chicken Dishes & Platter:**",
                cards: chickenMatches
            };
        }

        // 10. Shakes & Drinks
        if (q.includes("drink") || q.includes("coffee") || q.includes("shake") || q.includes("dawa") || q.includes("tea") || q.includes("beverage")) {
            const drinkMatches = KNOWLEDGE.filter(item => item.category === "hot-drinks" || item.category === "cold-drinks").slice(0, 4);
            return {
                text: "🥤 **Barista Brews, Shakes & Refreshing Drinks:**",
                cards: drinkMatches
            };
        }

        // Default Smart Search across knowledge base
        const generalMatches = KNOWLEDGE.filter(item => 
            item.name.toLowerCase().includes(q) || 
            item.desc.toLowerCase().includes(q)
        ).slice(0, 3);

        if (generalMatches.length > 0) {
            return {
                text: `Here are dishes matching "**${rawQuery}**":`,
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
        // Close AI drawer if active
        const drawer = document.getElementById('ai-chat-drawer');
        const overlay = document.getElementById('ai-drawer-overlay');
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');

        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

