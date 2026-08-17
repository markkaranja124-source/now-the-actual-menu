/**
 * RIB HOUSE - OFFICIAL BACKEND SERVER
 * Safaricom Daraja 2.0 M-Pesa Engine & Secure Admin Authentication System
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'ribhouse_secret_jwt_key_2026_super_secure_9921_woodfired';
const SESSION_EXPIRY_MINUTES = parseInt(process.env.SESSION_EXPIRY_MINUTES || '30', 10);
const MAX_FAILED_ATTEMPTS = parseInt(process.env.LOGIN_MAX_ATTEMPTS || '5', 10);
const LOCKOUT_MINUTES = parseInt(process.env.LOCKOUT_MINUTES || '15', 10);
const LOCKOUT_DURATION_MS = LOCKOUT_MINUTES * 60 * 1000;

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// -----------------------------------------------------------------------------
// PERSISTENT DATA STORAGE ENGINE (data/ directory)
// -----------------------------------------------------------------------------
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const AUTH_STORE_PATH = path.join(DATA_DIR, 'auth_store.json');
const FEEDBACK_STORE_PATH = path.join(DATA_DIR, 'feedback_store.json');
const ORDERS_STORE_PATH = path.join(DATA_DIR, 'orders_store.json');

function readJsonFile(filePath, defaultValue) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
            return defaultValue;
        }
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        console.error(`[DataStore Error] Failed to read ${filePath}:`, err.message);
        return defaultValue;
    }
}

function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (err) {
        console.error(`[DataStore Error] Failed to write ${filePath}:`, err.message);
        return false;
    }
}

// Initialise Auth Store with Salted Bcrypt Hashes (Default credentials if fresh)
function initAuthStore() {
    let authData = readJsonFile(AUTH_STORE_PATH, null);
    if (!authData || !authData.admin || !authData.kitchen) {
        console.log('[Security Initialisation] Seeding encrypted administrator & kitchen credentials...');
        const initialAdminPass = 'RibHouse@2026!Master';
        const initialKitchenPin = '1234';

        authData = {
            admin: {
                username: process.env.ADMIN_DEFAULT_USERNAME || 'admin',
                email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@ribhouse.co.ke',
                passwordHash: bcrypt.hashSync(initialAdminPass, 12),
                role: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            kitchen: {
                username: 'kitchen',
                pinHash: bcrypt.hashSync(initialKitchenPin, 12),
                role: 'kitchen',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
        writeJsonFile(AUTH_STORE_PATH, authData);
        console.log('[Security Initialisation] Bcrypt salted hashes stored in data/auth_store.json.');
    }
    return authData;
}

// Initialise Feedback Store
function initFeedbackStore() {
    let feedbacks = readJsonFile(FEEDBACK_STORE_PATH, null);
    if (!feedbacks || !Array.isArray(feedbacks)) {
        feedbacks = [
            {
                id: 1723790100000,
                date: '15 Aug 2026, 19:45',
                timestamp: 1723790100000,
                dish: 'CHOMA GOAT (1 KG)',
                group: 'Family Gathering',
                rating: 5,
                comments: 'The wood-fired char and tenderness on the choma goat was extraordinary! Best in Nairobi.',
                author: 'Samuel Mwangi'
            },
            {
                id: 1723785600000,
                date: '15 Aug 2026, 14:15',
                timestamp: 1723785600000,
                dish: 'BEEF STEAK (All Sides)',
                group: 'Business Lunch',
                rating: 5,
                comments: 'Quick service, juicy steak with mukimo special. Will definitely be returning with colleagues.',
                author: 'Amina K.'
            }
        ];
        writeJsonFile(FEEDBACK_STORE_PATH, feedbacks);
    }
    return feedbacks;
}

initAuthStore();
initFeedbackStore();

// -----------------------------------------------------------------------------
// AUTHENTICATION, PASSWORD COMPLEXITY & RATE-LIMITING ENGINE
// -----------------------------------------------------------------------------
const loginAttempts = new Map(); // key -> { count: number, lockedUntil: timestamp, firstFailed: timestamp }

function getAttemptKey(req, identifier) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const cleanId = (identifier || 'unknown').toString().toLowerCase().trim();
    return `${ip}_${cleanId}`;
}

function checkRateLimit(req, identifier) {
    const key = getAttemptKey(req, identifier);
    const record = loginAttempts.get(key);
    if (!record) return { allowed: true };

    const now = Date.now();
    if (record.lockedUntil && now < record.lockedUntil) {
        const remainingSec = Math.ceil((record.lockedUntil - now) / 1000);
        const remainingMin = Math.ceil(remainingSec / 60);
        return {
            allowed: false,
            locked: true,
            remainingSec,
            remainingMin,
            message: `Account temporarily locked due to repeated failed attempts. Please try again in ${remainingMin} minute${remainingMin > 1 ? 's' : ''}.`
        };
    }

    if (record.lockedUntil && now >= record.lockedUntil) {
        loginAttempts.delete(key);
        return { allowed: true };
    }

    return { allowed: true };
}

function recordFailedAttempt(req, identifier) {
    const key = getAttemptKey(req, identifier);
    const now = Date.now();
    const record = loginAttempts.get(key) || { count: 0, firstFailed: now, lockedUntil: 0 };

    record.count += 1;
    if (record.count >= MAX_FAILED_ATTEMPTS) {
        record.lockedUntil = now + LOCKOUT_DURATION_MS;
        loginAttempts.set(key, record);
        return {
            locked: true,
            attemptsLeft: 0,
            message: `Too many failed attempts. Account locked for ${LOCKOUT_MINUTES} minutes.`
        };
    }

    loginAttempts.set(key, record);
    return {
        locked: false,
        attemptsLeft: MAX_FAILED_ATTEMPTS - record.count
    };
}

function clearFailedAttempts(req, identifier) {
    const key = getAttemptKey(req, identifier);
    loginAttempts.delete(key);
}

// Password Requirements Validator (12+ chars, Uppercase, Lowercase, Number, Special char)
function validatePasswordComplexity(password) {
    if (!password || typeof password !== 'string') {
        return { valid: false, message: 'Password is required.' };
    }
    if (password.length < 12) {
        return { valid: false, message: 'Password must be at least 12 characters long.' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter (A-Z).' };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one lowercase letter (a-z).' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number (0-9).' };
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one special character (@, #, $, %, !, &, etc.).' };
    }
    return { valid: true };
}

// Generate Secure JWT Token
function generateSessionToken(userPayload) {
    return jwt.sign(
        {
            username: userPayload.username,
            role: userPayload.role,
            issuedAt: Date.now()
        },
        JWT_SECRET,
        { expiresIn: `${SESSION_EXPIRY_MINUTES}m` }
    );
}

// Verify Session Middleware
function requireAuth(allowedRoles = ['admin', 'kitchen']) {
    return (req, res, next) => {
        let token = req.cookies?.ribhouse_admin_session;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                authenticated: false,
                message: 'Authentication required. Please sign in.'
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    authenticated: true,
                    message: 'Forbidden: Insufficient administrator privileges.'
                });
            }
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                authenticated: false,
                message: 'Session expired or invalid. Please sign in again.'
            });
        }
    };
}

// -----------------------------------------------------------------------------
// AUTHENTICATION API ROUTES
// -----------------------------------------------------------------------------

// 1. Unified Sign-in Endpoint (Kitchen PIN or Master Admin Password)
app.post('/api/auth/login', (req, res) => {
    try {
        const { role, pin, username, password } = req.body;
        const targetRole = role === 'admin' ? 'admin' : 'kitchen';
        const identifier = targetRole === 'admin' ? (username || 'admin') : 'kitchen_staff';

        // Check Rate Limiting / Lockout Guard
        const rateCheck = checkRateLimit(req, identifier);
        if (!rateCheck.allowed) {
            return res.status(429).json({
                success: false,
                locked: true,
                message: rateCheck.message
            });
        }

        const authStore = readJsonFile(AUTH_STORE_PATH, {});

        if (targetRole === 'kitchen') {
            // Kitchen Staff PIN Authentication
            if (!pin) {
                return res.status(400).json({ success: false, message: 'Invalid credentials.' });
            }

            const kitchenRecord = authStore.kitchen;
            const isMatch = kitchenRecord?.pinHash && bcrypt.compareSync(pin.toString().trim(), kitchenRecord.pinHash);

            if (!isMatch) {
                const failStatus = recordFailedAttempt(req, identifier);
                const msg = failStatus.locked
                    ? failStatus.message
                    : 'Invalid credentials.';
                return res.status(failStatus.locked ? 429 : 401).json({
                    success: false,
                    locked: failStatus.locked,
                    message: msg,
                    attemptsLeft: failStatus.attemptsLeft
                });
            }

            clearFailedAttempts(req, identifier);
            const token = generateSessionToken({ username: 'kitchen', role: 'kitchen' });

            res.cookie('ribhouse_admin_session', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: SESSION_EXPIRY_MINUTES * 60 * 1000
            });

            return res.json({
                success: true,
                role: 'kitchen',
                token: token,
                user: { username: 'Kitchen Crew', role: 'kitchen' }
            });

        } else {
            // Master Admin Password Authentication
            if (!password) {
                return res.status(400).json({ success: false, message: 'Invalid email or password.' });
            }

            const adminRecord = authStore.admin;
            const isMatch = adminRecord?.passwordHash && bcrypt.compareSync(password.toString(), adminRecord.passwordHash);

            if (!isMatch) {
                const failStatus = recordFailedAttempt(req, identifier);
                const msg = failStatus.locked
                    ? failStatus.message
                    : 'Invalid email or password.';
                return res.status(failStatus.locked ? 429 : 401).json({
                    success: false,
                    locked: failStatus.locked,
                    message: msg,
                    attemptsLeft: failStatus.attemptsLeft
                });
            }

            clearFailedAttempts(req, identifier);
            const token = generateSessionToken({ username: adminRecord.username || 'admin', role: 'admin' });

            res.cookie('ribhouse_admin_session', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: SESSION_EXPIRY_MINUTES * 60 * 1000
            });

            return res.json({
                success: true,
                role: 'admin',
                token: token,
                user: { username: adminRecord.username || 'Master Admin', role: 'admin' }
            });
        }
    } catch (err) {
        console.error('[Auth Login Error]:', err);
        res.status(500).json({ success: false, message: 'An error occurred during authentication.' });
    }
});

// 2. Session Status Verification Endpoint
app.get('/api/auth/session', (req, res) => {
    let token = req.cookies?.ribhouse_admin_session;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.json({ authenticated: false, role: null });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.json({
            authenticated: true,
            role: decoded.role,
            username: decoded.username,
            expiresInMinutes: SESSION_EXPIRY_MINUTES
        });
    } catch (err) {
        return res.json({ authenticated: false, role: null, expired: true });
    }
});

// 3. Logout Endpoint
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('ribhouse_admin_session', {
        httpOnly: true,
        sameSite: 'strict'
    });
    res.json({ success: true, message: 'Logged out successfully.' });
});

// 4. Change Master Admin Password (Requires Admin Role & 12+ Char Complexity)
app.post('/api/auth/change-password', requireAuth(['admin']), (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'New password and confirmation password do not match.' });
        }

        // Validate Password Complexity
        const complexityCheck = validatePasswordComplexity(newPassword);
        if (!complexityCheck.valid) {
            return res.status(400).json({ success: false, message: complexityCheck.message });
        }

        const authStore = readJsonFile(AUTH_STORE_PATH, {});
        const adminRecord = authStore.admin;

        // Verify current password
        const isCurrentValid = adminRecord?.passwordHash && bcrypt.compareSync(currentPassword, adminRecord.passwordHash);
        if (!isCurrentValid) {
            return res.status(401).json({ success: false, message: 'Current password verification failed.' });
        }

        // Hash new password with Bcrypt (12 salt rounds)
        adminRecord.passwordHash = bcrypt.hashSync(newPassword, 12);
        adminRecord.updatedAt = new Date().toISOString();
        authStore.admin = adminRecord;

        writeJsonFile(AUTH_STORE_PATH, authStore);

        console.log('🔐 [Security Update] Administrator password updated and securely re-hashed with Bcrypt.');

        res.json({
            success: true,
            message: 'Administrator password updated successfully.'
        });
    } catch (err) {
        console.error('[Change Password Error]:', err);
        res.status(500).json({ success: false, message: 'Failed to update administrator password.' });
    }
});

// 5. Change Kitchen Staff PIN (Admin Only)
app.post('/api/auth/change-kitchen-pin', requireAuth(['admin']), (req, res) => {
    try {
        const { newPin } = req.body;
        const cleanPin = (newPin || '').toString().trim();

        if (!cleanPin || cleanPin.length < 4 || cleanPin.length > 8 || !/^\d+$/.test(cleanPin)) {
            return res.status(400).json({ success: false, message: 'Kitchen PIN must be between 4 and 8 digits.' });
        }

        const authStore = readJsonFile(AUTH_STORE_PATH, {});
        authStore.kitchen = {
            ...authStore.kitchen,
            pinHash: bcrypt.hashSync(cleanPin, 12),
            updatedAt: new Date().toISOString()
        };

        writeJsonFile(AUTH_STORE_PATH, authStore);
        console.log('🔐 [Security Update] Kitchen Staff PIN updated with Bcrypt hash.');

        res.json({
            success: true,
            message: 'Kitchen Staff PIN updated successfully.'
        });
    } catch (err) {
        console.error('[Change Kitchen PIN Error]:', err);
        res.status(500).json({ success: false, message: 'Failed to update kitchen PIN.' });
    }
});

// -----------------------------------------------------------------------------
// PUBLIC CUSTOMER FEEDBACK & REVIEW INGESTION API
// -----------------------------------------------------------------------------

// Customer submits feedback from public index.html
app.post('/api/feedback', (req, res) => {
    try {
        const { dish, group, rating, comments, author } = req.body;

        const ratingNum = parseInt(rating, 10) || 5;
        const cleanRating = Math.min(Math.max(ratingNum, 1), 5);
        const cleanDish = (dish || 'General Experience').toString().substring(0, 100).trim();
        const cleanGroup = (group || 'Solo Diners').toString().substring(0, 50).trim();
        const cleanComments = (comments || '').toString().substring(0, 1000).trim();
        const cleanAuthor = (author || 'Guest').toString().substring(0, 60).trim();

        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const newFeedback = {
            id: Date.now(),
            date: formattedDate,
            timestamp: Date.now(),
            dish: cleanDish,
            group: cleanGroup,
            rating: cleanRating,
            comments: cleanComments,
            author: cleanAuthor
        };

        const feedbacks = readJsonFile(FEEDBACK_STORE_PATH, []);
        feedbacks.unshift(newFeedback);
        writeJsonFile(FEEDBACK_STORE_PATH, feedbacks);

        console.log(`[Customer Feedback Ingested] Rating: ${cleanRating}/5 by ${cleanAuthor} for "${cleanDish}"`);

        res.status(201).json({
            success: true,
            message: 'Asante Sana! Your feedback has been received.',
            feedback: newFeedback
        });
    } catch (err) {
        console.error('[Feedback Submission Error]:', err);
        res.status(500).json({ success: false, message: 'Failed to save customer review.' });
    }
});

// -----------------------------------------------------------------------------
// PROTECTED ADMIN & OWNER PORTAL API ENDPOINTS
// -----------------------------------------------------------------------------

// Fetch Feedback & Computed Analytics (Master Admin / Owner Only)
app.get('/api/admin/feedback', requireAuth(['admin']), (req, res) => {
    try {
        const feedbacks = readJsonFile(FEEDBACK_STORE_PATH, []);

        // Compute real-time analytics
        const totalReviews = feedbacks.length;
        let avgRating = '5.0';
        let topDish = '-';

        if (totalReviews > 0) {
            const sum = feedbacks.reduce((acc, f) => acc + (f.rating || 5), 0);
            avgRating = (sum / totalReviews).toFixed(1);

            const dishCounts = {};
            feedbacks.forEach(f => {
                const d = f.dish || 'General Experience';
                if (d !== 'General Experience') {
                    dishCounts[d] = (dishCounts[d] || 0) + 1;
                }
            });

            let maxCount = 0;
            for (const [dishName, count] of Object.entries(dishCounts)) {
                if (count > maxCount) {
                    maxCount = count;
                    topDish = dishName;
                }
            }
            if (topDish === '-' && feedbacks.length > 0) {
                topDish = feedbacks[0].dish;
            }
        }

        res.json({
            success: true,
            feedbacks: feedbacks,
            analytics: {
                totalReviews: totalReviews,
                avgRating: avgRating,
                topDish: topDish
            }
        });
    } catch (err) {
        console.error('[Admin Feedback Fetch Error]:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch customer reviews.' });
    }
});

// Clear or Delete Feedback (Master Admin Only)
app.delete('/api/admin/feedback', requireAuth(['admin']), (req, res) => {
    try {
        const { id } = req.body || {};
        let feedbacks = readJsonFile(FEEDBACK_STORE_PATH, []);

        if (id) {
            feedbacks = feedbacks.filter(f => f.id !== id);
        } else {
            feedbacks = [];
        }

        writeJsonFile(FEEDBACK_STORE_PATH, feedbacks);
        res.json({ success: true, message: 'Customer feedback updated.' });
    } catch (err) {
        console.error('[Admin Feedback Delete Error]:', err);
        res.status(500).json({ success: false, message: 'Failed to delete customer feedback.' });
    }
});

// -----------------------------------------------------------------------------
// IN-MEMORY / PERSISTENT TRANSACTION STORE (M-PESA)
// -----------------------------------------------------------------------------
const transactions = new Map();
const activeOrders = new Map();

// Helper to format Kenyan phone numbers to 254XXXXXXXXX
function formatPhoneNumber(phone) {
    if (!phone) return null;
    let cleaned = phone.toString().replace(/[\s\-\+]/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '254' + cleaned.substring(1);
    } else if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
        cleaned = '254' + cleaned;
    }
    return cleaned;
}

// Helper to generate Safaricom Timestamp (YYYYMMDDHHmmss) in East Africa Time (UTC+3)
function getTimestamp() {
    const now = new Date();
    const eat = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
    const year = eat.getFullYear();
    const month = String(eat.getMonth() + 1).padStart(2, '0');
    const day = String(eat.getDate()).padStart(2, '0');
    const hour = String(eat.getHours()).padStart(2, '0');
    const minute = String(eat.getMinutes()).padStart(2, '0');
    const second = String(eat.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}${second}`;
}

// -----------------------------------------------------------------------------
// DARAJA 2.0 OAUTH TOKEN GENERATOR
// -----------------------------------------------------------------------------
let cachedToken = null;
let tokenExpiry = 0;

async function getDarajaToken() {
    const env = (process.env.MPESA_ENVIRONMENT || 'sandbox').toLowerCase();
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || consumerKey.includes('demo') || !consumerSecret || consumerSecret.includes('demo')) {
        return null;
    }

    if (cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    const authUrl = env === 'production'
        ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const res = await fetch(authUrl, {
        method: 'GET',
        headers: {
            'Authorization': authHeader
        }
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Safaricom OAuth Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + (parseInt(data.expires_in, 10) - 60) * 1000;
    return cachedToken;
}

// -----------------------------------------------------------------------------
// 1. INITIATE M-PESA STK PUSH (Lipa Na M-Pesa Online)
// -----------------------------------------------------------------------------
app.post('/api/mpesa/stkpush', async (req, res) => {
    try {
        const { phone, amount, orderRef, diningType, customerName, specialNotes } = req.body;

        if (!phone || !amount || !orderRef) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: phone, amount, or orderRef'
            });
        }

        const formattedPhone = formatPhoneNumber(phone);
        if (!formattedPhone || formattedPhone.length !== 12) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number format. Please provide a valid Safaricom number (e.g. 0712345678).'
            });
        }

        const roundedAmount = Math.ceil(parseFloat(amount));
        const timestamp = getTimestamp();
        const shortcode = process.env.MPESA_SHORTCODE || '174379';
        const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
        const tillNumber = process.env.MPESA_TILL_NUMBER || '4977556';
        const callbackUrl = process.env.MPESA_CALLBACK_URL || `http://localhost:${PORT}/api/mpesa/callback`;
        const env = (process.env.MPESA_ENVIRONMENT || 'sandbox').toLowerCase();

        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

        let token = null;
        try {
            token = await getDarajaToken();
        } catch (authErr) {
            console.warn('[Daraja Auth Notice]:', authErr.message);
        }

        let checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        let merchantRequestId = `MR_${Date.now()}`;
        let responseMessage = 'STK Push prompt initiated.';
        let isSimulated = false;

        if (token) {
            const stkUrl = env === 'production'
                ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
                : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

            const transactionType = shortcode === '174379'
                ? 'CustomerPayBillOnline'
                : 'CustomerBuyGoodsOnline';

            const payload = {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: transactionType,
                Amount: roundedAmount,
                PartyA: formattedPhone,
                PartyB: shortcode === '174379' ? shortcode : tillNumber,
                PhoneNumber: formattedPhone,
                CallBackURL: callbackUrl,
                AccountReference: orderRef.substring(0, 12),
                TransactionDesc: `Rib House Order ${orderRef.substring(0, 12)}`
            };

            console.log(`[STK Push Request] Sending ${roundedAmount} KSh to ${formattedPhone}...`);

            const darajaRes = await fetch(stkUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const darajaData = await darajaRes.json();

            if (darajaData.ResponseCode === '0') {
                checkoutRequestId = darajaData.CheckoutRequestID;
                merchantRequestId = darajaData.MerchantRequestID;
                responseMessage = darajaData.CustomerMessage || 'Lipa Na M-Pesa PIN prompt sent to your phone.';
                console.log(`[STK Push Sent Successfully] CheckoutRequestID: ${checkoutRequestId}`);
            } else {
                console.error('[Daraja STK Push Error Response]:', darajaData);
                return res.status(400).json({
                    success: false,
                    message: darajaData.errorMessage || darajaData.ResponseDescription || 'Failed to trigger STK Push.',
                    details: darajaData
                });
            }
        } else {
            isSimulated = true;
            console.log(`[Dev Simulation Mode] STK Push prompt simulated for ${formattedPhone} (KSh ${roundedAmount})`);
            responseMessage = `[TEST MODE] PIN prompt sent to ${formattedPhone}. In test mode, you can enter any code or click 'Simulate Payment' to confirm.`;
        }

        const txnRecord = {
            orderRef: orderRef,
            checkoutRequestId: checkoutRequestId,
            merchantRequestId: merchantRequestId,
            phone: formattedPhone,
            amount: roundedAmount,
            status: 'PENDING_CONFIRMATION',
            isSimulated: isSimulated,
            timestamp: Date.now(),
            customerName: customerName || '',
            diningType: diningType || '',
            specialNotes: specialNotes || '',
            receipt: null
        };

        transactions.set(orderRef, txnRecord);
        transactions.set(checkoutRequestId, txnRecord);

        res.json({
            success: true,
            checkoutRequestId: checkoutRequestId,
            merchantRequestId: merchantRequestId,
            orderRef: orderRef,
            phone: formattedPhone,
            amount: roundedAmount,
            message: responseMessage,
            isSimulated: isSimulated
        });

    } catch (err) {
        console.error('[STK Push Exception]:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error while processing M-Pesa STK Push.',
            error: err.message
        });
    }
});

// -----------------------------------------------------------------------------
// 2. SAFARICOM DARAJA WEBHOOK CALLBACK LISTENER
// -----------------------------------------------------------------------------
app.post('/api/mpesa/callback', (req, res) => {
    try {
        console.log('====== [SAFARICOM CALLBACK RECEIVED] ======');
        console.log(JSON.stringify(req.body, null, 2));

        const callbackData = req.body?.Body?.stkCallback;
        if (!callbackData) {
            return res.json({ ResultCode: 0, ResultDesc: 'No callback body' });
        }

        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
        } = callbackData;

        let existingTxn = transactions.get(CheckoutRequestID);

        if (ResultCode === 0) {
            let mpesaReceipt = '';
            let amount = 0;
            let transDate = '';
            let phone = '';

            if (CallbackMetadata && Array.isArray(CallbackMetadata.Item)) {
                for (const item of CallbackMetadata.Item) {
                    if (item.Name === 'MpesaReceiptNumber') mpesaReceipt = item.Value;
                    if (item.Name === 'Amount') amount = item.Value;
                    if (item.Name === 'TransactionDate') transDate = item.Value;
                    if (item.Name === 'PhoneNumber') phone = item.Value;
                }
            }

            console.log(`[PAYMENT CONFIRMED]: Receipt=${mpesaReceipt}, Amount=KSh ${amount}, Phone=${phone}`);

            if (existingTxn) {
                existingTxn.status = 'PAID';
                existingTxn.receipt = mpesaReceipt;
                existingTxn.paidAmount = amount;
                existingTxn.paidAt = transDate || new Date().toISOString();
                existingTxn.verifiedPhone = phone;

                transactions.set(existingTxn.orderRef, existingTxn);
            } else {
                transactions.set(CheckoutRequestID, {
                    checkoutRequestId: CheckoutRequestID,
                    status: 'PAID',
                    receipt: mpesaReceipt,
                    paidAmount: amount,
                    paidAt: transDate,
                    verifiedPhone: phone
                });
            }
        } else {
            console.warn(`❌ [PAYMENT FAILED/CANCELLED]: Code=${ResultCode}, Desc=${ResultDesc}`);
            if (existingTxn) {
                existingTxn.status = 'FAILED';
                existingTxn.failureReason = ResultDesc;
                transactions.set(existingTxn.orderRef, existingTxn);
            }
        }

        res.json({
            ResultCode: 0,
            ResultDesc: 'Callback processed successfully'
        });

    } catch (err) {
        console.error('[Callback Processing Error]:', err);
        res.json({ ResultCode: 0, ResultDesc: 'Callback handled with error' });
    }
});

// -----------------------------------------------------------------------------
// 3. FRONTEND PAYMENT STATUS POLLING
// -----------------------------------------------------------------------------
app.get('/api/mpesa/status/:orderRef', (req, res) => {
    const { orderRef } = req.params;
    const txn = transactions.get(orderRef);

    if (!txn) {
        return res.json({
            success: false,
            status: 'NOT_FOUND',
            message: 'No transaction found for this order reference.'
        });
    }

    res.json({
        success: true,
        orderRef: txn.orderRef,
        checkoutRequestId: txn.checkoutRequestId,
        status: txn.status,
        receipt: txn.receipt || null,
        amount: txn.amount,
        phone: txn.phone,
        failureReason: txn.failureReason || null,
        isSimulated: txn.isSimulated || false
    });
});

// -----------------------------------------------------------------------------
// 4. DIRECT DARAJA STK QUERY (FALLBACK IF CALLBACK IS DELAYED)
// -----------------------------------------------------------------------------
app.get('/api/mpesa/query/:checkoutRequestId', async (req, res) => {
    try {
        const { checkoutRequestId } = req.params;
        const txn = transactions.get(checkoutRequestId);

        const env = (process.env.MPESA_ENVIRONMENT || 'sandbox').toLowerCase();
        const shortcode = process.env.MPESA_SHORTCODE || '174379';
        const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
        const timestamp = getTimestamp();
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

        let token = null;
        try {
            token = await getDarajaToken();
        } catch (e) {}

        if (!token) {
            return res.json({
                success: true,
                status: txn ? txn.status : 'PENDING_CONFIRMATION',
                receipt: txn?.receipt || null
            });
        }

        const queryUrl = env === 'production'
            ? 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query'
            : 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';

        const darajaRes = await fetch(queryUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                CheckoutRequestID: checkoutRequestId
            })
        });

        const queryData = await darajaRes.json();

        if (queryData.ResultCode === '0') {
            if (txn) {
                txn.status = 'PAID';
                if (!txn.receipt) {
                    txn.receipt = `MPESA_${Date.now().toString().slice(-8)}`;
                }
                transactions.set(txn.orderRef, txn);
            }
        }

        res.json({
            success: true,
            queryData: queryData,
            status: txn ? txn.status : 'PENDING_CONFIRMATION',
            receipt: txn?.receipt || null
        });

    } catch (err) {
        console.error('[STK Query Error]:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// -----------------------------------------------------------------------------
// 5. SIMULATE SUCCESSFUL PAYMENT
// -----------------------------------------------------------------------------
app.post('/api/mpesa/simulate-success', (req, res) => {
    const { orderRef, code, amount } = req.body;
    if (!orderRef) {
        return res.status(400).json({ success: false, message: 'orderRef is required' });
    }

    const receipt = code || `SIM${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const txn = transactions.get(orderRef) || {
        orderRef: orderRef,
        checkoutRequestId: `sim_CO_${Date.now()}`,
        phone: '254700000000',
        amount: amount || 1000,
        timestamp: Date.now()
    };

    txn.status = 'PAID';
    txn.receipt = receipt;
    txn.paidAmount = amount || txn.amount;
    txn.paidAt = new Date().toISOString();

    transactions.set(orderRef, txn);
    transactions.set(txn.checkoutRequestId, txn);

    console.log(`⚡ [Simulated Payment Triggered] Order: ${orderRef} -> Receipt: ${receipt}`);

    res.json({
        success: true,
        message: 'Payment simulation successful.',
        orderRef: orderRef,
        receipt: receipt,
        status: 'PAID'
    });
});

// -----------------------------------------------------------------------------
// 6. HEALTH & CONFIGURATION STATUS
// -----------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
    res.json({
        service: 'Rib House M-Pesa & Security Engine',
        status: 'online',
        timestamp: new Date().toISOString(),
        environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
        tillNumber: process.env.MPESA_TILL_NUMBER || '4977556',
        hotline: process.env.HOTLINE_NUMBER || '0724 594 204'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`RIB HOUSE SERVER RUNNING ON: http://localhost:${PORT}`);
    console.log(`Safaricom M-Pesa Till: ${process.env.MPESA_TILL_NUMBER || '4977556'}`);
    console.log(`Bcrypt Hashed Authentication & Session Engine: ACTIVE`);
    console.log(`Persistent Database Reviews Engine: ACTIVE`);
    console.log(`Environment: ${process.env.MPESA_ENVIRONMENT || 'sandbox'}`);
    console.log(`=======================================================`);
});
