import React from 'react';

import Logo from "../../../assets/ventura-logo.png";

const AuthNavbar = () => {
    return (
        <>
        <nav className='w-full flex items-center justify-center absolute top-0 z-50 transition-all duration-150 ease-out bg-white border-b-[1px] border-[#E9EBED] dark:bg-neutral-900 dark:border-neutral-800'>
            <div className="max-w-[1234px] w-full p-3 pt-8 pb-8 flex items-center justify-between">
                <div className="flex items-center justify-center w-fit cursor-pointer gap-1" onClick={() => window.location.replace("/")}>
                    <img src={Logo} alt="ventura logo" className="w-[20px] h-[13px]" />
                    <h1 className="text-[24px] font-bold tracking-tighter">ventura</h1>
                </div>
            </div>
        </nav>
        </>
    );
}

export default AuthNavbar;