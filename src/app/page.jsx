import Link from "next/link";
import Content1 from "./components/Content1";
import Foot from "./components/footer/Foot";
import MembershipPage from "./components/protectrole";
import ProtectedPage from "./components/protectpage";
import { Toaster } from "react-hot-toast";


export default function Home() {
  return (
    <div>
      <Content1 />
      <div className="grid grid-cols-1 mt-20 mx-20">
          <Link href='/folder' className=' text-white 
            text-4xl font-extrabold bg-blue-600 rounded-3xl p-20'>
              <p className='text-center'>Flashcard <br /> ตัวช่วยในการเรียน</p></Link>
      </div>
      
      <Toaster />
      <Foot />
    </div>
  );
}
