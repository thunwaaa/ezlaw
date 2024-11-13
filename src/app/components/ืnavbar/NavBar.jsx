import Link from "next/link";
import { NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,NavigationMenuList,NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import AuthButton from "../AuthButton";


export function NavBar() {
  return (
    <div className="flex justify-between mx-8 my-4 items-center">
        <h1 className="flex justify-start text-3xl">EZLAW</h1>
        <NavigationMenu className="flex justify-end text-xl">
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href='/'>HOME</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger className = 'flex items-center py-5 text-xl  hover:text-slate-500 transition duration-300'>กฏหมาย</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="  w-[100px] text-base  p-4 md:w-[200px] lg:w-[200px] ">
                        <li className="mb-1">
                            <Link href='/crime' className=" hover:text-slate-500 transition duration-300">
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
                <Link href='/consult' className=" border border-solid border-slate-950 
                rounded-full px-3 py-1 hover:text-slate-500 
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