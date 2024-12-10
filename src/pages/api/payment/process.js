export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { email, planId, amount, paymentMethod, periodDays } = req.body;
  
        // Simulate payment processing (replace with your actual payment processing logic)
        const paymentSuccess = true; // Simulate a successful payment
  
        if (paymentSuccess) {
          // Create subscription in the database
          const subscription = await createSubscription(email, planId, periodDays);
          return res.status(200).json({ success: true, subscription });
        } else {
          return res.status(400).json({ success: false, message: 'Payment failed' });
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  // Function to create subscription
  async function createSubscription(email, planId, periodDays) {
    // Logic to find user by email and update their role
    const user = await User.findOne({ email });
    if (user) {
      user.role = 'membership';
      await user.save();
  
      // Logic to create a subscription record
      const subscription = new Subscription({
        userId: user._id,
        planId,
        startDate: new Date(),
        endDate: new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000), // Add periodDays to current date
        status: 'active',
      });
      await subscription.save();
      return subscription;
    }
    throw new Error('User  not found');
  }