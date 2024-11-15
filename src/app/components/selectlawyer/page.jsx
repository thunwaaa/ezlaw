import React from 'react'
import Link from 'next/link';

function ChatButt() {
  return (
    <button className='text-base bg-green-200 text-emerald-700 font-bold py-2 px-4 rounded-full
        transition duration-300 delay-100 hover:bg-green-500 hover:text-white hover:delay-300'><Link href='/chat'>
      Chat with Lawyer now!</Link>
    </button>
  )
}

function SelectLawyer() {
  return (
    <div>
      <ul className='font-semibold text-2xl'>
        <li className='flex items-center p-10 justify-between'>
          <div className='flex items-center'>
            <div className='w-[120px] h-[120px] bg-black rounded-full mr-20'></div>
            <div>
              <h2 className='cursor-pointer mt-2'>somkid</h2>
              <h3 className='text-sm'>description</h3>
            </div>
          </div>
          <ChatButt />
        </li>
        <hr className='border-2 my-6 border-slate-300 opacity-30' />
      </ul>
    </div>
  )
}

export default SelectLawyer
