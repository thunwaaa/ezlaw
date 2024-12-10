// src/components/SubscriptionButton.js
import { useState } from 'react';
import axios from 'axios';

export default function SubscriptionButton({ planType }) {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            
            // Call your backend to create Stripe Checkout Session
            const response = await axios.post('/api/create-checkout-session', {
                planType,
                successUrl: `${window.location.origin}/subscription/success`,
                cancelUrl: `${window.location.origin}/subscription/cancel`
            });

            // Redirect to Stripe Checkout
            window.location.href = response.data.checkoutUrl;
        } catch (error) {
            console.error('Subscription error:', error);
            // Handle error (show message to user)
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleSubscribe} 
            disabled={loading}
        >
            {loading ? 'Processing...' : `Subscribe to ${planType} Plan`}
        </button>
    );
}