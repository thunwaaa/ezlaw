"use client"

import React from 'react';

function DeleteBtn({id}) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");
    if(confirmed){
      const res = await fetch(`http://localhost:3000/api/folders?id=${id}`,{
        method: "DELETE"
      })
      if(res.ok){
        window.location.reload();
      }
    }
  }

  return (
    <a onClick={handleDelete} className='bg-red-500 text-white border py-2 rounded-md text-lg px-3'>
      DELETE
    </a>
  )
}

export default DeleteBtn