import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { priceId, userEmail } = req.body;

        if (!priceId) {
            return res.status(400).json({ error: 'Price ID is required' });
        }

        if (!userEmail) {
            return res.status(400).json({ error: 'User email is required' });
        }

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
                customer_email: userEmail,
                // Optional: Add more Stripe checkout configuration
                subscription_data: {
                    // Additional subscription parameters if needed
                },
            });

            res.status(200).json({ id: session.id });
        } catch (err) {
            console.error('Error creating checkout session:', err.message);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
