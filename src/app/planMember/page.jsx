import React from 'react'
import { Check, DollarSign } from 'lucide-react'

function MemberPlan() {
  return (
    <section className='w-10/12 border mx-auto mt-10 rounded-3xl h-auto text-center bg-gradient-to-br from-[#C4ED9B] to-[#B4D8FF]'>
        <h1 className='text-5xl font-black mt-16'>MEMBERSHIP PLAN</h1>
        <h2 className='text-3xl font-black mt-10'>Benefits</h2>
        <div className='flex text-2xl font-semibold justify-center mt-8'>
            <p className='mr-6'>สามารถเข้าถึงเนื่อหาทั้งหมดได้</p>
            <p className='flex mr-6'><Check strokeWidth={5} className='mr-3'/> สามารถพูดคุยและปรึกษาทนายได้</p>
            <p className='flex '><Check strokeWidth={5} className='mr-3'/> อื่นๆ อีกมากมาย</p>
        </div>

        <article className='flex justify-around mt-20 p-4'>
            <div className=' rounded-xl w-80 bg-white h-64 pt-10 text-2xl font-extrabold'>
                <h3 className='font-black text-3xl'>รายสัปดาห์</h3>
                <p className='text-6xl flex justify-center mt-6'><DollarSign size={32} strokeWidth={3}/>X <p className='text-lg ml-2 content-end'>/ mo</p></p>
                <button className='rounded-xl mt-6 w-64 h-12 bg-[#2C2C2C] text-white text-lg'>Get Membership!</button>
            </div>
            <div className='rounded-xl w-80 bg-[#2C2C2C] h-64 pt-10 text-white text-2xl font-extrabold'>
                <h3 className='font-black text-3xl'>รายเดือน</h3>
                <p className='text-6xl flex justify-center mt-6'><DollarSign size={32} strokeWidth={3}/>X <p className='text-lg ml-2 content-end'>/ mo</p></p>
                <button className='rounded-xl mt-6 w-64 h-12 bg-white text-slate-950 text-lg'>Get Membership!</button>
            </div>
            <div className='rounded-xl w-80 bg-white h-64 pt-10 text-2xl font-extrabold'>
                <h3 className='font-black text-3xl'>รายปี</h3>
                <p className='text-6xl flex justify-center mt-6'><DollarSign size={32} strokeWidth={3}/>X <p className='text-lg ml-2 content-end'>/ mo</p></p>
                <button className='rounded-xl mt-6 w-64 h-12 bg-[#2C2C2C] text-white text-lg'>Get Membership!</button>
            </div>
        </article>

        <h4 className='text-xl font-medium mt-20 mb-10'>เลือกแพ็กเกจ Membership ของคุณ ชำระเงินได้หลายวิธี ยกเลิกได้ทุกเมื่อ</h4>
    </section>
  )
}

export default MemberPlan
