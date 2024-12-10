'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const plans = [
  { id: 'weekly', name: 'รายสัปดาห์', price: 29, duration: '/สัปดาห์', periodDays: 7 },
  { id: 'monthly', name: 'รายเดือน', price: 59, duration: '/เดือน', periodDays: 30 },
  { id: 'yearly', name: 'รายปี', price: 99, duration: '/ปี', periodDays: 365 },
];

export default function MembershipPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSubscribe = async (plan) => {
    if (isProcessing) return;
    setIsProcessing(true);
  
    try {
      // Validate plan
      const verifyPlanResponse = await axios.get(`/api/plans/${plan.id}`);
      if (!verifyPlanResponse.data.available) {
        throw new Error('Plan is not available.');
      }
  
      const queryParams = new URLSearchParams({
        planId: plan.id,
        planName: plan.name,
        planPrice: plan.price.toString(),
        planDuration: plan.duration,
        periodDays: plan.periodDays.toString(),
      });
  
      console.log('Navigating to:', `/payment?${queryParams.toString()}`);
      router.push(`/payment?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error during subscription:', error);
      alert('Failed to start subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="w-11/12 mx-auto mt-10 bg-gradient-to-br from-[#C4ED9B] to-[#B4D8FF]">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">MEMBERSHIP PLAN</h1>
          <div className="flex justify-center space-x-6 text-xl">
            <div className="flex items-center">
              <Check strokeWidth={3} className="mr-2" />
              สามารถพูดคุยและปรึกษาทนายได้
            </div>
            <div className="flex items-center">
              <Check strokeWidth={3} className="mr-2" />
              สิทธิพิเศษอื่นๆ
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`w-80 p-6 rounded-xl ${
                index === 1 ? 'bg-[#2C2C2C] text-white' : 'bg-white text-black border'
              }`}
            >
              <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
              <div className="text-5xl font-extrabold mb-6">
                {plan.price} {plan.duration}
              </div>
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg ${
                  index === 1 ? 'bg-white text-[#2C2C2C]' : 'bg-[#2C2C2C] text-white'
                }`}
              >
                {isProcessing ? 'Processing...' : 'สมัครสมาชิก'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg">
            เลือกแพ็กเกจ Membership ของคุณ ชำระเงินได้หลายวิธี ยกเลิกได้ทุกเมื่อ
          </p>
        </div>
      </div>
    </section>
  );
}
