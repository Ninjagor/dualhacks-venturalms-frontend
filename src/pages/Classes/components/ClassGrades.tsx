import React, { useState, useEffect } from "react";
import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../../api_url";

interface ClassAssignmentProps {
    isStudent: boolean | null
}

interface GradedAssignmentsInterface {
    assignment: any;
    assignmentId: string;
    classId: string;
    grade: number;
    id: string;
    studentId: string;
}

const ClassGrades: React.FC<ClassAssignmentProps> = ({ isStudent }) => {

    const [courseGrade, setCourseGrade] = useState<number | null>(null);
    const [gradedAssignments, setGradedAssignments] = useState<GradedAssignmentsInterface[]>([])


    const { classId } = useParams();

    const fetchGrades = async() => {
        try {
            const response = await fetch(`${BASE_URL}/getgrades`, {
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
                console.log('Fetch successful:', data);
                if (data.averageGrade.averageGrade) {
                    setCourseGrade((prev) => data.averageGrade.averageGrade)
                }
                setGradedAssignments((prev) => data.gradedAssignments)
              } else {
                const data = await response.json();
                console.log("ERROR fetching", response.status, response.statusText, data)
              }
        } catch(error) {
            console.error("Error fetching grades", error)
        }
    }

    useOnMountUnsafe(() => {
        fetchGrades();
    })


    return (
        <>
            <div className="p-3 w-full bg-white border-[1px] min-h-[90px] border-[#a8aaac] rounded-[7px] dark:bg-neutral-900 dark:border-neutral-700 flex items-center justify-center">
                {courseGrade ? <h1 className="text-[21px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Course Grade: <span className="text-blue-600 dark:text-blue-500/80">{courseGrade}%</span> </h1> : <h1 className="text-[21px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">No Assignments Submitted</h1>}
                
            </div>
            <div className={`
            w-full p-3  mt-5 flex flex-wrap gap-5
            
            ${gradedAssignments.length < 3 ? "justify-start" : "justify-between"}

            `}>
                {gradedAssignments.map((gradedAssignment, index) => (
                    <>
                    <div key={gradedAssignment.assignmentId} className="bg-white p-5 min-h-[200px] border-[1px] border-[#a8aaac] rounded-[7px] w-[300px] flex flex-col justify-center gap-8 items-center dark:bg-neutral-900 dark:border-neutral-700">
                        <h1 className="text-[19px] font-semibold tracking-tight text-center">{gradedAssignment.assignment.name}</h1>
                        <p className="text-[25px] font-medium text-blue-600">{gradedAssignment.grade}%</p>
                    </div>
                    </>
                ))}
                {gradedAssignments.length===0 && <p>No graded assignments</p>}
            </div>
        </>
    )
}


export default ClassGrades;