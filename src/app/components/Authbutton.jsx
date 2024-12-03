'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
  } from "@/components/ui/menubar"
  
import { Dialog,DialogTitle,DialogContent,DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export const AuthButton = () => {
  
    // const validatePassword = (password) => {
    //   const hasLetter = /[a-zA-Z]/.test(password);
    //   const hasNumber = /\d/.test(password);
    //   const isLongEnough = password.length >= 8;
    //   return hasLetter && hasNumber && isLongEnough;
    // };

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [phone, setphone] = useState("");
    const [gender, setgender] = useState("");
    const [error, setError] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();

    const checksession = async () => {
        try{
            const res = await fetch("http://localhost:8080/api/auth/check-session",{
                method: "GET",
                credentials: "include",
            });
            if(res.ok){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        }catch(error){
            console.error("error: ",error);
        }
    };

    useEffect(() => {
        checksession();
    }, []);

    const logoutsubmit = async (e) => {
        try{
            const res = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if(res.ok){
                console.log("logout success");
                setIsLoggedIn(false);
                router.push("/");
            }else{
                console.error("error : ",error);
            }
        }catch(error){
            console.error("error : ", error);
        }
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email,password
                }),
                credentials: "include",
            });

            console.log("response status: ",response.status);
            const data = await response.json();
            if(response.ok){
                localStorage.setItem("token",data.token);
                console.log("user login sucess");
                setIsDialogOpen(false);
                checksession();
            }
        }catch(error){
            console.error("error:" ,error);
        }

    }

    const registerSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return;
        }
        try{
            const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    firstname,lastname,email,password,phone,gender
                })
            });
            if(res.ok){
                setIsDialogOpen(false);
                console.log("user register sucess");
            }
        }catch(error){
            console.error("error: ",error);
        }
    }

    // useEffect(() => {
    //     const fetchUserRole = async () => {
    //         try {
    //             const response = await axios.get('/api/user/role', {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`, // ส่ง Token
    //                 },
    //             });
    //             setUserRole(response.data);
    //             setIsLoggedIn(true);
    //         } catch (error) {
    //             setUserRole(null);
    //             setIsLoggedIn(false);
    //         }
    //     };

    //     fetchUserRole();
    // }, []);

    
    return (

      <Menubar className="library-class">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {isLoggedIn ?(

              <MenubarMenu>
                  <MenubarTrigger className = "py-1 w-24 text-lg font-semibold border border-slate-950 hover:text-slate-500 hover:border-slate-500 hover:bg-none transition duration-300 justify-center rounded-full">
                      Profile
                  </MenubarTrigger>
                  <MenubarContent>
                      <ul className="  w-[200px] text-base  p-4 md:w-[200px] xl:w-[200px] ">
                          <MenubarItem className="library-class">
                              <li className="mb-1">
                                  <Link href='/editprofile' className=" hover:text-slate-500 transition duration-300 flex justify-center">
                                      Edit Profile
                                  </Link>
                              </li>
                          </MenubarItem>
                          <MenubarItem className="library-class">
                              <li>
                                  <Button onClick={logoutsubmit} className="w-full text-center font-semibold hover:bg-red-500 hover:transition-colors hover:duration-500  mt-2">Log out</Button>
                              </li>
                          </MenubarItem>
                      </ul>
                  </MenubarContent>
              </MenubarMenu>
                
            ):(
              <DialogTrigger 
                  className=" border border-slate-950 rounded-full px-3 py-1 transition duration-300 hover:text-gray-500 hover:border-slate-500 font-semibold">
                  Sign in | Sign up
              </DialogTrigger>
                
            )}
            <DialogContent className="max-w-[425px] p-5 ">
                <Tabs defaultValue="signin" className="w-full text-xl">
                    <TabsList className="grid w-full grid-cols-2 mt-4 ">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="p-5">
                        <form onSubmit={loginSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={(e) => setemail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your Email"
                                    className="rounded-lg border-2"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    onChange={(e) => setpassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="rounded-lg border-2"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                Sign In
                            </Button>
                        </form>
                    </TabsContent>

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
                            <Button type = "submit" className = "w-full bg-black text-white hover:bg-gray-800">
                                Sign Up
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
      </Menubar>
    );
};  
export default AuthButton