// pages/api/plans/[planId].js

const plans = [
    { id: 'weekly', name: 'รายสัปดาห์', price: 29, duration: '/สัปดาห์', periodDays: 7 },
    { id: 'monthly', name: 'รายเดือน', price: 59, duration: '/เดือน', periodDays: 30 },
    { id: 'yearly', name: 'รายปี', price: 99, duration: '/ปี', periodDays: 365 },
  ];
  
  export default function handler(req, res) {
    const {
      query: { planId },
    } = req;
  
    const plan = plans.find((p) => p.id === planId);
  
    if (plan) {
      res.status(200).json({ available: true, ...plan });
    } else {
      res.status(404).json({ available: false });
    }
  }