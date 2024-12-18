"use client";
import React,{ useState,useEffect } from "react";
import Link from "next/link";
import DeleteBtn from "app/components/DeleteBtn";
import { useRouter } from "next/navigation";
import MembershipPage from "app/components/protectrole";
import ProtectedPage from "app/components/protectpage";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

export default function Folder(){

    const [folderData, setFolderData] = useState([]);

    const [foldername, setFoldername] = useState("");
    const [folderdesc, setFolderdesc] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [userId, setuserid] = useState("");

    const [editingFolder, setEditingFolder] = useState(null);
    const [editFoldername, setEditFoldername] = useState("");
    const [editFolderdesc, setEditFolderdesc] = useState("");

    const router = useRouter();

    const fecthuserid =  async () => {
        try{
            const res = await fetch("http://localhost:8080/api/auth/user_id",{
                method: "GET",
                credentials: "include",
            });
            if(res.ok){
                const data = await res.json();
                setuserid(data.userId);
            }
        }catch(error){
            console.log("error while fetch id");
        }
    }
    const getFolders = async () => {
        try {
            if (!userId) {
                console.error("User ID is missing. Cannot fetch folders.");
                return;
            }
    
            console.log("Fetching folders for userId:", userId); // Debug log
    
            const res = await fetch(`http://localhost:3000/api/folders?userId=${userId}`, {
                method: "GET",
                cache: "no-store"
            });
    
            const responseData = await res.json(); // Always parse response
            console.log("Full response:", responseData); // Log full response
    
            if (!res.ok) {
                throw new Error(responseData.message || "Failed to fetch folders");
            }
    
            console.log("Fetched folders:", responseData.folders);
            setFolderData(responseData.folders || []);
    
        } catch (error) {
            console.error("Detailed error:", error);
            alert(`Error loading folders: ${error.message}`);
        }
    };
    useEffect(() => {
        fecthuserid();
    },[]);

    useEffect(() => {
        if (userId) {
            getFolders();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!foldername){
            alert("Please fill the name");
            return;
        };

        if (!userId) {
            console.error("User ID is missing. Cannot create folder.");
            alert("Error: User not logged in.");
            return;
        }

        try{
            const res = await fetch("http://localhost:3000/api/folders",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({foldername,folderdesc,userId}),
            });
            if(res.ok){
                router.refresh();
                setIsCreating(false);
                setFoldername("");
                setFolderdesc("");
                getFolders();
            }else{
                throw new Error("Failed to create folder");
            }
        }catch(error){
            console.log(error);
        }
    };


    const handleCancel = () => {
        setIsCreating(false);
        setFoldername("");
        setFolderdesc("");
    };

    const handleEditClick = (folder) => {
        setEditingFolder(folder);
        setEditFoldername(folder.foldername);
        setEditFolderdesc(folder.folderdesc);
    };
    
    const handleUpdateFolder = async (e) => {
        e.preventDefault();
    
        if (!editFoldername) {
            alert("Please fill the name");
            return;
        }
    
        try {
            const res = await fetch(`http://localhost:3000/api/folders/${editingFolder._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    foldername: editFoldername,
                    folderdesc: editFolderdesc
                }),
            });
    
            if (res.ok) {
                getFolders(); // Refresh the folder list
                setEditingFolder(null);
                setEditFoldername("");
                setEditFolderdesc(""); // Exit edit mode
            } else {
                throw new Error(data.message || "Failed to update folder");
            }
        } catch (error) {
            console.log(error);
            alert("Error updating folder");
        }
    };
    
    const handleCancelEdit = () => {
        setEditingFolder(null);
        setEditFoldername("");
        setEditFolderdesc("");
    };

    const handleDelete = async (folderId) => {
        try {
            if (confirm("Are you sure you want to delete this folder?")) {
                const res = await fetch(`http://localhost:3000/api/folders/${folderId}`, {
                    method: "DELETE",
                });
    
                if (!res.ok) {
                    throw new Error("Failed to delete folder");
                }
    
                getFolders(); // refresh folder list after successful deletion
            }
        } catch (error) {
            console.error("Error deleting folder:", error);
            alert("Failed to delete folder");
        }
    };

    return(

        <MembershipPage>
            
            <main className="container mx-auto my-3 mt-10">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">All your flashcard set</h1>
                    <CgAdd onClick={() => setIsCreating(true)} size={40} className="hover:cursor-pointer"/>
                </div>
                
                <hr className="my-3" />
                <div className="grid grid-cols-4 mt-10 gap-7">
                    {isCreating &&(
                        <form  onSubmit={handleSubmit} className="shadow-xl p-5 rounded-xl border border-gray-300">
                            <h4 className="text-xl">New Flashcard Set</h4>
                            <input onChange={(e) => setFoldername(e.target.value)} type="text" placeholder="Set name" value={foldername} className="block w-full mt-3 p-2 border rounded-md" />
                            <input onChange={(e) => setFolderdesc(e.target.value)} placeholder="Set Description" value={folderdesc} className="block w-full mt-3 p-2 border rounded-md"></input>
                            <div className="flex justify-between mt-5">
                                <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded-md">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Create</button>
                            </div>
                            
                        </form>
                    )}

                    {folderData && folderData.length > 0 ? (
                        folderData.map((folder) => (
                            // <Link href={`/editfolder/${folder._id}`} key={folder._id}>
                                <div  className="shadow-xl p-10 rounded-xl" key={folder._id}>
                                    {editingFolder && editingFolder._id === folder._id ? (
                                        <form onSubmit={handleUpdateFolder}>
                                            <label htmlFor="" className="font-bold text-2xl">Edit Folder</label>
                                            <input 
                                                type="text" 
                                                value={editFoldername}
                                                onChange={(e) => setEditFoldername(e.target.value)}
                                                className="block w-full mt-3 p-2 border rounded-md text-slate-500"
                                            />
                                            <input 
                                                value={editFolderdesc}
                                                onChange={(e) => setEditFolderdesc(e.target.value)}
                                                className="block w-full mt-3 p-2 border rounded-md text-slate-500"
                                            />
                                            <div className="flex justify-between mt-5">
                                                <button 
                                                    type="button" 
                                                    onClick={handleCancelEdit} 
                                                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                            
                                    </form>
            
                                
                                ) : (
                                    <>
                                        <Link href={`/editfolder/${folder._id}`} className="block">
                                            <h4 className="text-2xl font-bold">{folder.foldername}</h4>
                                            <hr className="border-1 mx-0 px-0" />
                                            <p>{folder.folderdesc}</p>
                                        </Link>
                                        
                                        <div className="mt-5 flex justify-end">
                                            <MdEditSquare 
                                                size={15} 
                                                className='mt-0.5 mr-2 hover:cursor-pointer'
                                                onClick={() => handleEditClick(folder)}
                                            />
                                            <RiDeleteBin6Fill className="hover:cursor-pointer" onClick={() => handleDelete(folder._id)} id={folder._id} />
                                        </div>
                                    </>
                                )}
                            </div>
                            // </Link>
                        ))
                    ) : (
                        <p className="bg-gray-300 p-3 my-3 rounded-md">You do not have any folders yet.</p>
                    )}
                </div>

            </main>
        </MembershipPage>

    );
}