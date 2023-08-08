import React, {useState, useEffect} from 'react';

import { Link, useLocation } from 'react-router-dom';

import Logo from "../../../assets/ventura-logo.png";


import SunImg from "../../../assets/SunImg.svg";
import MoonImg from "../../../assets/MoonImg.svg";

interface DashboardNavbarProps {
    themeChange: () => void;
    theme: string | null;
  }

const ParentDashboardNavbar: React.FC<DashboardNavbarProps>  = ({ themeChange, theme }) => {
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
                    <img src={Logo} alt="ventura logo" className="w-[20px] h-[13px]"  onClick={() => window.location.replace("/parentdashboard")}/>
                    <h1 className="text-[24px] font-bold tracking-tighter"  onClick={() => window.location.replace("/dashboard")}>ventura</h1>
                    <div className='h-[20px] w-[1px] bg-neutral-400 dark:bg-neutral-600  ml-3 mr-3'></div>
                    {theme === "light" ?<img onClick={handleButtonClick} src={SunImg} className="cursor-pointer" /> :<img onClick={handleButtonClick} src={MoonImg} className="cursor-pointer" /> }
                </div>
                <div className='w-full h-[40px] bg-red-500/0 mt-10 flex items-center justify-start gap-1 overflow-x-auto'>
                    <Link to="/parentdashboard" className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === '/parentdashboard'
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === '/parentdashboard'
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === '/parentdashboard'
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === '/parentdashboard'
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === '/parentdashboard'
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === '/parentdashboard'
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === '/parentdashboard'
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Overview</Link>


                    <Link to="/parentdashboard/inbox" className={`border-b-[1px]
                    tracking-tight
                    ${
                        location.pathname === '/parentdashboard/inbox'
                        ? 'text-neutral-900'
                        : 'text-neutral-400'
                    } 
                    ${
                        location.pathname === '/parentdashboard/inbox'
                        ? ''
                        : 'hover:text-neutral-900'
                    } 
                    ${
                        location.pathname === '/parentdashboard/inbox'
                        ? 'dark:text-neutral-50'
                        : 'dark:text-neutral-300'
                    }
                    ${
                        location.pathname === '/parentdashboard/inbox'
                        ? 'dark:border-blue-500'
                        : 'dark:hover:border-white/20'
                    }
                    ${
                        location.pathname === '/parentdashboard/inbox'
                        ? 'font-semibold'
                        : 'font-regular'
                    } 

                      ${
                        location.pathname === '/parentdashboard/inbox'
                        ? 'border-blue-600'
                        : 'border-[rgba(0,0,0,0)]'
                    } 


                    ${
                        location.pathname === '/parentdashboard/inbox'
                        ? ''
                        : 'hover:border-neutral-300'
                    }
                    
                    
                    pb-[0.99rem] pr-5 pl-5 transition-[border-color]`}>Inbox</Link>
                </div>
            </div>
        </nav>
        </>
    );
}

export default ParentDashboardNavbar;