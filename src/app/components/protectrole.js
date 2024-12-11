"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedPage from './protectpage';

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
                    
                    if (data.role !== 'MEMBERSHIP') {
                        router.push('/planMember');
                    }
                }else if(data.role !== 'Lawyer'){
                    router.push('/planMember');
                } 
                else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Role check error:', error);
                router.push('/');
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