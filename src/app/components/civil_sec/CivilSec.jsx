import React from 'react'
import Image from 'next/image'

function CivilSec() {
  return (
    <section className='flex justify-center items-center text-white text-4xl font-extrabold bg-green-500 w-5/12 rounded-3xl'>
        <Image
            src= '/money.png'
            width={230}
            height={200}
            alt='civil'
            className='mr-10'
        />
        <p className='text-center'>กฏหมายแพ่ง <br />และพาณิชย์</p>

    </section>
  )
}

export default CivilSec