'use client';

import { useEffect, useState} from 'react';
import { Check } from 'lucide-react'
import styles from './Pricing.module.css'; // import CSS module
import SubscriptionButton from 'app/components/SubscriptionButton';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const plans = [
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_fZedSzak77cm0Ks148' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1QRg0fGLXc22ItMyOrM9mzrf' : '',
        price: 29,
        duration: '/weekly',
    },
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_5kAg0HgIv0NY50I6ot' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1QRg1sGLXc22ItMy9O01X6Lz' : '',
        price: 59,
        duration: '/monthly',
    },
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_7sIcOv3VJgMW64M7sy' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1QRg2LGLXc22ItMy3JAZd9u1' : '',
        price: 99,
        duration: '/yearly',
    },
];

const Pricing = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isMembership, setIsMembership] = useState(false);

    const checkSession = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/check-session", {
                method: "GET",
                credentials: "include", // Important for sending cookies
            });

            if (res.ok) {
                const data = await res.json();
                setIsLoggedIn(true);
                setUserEmail(data.email);
                setUserRole(data.role);
                setUserId(data.userId);
                setIsMembership(data.role === "Membership"); // Example condition
            } else {
                setIsLoggedIn(false);
                setUserEmail(null);
                setUserRole(null);
                setUserId(null);
            }
        } catch (error) {
            console.error("Error checking session:", error);
            setIsLoggedIn(false);
            setUserEmail(null);
            setUserRole(null);
            setUserId(null);
        }
    };

    const checkMembershipStatus = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/membership-status", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            setIsMembership(data.isMembership);
        } catch (error) {
            console.error("Error checking membership status:", error);
        }
    };    

    const handleSubscribe = async (planIndex) => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            if (isLoggedIn) {
                const selectedPlan = plans[planIndex];
                if (!selectedPlan.link) {
                    console.error('Link is empty for planIndex:', planIndex);
                    return;
                }

                const response = await fetch("/api/create-checkout-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ priceId: selectedPlan.priceId, userEmail }),
                });

                const session = await response.json();

                if (session.error) {
                    console.error(session.error);
                    return;
                }

                const stripe = await stripePromise;
                const result = await stripe.redirectToCheckout({ sessionId: session.id });

                if (result.error) {
                    console.error(result.error.message);
                }
            } else {
                setShowLoginPopup(true);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);
    
    // Membership view
    if (isMembership) {
        return (
            <section className="text-center py-12">
                <h2 className="text-2xl font-bold">คุณเป็นสมาชิกแล้ว</h2>
                {/* Add membership features here */}
            </section>
        );
    }
    
    const closeLoginPopup = () => {
        setShowLoginPopup(false); // ปิดป๊อปอัพ
    };
    

    return (
        
        <section id="pricing" className='w-11/12 border mx-auto mt-10 rounded-3xl h-auto text-center bg-gradient-to-br from-[#C4ED9B] to-[#B4D8FF]'>
            <div className="py-24 px-8 max-w-5xl mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="font-bold text-3xl lg:text-5xl tracking-tight">
                        MEMBERSHIP PLAN
                    </h1>
                    <h2 className='text-3xl font-black mt-10'>Benefits</h2>
                    <div className='flex text-2xl font-semibold justify-center mt-8'>
                        <p className='flex mr-6'><Check strokeWidth={5} className='mr-3'/> สามารถพูดคุยและปรึกษาทนายได้</p>
                        <p className='flex '><Check strokeWidth={5} className='mr-3'/> อื่นๆ อีกมากมาย</p>
                    </div>
                </div>
                <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
                    <div className=" w-full max-w-lg">
                        <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-xl">
                            <div className="flex justify-center items-center">
                                <div className=' rounded-xl w-80 bg-white h-64 pt-10 text-2xl font-extrabold border px-6'>
                                <h3 className='font-black text-3xl'>รายสัปดาห์</h3>
                                <h1 className='text-6xl flex justify-center mt-6'>
                                <span>29</span> / mo
                                </h1>
                                    <button className="rounded-xl mt-6 w-64 h-12 bg-[#2C2C2C] text-white text-lg" 
                                        onClick={() => handleSubscribe(0)}
                                        disabled={isProcessing} // ปิดปุ่มจนกว่าจะตรวจสอบเสร็จ
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <div className='rounded-xl w-80 bg-[#2C2C2C] h-72 pt-10 text-white text-2xl font-extrabold px-10 mx-16'>
                                <h3 className='font-black text-3xl'>รายเดือน</h3>
                                <h1 className='text-6xl flex justify-center mt-6'>
                                <span>59</span> / mo
                                </h1>
                                    <button className="rounded-xl mt-6 w-64 h-12 bg-white text-slate-950 text-lg"  
                                        onClick={() => handleSubscribe(1)}
                                        disabled={isProcessing} // ปิดปุ่มจนกว่าจะตรวจสอบเสร็จ 
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <div className='rounded-xl w-80 bg-white h-64 pt-10 text-2xl font-extrabold px-6'>
                                <h3 className='font-black text-3xl'>รายปี</h3>
                                <h1 className='text-6xl flex justify-center mt-6'>
                                <span>99</span> / mo
                                </h1>
                                    <button className="rounded-xl mt-6 w-64 h-12 bg-[#2C2C2C] text-white text-lg " 
                                        onClick={() => handleSubscribe(2)}
                                        disabled={isProcessing} // ปิดปุ่มจนกว่าจะตรวจสอบเสร็จ
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>                     
                        </div>
                    </div>
                </div>
                <h4 className='text-xl font-medium mt-16 mb-4'>เลือกแพ็กเกจ Membership ของคุณ ชำระเงินได้หลายวิธี ยกเลิกได้ทุกเมื่อ</h4>
            </div>
            {showLoginPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        <h2 className="text-2xl font-bold mt-4">กรุณาล็อกอินก่อนทำการชำระเงิน</h2>
                        <button
                            className="mt-2 bg-gray-300 px-4 py-2 rounded text-xl font-bold"
                            onClick={closeLoginPopup}
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </section>
        
    );
    
};

export default Pricing;