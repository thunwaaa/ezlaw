'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/profile", {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) {
                    console.log("Failed to fetch profile");
                    return;
                }

                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile: ", error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }))
    }

    const toggleProfile = async () => {
        if (isEditing) {
            try {
                const res = await fetch("http://localhost:8080/api/auth/edit-profile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(profile),
                });
                if (res.ok) {
                    const updatedProfile = await res.json();
                    setProfile(updatedProfile);
                    console.log("Profile updated successfully");
                    window.location.reload();
                }
            } catch (error) {
                console.error("Error updating profile: ", error);
            }
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <Image
                        src='/profilePic.jpg'
                        width={250}
                        height={250}
                        alt='Profile'
                        className='rounded-full object-cover '
                    />
                    <button 
                        onClick={toggleProfile} 
                        className={`mt-6 w-full px-6 py-3 rounded-xl text-xl font-semibold transition-colors duration-300 ${
                            isEditing 
                                ? "bg-green-600 text-white hover:bg-green-700" 
                                : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}>
                        {isEditing ? "บันทึกโปรไฟล์" : "แก้ไขโปรไฟล์ของคุณ"}
                    </button>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                        <label htmlFor="firstname" className='block text-xl font-medium text-gray-700 mb-2'>
                            ชื่อจริง
                        </label>
                        <input
                            id='firstname'
                            name='firstname' 
                            type="text"
                            value={profile.firstname}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg text-lg ${
                                isEditing 
                                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                    : "bg-gray-100 border-gray-300 cursor-default"
                            }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="lastname" className='block text-xl font-medium text-gray-700 mb-2'>
                            นามสกุล
                        </label>
                        <input 
                            id='lastname'
                            name='lastname'
                            type="text"
                            value={profile.lastname}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg text-lg ${
                                isEditing 
                                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                    : "bg-gray-100 border-gray-300 cursor-default"
                            }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-xl font-medium text-gray-700 mb-2">
                            เพศ
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg text-lg ${
                                isEditing 
                                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                    : "bg-gray-100 border-gray-300 cursor-default"
                            }`}
                        >
                            <option value="หญิง">หญิง</option>
                            <option value="ชาย">ชาย</option>
                            <option value="อื่น ๆ">อื่น ๆ</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-xl font-medium text-gray-700 mb-2">
                            เบอร์โทรศัพท์
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={profile.phone}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg text-lg ${
                                isEditing 
                                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                    : "bg-gray-100 border-gray-300 cursor-default"
                            }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xl font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <p>
                            {profile.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile