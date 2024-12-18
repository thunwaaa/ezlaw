"use client";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, User, ScrollText } from "lucide-react";

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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-red-600">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500">ไม่พบข้อมูลทนายความ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={lawyer.profileImageUrl || "/profilePic.jpg"}
              alt="Lawyer Avatar"
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="text-center md:text-left text-white">
              <h1 className="text-4xl font-bold mb-2">
                {lawyer.lawyerFirstname} {lawyer.lawyerLastname}
              </h1>
              <p className="text-xl text-blue-100 flex items-center justify-center md:justify-start">
                <Mail className="mr-2 w-5 h-5" />
                {lawyer.lawyerEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Bio Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ScrollText className="mr-3 w-6 h-6 text-blue-600" />
              ประวัติและความเชี่ยวชาญ
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {lawyer.bio || 'ไม่มีข้อมูลประวัติ'}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <User className="mr-3 w-6 h-6 text-blue-600" />
              ข้อมูลติดต่อ
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-2 flex items-center">
                  <Phone className="mr-2 w-5 h-5 text-blue-500" />
                  เบอร์โทรศัพท์
                </label>
                <p className="text-gray-800">{lawyer.phone || 'ไม่มีข้อมูล'}</p>
              </div>
              
              <div>
                <label className="block text-gray-600 font-medium mb-2 flex items-center">
                  <MapPin className="mr-2 w-5 h-5 text-blue-500" />
                  ที่อยู่
                </label>
                <p className="text-gray-800">{lawyer.address || 'ไม่มีข้อมูล'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}