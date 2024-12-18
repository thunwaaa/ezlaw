'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import CrimeSec from './crime_sec/CrimeSec';
import CivilSec from './civil_sec/CivilSec';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Content1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }
    setLoading(true);
    setShowDropdown(true);
    setSelectedIndex(-1);

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setSearchResults(data);
        
        if (data.length === 0) {
          toast.info('ไม่พบผลลัพธ์การค้นหา');
        }
      } else {
        setSearchResults([]);
        toast.error('รูปแบบข้อมูลไม่ถูกต้อง');
      }
    } catch (error) {
      console.error('Error searching for laws:', error);
      setSearchResults([]);
      toast.error('เกิดข้อผิดพลาดในการค้นหา');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = (result) => {
    const navigationPath = [result.law_type_id, result.hierarchy_id, result.parent_id, result.id].filter(Boolean);

    const queryParams = new URLSearchParams({
      highlight: result.id.toString(),
      path: navigationPath.join('/')
    });

    router.push(`/laws/${result.law_type_id}?${queryParams}`);
    
    setSearchTerm('');
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showDropdown) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prevIndex) => 
            prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : -1
          );
          break;
        case 'Enter':
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleSelectResult(searchResults[selectedIndex].law_type_id);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDropdown, searchResults, selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className='bg-indigo-300 rounded-[52px] mx-20 mt-10 h-[500px]'>
        <div className='absolute w-[421px] h-[180px] left-[170px] top-[220px]'>
          <h1 className='font-black text-6xl text-left pl-10 leading-[90px] '>ทำกฎหมายให้เป็นเรื่องง่าย!</h1>
        </div>
        <div className='pl-24 pt-80'>
        <form onSubmit={handleSubmit}>
          <div className='ml-10'>
          <input
                ref={searchInputRef}
                type='text'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(e.target.value.trim() !== '');
                }}
                placeholder='ค้นหากฏหมาย'
                className='w-96 w-[370px] h-12 px-4 rounded-full border border-gray-200 
                  outline-none bg-white shadow-sm transition-all duration-200 
                  focus:border-[#8B3A3A] focus:ring-2 focus:ring-[#8B3A3A]/20'
              />
            <button 
                type='submit' 
                disabled={loading}
                className='relative ml-[235px] xl:ml-[385] mb-0 -mt-11 h-10 px-6 flex items-center gap-2 
                  bg-[#8B3A3A] hover:bg-[#6d2e2e] text-white 
                  rounded-full transition-colors duration-200 right-32 
                  disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FaSearch />
                ค้นหา
              </button>
          </div>
          {showDropdown && searchResults.length > 0 && (
              <div 
                ref={dropdownRef}
                className='absolute z-50 mt-2 ml-7 w-1/4 border border-gray-200 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto'
              >
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0 ${
                      selectedIndex === index ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleSelectResult(result)}
                  >
                    <div className='font-bold text-sm text-[#8B3A3A]'>
                      {result.law_type} - มาตรา {result.section_number}
                      <span className='text-gray-500 text-xs ml-2'>
                        ({result.section_name}) {/* Section name in parentheses and gray */}
                      </span>
                    </div>
                    <div className='text-xs text-gray-600'>
                      {result.content.substring(0, 100).replace(/<\/?p>/g, '')}...
                    </div>
                  </div>
                ))}
              </div>
            )}
        </form>
        </div>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div>
          <div>
            <Image
              src="/booksandapple.png"
              width={400}
              height={400}
              alt="picture"
              className='absolute ml-96 right-[490] top-[200] lg:right-80'
            />
          </div>
          <div className='absolute w-[232px] h-[62px] right-[300px] top-[230px] bg-blue-500 rounded-[31px] lg:right-44 lg:w-[220px]'></div>
          <div className='absolute w-[200px] h-[51px] right-[850px] top-[202px] bg-blue-500 rounded-[31px] lg:right-[610px]'></div>
          <div className='absolute w-[149px] h-[58px] right-[200px] top-[415px] bg-blue-500 rounded-[31px] lg:right-36'></div>
          <div className='absolute w-[139px] h-[55px] right-[950px] top-[450px] bg-blue-500 rounded-[31px] lg:right-[750px]'></div>
        </div>
      </section>

      <div className='text-center my-5'>
        <hr className='mt-7 w-2/5 border-2 rounded-full float-left ml-20' />
        <p className='text-3xl font-semibold w-48 p-2 mx-auto'>กฎหมาย</p>
        <hr className='-mt-6 w-2/5 border-2 rounded-full float-right mr-20' />
      </div>

      <section className='flex justify-around mx-5'>
        <CrimeSec />
        <CivilSec />
      </section>
    </>
  );
};

export default Content1;
