'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { showToast } from '@/lib/toast';
import {QRCodeSVG, QRCodeCanvas} from 'qrcode.react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);

  const [plan, setPlan] = useState({
    id: searchParams.get('planId'),
    name: searchParams.get('planName'),
    price: searchParams.get('planPrice'),
    duration: searchParams.get('planDuration'),
    periodDays: searchParams.get('periodDays'),
  });

  const [email, setEmail] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  useEffect(() => {
    // Retrieve email from local storage or context
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handlePaymentSubmit = async () => {
    try {
      // Validate input
      if (!email) {
        showToast('Please provide an email', 'error');
        return;
      }

      // Payment processing
      const paymentPayload = {
        email,
        planId: plan.id,
        planName: plan.name,
        amount: parseFloat(plan.price),
        paymentMethod: selectedPaymentMethod,
        periodDays: parseInt(plan.periodDays),
        cardDetails: selectedPaymentMethod === 'Credit Card' ? cardDetails : null,
      };

      // Send payment request to backend
      const response = await axios.post('/api/payments/process', paymentPayload);

      if (response.data.success) {
        // Payment successful
        showToast('Payment successful!', 'success');

        // Update user role and create subscription
        await axios.post('/api/users/upgrade-membership', {
          email,
          planId: plan.id,
          periodDays: parseInt(plan.periodDays),
        });

        // Redirect to success page or dashboard
        router.push('/dashboard/membership');
      } else {
        showToast(response.data.message || 'Payment failed', 'error');
      }
    } catch (error) {
      console.error('Payment error:', error);
      showToast('Payment processing failed', 'error');
    }
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/payments/initiate', {
        amount: 5,
        userId: 'current-user-id',
        planId: 'selected-plan-id'
      });

      if (response.data) {
        setQrCodeValue(response.data.referenceCode);
        setPaymentDetails(response.data);
        showToast('QR Code Generated. Please scan to complete payment.', 'info');
      }
    } catch (error) {
      showToast('Payment initiation failed', 'error');
      console.error(error);
    }
  };

    const generateQRCode = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/qr/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: paymentAmount,
                    userId: currentUser.id,
                    planId: selectedPlan.id
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Use the reference code or custom string as QR value
                setQrCodeValue(data.referenceCode);
            }
        } catch (error) {
            console.error('QR Code generation failed', error);
        }
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        
        // Access password and confirmPassword from formData
        const { password, confirmPassword } = formData;

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: password, // Use the password from formData
                    phone: formData.phone,
                    gender: formData.gender
                })
            });

            if (res.ok) {
                setIsDialogOpen(false);
                console.log("User  registered successfully");
                toast.success("User  registered successfully");
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error: ", error);
            toast.error("An unexpected error occurred during registration");
        }
    }

    const renderPaymentMethodForm = () => {
        switch (selectedPaymentMethod) {
        case 'Credit Card':
            return (
            <form className="space-y-4">
                <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails(prev => ({...prev, cardNumber: e.target.value}))}
                className="input-field"
                required
                />
                <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails(prev => ({...prev, expiryDate: e.target.value}))}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({...prev, cvv: e.target.value}))}
                    className="input-field"
                    required
                />
                </div>
                <input
                type="text"
                placeholder="Card Holder Name"
                value={cardDetails.cardHolderName}
                onChange={(e) => setCardDetails(prev => ({...prev, cardHolderName: e.target.value}))}
                className="input-field"
                required
                />
            </form>
            );
        case 'PromptPay':
            return (
                <div className="payment-container">
                    <div className="text-center">
                        <h2>Complete Your Payment</h2>
                        
                        {!qrCodeValue ? (
                        <button 
                            onClick={initiatePayment} 
                            className="btn btn-primary"
                        >
                            Generate Payment QR
                        </button>
                        ) : (
                        <div>
                            {/* SVG-based QR Code */}
                            <QRCodeSVG 
                            value={qrCodeValue} 
                            size={256}
                            level={'H'}
                            includeMargin={true}
                            />
                        );
                        </div>
                        )}
                    </div>
                </div>
            );
        case 'Bank Transfer':
            return (
            <div>
                <h3 className="font-bold">Bank Transfer Details</h3>
                <p>Bank: Kasikorn Bank</p>
                <p>Account Number: 067-3269-508</p>
                <p>Account Name: EZLAW</p>
            </div>
            );
        default:
            return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Complete Your Subscription
            </h1>

            {/* Email Input */}
            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
                required
            />
            </div>

            {/* Payment Method Selection */}
            <div className="mt-6">
            <h2 className="text-lg font-bold text-center mb-4 text-gray-700">
                Select Payment Method
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {['Credit Card', 'PromptPay', 'Bank Transfer'].map((method) => (
                <button
                    key={method}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`btn-secondary ${
                    selectedPaymentMethod === method 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100'
                    }`}
                >
                    {method}
                </button>
                ))}
            </div>

            {/* Payment Method Form */}
            <div className="mt-6">
                {renderPaymentMethodForm()}
            </div>
            </div>

            {/* Plan Summary */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700">Plan Summary</h3>
            <p>Name: {plan.name}</p>
            <p>Price: {plan.price} THB</p>
            <p>Duration: {plan.duration}</p>
            </div>

            {/* Pay Now Button */}
            <button
            onClick={handlePaymentSubmit}
            disabled={!selectedPaymentMethod}
            className="w-full mt-6 btn-primary"
            >
            Pay Now
            </button>
        </div>
        </div>
    );
}

// Utility Classes
const inputField = 'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
const btnPrimary = 'bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition';
const btnSecondary = 'flex flex-col items-center justify-center py-4 px-6 rounded-lg border transition';