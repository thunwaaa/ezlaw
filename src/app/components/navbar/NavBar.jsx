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

const playfair_display = Playfair_Display({
    subsets: ['latin','latin-ext'],
    weight: ['400','700'],
})


export function NavBar() {

    
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
                            <li className="mb-1">
                                <Link href='/crime/crime1' className=" hover:text-slate-500 transition duration-300">
                                    กฏหมายอาญา
                                </Link>
                            </li>
                            <li>
                                <Link href='/civil' className=" hover:text-slate-500 transition duration-300">
                                    กฏหมายแพ่งและพาณิชย์
                                </Link>
                            </li>
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
                    <Dialog>
                        <DialogTrigger 
                            className=" border border-slate-950 rounded-full px-3 py-1 transition duration-300 hover:text-gray-500 hover:border-slate-500 font-semibold">
                            Sign in | Sign up
                        </DialogTrigger>
                        <DialogContent className="max-w-[425px] p-5 ">
                        {/* <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader> */}
                            <Tabs defaultValue="signin" className="w-full text-xl">
                                <TabsList className="grid w-full grid-cols-2 mt-4 ">
                                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                </TabsList>

                                <TabsContent value="signin" className="p-5">
                                    <form className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
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
                                    <form className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
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