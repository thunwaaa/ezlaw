import React from 'react'
import Link from 'next/link'
import { NavigationMenuTrigger, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"
import SelectLawyer from 'app/components/selectlawyer/page'

function ConsultLawyer() {
  return (
    
    <div className='bg-blue-200 p-10 h-screen'>
      <div className='rounded-t-2xl mt-10 w-11/12 h-auto  bg-white pb-10 p-20 mx-10 pb-0 flex justify-between text-left items-center'>
          <h1 className='font-extrabold text-5xl' >Lawyer</h1>
      </div>
      <div className='rounded-b-2xl w-11/12 h-auto  bg-white px-20 pt-0 py-10 mx-10 text-left'>
          <SelectLawyer />
      </div>

    </div>
  )
}

export default ConsultLawyer