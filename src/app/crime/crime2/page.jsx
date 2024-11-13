import React from 'react'
import Link from 'next/link'
import { NavigationMenuTrigger, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"

function CrimeP2() {
  return (
    <article className='rounded-2xl mx-auto mt-10 w-11/12 h-auto bg-[#FFFADF]'>
      
    <div className='flex text-center items-center bg-[#ED9BC8] rounded-t-2xl p-4 h-24'>
      <h1 className=' text-5xl  font-extrabold text-center pl-36 mx-auto'>กฏหมายอาญา</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger><Link href = '/crime/crime2'>ภาค 2 ความผิด</Link></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='flex-col w-48 text-left pl-4 pt-4 mb-5'>
                <li><Link href = '/crime/crime1'>ภาค 1 บทบัญญัติทั่วไป</Link></li>
                <li><Link href = '/crime/crime3'>ภาค 3 ลหุโทษ</Link></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
        </NavigationMenuList>
      </NavigationMenu>
    </div>

      <div className='p-8 ml-10 bg-[#FFFADF] rounded-2xl' >
        <h2 className='font-semibold text-3xl'>ลักษณะ 1 ความผิดเกี่ยวกับความมั่นคงแห่งราชอาณาจักร</h2>
        <ul className='font-medium text-xl mx-8 my-3'>
          <li className='pb-5 pt-2'><Link href='/'>หมวด 1 ความผิดต่อองค์พระมหากษัตริย์ พระราชินี รัชทายาทและผู้สําเร็จราชการแทนพระองค์</Link></li>
          <li className='pb-5'>หมวด 2 วามผิดต่อความมั่นคงของรัฐภายในราชอาณาจักรา</li>
          <li className='pb-5'>หมวด 3 วามผิดต่อความมั่นคงของรัฐภายนอกราชอาณาจักร</li>
          <li className='pb-5'>หมวด 4 ความผิดต่อสัมพันธไมตรีกับต่างประเทศ</li>
        </ul>
        <hr className='border-2 my-5 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 1/1 ความผิดเกี่ยวกับการก่อการร้าย</h2>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl'>ลักษณะ 2 ความผิดเกี่ยวกับการปกครอง</h2>
            <ul className='font-medium text-xl mx-8 my-2'>
                <li className='pb-5 pt-2'><Link href='/'>หมวด 1 ความผิดต่อเจ้าพนักงาน</Link></li>
                <li className='pb-5'>หมวด 2 ความผิดต่อตําแหน่งหน้าที่ราชการ</li>
            </ul>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 3 ความผิดเกี่ยวกับการปกครอง</h2>
            <ul className='font-medium text-xl mx-8 my-2'>
                <li className='pb-5 pt-2'><Link href='/'>หมวด 1 ความผิดต่อเจ้าพนักงานในการยุติธรรม</Link></li>
                <li className='pb-5'>หมวด 2 ความผิดต่อตําแหน่งหน้าที่ในการยุติธรรม</li>
            </ul>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 4 ความผิดเกี่ยวกับศาสนา</h2>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 5 ความผิดเกี่ยวกับความสงบสุขของประชาชน</h2>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 6 ความผิดเกี่ยวกับการก่อให้เกิดภยันตรายต่อประชาชน</h2>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 7 ความผิดเกี่ยวกับการปลอมและการแปลง</h2>
            <ul className='font-medium text-xl mx-8 my-2'>
                <li className='pb-5 pt-2'><Link href='/'>หมวด 1 ความผิดเกี่ยวกับเงินตรา</Link></li>
                <li className='pb-5'>หมวด 2 ความผิดเกี่ยวกับดวงตรา แสตมป์และตั๋ว</li>
                <li className='pb-5'>หมวด 3 ความผิดเกี่ยวกับเอกสาร</li>
                <li className='pb-5'>หมวด 4 ความผิดเกี่ยวกับบัตรอิเล็กทรอนิกส์</li>
                <li className='pb-5'>หมวด 5 ความผิดเกี่ยวกับหนังสือเดินทาง</li>
            </ul>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 8 ความผิดเกี่ยวกับการค้า</h2>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 9 ความผิดเกี่ยวกับเพศ</h2>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 10 ความผิดเกี่ยวกับชีวิตและร่างกาย</h2>
            <ul className='font-medium text-xl mx-8 my-2'>
                <li className='pb-5 pt-2'><Link href='/'>หมวด 1 ความผิดต่อชีวิต</Link></li>
                <li className='pb-5'>หมวด 2 ความผิดเกี่ยวกับดวงตรา แสตมป์และตั๋ว</li>
                <li className='pb-5'>หมวด 3 ความผิดต่อร่างกาย</li>
                <li className='pb-5'>หมวด 4 ความผิดฐานทําให้แท้งลูก</li>
                <li className='pb-5'>หมวด 5 ความผิดฐานทําให้แท้งลูก</li>
            </ul>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 11 ความผิดเกี่ยวกับเสรีภาพและชื่อเสียง</h2>
            <ul className='font-medium text-xl mx-8 my-2'>
                <li className='pb-5 pt-2'><Link href='/'>หมวด 1 ความผิดต่อเสรีภาพ</Link></li>
                <li className='pb-5'>หมวด 2 ความผิดฐานเปิดเผยความลับ</li>
                <li className='pb-5'>หมวด 3 ความผิดต่อร่างกาย</li>
                <li className='pb-5'>หมวด 4 ความผิดฐานทําให้แท้งลูก</li>
                <li className='pb-5'>หมวด 5 ความผิดฐานหมิ่นประมาท</li>
            </ul>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>    
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 12 ความผิดเกี่ยวกับทรัพย์</h2>
            <ul className='font-medium text-xl mx-8 my-2'>
                <li className='pb-5 pt-2'><Link href='/'>หมวด 1 ความผิดฐานลักทรัพย์และวิ่งราวทรัพย์</Link></li>
                <li className='pb-5'>หมวด 2 ความผิดฐานกรรโชก รีดเอาทรัพย์ ชิงทรัพย์และปล้นทรัพย์</li>
                <li className='pb-5'>หมวด 3 ความผิดฐานฉ้อโกง</li>
                <li className='pb-5'>หมวด 4 ความผิดฐานโกงเจ้าหนี้</li>
                <li className='pb-5'>หมวด 5 ความผิดฐานยักยอก</li>
                <li className='pb-5'>หมวด 6 ความผิดฐานรับของโจร</li>
                <li className='pb-5'>หมวด 7 ความผิดฐานทําให้เสียทรัพย์</li>
                <li className='pb-5'>หมวด 8 ความผิดฐานบุกรุก</li>
            </ul>
        <hr className='border-2 my-6 border-slate-300 opacity-30'/>
        <h2 className='font-semibold text-3xl mb-4'>ลักษณะ 13 ความผิดเกี่ยวกับศพ</h2>

      </div>
    </article>
  )
}

export default CrimeP2