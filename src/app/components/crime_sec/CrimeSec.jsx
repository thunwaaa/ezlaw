import React from 'react'
import Image from 'next/image'

function CrimeSec() {
  return (
    <section className='flex justify-center items-center text-white text-4xl font-extrabold bg-red-700 w-5/12 rounded-3xl'>
        <Image
            src='/thief.png'
            width={200}
            height={200}
            alt='crime'
        />
        <p className='text-center'>กฏหมายอาญา</p>
    </section>


  )
}

export default CrimeSec