import Stripe from 'stripe';

const stripe = new Stripe('your-stripe-secret-key'); // Replace with your Stripe secret key

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, paymentMethod, fullName, phoneNumber, plan } = req.body;

    try {
      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: [paymentMethod],
        mode: 'payment',
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'thb',
              product_data: {
                name: plan.name,
              },
              unit_amount: plan.price * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership`,
      });

      res.status(200).json({ success: true, sessionId: session.id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
