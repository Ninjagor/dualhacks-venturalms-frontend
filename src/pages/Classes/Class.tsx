import React, {useState, useEffect} from 'react';
import ClassNavbar from './components/ClassNavbar';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../api_url';
import { useOnMountUnsafe } from '../../functions/useOnMountUnsafe';
import ClassAssignments from './components/ClassAssignments';
import ClassGrades from './components/ClassGrades';
import ClassForum from './components/ClassForum';

interface ClassProps {
    themeChange: () => void;
    theme: string | null;
}

const Class:React.FC<ClassProps> = ({ themeChange, theme }) => {
    const [isStudent, setIsStudent] = useState<boolean | null>(null);



    const checkStudentStatus = async() => {
        try {


            const response = await fetch(`${BASE_URL}/classesasstudent`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                }
              });
        
              if(response.ok) {
                const data = await response.json();
                console.log('Student Check successful:', data);
                console.log("data", data);
                // setIsStudent(prev => false)
                for (const i in data.data) {
                    const currentClass = data.data[i];
                    if (currentClass.class.id===classId) {
                        setIsStudent(true);
                        return;
                    }
                }
                setIsStudent(null);
                console.log("NOT IN CLASS!");
                window.location.replace("/dashboard")
              } else {
                console.error('Student Check failed:', response.status, response.statusText);
                const data = await response.json();
                console.log("failed data", data)
                setIsStudent(false);
                // if (response.status === 403 || response.status === 401) {
                //     alert("Forbidden")
                //     window.location.replace("/dashboard")
                // } 
              }


        } catch(error) {
            console.error("Error checking status", error)
        }
    }


    const checkAdminStatus = async() => {
        try {
          const response = await fetch(`${BASE_URL}/getstudentlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
            },
            body: JSON.stringify({
              classCode: classId
            })
          });
    
          if(response.ok) {
            const data = await response.json();
            console.log('Check successful:', data);
            console.log("data", data);
            setIsStudent(prev => false)
          } else {
            // Checking if its a student acc
            const data = await response.json();
            console.log("data error", data.error==="Class Not Found")
            if (data.error == "Class Not Found") {
                window.location.replace("/dashboard")
            }
            checkStudentStatus();
          }
    
        } catch(error) {
          console.error("Error checking status", error)
        }
      }


    useEffect(() => {
        if (!localStorage.getItem("user_data")) {
            window.location.replace("/login")
        }
        if (JSON.parse(localStorage.getItem("user_data") as any).accountType === "parent") {
            window.location.replace("/parentdashboard")
        }
    }, [])

    useEffect(() => {
        document.body.classList.add('assignmentPage');
        return () => {
          document.body.classList.remove('assignmentPage');
        };
    }, []);

    useOnMountUnsafe(() => {
        checkAdminStatus();
    })

    const { classId } = useParams();

    return (
        <>
            <ClassNavbar  themeChange={themeChange} theme={theme} isStudent={isStudent}/>
            <main className="w-full h-full max-w-[1600px] ml-auto mr-auto p-9">
                <Routes>
                    {isStudent===true && <Route path="/assignments" element={<ClassAssignments isStudent={isStudent}/>}/>}
                    
                    {isStudent===true && <Route path="/grades" element={<ClassGrades  isStudent={isStudent}/>} />}

                    <Route path='/' element={<ClassForum isStudent={isStudent} />} />
                    
                </Routes>
            </main>
            
        </>
    )
}

export default Class;