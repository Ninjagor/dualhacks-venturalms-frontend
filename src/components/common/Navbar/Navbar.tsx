import Reacr, { useState, useEffect } from 'react';
import Logo from "../../../assets/ventura-logo.png";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import SunImg from "../../../assets/SunImg.svg";
import MoonImg from "../../../assets/MoonImg.svg";


interface NavbarProps {
    themeChange: () => void;
    theme: string | null;
  }


const Navbar: React.FC<NavbarProps>  = ({ themeChange, theme }) => {

    const handleButtonClick = () => {
        themeChange(); // Trigger the themeChange function received from Home.tsx
      }

  return (
   <>
   <nav className='w-full flex items-center justify-center absolute top-0 z-50'>
    <div className="max-w-[1234px] w-full p-3 pt-8 pb-8 flex items-center justify-between">
        {/* Logo Text */}
        <div className="flex items-center justify-center w-fit cursor-pointer gap-1">
            <img src={Logo} alt="ventura logo" className="w-[20px] h-[13px]" />
            <h1 className="text-[24px] font-bold tracking-tighter">ventura</h1>
        </div>
        <div className="flex h-full relative items-center gap-7 max-[670px]:hidden">
            <ul className="flex items-center gap-7">
                <li><Link to='/product' className="font-semibold text-neutral-600 text-[16px] hover:text-neutral-950 transition-all duration-200 ease-in-out dark:text-neutral-200 dark:hover:text-white">Product</Link></li>
                <li><Link to='/integrations' className="font-semibold text-neutral-600 text-[16px]  hover:text-neutral-950 transition-all duration-200 ease-in-out dark:text-neutral-200 dark:hover:text-white">Integrations</Link></li>
                <li><Link to='/pricing' className="font-semibold text-neutral-600 text-[16px]  hover:text-neutral-950 transition-all duration-200 ease-in-out dark:text-neutral-200 dark:hover:text-white">Pricing</Link></li>
                <li><Link to='/docs' className="font-semibold text-neutral-600 text-[16px] hover:text-neutral-950 transition-all duration-200 ease-in-out dark:text-neutral-200 dark:hover:text-white">Docs</Link></li>
            </ul>
            <div className='h-[20px] w-[1px] bg-neutral-400 dark:bg-neutral-600 '></div>
            {theme === "light" ?<img onClick={handleButtonClick} src={SunImg} className="cursor-pointer" /> :<img onClick={handleButtonClick} src={MoonImg} className="cursor-pointer" /> }
            
        </div>
        <div>
            <button onClick={() => {
                window.location.replace("/signup");
            }} className="p-[0.5rem] pl-5 pr-6 bg-neutral-950 text-neutral-50 rounded-full text-sm flex items-center gap-2 group relative hover:bg-[#2563EB] transition-all 
                duration-200 
                ease-out dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-[#2563EB] dark:hover:text-neutral-50">
                <p className="text-[13px] tracking-[-0.3px] font-medium mr-3">Sign Up</p> 

                <FontAwesomeIcon className="text-[13px] absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all 
                duration-200 
                ease-out" icon={faArrowRight} />

                <FontAwesomeIcon className="text-[13px] absolute right-4 opacity-100 group-hover:opacity-0 group-hover:right-2 transition-all 
                duration-200 
                ease-out" icon={faChevronRight} /></button>
        </div>
    </div>
   </nav>
   </>
  );
}

export default Navbar;
