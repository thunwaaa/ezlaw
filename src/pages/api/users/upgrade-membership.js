export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { email, planId, periodDays } = req.body;
  
        // Logic to find user by email and update their role
        const user = await User.findOne({ email });
        if (user) {
          user.role = 'membership';
          await user.save();
  
          // Logic to update plan membership in MySQL
          await updatePlanMembership(user._id, planId, periodDays);
          return res.status(200).json({ success: true });
        }
        return res.status(404).json({ success: false, message: 'User  not found' });
      } catch (error) {
        console.error('Upgrade membership error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  // Function to update plan membership in MySQL
  async function updatePlanMembership(userId, planId, periodDays) {
    // Logic to update the user's plan membership in the MySQL database
    const endDate = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000);
    await mysqlConnection.query('UPDATE plan_memberships SET end_date = ? WHERE user_id = ? AND plan_id = ?', [endDate, userId, planId]);
  }