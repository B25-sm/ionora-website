# Razorpay Test Integration — How to test locally

1. Add your Razorpay TEST keys to `.env.development`:
   - `RAZORPAY_KEY_ID` (`rzp_test_xxx`)
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET` (choose any string; set same in Dashboard > Webhooks > Add URL)

2. Start backend:
   - `NODE_ENV=development nodemon server.js`
   - Server listens on `PORT` (default 5000)

3. Serve frontend files:
   - For quick test, open `http://localhost:5000/public/index.html`
   - (Alternatively run a simple static server; Express can be configured to serve the public folder.)

4. Create ngrok tunnel for webhooks:
   - Install and run: `ngrok http 5000`
   - Note the https ngrok URL (e.g., `https://abcd1234.ngrok.io`)

5. In Razorpay Dashboard (Test mode):
   - Go to Developers → Webhooks → Add Webhook URL: `https://abcd1234.ngrok.io/webhooks/razorpay`
   - Set the webhook secret to match `RAZORPAY_WEBHOOK_SECRET` in `.env.development`.
   - Subscribe to events: `payment.captured`, `payment.failed`, `order.paid`, `refund.*` etc.

6. Create test offer (optional):
   - Switch to Test mode in Dashboard → Offers → Create No & Low Cost EMI
   - Grab the `offer_id` and pass it in create-order payload: `{ offers: [{ id: 'offer_xxx' }] }`

7. Use test cards & UPI flows available in Razorpay docs for testing.

