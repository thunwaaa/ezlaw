'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchprofile = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/lawyerauth/profile", {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) {
                    console.log("Failed to fetch lawyer profile");
                    return;
                }

                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile: ", error);
            }
        };
        fetchprofile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const toggleprofile = async () => {
        if (isEditing) {
            try {
                const res = await fetch("http://localhost:8080/api/lawyerauth/edit-profile", {
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
                    console.log("Updated lawyer profile successfully");
                } else {
                    console.error("Failed to update lawyer profile");
                }
            } catch (error) {
                console.error("Error updating profile: ", error);
            }
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className='w-11/12 flex justify-center mt-10 mx-auto pb-20'>
            <div>
                <Image
                    src='/profilePic.jpg'
                    width={250}
                    height={150}
                    alt='profile'
                    className='fixed left-[750] mt-20 rounded-full'
                />
                <button
                    onClick={toggleprofile}
                    className={`bg-gray-500 fixed w-56 p-3 rounded-xl mt-96 text-2xl -ml-[430] ${
                        isEditing ? "bg-slate-950 text-white" : "bg-slate-300 border-gray-300"
                    }`}>
                    {isEditing ? "บันทึกโปรไฟล์" : "แก้ไขโปรไฟล์ของคุณ"}
                </button>
            </div>

            <div className='grid grid-cols-2 gap-10 mt-24 fixed right-[700]'>
                <div>
                    <label htmlFor="firstname" className='block text-2xl font-medium'>
                        ชื่อจริง
                    </label>
                    <input
                        id='firstname'
                        name='firstname'
                        type="text"
                        value={profile.lawyerFirstname}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full p-3 border rounded-md text-xl ${
                            isEditing ? "border-gray-400" : "bg-gray-100 border-gray-300"
                        }`}
                    />
                </div>

                <div>
                    <label htmlFor="lastname" className='block text-2xl font-medium'>
                        นามสกุล
                    </label>
                    <input
                        id='lastname'
                        name='lastname'
                        type="text"
                        value={profile.lawyerLastname}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full p-3 border rounded-md text-xl ${
                            isEditing ? "border-gray-400" : "bg-gray-100 border-gray-300"
                        }`}
                    />
                </div>

                <div>
                    <label htmlFor="gender" className="block text-2xl font-medium">
                        เพศ
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full p-3 border rounded-md text-xl ${
                            isEditing ? "border-gray-400" : "bg-gray-100 border-gray-300"
                        }`}
                    >
                        <option value="หญิง">หญิง</option>
                        <option value="ชาย">ชาย</option>
                        <option value="อื่น ๆ">อื่น ๆ</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="phone" className="block font-medium text-2xl">
                        เบอร์โทรศัพท์
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={profile.phone}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full p-3 border rounded-md text-xl ${
                            isEditing ? "border-gray-400" : "bg-gray-100 border-gray-300"
                        }`}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-2xl font-medium">
                        E-mail
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.lawyerEmail}
                        readOnly
                        className={`mt-1 block w-full p-3 border rounded-md text-xl bg-gray-100 border-gray-300`}
                    />
                </div>
            </div>
        </div>
    );
}



export default EditProfile;
