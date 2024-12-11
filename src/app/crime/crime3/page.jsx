import React from 'react'
import Link from 'next/link';
import { NavigationMenuTrigger, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent } from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
          <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='pb-2 pt-2 m-3 font-semibold text-3xl'>ภาค 3 ลหุโทษ</AccordionTrigger>
            <AccordionContent>
              <h2 className='text-lg font-medium'>มาตรา ๓๖๗</h2>
              <div className='text-lg'>
                    <p>ผู้ใดปลงพระชนม์พระมหากษัตริย์ ต้องระวางโทษประหารชีวิต</p>
                    <p>ผู้ใดพยายามกระทำการเช่นว่านั้น ต้องระวางโทษเช่นเดียวกัน</p>
                    <p>ผู้ใดกระทำการใดอันเป็นการตระเตรียมเพื่อปลงพระชนม์พระมหากษัตริย์ หรือรู้ว่ามีผู้จะปลงพระชนม์พระมหากษัตริย์ กระทำการใดอันเป็นการช่วยปกปิดไว้ ต้องระวางโทษจำคุกตลอดชีวิต</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๓๖๘</h2>
              <div className='text-lg'>
                    <p>ผู้ใดกระทำการประทุษร้ายต่อพระองค์ หรือเสรีภาพของพระมหากษัตริย์ ต้องระวางโทษประหารชีวิต หรือจำคุกตลอดชีวิต</p>
                    <p>ผู้ใดพยายามกระทำการเช่นว่านั้น ต้องระวางโทษเช่นเดียวกัน</p>
                    <p>ถ้าการกระทำนั้นมีลักษณะอันน่าจะเป็นอันตรายแก่พระชนม์ ผู้กระทำต้องระวางโทษประหารชีวิต</p>
                    <p>ผู้ใดกระทำการใดอันเป็นการตระเตรียมเพื่อประทุษร้ายต่อพระองค์ หรือเสรีภาพของพระมหากษัตริย์ หรือรู้ว่ามีผู้จะกระทำการประทุษร้ายต่อพระองค์ หรือเสรีภาพของพระมหากษัตริย์ กระทำการใดอันเป็นการช่วยปกปิดไว้ ต้องระวางโทษจำคุกตั้งแต่สิบหกปีถึงยี่สิบปี</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๓๖๙</h2>
              <div className='text-lg'>
                    <p>ผู้ใดปลงพระชนม์พระมหากษัตริย์ ต้องระวางโทษประหารชีวิต</p>
                    <p>ผู้ใดพยายามกระทำการเช่นว่านั้น ต้องระวางโทษเช่นเดียวกัน</p>
                    <p>ผู้ใดกระทำการใดอันเป็นการตระเตรียมเพื่อปลงพระชนม์พระราชินีหรือรัชทายาท หรือเพื่อฆ่าผู้สำเร็จราชการแทนพระองค์ หรือรู้ว่ามีผู้จะปลงพระชนม์พระราชินีหรือรัชทายาท หรือจะฆ่าผู้สำเร็จราชการแทนพระองค์ กระทำการใดอันเป็นการช่วยปกปิดไว้ ต้องระวางโทษจำคุกตั้งแต่สิบสองปีถึงยี่สิบปี</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๓๗๐</h2>
              <div className='text-lg'>
                    <p>ผู้ใดกระทำการประทุษร้ายต่อพระองค์ หรือเสรีภาพของพระราชินีหรือรัชทายาท หรือต่อร่างกายหรือเสรีภาพของผู้สำเร็จราชการแทนพระองค์ ต้องระวางโทษจำคุกตลอดชีวิต หรือจำคุกตั้งแต่สิบหกปีถึงยี่สิบปี</p>
                    <p>ผู้ใดพยายามกระทำการเช่นว่านั้น ต้องระวางโทษเช่นเดียวกัน</p>
                    <p>ถ้าการกระทำนั้นมีลักษณะอันน่าจะเป็นอันตรายแก่พระชนม์หรือชีวิต ผู้กระทำต้องระวางโทษประหารชีวิต หรือจำคุกตลอดชีวิต</p>
                    <p>ผู้ใดกระทำการใดอันเป็นการตระเตรียมเพื่อประทุษร้ายต่อพระองค์ หรือเสรีภาพของพระราชินีหรือรัชทายาท หรือต่อร่างกายหรือเสรีภาพของผู้สำเร็จราชการแทนพระองค์ หรือรู้ว่ามีผู้จะประทุษร้ายต่อพระองค์ หรือเสรีภาพของพระราชินีหรือรัชทายาท หรือประทุษร้ายต่อร่างกายหรือเสรีภาพของผู้สำเร็จราชการแทนพระองค์ กระทำการใดอันเป็นการช่วยปกปิดไว้ ต้องระวางโทษจำคุกตั้งแต่สิบสองปีถึงยี่สิบปี</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </article>
  );

}

export default Crime3