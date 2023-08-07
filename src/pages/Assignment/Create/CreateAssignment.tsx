import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";
import { BASE_URL } from "../../../api_url";
import AssignmentNavbar from "../components/AssignmentNavbar";



const CreateAssignment = () => {
  const [assignmentName, setAssignmentName] = useState("");
  const [dueDate, setDueDate] = useState("");


  const { classId } = useParams();

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = e.target.value;
    const today = new Date().toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format

    // Check if the entered date is not before today and matches the pattern "YYYY-MM-DD"
    if (enteredDate >= today && /^\d{4}-\d{2}-\d{2}$/.test(enteredDate)) {
      setDueDate(enteredDate);
    } else {
      setDueDate(""); // Reset the state to an empty string for an invalid date
    }
  };


  const handleAssignmentNameInput = (e: any) => {
      setAssignmentName(e.target.value)
  }

  const handleKeyPress = (e: any) => {
    // Prevent any input that would affect the date value manually
    e.preventDefault();
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();

  // Check if user is class admin by running get student list
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
        console.log("data", data)
      } else {
        console.error('Check failed:', response.status, response.statusText);
        if (response.status === 403) {
          alert("Unauthorized");
          window.location.replace("/dashboard")
        } else if (response.status === 404) {
          alert("Invalid class code");
          window.location.replace("/dashboard")
        }
      }

    } catch(error) {
      console.error("Error checking status", error)
    }
  }

  useOnMountUnsafe(() => {
    checkAdminStatus();
  })


    return (
        <>
        
          <AssignmentNavbar />
          <main className="w-full h-full max-w-[1260px] ml-auto mr-auto p-9 flex flex-col items-center gap-7 relative">
            <div>
              <h1 className="text-[28px] font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">Create Assignment</h1>
            </div>
            <div className="w-full max-w-[800px] bg-white border-[1px] p-5 rounded-[7px] mt-3 dark:bg-neutral-900 dark:border-neutral-700 border-[#a8aaac]/80">
              <h2 className="text-[22px] font-semibold tracking-tight text-neutral-800/90 dark:text-neutral-300">Assignment Details</h2>

              <div className="mt-5">
                <p className="font-medium text-neutral-600/80 dark:text-neutral-400">Assignment Name</p>
                <input maxLength={25} type="text" placeholder="Enter Assignment Name" className="w-full border-[1px] p-3 pl-4 pr-3 mt-3 rounded-[5px] focus:outline-none border-[#a8aaac]/60 dark:bg-neutral-800 dark:border-neutral-700 font-medium" onChange={handleAssignmentNameInput} value={assignmentName}/>
                <p className="mt-3 text-[14px] dark:text-neutral-400 text-neutral-600 font-medium">{assignmentName.length}/25</p>
              </div>
              <div className="mt-5">
            {/* Add the simple date picker here */}
            <p className="font-medium text-neutral-600/80 dark:text-neutral-400">Select Due Date</p>
            <input
              type="date"
              className="w-full border-[1px] p-3 pl-4 pr-3 mt-3 rounded-[5px] focus:outline-none border-[#a8aaac]/60 dark:bg-neutral-800 dark:border-neutral-700 font-medium"
              onChange={handleDueDateChange}
              value={dueDate}
              min={currentDate}
              onKeyPress={handleKeyPress}
            />
          </div>
            </div>
            <button className="w-full bg-neutral-950 text-white p-2 max-w-[200px] rounded-[7px] pt-3 pb-3 hover:bg-blue-600 transition-all duration-150 ease-out dark:bg-neutral-900 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-blue-600 dark:hover:border-blue-500">
              Create Assignment
            </button>
          </main>
        </>
    )
}

export default CreateAssignment;