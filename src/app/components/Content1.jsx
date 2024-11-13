"use client"

import React from 'react'
import Image from 'next/image'
import { FaSearch } from "react-icons/fa";
import CivilSec from './civil_sec/CivilSec';
import CrimeSec from './crime_sec/CrimeSec';
import { useState } from 'react';


export const Content1 = () => {
  const [searchTerm, setsearchTerm ] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Searching for: ", searchTerm)
  }
  return (
    <>
    <section className='bg-indigo-300 rounded-[52px] mx-20 mt-10 h-[500px]'>
        <div className='absolute w-[421px] h-[180px] left-[170px] top-[220px]'>
            <h1 className='font-extrabold text-6xl text-left pl-10 leading-[90px]'>ทำกฎหมายให้เป็นเรื่องง่าย!</h1>
        </div>
        <div className='pl-24 pt-80'>
          <form>
            <div className='ml-10'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                placeholder='ค้นหากฏหมาย'
                className='w-96 h-12 px-4 rounded-full border border-gray-200 
                outline-none bg-white shadow-sm transition-all duration-200 
                focus:border-[#8B3A3A] focus:ring-2 focus:ring-[#8B3A3A]/20' 
              />
              <button type='submit' className='relative ml-[265px] mb-0 -mt-11 h-10 px-6 flex items-center gap-2 
              bg-[#8B3A3A] hover:bg-[#6d2e2e] text-white 
              rounded-full transition-colors duration-200'>
                <FaSearch/>
              <span className='text-lg'>ค้นหา</span>
              </button>
            </div>
          </form>
        </div>
        <div>
            <div>
                <Image
                    src="/booksandapple.png"
                    width={400}
                    height={400}
                    alt="picture"
                    className='absolute ml-96 right-[420] top-[200]'
                />
            </div>
            <div className='absolute w-[232px] h-[62px] right-[200px] top-[230px] bg-blue-500 rounded-[31px]'></div>
            <div className='absolute w-[200px] h-[51px] left-[1000px] top-[202px] bg-blue-500 rounded-[31px]'></div>
            <div className='absolute w-[149px] h-[58px] left-[850px] top-[425px] bg-blue-500 rounded-[31px]'></div>
            <div className='absolute w-[149px] h-[58px] left-[1650px] top-[450px] bg-blue-500 rounded-[31px]'></div>
        </div>
    </section>
    <div className='text-center my-5'>
      <hr className='mt-7 w-2/5 border-2 rounded-full float-left ml-20'/>
      <p className='text-3xl font-semibold w-48 p-2 mx-auto'>กฎหมาย</p>
      <hr className='-mt-6 w-2/5 border-2 rounded-full float-right mr-20'/>
    </div>
    <section className='flex justify-around mx-5'>
      <CrimeSec/>
      <CivilSec/>
    </section>
    </>

  )
}
export default Content1
