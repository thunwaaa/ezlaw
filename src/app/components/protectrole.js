"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedPage from './protectpage';// import component เดิม

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
                    
                    // ถ้า role ไม่ใช่ MEMBERSHIP ให้ redirect
                    if (data.role !== 'MEMBERSHIP') {
                        router.push('/planMember');
                    }
                } else {
                    // ถ้า fetch ไม่สำเร็จให้ redirect ไปหน้า login
                    router.push('/');
                }
            } catch (error) {
                console.error('Role check error:', error);
                router.push('/');
            }
        };

        checkMembershipRole();
    }, []);

    // Wrap with ProtectedPage เพื่อยังคงการตรวจสอบ session เดิม
    return (
        <ProtectedPage>
            {children}
        </ProtectedPage>
    );
};

export default MembershipPage;