"use client";
import React,{ useState,useEffect } from "react";
import Link from "next/link";
import DeleteBtn from "app/components/DeleteBtn";
import { useRouter } from "next/navigation";

export default function Folder(){

    const [folderData, setFolderData] = useState([]);

    const [foldername, setFoldername] = useState("");
    const [folderdesc, setFolderdesc] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const router = useRouter();

    const getFolders = async () =>{
        try{
            const res = await fetch("http://localhost:3000/api/folders",{
                method: "GET",
                cache: "no-store"
            })

            if(!res.ok){
                throw new Error("Failed to fetch folders");
            }

            const data = await res.json();
            setFolderData(data.folders);

        }catch(error){
            console.log("Error loading folders: ",error);
        }
    }

    useEffect(() => {
        getFolders();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!foldername){
            alert("Please fill the name");
            return;
        };

        try{
            const res = await fetch("http://localhost:3000/api/folders",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({foldername,folderdesc})
            })
            if(res.ok){
                router.refresh();
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

    return(
        <main className="container mx-auto my-3 mt-10">
            <h1 className="text-3xl">All your flashcard set</h1>
            <hr className="my-3" />
            <div className="grid grid-cols-4 mt-10 gap-7">

                <button onClick={() => setIsCreating(true)} className=" bg-green-500 p-3 text-2xl text-white rounded-2xl">Create new set</button>
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

                {folderData && folderData.length > 0 ?(
                    folderData.map(val =>(
                        <Link  key={val._id} href={`/editfolder/${val._id}`}>
                            <div  className="shadow-xl p-10 rounded-xl">
                                <h4 className="text-2xl">{val.foldername}</h4>
                                <hr className="border-1 mx-0 px-0" />
                                <p>{val.folderdesc}</p>
                                <div className="mt-5">
                                    <Link className="bg-gray-500 text-white border py-2 rounded-md text-lg px-3" href={`/editfolder/${val._id}`}>Edit</Link>
                                    <DeleteBtn id={val._id} />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="bg-gray-300 p-3 my-3">You do not have any folders yet.</p>
                )}
                
            </div>

        </main>
    );
}