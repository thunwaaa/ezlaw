import React from 'react'
import Link from 'next/link'
import { NavigationMenuTrigger, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"


function ConsultCrimeLawyer() {
  return (
    <div className='bg-blue-200 p-10 h-screen'>
      <div className='rounded-2xl mt-10 w-11/12 h-auto  bg-white  p-20 mx-10 flex justify-between text-left items-center'>
        <h1 className='font-extrabold text-5xl' >Lawyer</h1>
        <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger><Link href = '/consult/crimelawyer'>อาญา</Link></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='flex-col w-48 text-left pl-4 pt-4 mb-5'>
                <li><Link href = '/consult'>ทั้งหมด</Link></li>
                <li><Link href = '/consult/civillawyer'>แพ่งและพาณิชย์</Link></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
        </NavigationMenuList>
      </NavigationMenu>
      </div>
    </div>
  )
}

export default ConsultCrimeLawyer