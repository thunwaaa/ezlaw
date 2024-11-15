import React from 'react'
import Link from 'next/link';
import { NavigationMenuTrigger, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent } from "@/components/ui/navigation-menu"



function Crime3() {
  
  return(
    <article className='rounded-2xl mx-auto mt-10 w-11/12 h-auto bg-[#FFFADF]'>
      
    <div className='flex text-center items-center bg-[#ED9BC8] rounded-t-2xl p-4 h-24'>
      <h1 className=' text-5xl  font-extrabold text-center pl-36 mx-auto'>กฏหมายอาญา</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger><Link href = '/crime/crime3'>ภาค 3 ลหุโทษ</Link></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='flex-col w-48 text-left pl-4 pt-4 mb-5'>
                <li><Link href = '/crime/crime1'>ภาค 1 บทบัญญัติทั่วไป</Link></li>
                <li><Link href = '/crime/crime2'>ภาค 2 ความผิด</Link></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
        </NavigationMenuList>
      </NavigationMenu>
    </div>

      <div className='p-8 ml-10 '>
        <h2 className='font-semibold text-3xl'>ภาค 3 ลหุโทษ</h2>
        
      </div>
    </article>
  );

}

export default Crime3