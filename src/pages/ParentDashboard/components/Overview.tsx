import React, { useState, useEffect } from "react";
import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";
import { BASE_URL } from "../../../api_url";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faLink } from "@fortawesome/free-solid-svg-icons";

import toast, { Toaster } from "react-hot-toast"

const Overview = () => {
    const [children, setChildren] = useState<any[]>([])
    const [newChildModal, setNewChildModal] = useState(false);
    const [newChildEmail, setNewChildEmail] = useState("")
    const [newChildPassword, setNewChildPassword] = useState("")

    const handleUpdateEmail = (e:any) => {
        setNewChildEmail((prev) => e.target.value)
    }

    const handleUpdatePassword = (e:any) => {
        setNewChildPassword((prev) => e.target.value)
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


    const fetchChildren = async() => {
        try {
            const response = await fetch(`${BASE_URL}/getchildren`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                }
              });
        
              if(response.ok) {
                const data = await response.json();
                console.log('Fetch successful:', data);
                setChildren((prev) => data.children)
              } else {
                const data = await response.json();
                console.log("ERROR fetching", response.status, response.statusText, data)
              }
        } catch(error) {
            console.error("Error fetching children", error)
        }
    }

    const linkNewChild = async() => {
        try {
            const response = await fetch(`${BASE_URL}/pair/student`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                },
                body: JSON.stringify({
                    childEmail: newChildEmail,
                    childPassword: newChildPassword
                })
              });
        
              if(response.ok) {
                const data = await response.json();
                console.log('Fetch successful:', data);
                window.location.reload()
              } else {
                const data = await response.json();
                console.log("ERROR fetching", response.status, response.statusText, data)
                if (data.error === "student does not exist") {
                    notify("Student does not exist", true)
                } else if (data.error === "invalid child credentials") {
                    notify("Invalid student credentials", true)
                } else {
                    notify("Error linking child", true)
                }
                
              }
        } catch(error) {
            console.error("Error linking children", error)
        }
    }

    const handleLinkNewChild = () => {
        if (newChildEmail.trim()) {
            if (newChildPassword.trim()) {
                linkNewChild();
            } else {
                notify("Password is required", true)
            }
        } else {
            notify("Email is required", true)
        }
    }

    useOnMountUnsafe(() => {
        fetchChildren();
    })


    return (
        <>

<button className="fixed bottom-10 left-10 p-5 bg-neutral-950 w-[60px] h-[60px] rounded-full flex items-center justify-center dark:bg-white"  onClick={() => setNewChildModal(prev => true)}><FontAwesomeIcon icon={faLink} className="text-white text-[20px] dark:text-neutral-950"/></button>

<div className={`fixed left-0 top-0 w-full h-screen min-h-[600px]  bg-neutral-950/70 z-50 backdrop-blur-[5px]  flex items-center justify-center transition-all duration-150 ease-out
      
      ${newChildModal ? "opacity-100" : "opacity-0"}
      ${newChildModal ? "pointer-events-all" : "pointer-events-none"}
      
      `}>
        <section className="w-full h-full bg-white max-w-[450px] max-h-[270px] rounded-[10px] dark:bg-neutral-900 dark:border-[1px] border-transparent dark:border-neutral-700 p-5 flex flex-col relative overflow-hidden">
            <h1 className="text-[23px] mt-1 tracking-tight font-bold text-neutral-800 dark:text-neutral-50">Link Child</h1>
            <div className="mt-1">
              {/* <p className="text-[16px] font-regular opacity-80">Enter class code</p> */}

              <div className="flex items-center justify-between gap-2 flex-col">
              {/* <input type="text" className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-3 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] focus:outline-none font-medium" placeholder='Enter class code' onChange={handleNewPostInputValue} value={newPostInputValue} /> */}
              <input  className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-3 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] h-full focus:outline-none font-medium" placeholder='Enter child email' maxLength={250} onChange={handleUpdateEmail} value={newChildEmail}></input>
              <input  className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-3 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] h-full focus:outline-none font-medium" placeholder='Enter child password' maxLength={250}  onChange={handleUpdatePassword} value={newChildPassword}></input>

              {/* <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] text-[14px] font-medium min-w-[75px] min-h-[42px] mb-[2px] dark:bg-white dark:border-[1px] mt-4 dark:border-white dark:text-neutral-950 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-400  transition-all duration-150 ease-out hover:bg-blue-500"
              >Join</button> */}
              </div>
              
            </div>
            <div className="w-full h-[70px] bg-white dark:bg-neutral-900 absolute bottom-0 left-0 border-t-[1px] flex items-center dark:border-t-neutral-700">
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-5 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out"   onClick={() => setNewChildModal(newChildModal ? false : true)}>Close</button>
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-2 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out" onClick={handleLinkNewChild}>Create</button>
            </div>
        </section>
      </div>
        <div>
            <h1 className="text-[28px] tracking-tight font-semibold mt-2">Overview</h1>
        </div>
        <h2 className="mt-7 mb-3 text-[20px] tracking-tight font-semibold">Linked Children:</h2>
        {children.length===0 ? (
            <p className="mt-5">You have no children</p>
            ) : (
                <div className="flex w-full gap-5 flex-wrap">
{
    (children.map((child, index) => (
        <>
            <div key={index} className="p-5 border-[1px] w-fit rounded-[7px] flex flex-col items-center gap-2 dark:border-neutral-700 dark:bg-neutral-900">
                <h1 className="text-[20px] tracking-tight font-semibold">{child.student.name}</h1>
                <p>{child.student.email}</p>
            </div>
        </>
    )))
}
                </div>
                
            )}



                <button className="mt-10 p-2 pl-4 text-white text-[15px] font-medium tracking-tight pr-4 bg-blue-600 rounded-[7px]" onClick={() => {
                    localStorage.removeItem("user_data");
                    window.location.reload();
                }}>Log Out</button>


            <Toaster />
        
        </>
    )
}

export default Overview;