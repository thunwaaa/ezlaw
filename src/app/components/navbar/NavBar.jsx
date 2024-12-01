'use client'

import Link from "next/link";
import { NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,NavigationMenuList,NavigationMenuTrigger, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DialogHeader, DialogTitle , DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const playfair_display = Playfair_Display({
    subsets: ['latin','latin-ext'],
    weight: ['400','700'],
})

const กฏหมาย = [
    {
      title: "กฏหมายอาญา",
      href: "/crime/crime1"
    },
        {
      title: "กฏหมายแพ่งและพาณิชย์",
      href: "/civil"
    }
];

export function NavBar() {

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [phone, setphone] = useState("");
    const [gender, setgender] = useState("");
    const [error, setError] = useState("");
    const [success,setSuccess] = useState("");
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


    
  return (
    <div className="flex justify-between mx-8 my-5">
        <div className="flex justify-start text-5xl font-extrabold text-red-900 ">
            <Link href='/' className={playfair_display.className}>EZLAW</Link>
        </div>
        <NavigationMenu className="flex justify-end text-lg">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href='/' className="font-semibold text-xl hover:text-slate-500 transition duration-300">HOME</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className = 'py-5 text-xl hover:text-slate-500 hover:bg-none transition duration-300 content-center rounded-full'>กฏหมาย</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="  w-[100px] text-base  p-4 md:w-[200px] xl:w-[200px] ">
                            {กฏหมาย.map((กฏหมาย, index) => (
                                <li key={index}>
                                    <Link href={กฏหมาย.href} className=" hover:text-slate-500 transition duration-300">{กฏหมาย.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                    <Image
                        src="/crownIcon.png"
                        width={30}
                        height={30}
                        alt = 'Icon'
                        className="absolute -top-4 right-48"                   
                    /> 
                    
                        <Link 
                        href='/consult' 
                        className=" border border-slate-950 rounded-full px-3 py-1 font-semibold hover:text-slate-500 hover:border-slate-500 transition duration-300 mr-3">
                            ปรึกษาทนาย
                        </Link>
                    
                </NavigationMenuItem> 
                <NavigationMenuItem>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        {isLoggedIn ?(
                            <>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className = 'py-5 text-xl hover:text-slate-500 hover:bg-none transition duration-300 content-center rounded-full'>
                                        Profile
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="  w-[200px] text-base  p-4 md:w-[200px] xl:w-[200px] ">
                                            <li className="mb-1">
                                                <Link href='/editprofile' className=" hover:text-slate-500 transition duration-300">
                                                    editprofile
                                                </Link>
                                            </li>
                                            <li>
                                                <Button onClick={logoutsubmit} className="w-full text-left hover:bg-grey-100">logout</Button>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </>
                        ):(
                            <>
                                <DialogTrigger 
                                    className=" border border-slate-950 rounded-full px-3 py-1 transition duration-300 hover:text-gray-500 hover:border-slate-500 font-semibold">
                                    Sign in | Sign up
                                </DialogTrigger>
                            </>
                        )}
                        <DialogContent className="max-w-[425px] p-5 ">
                            <Tabs defaultValue="signin" className="w-full text-xl">
                                <TabsList className="grid w-full grid-cols-2 mt-4 ">
                                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                </TabsList>

                                <TabsContent value="signin" className="p-5">
                                    <form onClick={loginSubmit} className="space-y-4">
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
                                    <form onClick={registerSubmit} className="space-y-4">
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
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        
      
    </div>
  )
}

export default NavBar