import React, {useState, useEffect} from 'react';

import { Link, useLocation } from 'react-router-dom';

import Logo from "../../../assets/ventura-logo.png";


import SunImg from "../../../assets/SunImg.svg";
import MoonImg from "../../../assets/MoonImg.svg";

interface DashboardNavbarProps {
    themeChange: () => void;
    theme: string | null;
  }

const DashboardNavbar: React.FC<DashboardNavbarProps>  = ({ themeChange, theme }) => {
    const location = useLocation();

    const handleButtonClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        themeChange(); 
        console.warn("changed")
    }
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
                    <Link to="/dashboard" className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === '/dashboard'
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === '/dashboard'
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === '/dashboard'
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === '/dashboard'
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === '/dashboard'
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === '/dashboard'
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === '/dashboard'
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Overview</Link>


                    <Link to="/dashboard/classes" className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === '/dashboard/classes'
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === '/dashboard/classes'
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === '/dashboard/classes'
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === '/dashboard/classes'
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === '/dashboard/classes'
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === '/dashboard/classes'
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === '/dashboard/classes'
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Classes</Link>


                    <Link to="/dashboard/settings" className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === '/dashboard/settings'
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === '/dashboard/settings'
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === '/dashboard/settings'
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === '/dashboard/settings'
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === '/dashboard/settings'
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === '/dashboard/settings'
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === '/dashboard/settings'
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Settings</Link>
                </div>
            </div>
        </nav>
        </>
    );
}

export default DashboardNavbar;