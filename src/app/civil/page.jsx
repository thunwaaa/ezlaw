"use client"
import React, {use, useEffect} from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProtectedPage from 'app/components/protectpage';
function Civillaw() {

  
  return (
    <ProtectedPage>

      <article className='rounded-2xl mx-auto mt-10 w-11/12 h-auto bg-[#FFFADF]'>
      <div className='flex text-center items-center bg-[#C4ED9B] rounded-t-2xl p-4 h-24'>
        <h1 className=' text-5xl  font-extrabold text-center mx-auto'>กฏหมายแพ่งและพาณิชย์</h1>
      </div>
  
        <div className='p-8 ml-10 '>
          <h2 className='font-semibold text-3xl'>ข้อความเบื้องต้น (มาตรา 1-3)</h2>
          <hr className='border-2 my-6 border-slate-300 opacity-30'/>
          <h2 className='font-semibold text-3xl '>บรรพ 1 หลักทั่วไป (มาตรา 4 - 193/35)</h2>
          <hr className='border-2 my-6 border-slate-300 opacity-30'/>
          <h2 className='font-semibold text-3xl'>บรรพ 2 หนี้ (มาตรา 194/452)</h2>
          <hr className='border-2 my-6 border-slate-300 opacity-30'/>
          <h2 className='font-semibold text-3xl'>บรรพ 3 เอกทัศสัญญา (มาตรา 453 - 1297)</h2>
          <hr className='border-2 my-6 border-slate-300 opacity-30'/>
          <h2 className='font-semibold text-3xl'>บรรพ 4 ทรัพย์สิน (มาตรา 1298 - 1434)</h2>
          <hr className='border-2 my-6 border-slate-300 opacity-30'/>
          <h2 className='font-semibold text-3xl'>บรรพ 5 ครอบครัว (มาตรา 1435 - 1598/41)</h2>
          <hr className='border-2 my-6 border-slate-300 opacity-30'/>
          <h2 className='font-semibold text-3xl'>บรรพ 6 มรดก (มาตรา 1599 - 1755)</h2>
        </div>
      </article>

    </ProtectedPage>
  )
}

export default Civillaw