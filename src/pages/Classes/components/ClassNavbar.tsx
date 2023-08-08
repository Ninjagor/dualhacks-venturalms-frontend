import React, {useState, useEffect} from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import Logo from "../../../assets/ventura-logo.png";


import SunImg from "../../../assets/SunImg.svg";
import MoonImg from "../../../assets/MoonImg.svg";

interface ClassNavbarProps {
    themeChange: () => void;
    theme: string | null;
    isStudent: boolean | null
  }

const ClassNavbar: React.FC<ClassNavbarProps>  = ({ themeChange, theme, isStudent }) => {
    const location = useLocation();

    const handleButtonClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        themeChange(); 
        console.warn("changed")
    }

    const { classId } = useParams();
    // console.log(classId)
    return (
        <>
        <nav className='w-full flex items-center justify-center relative top-0 z-40 transition-all duration-150 ease-out bg-white border-b-[1px] border-[#E9EBED] dark:bg-neutral-900 dark:border-neutral-800'>
            <div className="max-w-[1600px] w-full p-9 pt-8 pb-0 flex items-start justify-between flex-col">
                <div className="flex items-center justify-center w-fit cursor-pointer gap-1">
                    <img src={Logo} alt="ventura logo" className="w-[20px] h-[13px]"  onClick={() => window.location.replace("/dashboard")}/>
                    <h1 className="text-[24px] font-bold tracking-tighter"  onClick={() => window.location.replace("/dashboard")}>ventura</h1>
                    <div className='h-[20px] w-[1px] bg-neutral-400 dark:bg-neutral-600  ml-3 mr-3'></div>
                    {theme === "light" ?<img onClick={handleButtonClick} src={SunImg} className="cursor-pointer" /> :<img onClick={handleButtonClick} src={MoonImg} className="cursor-pointer" /> }
                </div>
                <div className='w-full h-[40px] bg-red-500/0 mt-10 flex items-center justify-start gap-1 overflow-x-auto'>
                    <Link to={`/class/${classId}`} className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === `/class/${classId}`
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === `/class/${classId}`
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === `/class/${classId}`
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === `/class/${classId}`
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === `/class/${classId}`
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === `/class/${classId}`
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === `/class/${classId}`
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Communication</Link>

                    {isStudent ? <Link to={`/class/${classId}/assignments`} className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === `/class/${classId}/assignments`
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === `/class/${classId}/assignments`
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === `/class/${classId}/assignments`
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === `/class/${classId}/assignments`
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === `/class/${classId}/assignments`
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === `/class/${classId}/assignments`
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === `/class/${classId}/assignments`
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Assignments</Link> :
                    
                    <Link to={`/assignment/new/${classId}`} className={`border-b-[1px]
                    tracking-tight    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color] text-neutral-400 hover:text-neutral-900 border-transparent dark:hover:border-white/20 dark:hover:text-neutral-300 dark:text-neutral-300 hover:border-neutral-300`}>New Assignment</Link>
                    }
                    
                    

                    {isStudent ? <Link to={`/class/${classId}/grades`} className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === `/class/${classId}/grades`
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === `/class/${classId}/grades`
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === `/class/${classId}/grades`
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === `/class/${classId}/grades`
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === `/class/${classId}/grades`
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === `/class/${classId}/grades`
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === `/class/${classId}/grades`
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Grades</Link> : <Link to={`/class/${classId}/students`} className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === `/class/${classId}/students`
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === `/class/${classId}/students`
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === `/class/${classId}/students`
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === `/class/${classId}/students`
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === `/class/${classId}/students`
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === `/class/${classId}/students`
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === `/class/${classId}/students`
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Students</Link>}
                </div>
            </div>
        </nav>
        </>
    );
}

export default ClassNavbar;