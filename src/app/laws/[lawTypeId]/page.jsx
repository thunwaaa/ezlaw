'use client';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useParams, useSearchParams } from 'next/navigation';
import ProtectedPage from 'app/components/protectpage';

export default function LawPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lawTypeId = params.lawTypeId ? params.lawTypeId[0] : ''; 

  const [lawData, setLawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [highlightedSection, setHighlightedSection] = useState(null);
  const [expandedPath, setExpandedPath] = useState([]);

  // Color mapping for different law types
  const lawTypeColors = {
    '1': '#ED9BC8',   // Pink for first law type
    '2': '#C4ED9B',   // Light green for second law type
    '3': '#9BCBED',   // Light blue for third law type
    '4': '#EDD69B',   // Light yellow for fourth law type
    'default': '#ED9BC8' // Default color if no match
  };

  const getHeaderColor = (lawTypeId) => lawTypeColors[lawTypeId] || lawTypeColors['default'];

  useEffect(() => {
    const fetchLawData = async () => {
      if (!lawTypeId) {
        console.error('lawTypeId is missing!');
        return;
      }

      try {
        const response = await fetch(`/api/laws?lawTypeId=${lawTypeId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setLawData(data);
        } else {
          console.error('API response is not an array:', data);
          setLawData([]);
        }
      } catch (error) {
        console.error('Error fetching law data:', error);
        setLawData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLawData();
  }, [lawTypeId]);

  useEffect(() => {
    // Check for highlight and path parameters
    const highlightId = searchParams.get('highlight');
    const pathParam = searchParams.get('path');
  
    if (highlightId) {
      setHighlightedSection(Number(highlightId));
    }
  
    if (pathParam) {
      // Convert path string to array of IDs
      const pathIds = pathParam.split('/').map(Number);
      setExpandedPath(pathIds);
    }
  }, [searchParams]);

  useEffect(() => {
    if (highlightedSection) {
      setTimeout(() => {
        const highlightedElement = document.querySelector(`[data-section-id="${highlightedSection}"]`);
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500); // Delay เล็กน้อยเพื่อให้ DOM render เสร็จ
    }
  }, [highlightedSection, lawData]);

  useEffect(() => {
    const highlightId = searchParams.get('highlight');
    
    if (highlightId && lawData.length > 0) {
        const findSectionPath = (hierarchy) => {
            const recursiveSearch = (items) => {
              for (const item of items) {
                // ค้นหาในส่วน sections ของ item นี้
                const sectionFound = item.sections.find(section => section.id === Number(highlightId));
                if (sectionFound) {
                  return [item.id];
                }
          
                // ถ้ามี children ให้ค้นหาใน children
                if (item.children && item.children.length > 0) {
                  const childPath = recursiveSearch(item.children);
                  if (childPath) {
                    return [item.id, ...childPath];
                  }
                }
              }
              return null;
            };
          
            return recursiveSearch(hierarchy);
          };
  
      const sectionPath = findSectionPath(lawData);
      if (sectionPath) {
        // เปิด Accordion ตามเส้นทาง
        const newExpanded = {};
        sectionPath.forEach(id => {
          newExpanded[id] = true;
        });
        setExpanded(newExpanded);
        setExpandedPath(sectionPath);
  
        // เลื่อนลงไปยังมาตราเป้าหมาย
        setTimeout(() => {
          const highlightedElement = document.querySelector(`[data-section-id="${highlightId}"]`);
          if (highlightedElement) {
            highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300); // เพิ่มความหน่วงเล็กน้อย
      }
    }
  }, [lawData, searchParams]);  

  const renderHierarchy = (hierarchy) => {
    if (!Array.isArray(hierarchy)) {
      return <p>ข้อมูลไม่ถูกต้อง</p>;
    }

    // Helper function to check if an item should be expanded
    const shouldExpand = (itemId) => {
        return expandedPath.includes(itemId);
    };
  
    return (
      <Accordion type="multiple" defaultValue={expandedPath.map(id => `item-${id}`)}>
        {hierarchy.map((item) => (
          <AccordionItem value={`item-${item.id}`} key={item.id} data-expanded={expanded[item.id]}>
            <AccordionTrigger onClick={() => setExpanded({ ...expanded, [item.id]: !expanded[item.id] })}>
              <span className='text-2xl p-4 mr-12' style={{ display: "flex" }}>
                {item.name}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {item.sections.length > 0 && (
                <ul className="ml-4">
                  {item.sections.map((section, index) => (
                    <li
                        key={section.id}
                        data-section-id={section.id}
                        className={`mb-2 text-xl ${
                        highlightedSection === section.id ? 'bg-yellow-100 border-l-4 border-yellow-500' : ''
                        }`}
                    >
                      <div>
                        <span className='font-semibold underline'>มาตรา {section.section_number} ({section.section_type}):</span>
                        <div className='p-4' style={{ whiteSpace: 'pre-line' }}>
                          {section.content.replace(/<\/?p>/g, '').split(/\r?\n/).map((paragraph, idx) => (
                            <p key={idx} style={{ marginBottom: '0.5rem' }}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {item.children.length > 0 && renderHierarchy(item.children)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const PageContent = (
    <div className="p-6 max-w-[1700px] mx-auto bg-[#FFFADF] rounded-3xl mt-10">
      <h1 className="text-5xl font-bold w-[1700px] mt-[-24px] h-[70px] rounded-t-2xl flex justify-center items-center ml-[-24]"
      style={{ backgroundColor: getHeaderColor(lawTypeId) }}>กฎหมาย</h1>
      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลด...</p>
      ) : (
        lawData.length > 0 ? renderHierarchy(lawData) : <p className="text-center text-red-500">ไม่พบข้อมูล</p>
      )}
    </div>
  );

  // Only wrap the page with ProtectedPage if lawTypeId === '2'
  return lawTypeId === '2' ? <ProtectedPage>{PageContent}</ProtectedPage> : PageContent;
}