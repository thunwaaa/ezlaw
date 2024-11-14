import React from 'react'


function ChatButt() {
  return (
    <div>
      <button className='text-base bg-green-200 text-emerald-700 font-bold py-2 px-4 rounded-full
        transition duration-300 delay-100 hover:bg-green-500 hover:text-white hover:delay-300'>Chat with Lawyer now!</button>
    </div>
  )
}


function SelectLawyer() {
  return (
    <div>
      <ul className='font-semibold text-2xl'>
            <li className='flex p-10 '>
                <div className='w-[120px] h-[120px] bg-black rounded-full mr-20'></div>
                <div>
                    <h2 className='cursor-pointer mt-2'>somkid</h2>
                    <h3 className='text-sm'>description</h3>
                </div>
                <ChatButt />
            </li>
            <hr className='border-2 my-6 border-slate-300 opacity-30 ' />
          </ul>
    </div>
  )
}

export default SelectLawyer
