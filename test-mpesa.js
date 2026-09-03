require('dotenv').config();

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

async function runMpesaTest() {
    const key = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY || 'bfb272f961c03b2181dec339d3174465b91221406cc343a041a2e4f4d9b62af2';
    const shortcode = process.env.MPESA_SHORTCODE || '174379';
    const phone = '254793382017';

    console.log('--- Testing Safaricom Daraja STK Push ---');
    console.log(`Consumer Key: ${key ? key.substring(0, 6) + '...' : 'MISSING'}`);
    console.log(`Shortcode: ${shortcode}`);
    console.log(`Phone: ${phone}`);

    if (!key || key.includes('demo') || !secret || secret.includes('demo')) {
        console.error('❌ Error: MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET in .env still has placeholder / demo values. Please save your actual unmasked keys into .env!');
        return;
    }

    // 1. Get OAuth Token
    console.log('\n1. Requesting OAuth Access Token from Sandbox...');
    const authHeader = 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');
    const tokenRes = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: { 'Authorization': authHeader }
    });

    if (!tokenRes.ok) {
        const errText = await tokenRes.text();
        console.error(`❌ OAuth Failed (${tokenRes.status}):`, errText);
        return;
    }

    const tokenData = await tokenRes.json();
    console.log('✅ OAuth Token received successfully! Expires in:', tokenData.expires_in, 'seconds');
    const token = tokenData.access_token;

    // 2. Build STK Push Payload
    const timestamp = getTimestamp();
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const payload = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 1,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: "https://mydomain.com/api/mpesa/callback",
        AccountReference: "RibHouseTest",
        TransactionDesc: "Test STK Push"
    };

    console.log('\n2. Sending STK Push to Safaricom Sandbox for phone:', phone, 'Amount: 1 KSh...');
    const stkRes = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const stkData = await stkRes.json();
    console.log('\n--- Safaricom Response ---');
    console.log(JSON.stringify(stkData, null, 2));

    if (stkData.ResponseCode === '0') {
        console.log('\n🎉 SUCCESS! STK Push prompt successfully sent!');
        console.log('Customer Message:', stkData.CustomerMessage);
        console.log('CheckoutRequestID:', stkData.CheckoutRequestID);
    } else {
        console.error('\n❌ STK Push Error:', stkData.errorMessage || stkData.ResponseDescription);
    }
}

runMpesaTest();
