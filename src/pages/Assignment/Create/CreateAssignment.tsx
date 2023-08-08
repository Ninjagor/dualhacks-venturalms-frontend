import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";
import { BASE_URL } from "../../../api_url";
import AssignmentNavbar from "../components/AssignmentNavbar";

import toast, { Toaster } from 'react-hot-toast';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface QuestionDetail {
  questionPrompt: string;
  choices: Array<{
    answer: string;
    isCorrect: boolean;
  }>;
  questionOrderNumber: number;
}

const CreateAssignment = () => {
  const [assignmentName, setAssignmentName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [questionDetails, setQuestionDetails] = useState<QuestionDetail[]>([]);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);
  const [choicesNumber, setChoicesNumber] = useState(2);
  const [questionPrompt, setQuestionPrompt] = useState("")
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [correctChoice, setCorrectChoice] = useState("choice1")


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


  const handleQuestionPromptInput = (e:any) => {
    setQuestionPrompt(e.target.value)
  }
  const handleChoice1Input = (e:any) => {
    setChoice1(e.target.value)
  }
  const handleChoice2Input = (e:any) => {
    setChoice2(e.target.value)
  }
  const handleChoice3Input = (e:any) => {
    setChoice3(e.target.value)
  }
  const handleChoice4Input = (e:any) => {
    setChoice4(e.target.value)
  }

  const handleCorrectChoiceInput = (e:any) => {
    setCorrectChoice(e.target.value)
  }


  const notify = (message: string, isError: boolean) => {
    if (isError) {

        toast.error(message,
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    } else {
        toast.success(message,
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    }
};


  const resetStates = () => {
    setChoice1(prev => "");
    setChoice2(prev => "");
    setChoice3(prev => "");
    setChoice4(prev => "");
    setCorrectChoice(prev => "choice1");
    setQuestionPrompt(prev => "");
    setChoicesNumber(prev => 2);
  }


  const newQuestion = () => {
    const choices = [];
    for (let i = 0; i < choicesNumber; i++) {
      const choiceValue = eval(`choice${i + 1}`);
      console.log(choiceValue);

      const newChoice = {
        answer: choiceValue,
        isCorrect: `choice${i + 1}`==correctChoice
      }
      choices.push(newChoice);
    }

    console.log(choices)
    
    const newQuestion = {
      questionPrompt: questionPrompt,
      choices: choices,
      questionOrderNumber: questionDetails.length+1
    }
    console.log(newQuestion);

    setQuestionDetails(prevQuestionDetails => [...prevQuestionDetails, newQuestion]);
    setNewQuestionModalOpen(prev => false);
    resetStates();
  }



  const handleNewQuestionButton = () => {
    const choiceMessages = [
      "Choice 1 is required",
      "Choice 2 is required",
      "Choice 3 is required",
      "Choice 4 is required"
    ];

    if (!questionPrompt.trim()) {
      notify("Prompt is required", true);
      return;
    }
  
    for (let i = 0; i < choicesNumber; i++) {
      const choiceValue = eval(`choice${i + 1}`);
      if (!choiceValue.trim()) {
        notify(choiceMessages[i], true);
        return;
      }
    }

    console.log("success");
    newQuestion();
  }

  



  useEffect(() => {
    if (choicesNumber < 4) {
      setChoice4((prev) => "");
      if (correctChoice==="choice4") {
        setCorrectChoice((prev) => "choice1")
      }
      
    }
    if (choicesNumber < 3) {
      setChoice3((prev) => "")
      if (correctChoice==="choice3") {
        setCorrectChoice((prev) => "choice1")
      }
    }
  }, [choicesNumber])


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


  const createAssignment = async() => {
    try {
      const response = await fetch(`${BASE_URL}/create/assignment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`
        },
        body: JSON.stringify({
          classCode: classId,
          questionDetails: questionDetails,
          expiryDate: dueDate,
          assignmentName: assignmentName
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Creation successful:', data);
        console.log("data", data)
        notify("Successfully created assignment. You will be redirected shortly.", false);
        navigator.clipboard.writeText(data.assignment.id)
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1500)
      } else {
        const data = await response.json();
        console.error('Creation failed:', response.status, response.statusText);
        notify(data.error, true)
      }
    } catch(error) {
      console.error("Error Creating Submission", error)
    }
  }

  const handleCreateAssignmentButton = () => {
    if (questionDetails.length>=1) {
      if (assignmentName.trim()) {
        if (dueDate) {
          // Send Req
          createAssignment();
        } else {
          notify("Due Date is Mandatory", true)
        }
      } else {
        notify("Assignment Name is Mandatory", true)
      }
    } else {
      notify("Atleast one question is required", true)
    }
    
  }


    return (
        <>

      

<div className={`fixed left-0 top-0 w-full h-screen min-h-[600px]  bg-neutral-950/70 z-50 backdrop-blur-[5px]  flex items-center justify-center transition-all duration-150 ease-out
      
      ${newQuestionModalOpen ? "opacity-100" : "opacity-0"}
      ${newQuestionModalOpen ? "pointer-events-all" : "pointer-events-none"}
      
      `}>
        <section className={`w-full h-full bg-white max-w-[450px] rounded-[10px] dark:bg-neutral-900 dark:border-[1px] border-transparent dark:border-neutral-700 p-5 flex flex-col relative overflow-hidden
        
        ${choicesNumber < 3 ? "max-h-[580px]" : choicesNumber==3 ? "max-h-[630px]" : "max-h-[685px]"}
        
        
        `}>
            <h1 className="text-[23px] mt-2 tracking-tight font-bold text-neutral-800 dark:text-neutral-50">New Question</h1>
            <input type="text" placeholder="Enter prompt" className="border-[1px] border-[#a8aaac] mt-4 w-full p-2 pl-3 rounded-[6px] focus:outline-none font-medium dark:bg-neutral-800 dark:border-neutral-700" maxLength={60}
            
            onChange={handleQuestionPromptInput}
            value={questionPrompt}
            
            />
            <div className="mt-5 w-full flex items-center justify-between gap-2 flex-col" >

              <button className={`w-full h-full max-h-[50px] min-h-[50px] pt-5 pb-5 bg-white border-[2px] border-[#e4e6e8] rounded-[7px] flex items-center dark:hover:border-blue-600/70 justify-start gap-2 hover:border-blue-600/70 bg-gradient-to-r   to-white hover:from-blue-300/5 hover:to-blue-500/10 transition-all duration-150 ease-out group dark:to-neutral-900 dark:from-neutral-900 dark:border-neutral-800  
              
              ${choicesNumber===2 ? "from-[#F8FBFF]" : "from-white"} 
              ${choicesNumber===2 ? "border-blue-600/70" : ""} 
              ${choicesNumber===2 ? "!to-[#ECF3FE]" : ""}
              ${choicesNumber===2 ? "dark:from-neutral-900" : "from-white"} 
              ${choicesNumber===2 ? "border-blue-600/70" : ""} 
              ${choicesNumber===2 ? "dark:!to-neutral-900" : ""}
              ${choicesNumber===2 ? "dark:!border-blue-600/70" : ""}

          
              
              `}   onClick={() => {
                setChoicesNumber((prev) => 2);
              }}>
                  <div className="flex flex-col items-center justify-center w-full">
                      <h1 className="text-[16px] font-semibold text-neutral-900  dark:text-neutral-100 text-center">2 Choices</h1>
                  </div>
              </button >


              <button className={`w-full h-full max-h-[50px] min-h-[50px] pt-5 pb-5 bg-white border-[2px] border-[#e4e6e8] rounded-[7px] flex items-center dark:hover:border-blue-600/70 justify-start gap-2 hover:border-blue-600/70 bg-gradient-to-r   to-white hover:from-blue-300/5 hover:to-blue-500/10 transition-all duration-150 ease-out group dark:to-neutral-900 dark:from-neutral-900 dark:border-neutral-800  
              
              ${choicesNumber===3 ? "from-[#F8FBFF]" : "from-white"} 
              ${choicesNumber===3 ? "border-blue-600/70" : ""} 
              ${choicesNumber===3 ? "!to-[#ECF3FE]" : ""}
              ${choicesNumber===3 ? "dark:from-neutral-900" : "from-white"} 
              ${choicesNumber===3 ? "border-blue-600/70" : ""} 
              ${choicesNumber===3 ? "dark:!to-neutral-900" : ""}
              ${choicesNumber===3 ? "dark:!border-blue-600/70" : ""}

          
              
              `}   onClick={() => {
                setChoicesNumber((prev) => 3);
              }}>
                  <div className="flex flex-col items-center justify-center w-full">
                      <h1 className="text-[16px] font-semibold text-neutral-900  dark:text-neutral-100 text-center">3 Choices</h1>
                  </div>
              </button >


              <button className={`w-full h-full max-h-[50px] min-h-[50px] pt-5 pb-5 bg-white border-[2px] border-[#e4e6e8] rounded-[7px] flex items-center dark:hover:border-blue-600/70 justify-start gap-2 hover:border-blue-600/70 bg-gradient-to-r   to-white hover:from-blue-300/5 hover:to-blue-500/10 transition-all duration-150 ease-out group dark:to-neutral-900 dark:from-neutral-900 dark:border-neutral-800  
              
              ${choicesNumber===4 ? "from-[#F8FBFF]" : "from-white"} 
              ${choicesNumber===4 ? "border-blue-600/70" : ""} 
              ${choicesNumber===4 ? "!to-[#ECF3FE]" : ""}
              ${choicesNumber===4 ? "dark:from-neutral-900" : "from-white"} 
              ${choicesNumber===4 ? "border-blue-600/70" : ""} 
              ${choicesNumber===4 ? "dark:!to-neutral-900" : ""}
              ${choicesNumber===4 ? "dark:!border-blue-600/70" : ""}

          
              
              `}   onClick={() => {
                setChoicesNumber((prev) => 4);
              }}>
                  <div className="flex flex-col items-center justify-center w-full">
                      <h1 className="text-[16px] font-semibold text-neutral-900  dark:text-neutral-100 text-center">4 Choices</h1>
                  </div>
              </button >
            </div>  

            <div className="w-full flex flex-col items-center gap-2 mt-5">
              <input type="text" placeholder="Enter choice 1" className="border-[1px] border-[#a8aaac] w-full p-2 pl-3 rounded-[6px] focus:outline-none font-medium dark:bg-neutral-800 dark:border-neutral-700" maxLength={45}
              
              
              onChange={handleChoice1Input}
              value={choice1}
            
              />
              <input type="text" placeholder="Enter choice 2" className="border-[1px] border-[#a8aaac] w-full p-2 pl-3 rounded-[6px] focus:outline-none font-medium dark:bg-neutral-800 dark:border-neutral-700"  maxLength={45}
              
              onChange={handleChoice2Input}
              value={choice2}
              
              />
              {choicesNumber>=3 && <input type="text" placeholder="Enter choice 3" className="border-[1px] border-[#a8aaac] w-full p-2 pl-3 rounded-[6px] focus:outline-none font-medium dark:bg-neutral-800 dark:border-neutral-700"  maxLength={45}
              
              onChange={handleChoice3Input}
              value={choice3}
              
              />}
              
              {choicesNumber>=4 && <input type="text" placeholder="Enter choice 4" className="border-[1px] border-[#a8aaac] w-full p-2 pl-3 rounded-[6px] focus:outline-none font-medium dark:bg-neutral-800 dark:border-neutral-700"  maxLength={45}
              
              onChange={handleChoice4Input}
              value={choice4}
              
              
              />}
              
              <p className="text-left self-start text-[13px] mb-[-7px] mt-1">Correct Choice:</p>
              <select name="cars" id="cars" className="w-full border-[1px] p-2 pl-3 pr-3 rounded-[7px] border-[#a8aaac] dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
              value={correctChoice}
              onChange={handleCorrectChoiceInput}>
                <option value="choice1">Choice 1</option>
                <option value="choice2">Choice 2</option>
                {choicesNumber>=3 && <option value="choice3">Choice 3</option>}
                {choicesNumber>=4 && <option value="choice4">Choice 4</option>}             
              </select>
            </div>


            <div className="w-full h-[70px] bg-white dark:bg-neutral-900 absolute bottom-0 left-0 border-t-[1px] flex items-center dark:border-t-neutral-700">
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-5 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out"   onClick={() => setNewQuestionModalOpen(newQuestionModalOpen ? false : true)}>Close</button>
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-2 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out"   onClick={handleNewQuestionButton}>Create</button>
            </div>
        </section>
      </div>
        
          <AssignmentNavbar />
          {/* {JSON.stringify(questionDetails)} */}
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




            <div className="w-full max-w-[800px] bg-white border-[1px] p-5 rounded-[7px] mt-3 dark:bg-neutral-900 dark:border-neutral-700 border-[#a8aaac]/80">
              
              <div className="flex items-center justify-start gap-3 mb-5">
                <h2 className="text-[22px] font-semibold tracking-tight text-neutral-800/90 dark:text-neutral-300">Questions</h2>
                <button className="w-full bg-neutral-950 text-white p-2 max-w-[30px] rounded-full pt-3 pb-3 hover:bg-blue-600 max-h-[30px] transition-all duration-150 ease-out dark:bg-neutral-900 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-blue-600 dark:hover:border-blue-500 text-[14px] flex items-center justify-center"
                
                onClick={() => setNewQuestionModalOpen(true)}
                ><FontAwesomeIcon icon={faPlus}/></button>
              </div>
              
              {questionDetails.length===0 
              ? 
                <p className="mt-4 tracking-tight opacity-70 font-medium">No questions added for this assignment.</p> 
              : 
                <div>
                  {questionDetails.map((question, index) => (
                    <div key={index} className="p-3 border-[1px] border-[#a8aaac] rounded-[7px] mt-3">
                      <h1 className="text-[18px] font-medium tracking-tight">{question.questionPrompt} </h1>
                      {question.choices.map((choice) => (
                        <>
                          <div className="mt-2">
                            <p className="ml-5 p-1 text-[17px] font-medium">{choice.answer} <span className="text-blue-600 text-[13px] ml-1 font-semibold">{choice.isCorrect && "Correct"}</span></p>
                          </div>
                        </>
                      ))}
                    </div>
                  ))}
                </div>
              }
            </div>
            
            
            <button className="w-full bg-neutral-950 text-white p-2 max-w-[200px] rounded-[7px] pt-3 pb-3 hover:bg-blue-600 transition-all duration-150 ease-out dark:bg-neutral-900 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-blue-600 dark:hover:border-blue-500"
            
            // disabled={!(questionDetails.length>=1)}
            onClick={handleCreateAssignmentButton}
            >
              Create Assignment
            </button>
          </main>
          <Toaster />
        </>
    )
}

export default CreateAssignment;