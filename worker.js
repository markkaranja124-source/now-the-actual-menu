/**
 * RIB HOUSE - CLOUDFLARE WORKER & SAFARICOM DARAJA 2.0 ENGINE
 * Handles Live M-Pesa STK Push, Callback Webhooks & Static Assets Delivery
 */

const transactions = new Map();

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

let cachedToken = null;
let tokenExpiry = 0;

async function getDarajaToken(env) {
    const consumerKey = env.MPESA_CONSUMER_KEY;
    const consumerSecret = env.MPESA_CONSUMER_SECRET;
    const mpesaEnv = (env.MPESA_ENVIRONMENT || 'sandbox').toLowerCase();

    if (!consumerKey || consumerKey.includes('demo') || !consumerSecret || consumerSecret.includes('demo')) {
        return null;
    }

    if (cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    const authUrl = mpesaEnv === 'production'
        ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const authHeader = 'Basic ' + btoa(`${consumerKey}:${consumerSecret}`);

    const res = await fetch(authUrl, {
        method: 'GET',
        headers: { 'Authorization': authHeader }
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

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // 1. STK PUSH ROUTE
        if (url.pathname === '/api/mpesa/stkpush' && request.method === 'POST') {
            try {
                const body = await request.json();
                const { phone, amount, orderRef, diningType, customerName, specialNotes } = body;

                if (!phone || !amount || !orderRef) {
                    return new Response(JSON.stringify({
                        success: false,
                        message: 'Missing required parameters: phone, amount, or orderRef'
                    }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
                }

                const formattedPhone = formatPhoneNumber(phone);
                if (!formattedPhone || formattedPhone.length !== 12) {
                    return new Response(JSON.stringify({
                        success: false,
                        message: 'Invalid phone number format. Please provide a valid Safaricom number (e.g. 0712345678).'
                    }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
                }

                const roundedAmount = Math.ceil(parseFloat(amount));
                const timestamp = getTimestamp();
                const shortcode = env.MPESA_SHORTCODE || '174379';
                const passkey = env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
                const tillNumber = env.MPESA_TILL_NUMBER || '4977556';
                const callbackUrl = env.MPESA_CALLBACK_URL || `${url.origin}/api/mpesa/callback`;
                const mpesaEnv = (env.MPESA_ENVIRONMENT || 'sandbox').toLowerCase();

                const password = btoa(`${shortcode}${passkey}${timestamp}`);

                let token = null;
                try {
                    token = await getDarajaToken(env);
                } catch (authErr) {
                    console.warn('[Daraja Auth Error]:', authErr.message);
                }

                let checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
                let merchantRequestId = `MR_${Date.now()}`;
                let responseMessage = 'STK Push prompt initiated.';
                let isSimulated = false;

                if (token) {
                    const stkUrl = mpesaEnv === 'production'
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
                    } else {
                        return new Response(JSON.stringify({
                            success: false,
                            message: darajaData.errorMessage || darajaData.ResponseDescription || 'Failed to trigger STK Push.',
                            details: darajaData
                        }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
                    }
                } else {
                    isSimulated = true;
                    responseMessage = `[TEST MODE] PIN prompt sent to ${formattedPhone}.`;
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

                return new Response(JSON.stringify({
                    success: true,
                    checkoutRequestId: checkoutRequestId,
                    merchantRequestId: merchantRequestId,
                    orderRef: orderRef,
                    phone: formattedPhone,
                    amount: roundedAmount,
                    message: responseMessage,
                    isSimulated: isSimulated
                }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

            } catch (err) {
                return new Response(JSON.stringify({
                    success: false,
                    message: 'Internal server error while processing M-Pesa STK Push.',
                    error: err.message
                }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }
        }

        // 2. STATUS POLLING ROUTE
        if (url.pathname.startsWith('/api/mpesa/status/')) {
            const orderRef = decodeURIComponent(url.pathname.replace('/api/mpesa/status/', ''));
            const txn = transactions.get(orderRef);
            if (!txn) {
                return new Response(JSON.stringify({
                    success: true,
                    status: 'PENDING_CONFIRMATION',
                    orderRef: orderRef
                }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }
            return new Response(JSON.stringify({
                success: true,
                status: txn.status,
                receipt: txn.receipt,
                orderRef: txn.orderRef
            }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // 3. SAFARICOM CALLBACK ROUTE
        if (url.pathname === '/api/mpesa/callback' && request.method === 'POST') {
            try {
                const body = await request.json();
                const callbackData = body?.Body?.stkCallback;
                if (callbackData) {
                    const { CheckoutRequestID, ResultCode, CallbackMetadata } = callbackData;
                    let txn = transactions.get(CheckoutRequestID);
                    if (ResultCode === 0) {
                        let receipt = '';
                        if (CallbackMetadata && Array.isArray(CallbackMetadata.Item)) {
                            for (const item of CallbackMetadata.Item) {
                                if (item.Name === 'MpesaReceiptNumber') receipt = item.Value;
                            }
                        }
                        if (txn) {
                            txn.status = 'PAID';
                            txn.receipt = receipt;
                        }
                    } else if (txn) {
                        txn.status = 'FAILED';
                    }
                }
                return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: 'Accepted' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (e) {
                return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: 'Error processed' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // 4. SIMULATE CONFIRM (if customer manually enters receipt or for sandbox fallback)
        if (url.pathname === '/api/mpesa/simulate-confirm' && request.method === 'POST') {
            try {
                const body = await request.json();
                const { orderRef, receiptCode } = body;
                const txn = transactions.get(orderRef);
                const code = receiptCode || `RH${Date.now().toString().slice(-8)}`;
                if (txn) {
                    txn.status = 'PAID';
                    txn.receipt = code;
                }
                return new Response(JSON.stringify({ success: true, status: 'PAID', receipt: code }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (e) {
                return new Response(JSON.stringify({ success: false, error: e.message }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // FALLBACK: Serve static assets with high-performance edge & browser caching
        const assetResponse = await env.ASSETS.fetch(request);
        const newHeaders = new Headers(assetResponse.headers);
        const pathname = url.pathname.toLowerCase();

        // 1. Static images & media - Cache for 1 year immutable
        if (/\.(webp|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/.test(pathname)) {
            newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
        }
        // 2. CSS and JS bundles - Cache with stale-while-revalidate
        else if (/\.(css|js)$/.test(pathname)) {
            newHeaders.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        }
        // 3. HTML pages - Fast 5-minute browser cache + background revalidation
        else {
            newHeaders.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
        }

        return new Response(assetResponse.body, {
            status: assetResponse.status,
            statusText: assetResponse.statusText,
            headers: newHeaders
        });
    }
};
