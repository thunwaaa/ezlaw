import Link from "next/link";
import { NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,NavigationMenuList,NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import AuthButton from "../AuthButton";
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
            <h1 className={playfair_display.className}>EZLAW</h1>
        </div>
        <NavigationMenu className="flex justify-end text-lg ">
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href='/' className="font-semibold">HOME</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger className = ' py-5 text-xl  hover:text-slate-500 transition duration-300 content-center'>กฏหมาย</NavigationMenuTrigger>
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
                <Image src='/crownIcon.png' width={30} height={30} alt="Icon" className="absolute -top-4 right-[215] "/>
                
                <Link href='/consult' className=" border border-solid border-slate-950 
                rounded-full px-3 py-1 font-semibold hover:text-slate-500 
                hover:border-slate-500 transition duration-300">
                    
                    ปรึกษาทนาย
                </Link>
            </NavigationMenuItem> 
            <NavigationMenuItem>
                <AuthButton className ="flex items-center" />
            </NavigationMenuItem>
             
        </NavigationMenuList>
        </NavigationMenu>
        
      
    </div>
  )
}

export default NavBar