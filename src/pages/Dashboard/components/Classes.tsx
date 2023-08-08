import React, { useState, useEffect } from 'react';
import { useOnMountUnsafe } from '../../../functions/useOnMountUnsafe';
import { BASE_URL } from '../../../api_url';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faCopy } from '@fortawesome/free-solid-svg-icons';

import toast, { Toaster } from 'react-hot-toast';

interface ClassItem {
  class: {
    id: string;
    name: string;
    description: string;
    classAdministratorId: string;
  };
}


const Classes = () => {
  const [classCodeInputValue, setClassCodeInputValue] = useState("");
  const [classNameInputValue, setClassNameInputValue] = useState("");
  const [classDescInputValue, setClassDescInputValue] = useState("");
  const [classCodeModalOpen, setclassCodeModalOpen] = useState(false);
  const [newClassModalOpen, setNewClassModalOpen] = useState(false);
  const [classData, setClassData] = useState<{data: ClassItem[]}>({ data: [] })
  const [isLoading, setIsLoading] = useState(false);

  const handleClassCodeInput = (e: any) => {
    setClassCodeInputValue(e.target.value)
  }

  const handleClassNameInput = (e: any) => {
    setClassNameInputValue(e.target.value)
  }

  const handleClassDescInput = (e: any) => {
    setClassDescInputValue(e.target.value)
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

  const sendGetRequest = async(requestURL: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${requestURL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`
        }
      });
  
      if (response.ok) {
        console.log("success!");
        const data = await response.json();
        setClassData((prevData) => ({ data: [...prevData.data, ...data.data] }));
      } else {
        console.error("Error fetching classes", response.status, response.statusText)
      }
    } catch(error) {
      console.error("An error occured:", error)
    }
    setIsLoading(false);
  }

  const getClasses = async() => {
    setTimeout(() => {
      sendGetRequest("/classesasstudent");
    }, 50)
    
    sendGetRequest("/classesasadmin");
  }


  useOnMountUnsafe(() => {
    getClasses();
  })


  const createNewClass = async() => {

    try {
      const response = await fetch(`${BASE_URL}/create/class`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
        },
        body: JSON.stringify({
          name: classNameInputValue,
          description: classDescInputValue
        })
      });

      if (response.ok) {
        notify("Success!", false)
        const data = await response.json();
        console.log('Creation successful:', data);
        window.location.reload()
      } else {
        console.error('Creation failed:', response.status, response.statusText);
        // alert("User by that email already exists")
        notify(response.statusText, true)
      }

    } catch(error) {
      console.error('Error while creating class:', error);
    }
  }

  const createClassHandler = () => {
    if (classNameInputValue.trim()) {
      if (classDescInputValue.trim()) {
        createNewClass();
      } else {
        notify("Class Description is mandatory", true)
      }
    } else {
      notify("Class Name is mandatory", true)
    }
  }

  const prevent = (e: any) => {
    e.preventDefault();
  }

  const joinNewClass = async() => {
    try {
      const response = await fetch(`${BASE_URL}/joinclass`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
        },
        body: JSON.stringify({
          classCode: classCodeInputValue
        })
      });

      if (response.ok) {
        notify("Success!", false)
        const data = await response.json();
        console.log('Join successful:', data);
        window.location.reload()
      } else {
        console.error('Joining failed:', response.status, response.statusText);
        // alert("User by that email already exists")

        if (response.statusText == "Unauthorized") {
          notify("Teacher cannot rejoin as student", true)
        } else if (response.status===404) {
          notify("Invalid Class Code", true)
        } else if (response.status===400) {
          notify("Already in class", true)
        } 
        else {
          notify(response.statusText, true)
        }
        
      }

    } catch(error) {
      console.error('Error while joining class:', error);
      notify("An unexpected error occured", true)
    }
  }

  const joinNewClassHandler = () => {
    if (classCodeInputValue.trim()) {
      joinNewClass();
    } else {
      notify("Class Code is mandatory", true)
    }
  }

  const handleWindowRedirect = (event: any) => {
    if (!event.target.classList.contains(".classCopySection")) {
      window.location.replace("/");
    }
  };

  const handleDivClick = (url: string) => (event: any) => {
    // Check if the event originated from the div and not the button
    if (!event.target.classList.contains("copyTag")) {
      redirectTo(url);
    }
  };

  const redirectTo = (url: string) => {
    window.location.replace(url);
  };

  const handleCopyClick = (textToCopy: string) => () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        console.log("Text copied to clipboard:", textToCopy);
        notify("Copied class code", false)
      },
      (err) => {
        console.error("Failed to copy text:", err);
        notify("Couln't copy class code", true)
      }
    );
  };


  return (
    <>

      <div className={`fixed left-0 top-0 w-full h-screen min-h-[600px]  bg-neutral-950/70 z-50 backdrop-blur-[5px]  flex items-center justify-center transition-all duration-150 ease-out
      
      ${classCodeModalOpen ? "opacity-100" : "opacity-0"}
      ${classCodeModalOpen ? "pointer-events-all" : "pointer-events-none"}
      
      `}>
        <section className="w-full h-full bg-white max-w-[450px] max-h-[300px] rounded-[10px] dark:bg-neutral-900 dark:border-[1px] border-transparent dark:border-neutral-700 p-5 flex flex-col relative overflow-hidden">
            <h1 className="text-[23px] mt-2 tracking-tight font-bold text-neutral-800 dark:text-neutral-50">Join Class</h1>
            <div className="mt-10">
              <p className="text-[16px] font-regular opacity-80">Enter class code</p>

              <div className="flex items-center justify-between gap-2">
              <input type="text" className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-3 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] focus:outline-none font-medium" placeholder='Enter class code' onChange={handleClassCodeInput} value={classCodeInputValue} />

              <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] text-[14px] font-medium min-w-[75px] min-h-[42px] mb-[2px] dark:bg-white dark:border-[1px] mt-4 dark:border-white dark:text-neutral-950 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-400  transition-all duration-150 ease-out hover:bg-blue-500" onClick={joinNewClassHandler}>Join</button>
              </div>
              
            </div>
            <div className="w-full h-[70px] bg-white dark:bg-neutral-900 absolute bottom-0 left-0 border-t-[1px] flex items-center dark:border-t-neutral-700">
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-5 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out"   onClick={() => setclassCodeModalOpen(classCodeModalOpen ? false : true)}>Close</button>
            </div>
        </section>
      </div>

      <div className={`fixed left-0 top-0 w-full h-screen min-h-[600px]  bg-neutral-950/70 z-50 backdrop-blur-[5px]  flex items-center justify-center transition-all duration-150 ease-out
      
      ${newClassModalOpen ? "opacity-100" : "opacity-0"}
      ${newClassModalOpen ? "pointer-events-all" : "pointer-events-none"}
      
      `}>
        <section className="w-full h-full bg-white max-w-[450px] max-h-[475px] rounded-[10px] dark:bg-neutral-900 dark:border-[1px] border-transparent dark:border-neutral-700 p-5 flex flex-col relative overflow-hidden">
            <h1 className="text-[23px] mt-2 tracking-tight font-bold text-neutral-800 dark:text-neutral-50">Create Class</h1>
            <div className="mt-10">
              <p className="text-[16px] font-regular opacity-80">Enter class name</p>

              <div className="flex items-center justify-between gap-2">
              <input type="text" className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-1 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] focus:outline-none font-medium" placeholder='Enter class name' onChange={handleClassNameInput} value={classNameInputValue} maxLength={25}/>

              
              </div>
              <p className="text-[13px] mt-1 text-neutral-600 dark:text-neutral-400 font-medium">{classNameInputValue.length}/25</p>
              
            </div>
            <div className="mt-5">
              <p className="text-[16px] font-regular opacity-80">Enter class description</p>

              <div className="flex items-center justify-between gap-2">
              <input type="text" className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-1 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] focus:outline-none font-medium" placeholder='Enter class description' onChange={handleClassDescInput} value={classDescInputValue} maxLength={30}/>

              
              </div>
              <p className="text-[13px] mt-1 text-neutral-600 dark:text-neutral-400 font-medium">{classDescInputValue.length}/30</p>
              
            </div>
            <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] text-[14px] font-medium min-w-[75px] min-h-[42px] mb-[2px] dark:bg-white dark:border-[1px] mt-4 dark:border-white dark:text-neutral-950 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-400  transition-all duration-150 ease-out hover:bg-blue-500" onClick={createClassHandler}>Create</button>



            <div className="w-full h-[70px] bg-white dark:bg-neutral-900 absolute bottom-0 left-0 border-t-[1px] flex items-center dark:border-t-neutral-700">
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-5 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out"   onClick={() => setNewClassModalOpen(newClassModalOpen ? false : true)}>Close</button>
            </div>
        </section>
      </div>

      
    
      <div className="flex w-full items-center justify-between gap-3 overflow-x-auto overflow-y-hidden">
        <h1 className="text-[34px] tracking-tight font-semibold text-neutral-800 dark:text-neutral-200">Classes</h1>
        {classCodeModalOpen}
        <div className="flex gap-2">
          <button className="w-full max-w-[120px] h-[40px] p-2 pl-4 pr-4 rounded-[7px] text-[13px] font-medium hover:bg-blue-600 transition-all duration-100 ease-out bg-neutral-950 text-white dark:bg-neutral-800 border-[1px] border-neutral-700 dark:border-neutral-700  dark:hover:bg-blue-600 dark:hover:border-blue-500"  onClick={() => setclassCodeModalOpen(classCodeModalOpen ? false : true)}>Join class</button>
          <button className="w-[200px] max-w-[150px] h-[40px] p-2 pl-4 pr-4 rounded-[7px] text-[13px] font-medium hover:bg-blue-600 transition-all duration-100 ease-out bg-neutral-950 text-white dark:bg-neutral-800 border-[1px] border-transparent dark:border-neutral-700 dark:hover:bg-blue-600 dark:hover:border-blue-500 whitespace-nowrap"  onClick={() => setNewClassModalOpen(newClassModalOpen ? false : true)}>Create class</button>
        </div>
      </div>

      <p className={`flex gap-4 items-center text-[22px] text-neutral-600 tracking-tight font-medium mt-10
      
      ${isLoading ? "flex" : "hidden"}

      `}>
        Loading

        <svg aria-hidden="true" className="w-7 h-7 mr-2 text-blue-200 animate-spin dark:text-blue-600/40 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>  
      </p>
      
      <div className="relative flex gap-4 flex-wrap mt-5 max-[688px]:justify-center items-start ">
      {classData.data.map((dataItem) => {
        const classInfo = dataItem.class;
        return (
          <div key={classInfo.id} className="w-[350px] p-6 border-[1px] rounded-[5px] border-[#e0e1e3] flex flex-col items-center gap-3 max-w-[400px] dark:bg-neutral-900 dark:border-neutral-800  cursor-pointer dark:hover:bg-neutral-800 dark:hover:border-neutral-700 transition-all duration-350 ease-out hover:border-blue-500/70 relative" onClick={handleDivClick(`/class/${classInfo.id}`)}>
            <h2 className="text-[26px] tracking-tight font-semibold text-neutral-800 dark:text-neutral-200">{classInfo.name}</h2>
            <p className="text-center text-[16px]  dark:text-neutral-400">{classInfo.description}</p>
            {/* {classInfo.classAdministratorId===JSON.parse(localStorage.getItem("user_data") as any).id ? <p className="text-center text-[16px]  dark:text-neutral-400 font-semibold">You teach this class.</p> : ""} */}
            {classInfo.classAdministratorId===JSON.parse(localStorage.getItem("user_data") as any).id ? 
            <div className="self-start mt-5 ">
              <p className="ml-1 text-neutral-700 dark:text-neutral-300">Share this with students</p>
              <p className="p-3 bg-neutral-50 rounded-[5px] border-[1px] border-[#a8aaac] mt-2 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400  copyTag text-neutral-600 relative" onClick={
                handleCopyClick(classInfo.id as string)
              }>{classInfo.id} <FontAwesomeIcon className="mb-[1px] ml-1 copyTag" icon={faCopy} onClick={prevent}/></p>
            </div>
            : ""}
          </div>
        );
      })}

      {classData.data.length===0 && isLoading===false ? <p className="flex gap-4 items-center text-[17px] text-neutral-800 dark:text-neutral-400 tracking-tight font-medium mt-10">No classes found</p> : ""}
      </div>
{/* 
      {JSON.stringify(classData.data)} */}

      <Toaster />
    </>
  );
};

export default Classes;