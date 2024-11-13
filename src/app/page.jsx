import Link from "next/link";


export default function Home() {
  return (
    <div>
      <div className="bg-indigo-300 mx-10 font-bold">
        <h1 className="text-center bold">ทำกฎหมายให้เป็นเรื่องง่าย!</h1>
      </div>
      <div>
        <h1>กฎหมาย</h1>
      </div>
      <div>
        <div>
          <h1>กฎหมายอาญา</h1>
        </div>
        <div>
          <h1>กฎหมายแพ่งและพาณิชย์</h1>
        </div>
      </div>
    </div>
  );
}
