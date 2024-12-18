"use client"
import React, {use, useEffect} from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProtectedPage from 'app/components/protectpage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function Civillaw() {

  
  return (
    <ProtectedPage>

      <article className='rounded-2xl mx-auto mt-10 w-11/12 h-auto bg-[#FFFADF]'>
      <div className='flex text-center items-center bg-[#C4ED9B] rounded-t-2xl p-4 h-24'>
        <h1 className=' text-5xl  font-extrabold text-center mx-auto'>กฏหมายแพ่งและพาณิชย์</h1>
      </div>

      <div className='p-8 ml-10 '>
          <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='pb-2 pt-2 m-3 font-semibold text-3xl'>ข้อความเบื้องต้น (มาตรา 1-3)</AccordionTrigger>
            <AccordionContent>
              <h2 className='text-lg font-medium'>มาตรา ๑</h2>
              <div className='text-lg'>
                    <p>กฎหมายนี้ให้เรียกว่า ประมวลกฎหมายแพ่งและพาณิชย์ต</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๒</h2>
              <div className='text-lg'>
                    <p>ให้ใช้ประมวลกฎหมายนี้ตั้งแต่วันที่ ๑ เดือนมกราคม พระพุทธศักราช ๒๔๖๘ เป็นต้นไป</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๓</h2>
              <div className='text-lg'>
                    <p>ตั้งแต่วันที่ใช้ประมวลกฎหมายนี้สืบไป ให้ยกเลิกบรรดากฎหมาย กฎ และข้อบังคับอื่น ๆ ในส่วนที่มีบัญญัติไว้แล้วในประมวลกฎหมายนี้ หรือซึ่งแย้งกับบทแห่งประมวลกฎหมายนี้</p>
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
        <h2 className='font-semibold text-3xl mt-7 ml-3'>บรรพ 1 หลักทั่วไป (มาตรา 4 - 193/35)</h2>
          <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='pb-2 pt-2 m-3 font-semibold text-xl'>ลักษณะ 1 บทเบ็ดเสร็จทั่วไป</AccordionTrigger>
            <AccordionContent>
              <h2 className='text-lg font-medium'>มาตรา ๔ </h2>
              <div className='text-lg'>
                    <p>กฎหมายนี้ให้เรียกว่า ประมวลกฎหมายแพ่งและพาณิชย์ต</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๖</h2>
              <div className='text-lg'>
                    <p>ให้ใช้ประมวลกฎหมายนี้ตั้งแต่วันที่ ๑ เดือนมกราคม พระพุทธศักราช ๒๔๖๘ เป็นต้นไป</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๗</h2>
              <div className='text-lg'>
                    <p>ตั้งแต่วันที่ใช้ประมวลกฎหมายนี้สืบไป ให้ยกเลิกบรรดากฎหมาย กฎ และข้อบังคับอื่น ๆ ในส่วนที่มีบัญญัติไว้แล้วในประมวลกฎหมายนี้ หรือซึ่งแย้งกับบทแห่งประมวลกฎหมายนี้</p>
              </div>
              <h2 className='text-lg font-medium mt-3'>มาตรา ๘</h2>
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

    </ProtectedPage>
  )
}

export default Civillaw