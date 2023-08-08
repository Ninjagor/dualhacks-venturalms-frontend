import React, { useState, useEffect } from "react";
import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";
import { BASE_URL } from "../../../api_url";
import { useParams } from "react-router-dom";


interface ClassAssignmentProps {
    isStudent: boolean | null
}

interface AssignmentDetails {
    classId: string;
    expiryDate: string;
    id: string;
    name: string;
}


const ClassAssignments: React.FC<ClassAssignmentProps> = ({ isStudent }) => {
    const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails[]>([])

    const { classId } = useParams();

    const currentDate = new Date();


    const checkIfAlreadySubmitted = async(id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/alreadysubmmited`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                },
                body: JSON.stringify({
                  assignmentId: id
                })
              });

              if (response.ok) {
                // notify("Success!", false)
                const data = await response.json();
                console.log('Check successful:', data);
                console.log("data", data)
                if (data.data) {
                    return true
                }
                return false
                // window.location.reload()
              } else {
                console.error('Check failed:', response.status, response.statusText);
                if (response.status === 404) {
                    // Leave it
                } else {
                    alert("An unexpected error occured");
                }
                
                window.location.replace("/dashboard");
              }
        } catch(error) {
            console.error('Error while running checks:', error);
        }
    }


    const fetchAssignments = async() => {
        try {
            const response = await fetch(`${BASE_URL}/getassignments`, {
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

                for (const i in data.assignments) {
                    const currentAssignment = data.assignments[i];
                    const alreadySubmitted = await checkIfAlreadySubmitted(currentAssignment.id);
                    if (alreadySubmitted) {
                        //
                    } else {
                        const entry = {
                            id: currentAssignment.id,
                            name: currentAssignment.name,
                            expiryDate: currentAssignment.expiryDate,
                            classId: currentAssignment.classId
                        }
                        setAssignmentDetails((prevItems: AssignmentDetails[]) => [...prevItems, entry]);
                    }
                    
                    
                }
                
              } else {
                // Checking if its a student acc
                const data = await response.json();
                console.log("ERROR fetching", response.status, response.statusText, data)
              }
        } catch(error) {
            console.error("Error fetching assignments", error)
        }
    }

    useOnMountUnsafe(() => {
        if (!isStudent) {
            window.location.replace(`/class/${classId}`)
        }
        fetchAssignments();
        console.log("In Assignment")
    })

    const handleRedirectClick = () => {
        alert("REDIRECT")
    }

    return (
        <>
        <section className="flex flex-col items-start relative w-full max-[840px]:items-center">
            <div>
                <h1 className="text-[32px] tracking-tight font-semibold">Assignments</h1>
            </div>
            <div className="mt-14 w-full flex flex-col items-start relative max-[840px]:items-center">
                <h2 className="text-[18px] tracking-tight font-medium">Pending Assignments</h2>
                <div className="w-full p-3 bg-red-500/0 mt-4 flex gap-3  flex-wrap max-[840px]:justify-center">
                {assignmentDetails.map((assignment, index) => (
                    ((currentDate) <= (new Date(new Date(assignment.expiryDate).getTime() + 24 * 60 * 60 * 1000))) ? (
                        <button onClick={() => {
                            if (isStudent) {
                                window.location.replace(`/assignment/submit/${assignment.id}`)
                            }
                        }} key={assignment.id} className="w-full p-5 border-[2px] rounded-[7px] border-[#e4e6e8] flex flex-col gap-3 items-center cursor-pointer dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-all duration-150 ease-out hover:border-blue-600/70 bg-gradient-to-r max-w-[365px] min-w-[365px] to-white from-white hover:to-[#ECF3FE] hover:from-[#F8FBFF] mb-5 dark:to-neutral-900 dark:from-neutral-900 dark:hover:to-neutral-800 dark:hover:from-neutral-800">
                            <h1 className="text-[20px] tracking-tight font-medium">{assignment.name}</h1>
                            <p className="text-[14px] tracking-tight">Due: {new Date(assignment.expiryDate).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                            })}</p>
                        </button>
                    ) : null
                    
                    ))}

                    {assignmentDetails.filter(assignment => (new Date(new Date(assignment.expiryDate).getTime() + 24 * 60 * 60 * 1000))).length === 0 && (
                        <p>No assignments pending</p>
                    )}
                </div>
            </div>
            <div className="mt-14">
                <h2 className="text-[18px] tracking-tight font-medium">Overdue</h2>
                <div className="w-full p-3 bg-red-500/0 mt-4 flex gap-3  flex-wrap max-[840px]:justify-center">
                {assignmentDetails.map((assignment, index) => (
                    ((currentDate) > (new Date(new Date(assignment.expiryDate).getTime() + 24 * 60 * 60 * 1000))) ? (
                        <button  onClick={() => {
                            if (isStudent) {
                                window.location.replace(`/assignment/submit/${assignment.id}`)
                            }
                        }}  key={assignment.id} className="w-full p-5 border-[2px] rounded-[7px] border-[#e4e6e8] flex flex-col gap-3 items-center cursor-pointer dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-all duration-150 ease-out hover:border-blue-600/70 bg-gradient-to-r max-w-[365px] min-w-[365px] to-white from-white hover:to-[#ECF3FE] hover:from-[#F8FBFF] mb-5"
                    
                        >
                            <h1 className="text-[20px] tracking-tight font-medium" >{assignment.name}</h1>
                            <p className="text-[14px] tracking-tight">Was due: {new Date(assignment.expiryDate).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                            })}</p>
                        </button>
                    ) : null
                    
                ))}
                {assignmentDetails.filter(assignment => (new Date(new Date(assignment.expiryDate).getTime() + 24 * 60 * 60 * 1000))).length === 0 && (
                        <p>No assignments are overdue</p>
                    )}
                </div>
            </div>
        </section>
        
        </>
    )
}


export default ClassAssignments;