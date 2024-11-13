import React from 'react'
import Link from 'next/link';
import { NavigationMenuTrigger, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"



function Lawcate() {
  
  return(
    <article className='rounded-2xl mx-auto mt-10 w-11/12 h-auto bg-[#FFFADF]'>
      
    <div className='flex text-center items-center bg-[#ED9BC8] rounded-t-2xl p-4 h-24'>
      <h1 className=' text-5xl  font-extrabold text-center pl-36 mx-auto'>กฏหมายอาญา</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger><Link href = '/crime/crime1'>ภาค 1 บทบัญญัติทั่วไป</Link></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='flex-col w-48 text-left pl-4 pt-4 mb-5'>
                <li><Link href = '/crime/crime2'>ภาค 2 ความผิด</Link></li>
                <li><Link href = '/crime/crime3'>ภาค 3 ลหุโทษ</Link></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
        </NavigationMenuList>
      </NavigationMenu>
    </div>

      <div className='p-8 ml-10 '>
        <h2 className='font-semibold text-3xl'>ลักษณะ 1 บทบัญญัติที่ใช้แก่ความผิดทั่วไป</h2>
        <ul className='font-medium text-xl mx-8 my-3'>
          <li className='pb-5 pt-2'><Link href='/'>หมวด 1 บทนิยาม</Link></li>
          <li className='pb-5'>หมวด 2 การใช้กฎหมายอาญา</li>
          <li className='pb-5'>หมวด 3 โทษและวิธีการเพื่อความปลอดภัย</li>
          <li className='pb-5'>หมวด 4 ความรับผิดในทางอาญา</li>
          <li className='pb-5'>หมวด 5 การพยายามกระทำความผิด</li>
          <li className='pb-5'>หมวด 6 ตัวการและผู้สนับสนุน</li>
          <li className='pb-5'>หมวด 7 การกระทำความผิดหลายบทหรือหลายกระทง</li>
          <li className='pb-5'>หมวด 8 การกระทำความผิดอีก</li>
          <li className='pb-5'>หมวด 9 อายุความ</li>
        </ul>
        
        <h2 className='font-semibold text-3xl'>ลักษณะ 2 บทบัญญัติที่ใช้แก่ความผิดลหุโทษ</h2>
      </div>
    </article>
  );

}

export default Lawcate
