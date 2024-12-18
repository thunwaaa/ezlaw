"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedPage from './protectpage';
import toast from 'react-hot-toast';

const MembershipPage = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const checkMembershipRole = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/user_role', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.role);
                    
                    if (data.role === "user") {
                        router.push('/planMember');
                        toast.error("You need to subscribe first!");
                    }
                }
            } catch (error) {
                console.error('Role check error:', error);
            }
        };

        checkMembershipRole();
    }, []);

    return (
        <ProtectedPage>
            {children}
        </ProtectedPage>
    );
};

export default MembershipPage;