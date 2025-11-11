const express = require('express');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config({ path: '.env.development' });

const app = express();
const PORT = process.env.PORT || 5000;

// For normal JSON routes
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create an order (supports offers array)
app.post('/api/create-order', async (req, res) => {
  try {
    const { amountInPaise, currency = 'INR', receipt, offers } = req.body;
    if (!amountInPaise) {
      return res.status(400).json({ error: 'amountInPaise required' });
    }

    const options = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
      ...(offers ? { offers } : {})
    };

    const order = await razorpay.orders.create(options);
    return res.json(order);
  } catch (err) {
    console.error('create-order error', err);
    return res
      .status(500)
      .json({ error: 'order_creation_failed', details: err.message });
  }
});

// Verify checkout payment signature (POST from frontend handler)
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'missing parameters' });
    }
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected === razorpay_signature) {
      // TODO: persist payment record and mark order as paid in DB
      return res.json({ ok: true });
    } else {
      return res.status(400).json({ ok: false, error: 'Invalid signature' });
    }
  } catch (err) {
    console.error('verify-payment error', err);
    res.status(500).json({ error: 'verification_failed' });
  }
});

// Webhook endpoint - must use raw body for signature verification. Use express.raw for this route.
app.post('/webhooks/razorpay', bodyParser.raw({ type: '*/*' }), (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const generated = crypto
    .createHmac('sha256', webhookSecret)
    .update(req.body)
    .digest('hex');

  if (signature === generated) {
    // valid webhook
    const event = JSON.parse(req.body.toString());
    console.log(
      'Webhook received:',
      event.event,
      'payload id:',
      event.payload?.payment?.entity?.id
    );
    // TODO: handle events (payment.captured, payment.failed, refund.*) and update DB
    return res.status(200).send('ok');
  } else {
    console.warn('Invalid webhook signature');
    return res.status(400).send('invalid signature');
  }
});

// Basic health route
app.get('/', (req, res) =>
  res.send('Razorpay test integration backend running')
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
