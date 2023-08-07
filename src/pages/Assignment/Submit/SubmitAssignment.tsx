import React, { useState, useEffect, useRef } from "react";
import AssignmentNavbar from "../components/AssignmentNavbar";

import { useParams } from "react-router-dom";

import { User } from 'react-feather';

import useExitPrompt from "../../../functions/useExitPrompt";

import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";

import { BASE_URL } from "../../../api_url";




const SubmitAssignment = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [submissionDetails, setSubmissionDetails] = useState<any>([])
    const [assignmentDetails, setAssignmentDetails] = useState<any>({})
    const [alreadySubmittedAssignment, setAlreadySubmittedAssignment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();


    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

    const handleClick = (e: any) => {
        e.preventDefault();
        setShowExitPrompt(!showExitPrompt)
    }
    useEffect(() => {
        return () => {
        setShowExitPrompt(false)
    }
    }, [])







    const getLegibleDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toDateString();
      };

      const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
      };

    const hasDateSurpassed = (date: string) => {
        const otherDate = new Date(date);
        const currentDate = new Date();

        const oneDayAfterOtherDate = new Date(otherDate);
        oneDayAfterOtherDate.setDate(oneDayAfterOtherDate.getDate() + 1);

        if (currentDate > oneDayAfterOtherDate) {
            return true;
        } else {
            return false;
        }
    }

    const isSelectedOption = () => {
        return selectedOption ? true : false;
    }

    // useEffect(() => {
    //     for (const i in AssignmentDetails.questions) {
    //         const newItem = {
    //             choiceId: "",
    //             id: i
    //         }
    //         setSubmissionDetails((prevDetails:any) => [...prevDetails, newItem]);
    //     }
    //     return () => setSubmissionDetails([])
    //   }, []);


    const fetchAssignmentDetails = async() => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/getquestions`, {
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
                console.log('Fetch successful:', data);
                setAssignmentDetails((prev:any) => data)
                console.log("assignmentDetails:", assignmentDetails)
                console.log("data", data)
                console.log("submissionDetails:", submissionDetails)
                for (const i in data.questions) {
                    const newItem = {
                        choiceId: "",
                        id: i
                    }
                    setSubmissionDetails((prevDetails:any) => [...prevDetails, newItem]);
                }
                // window.location.reload()
              } else {
                console.error('Fetch failed:', response.status, response.statusText);
                // alert("User by that email already exists")
                // notify(response.statusText, true)
                if (response.status === 401) {
                    window.location.replace("/login")
                }
                else if (response.status === 403) {
                    window.location.replace("/dashboard")
                }
                else if (response.status === 404){
                    alert("Assignment not found");
                    window.location.replace("/dashboard");
                } else {
                    alert("An unexpected error occured");
                    window.location.replace("/dashboard");
                }
              }
        } catch(error) {
            console.error('Error while fetching assignmentDetails:', error);
        }
        setIsLoading(false);
    }

    const checkIfAlreadySubmitted = async() => {
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
                    setAlreadySubmittedAssignment("yes");
                }
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


    useOnMountUnsafe(() => {
        fetchAssignmentDetails();
        checkIfAlreadySubmitted();
    })

    const updateSubmissionDetails = (newChoiceId: string) => {
        const newSubmissions = submissionDetails.map((submission: {choiceId: string, id: string}) => {
            if (submission.id === (currentPage-1).toString()) {
              return {...submission, choiceId: newChoiceId as string};
            }
            return submission;
          });
        
          setSubmissionDetails(newSubmissions);
    }


    useEffect(() => {
        if (isSelectedOption()) {
            updateSubmissionDetails(selectedOption as string);
        }
        
    }, [selectedOption])

    const submitAssignmentRequest = async() => {
        try {
            const response = await fetch(`${BASE_URL}/create/submission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                },
                body: JSON.stringify({
                  assignmentId: id,
                  answerDetails: submissionDetails
                })
              });

              if (response.ok) {
                // notify("Success!", false)
                const data = await response.json();
                console.log('Submission successful:', data);
                console.log("data", data)
                window.location.reload()
              } else {
                console.error('Submission failed:', response.status, response.statusText);
                alert("An unexpected error occured");
                window.location.replace("/dashboard");
              }
        } catch(error) {
            console.error('Error while submitting:', error);
        }
    }

    const handleSubmitBtn = () => {
        if (isSelectedOption()) {
            submitAssignmentRequest()
        }
    }

    const handleContinueBtn = () => {
        if (isSelectedOption()) {
            if (currentPage < assignmentDetails.questions?.length) {
                console.warn("next page")
                setCurrentPage((prevPage) => prevPage+1);
                setSelectedOption(null);
                setSelectedOption(submissionDetails[currentPage].choiceId as string);
            }
        }
    }

    const handleBackBtn = () => {
        if (isSelectedOption()) {
            
        }
        setCurrentPage((prevPage) => prevPage-=1);
        setSelectedOption(submissionDetails[currentPage-2].choiceId as string);
    }
