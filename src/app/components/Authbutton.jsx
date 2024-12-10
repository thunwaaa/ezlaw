'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar";

import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthButton = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentTab, setCurrentTab] = useState("signin");
    const [lawyerEmail, setLawyerEmail] = useState("");
    const [lawyerPassword, setLawyerPassword] = useState("");
    const [lawyerRole, setlawyerRole] = useState(null);

    const router = useRouter();

    const validatePassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        let message = "";

        if (!isLongEnough) {
            message = "Password must be at least 8 characters long.";
        } else if (!hasLetter) {
            message = "Password must contain at least one letter.";
        } else if (!hasNumber) {
            message = "Password must contain at least one number.";
        } else if (!hasSpecialChar) {
            message = "Password must contain at least one special character.";
        }

        return {
            isValid: isLongEnough && hasLetter && hasNumber && hasSpecialChar,
            message,
        };
    };

    const checkSession = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/check-session", {
                method: "GET",
                credentials: "include",
            });
            setIsLoggedIn(res.ok);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    useEffect(() => {
        if (!isDialogOpen) {
            setErrorMessage("");
        }
    }, [isDialogOpen]);

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setErrorMessage("");
    };

    const logoutSubmit = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                console.log("Logout success");
                setIsLoggedIn(false);
                router.push("/");
                window.location.reload();
            } else {
                console.error("Logout error");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const loginSubmit = async (e) => {
        e.preventDefault();

        const { isValid, message } = validatePassword(password);
        if (!isValid) {
            setErrorMessage(message);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                console.log("User login success");
                setErrorMessage("");
                setIsDialogOpen(false);
                checkSession();
                window.location.reload();
            } else {
                setErrorMessage("Login failed. Please check your email or password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred during login. Please try again.");
        }
    };

    const loginAsLawyerSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/lawyerauth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email: lawyerEmail, password: lawyerPassword }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("lawyerToken", data.token);
                console.log("Lawyer login success");
                setErrorMessage("");
                setIsDialogOpen(false);
                checkSession();
                window.location.reload();
            } else {
                setErrorMessage("Lawyer login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred during Lawyer login. Please try again.");
        }
    };

    const registerSubmit = async (e) => {
        e.preventDefault();

        const { isValid, message } = validatePassword(password);
        if (!isValid) {
            setErrorMessage(message);
            return;
        }

        if (password !== confirmpassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ firstname, lastname, email, password, phone, gender })
            });

            if (res.ok) {
                console.log("User register success");
                setErrorMessage("");
                setIsDialogOpen(false);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const fetchUserRole = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/lawyerauth/lawyer-role", {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                console.log("lawyer role fetched successfully:", data);
                setlawyerRole(data.role);
            } else {
                const errorData = await response.json();
                console.error("Error fetching lawyer role:", errorData);
                setlawyerRole(null);
            }
        } catch (error) {
            console.error("Network or server error:", error);
            setlawyerRole(null);     
        }
    };

    useEffect(() => {
        fetchUserRole();
    }, []);


    return (
        <Menubar className="library-class">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {isLoggedIn ? (
                    <MenubarMenu>
                        <MenubarTrigger className="py-1 w-24 text-lg font-semibold border border-slate-950 hover:text-slate-500 hover:border-slate-500 hover:bg-none transition duration-300 justify-center rounded-full">
                            Profile
                        </MenubarTrigger>
                        <MenubarContent>
                            <ul className="w-[200px] text-base p-4">
                                <MenubarItem>
                                    <li className="mb-1">
                                        <Link href={lawyerRole === 'Lawyer' ? '/lawyereditprofile' : '/editprofile'} className="hover:text-slate-500 transition duration-300 flex justify-center">
                                            Edit Profile
                                        </Link>
                                    </li>
                                </MenubarItem>
                                <MenubarItem>
                                    <li>
                                        <Button onClick={logoutSubmit} className="w-full text-center font-semibold hover:bg-red-500 transition-colors mt-2">
                                            Log out
                                        </Button>
                                    </li>
                                </MenubarItem>
                            </ul>
                        </MenubarContent>
                    </MenubarMenu>
                ) : (
                    <DialogTrigger className="border border-slate-950 rounded-full px-3 py-1 transition duration-300 hover:text-gray-500 hover:border-slate-500 font-semibold">
                        Sign in | Sign up
                    </DialogTrigger>
                )}
                <DialogContent className="max-w-[425px] p-5">
                    <Tabs defaultValue="signin" className="w-full text-xl" onValueChange={handleTabChange}>
                        <TabsList className="grid w-full grid-cols-3 mt-4">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            <TabsTrigger value="lawyer">Login as Lawyer</TabsTrigger>
                        </TabsList>

                        {/* Sign In */}
                        <TabsContent value="signin" className="p-5">
                            <form onSubmit={loginSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your Email"
                                        className="rounded-lg border-2"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                        type="password"
                                        placeholder="Enter your Password"
                                        className="rounded-lg border-2"
                                        required
                                    />
                                </div>
                                {errorMessage && (
                                    <div className="text-red-500 text-sm">{errorMessage}</div>
                                )}
                                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                    Sign In
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Sign Up */}
                        <TabsContent value="signup" className="p-6">
                            <form onSubmit={registerSubmit} className="space-y-4">
                                <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    onChange={(e) => setfirstname(e.target.value)}
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    placeholder="Enter your Name"
                                    className="rounded-lg border-2"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    onChange={(e) => setlastname(e.target.value)}
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    placeholder="Enter your Name"
                                    className="rounded-lg border-2"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    onChange={(e) => setemail(e.target.value)}
                                    id="email"
                                    name = "email"
                                    type = "email"
                                    placeholder = "e.g John@gmail.com"
                                    className = "rounded-lg border-2"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    onChange={(e) => setpassword(e.target.value)}
                                    id = "password"
                                    name = "password"
                                    type = "password"
                                    placeholder = "Enter your password"
                                    className = "rounded-lg border-2"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    onChange={(e) =>setconfirmpassword(e.target.value)}
                                    id = "confirm-password"
                                    name = "comfirm-password"
                                    type = "password"
                                    placeholder = "Enter Confirm Password"
                                    className = "rounded-lg border-2"
                                    required
                                    />
                            </div>
                            {errorMessage && (
                                <div className="text-red-500 text-sm">{errorMessage}</div>
                            )}
                            <Button type = "submit" className = "w-full bg-black text-white hover:bg-gray-800">
                                Sign Up
                            </Button>
                            </form>
                        </TabsContent>

                        {/* Login as Lawyer */}
                        <TabsContent value="lawyer" className="p-5">
                            <form onSubmit={loginAsLawyerSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lawyer-email">Email</Label>
                                    <Input
                                        onChange={(e) => setLawyerEmail(e.target.value)}
                                        id="lawyer-email"
                                        type="email"
                                        placeholder="Enter your lawyer email"
                                        className="rounded-lg border-2"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lawyer-password">Password</Label>
                                    <Input
                                        onChange={(e) => setLawyerPassword(e.target.value)}
                                        id="lawyer-password"
                                        type="password"
                                        placeholder="Enter your lawyer password"
                                        className="rounded-lg border-2"
                                        required
                                    />
                                </div>
                                {errorMessage && (
                                    <div className="text-red-500 text-sm">{errorMessage}</div>
                                )}
                                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                    Login as Lawyer
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </Menubar>
    );
};

export default AuthButton;

