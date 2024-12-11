"use client"

import React, { useEffect, useState,use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { validators } from 'tailwind-merge';
import { fromJSON } from 'postcss';
import DeleteBtn from 'app/components/DeleteBtn';

const EditFolderPage = ({ params }) => {


    const { id } = params;

    const [folderData, setFolderData] = useState("");
    const [flashcardData,setFlashcardData] = useState([]);
    const [flashcardterm, setflashcardterm] = useState("");
    const [flashcarddef, setflashcarddef] = useState("");

    const [currentFlashcardIndex,setCurrentFlashcardIndex] = useState(0);
    const [isPlaying,setIsPlaying] = useState(false);
    const [isFlipped,setIsFlipped] = useState(false);

    //new data folder
    const [newfoldername, setnewfoldername] = useState("");
    const [newfolderdesc, setnewfolderdesc] = useState("");

    const [editMode,setEditMode] = useState(null);
    const [editTerm,setEditTerm] = useState("");
    const [editDefinition,setEditDefinition] = useState("");


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
            console.log("Flashcards loaded:", data.flashcards);
            setFlashcardData(data.flashcards|| []);
        }catch(error){
            console.log("Error loading flashcards: ",error);
            setFlashcardData([]);
        }
    };
    
    const handleEdit = (flashcard) =>{
        setEditMode(flashcard._id);
        setEditTerm(flashcard.term);
        setEditDefinition(flashcard.definition);
    };

    const handleCancelEdit = () =>{
        setEditMode(null);
        setEditTerm("");
        setEditDefinition("");
    };

    const handleSaveEdit = async (flashcardId) =>{
        try{
            const res = await fetch(`http://3000/api/folders/${id}/flashcards`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({flashcardId, term: editTerm, definition: editDefinition}),
            });

            if(!res.ok){
                throw new Error("Failed to update flashcard");
            }

            const updatedFlashcard = await res.json();

            setFlashcardData((prev) => prev.map((card) => card._id === flashcardId ? {...card, term: updatedFlashcard.term, definition: updatedFlashcard.definition} : card));

            handleCancelEdit();
        }catch(error){
            console.log("Error updating flashcard: ",error);
        }
    };

    async function getFolderById(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/folders/${id}`, {
                method: "GET",
                cache: "no-store"
            });

            if (!res.ok) {
                throw new Error("Failed to fetch a folder");
            }
            const data = await res.json();
            console.log("Folder data:", data);
            setFolderData(data);

        } catch (error) {
            console.log("Error fetching folders", error);
        }
    }

    useEffect(() =>{
        if(id){
            getFolderById(id);
            getFlashcards();
        }
         
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const folderId = id; 
        if(!flashcardterm || !flashcarddef){
            alert("Please fill term and definition");
            return;
        };

        try{
            const res = await fetch(`http://localhost:3000/api/folders/${folderId}/flashcards`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({folderId: id, term: flashcardterm, definition: flashcarddef}),
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
                const res = await fetch(`http://localhost:3000/api/folders/${folderId}/flashcards?folderId=${folderId}&flashcardId=${flashcardId}`,{
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

    const handlePlayFlashcards = () =>{
        setIsPlaying(true);
        setCurrentFlashcardIndex(0);
    };

    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };
    
    

    const handleNextFlashcard = () =>{
        if(currentFlashcardIndex < flashcardData.length -1){
            setCurrentFlashcardIndex((prevIndex) => prevIndex +1);
        }else{
            setIsPlaying(false);
        }
    };

    const handleFinish = () =>{
        setIsPlaying(false);
    };

  return (
    <div className='container mx-10 py-10 '>
        <div className='grid grid-cols-2'>
            <div>
                <h3 className='text-4xl font-bold'>{folderData.foldername}</h3>
                <h2 className='text-xl font-bold'>{folderData.folderdesc}</h2>
            </div>
        </div>
        
            
        <hr className='my-3'/>
        <div className='grid grid-cols-2 gap-5 mx-5'>
            
        </div>

        {isPlaying && flashcardData.length > 0 && (
                <div onClick={handleFlip} className="mt-10 bg-blue-950 p-10 rounded-xl text-white">
                    {isFlipped ? (
                        <>
                            <h4 className="text-xl font-bold">Term:</h4>
                            <p className="text-lg">{flashcardData[currentFlashcardIndex].term}</p>
                            
                        </>
                    ) : (
                        <>
                            <h4 className="text-xl font-bold mt-5">Definition:</h4>
                            <p className="text-lg">{flashcardData[currentFlashcardIndex].definition}</p>
                        </>
                    )}
                    
                    

                    <button className="flex justify-end mt-5">
                            <button
                            className="bg-yellow-600 py-2 px-3 rounded-lg mr-5">
                            Flip
                        </button>
                        {currentFlashcardIndex < flashcardData.length - 1 ? (
                            <button
                                onClick={handleNextFlashcard}
                                className="bg-green-600 py-2 px-3 rounded-lg mr-5"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleFinish}
                                className="bg-gray-600 py-2 px-3 rounded-lg"
                            >
                                Finish
                            </button>
                        )}
                    </button>
                </div>
            )}

            {!isPlaying && (
                    <div>
                        <div className="flex justify-between items-center mt-10">
                            <h1 className="text-2xl">{flashcardData.length} terms in this set</h1>
                            <div className='grid grid-cols-2 gap-2'>
                                    {!isPlaying ? (
                                    <button
                                        onClick={handlePlayFlashcards}
                                        className="bg-blue-500 py-2 px-3 w-40 rounded-lg text-white "
                                    >
                                        Play Flashcards
                                    </button>
                                ) : (
                                    console.log("Flashcard is playing")
                                )}
                                <button onClick={() => setIsCreating(true)} className="bg-slate-500 py-2 px-3 rounded-lg text-white">add new term</button>
                            </div>
                            
                        </div>
        
                    
                    {isCreating &&(
                        <form onSubmit={handleSubmit}>
                            <div className='bg-blue-950 mt-5 p-10 my-2 rounded-xl text-white'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <div className='flex items-center'>
                                            <label htmlFor="" className='mx-5 font-bold'>TERM :</label>
                                            <input type="text" onChange={(e) => setflashcardterm(e.target.value)} value={flashcardterm} placeholder='term' className='bg-transparent' />
                                        </div>
                                        <div className='flex items-center mt-2'>
                                            <label htmlFor="" className='mx-5 font-bold'>DEFINITION : </label>
                                            <input type="text" onChange={(e) => setflashcarddef(e.target.value)} value={flashcarddef} placeholder='definition' className='bg-transparent' />
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                
                                <div className='flex mt-4 justify-end'>
                                    <button onClick={handleCancel} className='bg-gray-600 py-2 px-3 ml-5 rounded-lg'>Cancel</button>
                                    <button type='Submit' className='bg-green-600 py-2 px-3 rounded-lg mx-5'>Create</button>
                                </div>
                                
                            </div>
                            <hr className='my-3 '/>
                        </form>
                    )}
        
        
        
                    <div className='grid grid-cols-1 my-5 mt-2'>
                        {flashcardData && flashcardData.length > 0 ?(
                            flashcardData.map((flashcard) =>(
                                
                                    <div key={flashcard._id} className='bg-blue-950 p-10 my-2 rounded-xl text-white'>
                                        <div className='flex justify-between items-start'>
                                            <div>
                                                {editMode === flashcard._id ? (
                                                    <>
                                                        <div className='flex items-center'>
                                                            <label htmlFor="" className='mx-5 font-bold'>TERM : </label>
                                                            <input type="text" value={editTerm} onChange={(e) => setEditTerm(e.target.value)} className='bg-transparent text-white' />
                                                        </div>
                                                        <div className='flex items-center mt-2'>
                                                            <label htmlFor="" className='mx-5 font-bold'>DEFINITION : </label>
                                                            <input type="text" value={editDefinition} onChange={(e) => setEditDefinition(e.target.value)} className='bg-transparent text-white' />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='flex items-center'>
                                                            <label htmlFor="" className='mx-5 font-bold'>TERM : </label>
                                                            <h4 className='text-gray-400'>{flashcard.term}</h4>
                                                        </div>
                                                        <div className='flex items-center mt-2'>
                                                            <label htmlFor="" className='mx-5 font-bold'>DEFINITION : </label>
                                                            <h4 className='text-gray-400'>{flashcard.definition}</h4>
                                                        </div>
                                                    </>
                                                )}
                                                </div>
        
                                                <div className="flex mt-4 justify-end">
                          {/* {editMode === flashcard._id ? (
                            <> */}
                              {/* <button onClick={() => handleSaveEdit(flashcard._id)} className="bg-green-600 py-2 px-3 ml-5 rounded-lg">
                                Save
                              </button>
                              <button onClick={handleCancelEdit} className="bg-gray-600 py-2 px-3 ml-5 rounded-lg">
                                Cancel
                              </button> */}
                            {/* </>
                          ) : (
                            // <button onClick={() => handleEdit(flashcard)} className="bg-blue-600 py-2 px-3 ml-5 rounded-lg">
                            //   Edit
                            // </button>
                          )} */}
                          <button onClick={() => handleDelete(id, flashcard._id)} className="bg-red-600 py-2 px-3 ml-5 rounded-lg">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="bg-gray-300 p-3 my-3">You do not have any terms yet.</p>
                )}
              </div>
            </div>
            )}
    </div>
  )
}

export default EditFolderPage;
