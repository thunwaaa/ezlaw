import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CrimeSec() {
  return (
    <Link href='/crime/crime1' 
    className='flex justify-center items-center
    text-white text-4xl font-extrabold bg-red-700 w-5/12 rounded-3xl'>
        <Image
            src='/thief.png'
            width={200}
            height={200}
            alt='crime'
            className='mr-10'
        />
        <p className='text-center'>กฏหมายอาญา</p>
    </Link>
    


  )
}

export default CrimeSec