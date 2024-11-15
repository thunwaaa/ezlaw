'use client'

import { useState } from 'react'
import Image from 'next/image'



function EditProfile() {

    const [isEditing, setIsEditing ] = useState(false)

    const [profile, setProfile] = useState({
        firstname: "Elizabeth",
        lastname: "Arthur",
        gender: "female",
        email: "Alice0513@gmail.com",
        phone: "033 333 333",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }))
    }
  return (
    
        <div className=' w-11/12 flex justify-center mt-10 mx-auto pb-20'>
            <div>
                <Image
                    src='/profilePic.jpg'
                    width={250}
                    height={150}
                    alt='profile'
                    className='fixed left-[750] mt-20 rounded-full'
                />
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
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
                        value={profile.firstname}
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
                        value={profile.lastname}
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
                        disabled={!isEditing} // ปิดใช้งานถ้าไม่อยู่ในโหมดแก้ไข
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
                    <label label htmlFor="phone" className="block font-medium text-2xl">
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
                        value={profile.email}
                        onChange={handleChange}
                        readOnly
                        className={`mt-1 block w-full p-3 border rounded-md text-xl ${
                            isEditing ? "border-gray-400" : "bg-gray-100 border-gray-300"
                        }`}
                    />
                </div>

                {/* ฟิลด์ "เบอร์โทรศัพท์" */}
            </div>
        </div>
   
  )
}

export default EditProfile



