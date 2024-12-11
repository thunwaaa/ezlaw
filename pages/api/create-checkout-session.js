import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { priceId, userEmail, userId } = req.body;

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
                success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/consult?session_id={CHECKOUT_SESSION_ID}`, // Use a query param to include the session ID for easy reference
                cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
                customer_email: userEmail,
                subscription_data: {
                    metadata: {
                        user_id: userId, // Include additional metadata to associate the subscription with the user
                        source: 'website', // Track where the subscription was originated
                    },
                },
            });
            try{
                const res = await fetch("http://localhost:8080/api/auth/logout",{
                    method: "POST",
                    credentials: "include"
                });
                if(res.ok){
                    console.log("logout success");
                    setIsLoggedIn(false);
                    window.location.reload();
                    router.push("/");
                }
            }catch(error){
                console.error("error logout");
            }
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
