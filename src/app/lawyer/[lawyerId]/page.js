"use client";
import { useEffect, useState } from "react";

export default function LawyerProfile({ params }) {
  const { lawyerId } = params; 
  const [lawyer, setLawyer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLawyer() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/lawyerauth/getlawyer-by-email/${lawyerId}`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLawyer(data);
        } else {
          setError("ไม่พบข้อมูลทนายความ");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLawyer();
  }, [lawyerId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">เกิดข้อผิดพลาด</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">ไม่พบข้อมูลทนายความ</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <img
            src={`/profilePic.jpg`}
            alt="Lawyer Avatar"
            className="rounded-full w-32 h-32 mr-12"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {lawyer.lawyerFirstname} {lawyer.lawyerLastname}
            </h1>
            <p className="text-gray-500">{lawyer.lawyerEmail}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <p>{lawyer.bio}</p>
          <div>
            <lebel>
              
            </lebel>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">เบอร์โทรศัพท์</label>
            <p className="text-gray-600">{lawyer.phone || 'ไม่มีข้อมูล'}</p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">ที่อยู่</label>
            <p className="text-gray-600">{lawyer.address || 'ไม่มีข้อมูล'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}