//     console.log('assignmentDetails:', assignmentDetails);
//   console.log('assignmentDetails.questions:', assignmentDetails.questions);
    return (
        <>
            <AssignmentNavbar />
                {/* {assignmentDetails.questions?.length} */}
            <main className="w-full h-fit relative">
                {/* {JSON.stringify(submissionDetails)} */}
                <section className="w-full h-full relative max-w-[1500px] ml-auto mr-auto bg-blue-500/0 p-5">
                    {/* Start Assignment */}
                    <div className={`flex flex-col items-center mt-10 ${currentPage===0 ? "flex" : "hidden"}`}>
                        <h1 className="text-[30px] tracking-tight font-semibold text-neutral-900 dark:text-neutral-100">{ assignmentDetails.assignmentDetails?.name }</h1>
                        <p className="mt-3 text-neutral-500 font-medium dark:text-neutral-400">Due: { getLegibleDate( assignmentDetails.assignmentDetails?.expiryDate )}</p>

                        <div className="w-full max-w-[350px] h-[150px] p-3 bg-white  mt-7 rounded-[5px] border-[1px] border-[#E9EBED] flex justify-between dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="w-[40%] h-full flex flex-col items-center justify-center gap-2">
                                <h1 className="text-[30px] font-semibold text-neutral-700 dark:text-neutral-200">{ assignmentDetails.questions?.length }</h1>
                                <p className="text-[17px] font-medium text-neutral-500">Questions</p>
                            </div>
                            <div className="w-[1px] h-full bg-[#E9EBED] dark:bg-neutral-700"></div>
                            <div className="w-[40%] h-full flex flex-col items-center justify-center gap-2">
                                <h1 className="text-[30px] font-semibold text-neutral-700 dark:text-neutral-200">{ ((assignmentDetails.questions?.length)*1.5 + 2).toString() }</h1>
                                <p className="text-[17px] font-medium text-neutral-500">Minutes</p>
                            </div>
                        </div>
                        {hasDateSurpassed(assignmentDetails.assignmentDetails?.expiryDate) ? <p className="mt-7 text-[18px] text-neutral-800 dark:text-neutral-300">Assignment is not accepting submissions</p> : alreadySubmittedAssignment==="yes" ? <p className="mt-7 text-[18px] text-neutral-800 dark:text-neutral-300">Assignment is submitted</p> :
                        
                        
                        
                        <button className={`w-full h-[50px] bg-blue-600 text-white mt-7 rounded-[7px] max-w-[350px]  text-[16px] flex items-center justify-center font-medium transition-all ease-out duration-100 hover:bg-neutral-950 dark:hover:bg-neutral-50 dark:hover:text-neutral-950 `}

                        onClick={() => {
                            setCurrentPage((prevPage) => prevPage+1)
                        }}
                        >Start</button>}
                        
                    </div>

                    {/* Questions */}
                    <div className={`flex flex-col items-center mt-10 ${currentPage===0 ? "hidden" : "flex"}`}>
                        <h1 className="text-[32px] tracking-tight font-semibold text-neutral-800 dark:text-neutral-100">
                        {assignmentDetails.questions
                            ? currentPage >= 1
                            ? assignmentDetails.questions[currentPage - 1]?.prompt
                            : assignmentDetails.questions[currentPage]?.prompt
                        : ""}
                        </h1>

                        <div className="mt-10 flex flex-col gap-4 pl-5 pr-5">
                            {/* {
                                currentPage>= 1 
                                ? AssignmentDetails.questions[currentPage-1].choices.map((choice, index) => (
                                    <button 
                                    key={choice.id}
                                    className={`bg-gradient-to-r  border-[2px]  p-3 flex gap-4 rounded-[7px] w-full max-w-[345px] justify-start items-start h-fit  relative transition-all duration-100 ease-out min-w-[345px]

                                    dark:to-neutral-900
                                    dark:from-neutral-900

                                    hover:from-[#F8FBFF]
                                    hover:to-[#ECF3FE]

                                    dark:hover:border-blue-500/70

                                     hover:border-blue-500/70

                                     group

                                    
                                    
                                    ${selectedOption===choice.id ? "from-[#F8FBFF]" : "from-white"}
                                    ${selectedOption===choice.id ? "to-[#ECF3FE]" : "to-white"}
                                    ${selectedOption===choice.id ? "to-[#ECF3FE]" : "to-white"}
                                    ${selectedOption===choice.id ? "border-blue-500/70" : "border-[#E9EBED]"}
                                    ${selectedOption===choice.id ? "dark:border-blue-500/70" : "dark:border-neutral-800"}
                                    
                                    
                                    `}
                                    onClick={() => handleOptionSelect(choice.id)}
                                    >
                                        <h1 className={`w-[30px] h-[30px] p-3 flex items-center justify-center rounded-full bg-white/20 border-[2px] dark:bg-neutral-700/20 
                                         group-hover:border-blue-500/70
                                         dark:group-hover:border-blue-500/70
                                        ${selectedOption===choice.id ? "border-blue-500/70" : "border-[#E9EBED]"}
                                        ${selectedOption===choice.id ? "dark:border-blue-500/70" : "dark:border-neutral-800"}

                                        `}>{index+1}</h1>
                                        <p className="mt-1 text-left break-words max-w-[270px]">{choice.value}</p>
                                    </button>
                                ))
                                : ""
                            } */}

                            {
                                currentPage >= 1 &&
                                assignmentDetails.questions[currentPage - 1]?.choices.map((choice: any, index: any) => (
                            <button
                            key={choice.id}
                            className={`bg-gradient-to-r border-[2px] p-3 flex gap-4 rounded-[7px] w-full max-w-[345px] justify-start items-start h-fit relative transition-all duration-100 ease-out min-w-[345px]

                            dark:to-neutral-900
                            dark:from-neutral-900

                            hover:from-[#F8FBFF]
                            hover:to-[#ECF3FE]

                            dark:hover:border-blue-500/70
                            hover:border-blue-500/70

                            group

                            ${selectedOption === choice.id ? "from-[#F8FBFF]" : "from-white"}
                            ${selectedOption === choice.id ? "to-[#ECF3FE]" : "to-white"}
                            ${selectedOption === choice.id ? "to-[#ECF3FE]" : "to-white"}
                            ${selectedOption === choice.id ? "border-blue-500/70" : "border-[#E9EBED]"}
                            ${selectedOption === choice.id ? "dark:border-blue-500/70" : "dark:border-neutral-800"}`}
                            onClick={() => handleOptionSelect(choice.id)}
                            >
                            <h1
                                className={`w-[30px] h-[30px] p-3 flex items-center justify-center rounded-full bg-white/20 border-[2px] dark:bg-neutral-700/20 group-hover:border-blue-500/70 dark:group-hover:border-blue-500/70 ${
                                selectedOption === choice.id ? "border-blue-500/70" : "border-[#E9EBED]"
                                } ${selectedOption === choice.id ? "dark:border-blue-500/70" : "dark:border-neutral-800"}`}
                            >
                                {index + 1}
                            </h1>
                            <p className="mt-1 text-left break-words max-w-[270px]">{choice.value}</p>
                            </button>
                        ))
                        }
                        </div>

                        <div className="w-[345px] flex items-center justify-between gap-2">
                        <button className={`w-full h-[50px] hover:bg-blue-600 text-white mt-7 rounded-[7px] max-w-[25%]  text-[16px] flex items-center justify-center font-medium transition-all ease-out duration-100 bg-neutral-950 dark:hover:bg-neutral-50 dark:hover:text-neutral-950 
                        
                        ${currentPage===1 ? "hidden": "block"}
                        `}

                        onClick={handleBackBtn}
                        >Back</button>


                        <button className={`w-full h-[50px] bg-blue-600 text-white mt-7 rounded-[7px]  text-[16px] flex items-center justify-center font-medium transition-all ease-out duration-100 hover:bg-neutral-950 dark:hover:bg-neutral-50 dark:hover:text-neutral-950 `}

                        onClick={currentPage < assignmentDetails.questions?.length ?handleContinueBtn : handleSubmitBtn}
                        >{ currentPage < assignmentDetails.questions?.length ? "Continue": "Submit" }</button>
                        </div>
                    </div>




                </section>
            </main>
        </>
    )
}

export default SubmitAssignment;