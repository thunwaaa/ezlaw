'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pencil } from 'lucide-react' 
import toast from 'react-hot-toast'

function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        lawyerFirstname: "",
        lawyerLastname: "",
        gender: "",
        lawyerEmail: "",
        phone: "",
        address: "",
        bio: "",
        profileImageUrl: "",
    });

    
    const [profileImage, setProfileImage] = useState(null); 
    const [imagePreview, setImagePreview] = useState('/profilePic.jpg');
    const [imageInputRef, setImageInputRef] = useState(null);

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
                if (data.profileImageUrl) {
                    setImagePreview(data.profileImageUrl);
                }
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
    
    const uploadToCloudinary = async (file) => {
        if (!file) {
            throw new Error("No file selected for upload");
        }
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        return toast.promise(
            fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            ).then((res) => {
                if (!res.ok) {
                    return res.json().then((error) => {
                        throw new Error(error.error.message || "Failed to upload image");
                    });
                }
                return res.json();
            }).then((data) => {
                return data.secure_url;
            }),
            {
                loading: 'Uploading Profile...',
                success: 'Profile Upload Success!',
                error: 'Upload Profile Error'
            }
        );
    };
    

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validateProfile = () => {
        const requiredFields = [
            { name: 'lawyerFirstname', label: 'firstname' },
            { name: 'lawyerLastname', label: 'lastname' },
            { name: 'gender', label: 'gender' },
            { name: 'phone', label: 'phone' }
        ];

        for (let field of requiredFields) {
            if (!profile[field.name] || profile[field.name].trim() === '') {
                toast.error(`Please fill the ${field.label}`);
                return false;
            }
        }
        return true;
    };

    const toggleprofile = async () => {
        if (isEditing) {
            if (!validateProfile()) {
                return;
            }
            try {
                let imageUrl = profile.profileImageUrl;
                if (profileImage) {
                    imageUrl = await uploadToCloudinary(profileImage);
                }
                const res = await fetch("http://localhost:8080/api/lawyerauth/edit-profile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        ...profile,
                        profileImageUrl: imageUrl,
                    }),
                });
                if (res.ok) {
                    const updatedProfile = await res.json();
                    setProfile(updatedProfile);
                    toast.success("Update Profile Sucessfully!",{
                        duration:2000,
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    if (updatedProfile.profileImageUrl) {
                        setImagePreview(updatedProfile.profileImageUrl);
                    }
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

    const triggerImageUpload = () => {
        if (isEditing && imageInputRef) {
            imageInputRef.click();
        }
    };

    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <div className='flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12'>
                {/* Profile Image Section */}
                <div className='flex flex-col items-center'>
                    <div className="relative">
                        <Image
                            src={imagePreview || '/profilePic.jpg'}
                            width={230}
                            height={170}
                            alt="Profile"
                            className="rounded-full object-cover w-[230px] h-[170px]"
                            priority
                        />
                        {isEditing && (
                            <button 
                                onClick={triggerImageUpload} 
                                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                            >
                                <Pencil size={24} />
                            </button>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={(input) => setImageInputRef(input)}
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <button
                        onClick={toggleprofile}
                        className={`mt-6 w-full px-6 py-3 rounded-xl text-xl font-semibold transition-colors duration-300 ${
                            isEditing 
                                ? "bg-green-600 text-white hover:bg-green-700" 
                                : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}>
                        {isEditing ? "บันทึกโปรไฟล์" : "แก้ไขโปรไฟล์ของคุณ"}
                    </button>
                </div>

                {/* Profile Details Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                    <div>
                        <label className='block text-xl font-medium text-gray-700 mb-2'>
                            ชื่อจริง
                        </label>
                        <input
                            id='lawerFirstname'
                            name='lawyerFirstname'
                            type="text"
                            value={profile.lawyerFirstname}
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
                            id='lawyerLastname'
                            name='lawyerLastname'
                            type="text"
                            value={profile.lawyerLastname}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg text-lg  ${
                                isEditing 
                                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                    : "bg-gray-100 border-gray-300 cursor-default   "
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
                            {profile.lawyerEmail}
                        </p>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-xl font-medium text-gray-700 mb-2">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={profile.address}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg text-lg${
                                isEditing 
                                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                    : "bg-gray-100 border-gray-300 cursor-default"
                            }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-xl font-medium text-gray-700 mb-2">Describtion</label>
                        <input
                            id="bio"
                            name="bio"
                            type="text"
                            value={profile.bio}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg text-lg${
                                isEditing 
                                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                    : "bg-gray-100 border-gray-300 cursor-default"
                            }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;