"use client"

import React, { useEffect, useState,use } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { validators } from 'tailwind-merge';
import { fromJSON } from 'postcss';
import DeleteBtn from 'app/components/DeleteBtn';

export function EditFolderPage({ params }) {

    const { id } =  params;

    const[folderData, setFolderData] = useState("");
    const[flashcardData,setFlashcardData] = useState([]);
    const [flashcardterm, setflashcardterm] = useState("");
    const [flashcarddef, setflashcarddef] = useState("");

    //new data folder
    const [newfoldername, setnewfoldername] = useState("");
    const [newfolderdesc, setnewfolderdesc] = useState("");

    const [isCreating, setIsCreating] = useState(false);

    const router = useRouter();

    const getFlashcards = async () =>{
        if(!id) return;
        try{
            const res = await fetch(`http://localhost:3000/api/folders/${id}/flashcards`,{
                method: "GET",
                cache: "no-store"
            });

            if(!res.ok){
                throw new Error("Failed to fetch flashcards");
            }

            const data = await res.json();
            setFlashcardData(data.flashcards|| []);

        }catch(error){
            console.log("Error loading flashcards: ",error);
        }
    }

    const getFolderById = async (folderId) =>{
        try{
            const res = await fetch(`http://localhost:3000/api/folders/${folderId}`,{
                method: "GET",
                cache: "no-store"
            });

            if(!res.ok){
                throw new Error("Failed to fetch a folder");
            }
            const data = await res.json();
            setFolderData(data.folder);

        }catch(error){
            console.log("Error fetching folders",error);
        }
    };

    useEffect(() =>{
        if(id){
            getFolderById(id);
            getFlashcards();
        }
         
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!flashcardterm || !flashcarddef){
            alert("Please fill term and definition");
            return;
        };

        try{
            const res = await fetch("http://localhost:3000/api/folders/flashcards",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    folderId: id,
                    term: flashcardterm,
                    definition: flashcarddef
                }),
            });

            if(!res.ok){
                throw new Error("Failed to create flashcard");
            }

            const data = await res.json();

            setFlashcardData((prev) => [...prev, data.flashcard]);

            console.log("Flashcard created: ",data);

            setflashcardterm("");
            setflashcarddef("");
            setIsCreating(false);

        }catch(error){
            console.log(error);
        }

    };

    const handleDelete = async (folderId,flashcardId) =>{
        const confirmed = confirm("Are you sure?");
        if(confirmed){
            try{
                const res = await fetch(`http://localhost:3000/api/folders/${folderId}/flashcards/${flashcardId}`,{
                    method: "DELETE",
                });

                if(res.ok){
                    alert("Flashcard deleted successfully!");
                    setFlashcardData((prevData) => prevData.filter(flashcard => flashcard._id !== flashcardId));
                    getFlashcards();
                }else{
                    alert("Failed to delete flashcard");
                }
                
            }catch(error){
            console.log("Error deleting flashcard: ",error);
            }
        }
    };

    const handleCancel = () =>{
        setIsCreating(false);
        setflashcardterm("");
        setflashcarddef("");
    };

  return (
    <div className='container mx-10 py-10'>
        <h3 className='text-3xl font-bold'>{folderData.foldername}</h3>
        <h2 className='text-xl font-bold'>{folderData.folderdesc}</h2>
        <hr className='my-3'/>
        <div className='grid grid-cols-2 gap-5 mx-5'>
            <div className='text-3xl bg-slate-800 text-white font-bold p-10 text-center rounded-2xl'>flashcard</div>
            <div className='text-3xl bg-slate-800 text-white font-bold p-10 text-center rounded-2xl'>match</div>
        </div>
        <div>
            <div className="flex justify-between items-center mt-10">
                <h1 className="text-2xl">{flashcardData.length} terms in this set</h1>
                <button onClick={() => setIsCreating(true)} className="bg-slate-500 py-2 px-3 rounded-lg text-white">add new term</button>
            </div>

            
            {isCreating &&(
                <form onSubmit={handleSubmit}>
                    <div className='bg-blue-950 p-10 rounded-xl text-white'>
                        <label htmlFor="" className='mx-5'>TERM</label>
                        <input type="text" onChange={(e) => setflashcardterm(e.target.value)} value={flashcardterm} placeholder='term' className='bg-transparent' />
                        <br />
                        <label htmlFor="">DEFINITION</label>
                        <input type="text" onChange={(e) => setflashcarddef(e.target.value)} value={flashcarddef} placeholder='definition' className='bg-transparent' />
                        <button onClick={handleCancel} className='bg-blue-600 py-2 px-3 ml-5 rounded-lg'>Cancel</button>
                        <button type='button' className='bg-blue-600 py-2 px-3 rounded-lg mx-5'>Create</button>
                    </div>
                </form>
            )}
            <div className='grid grid-cols-1 my-5'>
                {flashcardData && flashcardData.length > 0 ?(
                    flashcardData.map((flashcard) =>(
                        
                            <div key={flashcard._id} className='bg-blue-950 p-10 my-2 rounded-xl text-white'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <div className='flex items-center'>
                                            <label htmlFor="" className='mx-5 font-bold'>TERM : </label>
                                            <h4 className='text-gray-400' >{flashcard.term}</h4>
                                        </div>
                                        <div className='flex items-center mt-2'>
                                            <label htmlFor="" className='mx-5 font-bold'>DEFINITION : </label>
                                            <h4 className='text-gray-400'>{flashcard.definition}</h4>
                                        </div>
                                    </div>
                                    
                    
                                    <div className='flex mt-4 justify-end'>
                                        <button type='submit' className='bg-blue-600 py-2 px-3 ml-5 rounded-lg'>Edit</button>
                                        <button onClick={() => handleDelete(id, flashcard._id)} className='bg-blue-600 py-2 px-3 rounded-lg mx-5'>Delete</button>
                                    </div>
                                </div>
                            </div>
                            
                        
                    ))
                ) : (
                    <p className='bg-gray-300 p-3 my-3'>You do not have any term yet.</p>
                )}
            </div>
        
        </div>
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setnewfoldername(e.target.value)} type="text" className='w-[300] block bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder={folderData.foldername} />
            <input onChange={(e) => setnewfolderdesc(e.target.value)} type="text" className='w-[300] block bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder={folderData.folderdesc} />
            <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit Folder</button>
        </form>

        <form action="">
            <div className='bg-blue-950 p-10 rounded-xl text-white'>
                <label htmlFor="" className='mx-5'>TERM</label>
                <input type="text" placeholder='term' className='bg-transparent' />
                <br />
                <label htmlFor="">DEFINITION</label>
                <input type="text" name="" id="" placeholder='definition' className='bg-transparent' />
                <button type='submit' className='bg-blue-600 py-2 px-3 ml-5 rounded-lg'>edit</button>
                <button className='bg-blue-600 py-2 px-3 rounded-lg mx-5'>delete</button>
            </div>
        </form>
    </div>
  )
}

export default EditFolderPage;
