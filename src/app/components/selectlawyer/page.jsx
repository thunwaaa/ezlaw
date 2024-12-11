"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

function LawyersPage() {
  const [lawyers, setLawyers] = useState([]);

  const fetchLawyers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/lawyerauth/getlawyer', {
        method: "GET",
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        console.log("fetch success");
        setLawyers(data);
      } else {
        console.error("Error fetching lawyers: " + response.statusText);
      }
    } catch (error) {
      console.error('Error fetching lawyers:', error.message);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  if (lawyers.length === 0) {
    return <p>No lawyers found</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        {lawyers && lawyers.length > 0 ?(
            lawyers.map((lawyer) => (
              <li key={lawyer.lawyerEmail} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{`${lawyer.lawyerFirstname} ${lawyer.lawyerLastname}`}</h2>
                  <p className="text-sm">{lawyer.bio}</p>
                  <p className="text-sm text-gray-500">Email: {lawyer.lawyerEmail}</p>
                  <p className="text-sm text-gray-400">Address: {lawyer.address}</p>
                </div>
                <Link
                  href={`/lawyer/${lawyer.lawyerEmail}`}
                  className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-800"
                >
                  View Profile
                </Link>
              </li>
            ))
        ):(
          <p>You do not have any lawyer.</p>
        )}
        
      </div>
    </div>
  );
}

export default LawyersPage;
