'use client'
import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        phone: "",
        profileImageUrl: "",
    });

    const [profileImage, setProfileImage] = useState(null); 
    const [imagePreview, setImagePreview] = useState('/profilePic.jpg');
    const [imageInputRef, setImageInputRef] = useState(null);
    const [password,setPassword] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const router = useRouter();

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
                if (data.profileImageUrl) {
                    setImagePreview(data.profileImageUrl);
                }
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
            { name: 'firstname', label: 'firstname' },
            { name: 'lastname', label: 'lastname' },
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

    const toggleProfile = async () => {
        if (isEditing) {
            if (!validateProfile()) {
                return;
            }

            try {
                let imageUrl = profile.profileImageUrl;
                if (profileImage) {
                    imageUrl = await uploadToCloudinary(profileImage);
                }
                const res = await fetch("http://localhost:8080/api/auth/edit-profile", {
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
                    console.log("Profile updated successfully");
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

    const deleteuser = async () => {
        if (!password) {
            toast.error("Please enter your password");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password }),
                credentials: "include",
            });

            if (res.ok) {
                toast.success("Delete Account successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                setIsDeleteDialogOpen(false);
                router.push("/");
            } else {
                toast.error("Invalid password");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete account");
        }
    };
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
                <div className="relative flex flex-col items-center">
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
                        onClick={toggleProfile}
                        className={`mt-6 w-40 px-4 py-2 rounded-md text-lg font-semibold transition-colors duration-300 ${
                            isEditing
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                    >
                        {isEditing ? "บันทึกโปรไฟล์" : "แก้ไขโปรไฟล์"}
                    </button>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="flex items-center gap-2 mt-3 w-40 ">
                                    <Trash2 size={20} />
                                    Delete Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Account</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. Please enter your password to confirm account deletion.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={deleteuser}>
                                        Delete Account
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                        <label htmlFor="firstname" className="block text-xl font-medium text-gray-700 mb-2">
                            ชื่อจริง
                        </label>
                        <input
                            id="firstname"
                            name="firstname"
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
                        <label htmlFor="lastname" className="block text-xl font-medium text-gray-700 mb-2">
                            นามสกุล
                        </label>
                        <input
                            id="lastname"
                            name="lastname"
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
                        <p>{profile.email}</p>
                    </div>
                    <div>
                        <button className='border p-4 rounded-xl w-72 hover:bg-slate-300 transition duration-300'><Link href="https://billing.stripe.com/p/login/test_00gdTj1znbAtaTSdQQ">Billing portal</Link></button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditProfile;