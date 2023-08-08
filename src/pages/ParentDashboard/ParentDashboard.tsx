import React, {useState, useEffect} from 'react';
import { Link, Outlet, RouteMatch } from 'react-router-dom';

import ParentDashboardNavbar from './components/ParentDashboardNavbar';
import ParentDashboardRoutes from './components/ParentDashboardRoutes';


interface DashboardProps {
    themeChange: () => void;
    theme: string | null;
}


const ParentDashboard: React.FC<DashboardProps>  = ({ themeChange, theme }) => {

    useEffect(() => {
        if (!localStorage.getItem("user_data")) {
            window.location.replace("/login")
        }
        if (JSON.parse(localStorage.getItem("user_data") as any).accountType !== "parent") {
            window.location.replace("/parentdashboard")
        }
    }, [])

    return (
        <>
        <ParentDashboardNavbar  themeChange={themeChange} theme={theme}/>
        <main className="w-full h-fit min-h-[calc(100vh-149px)] bg-white dark:bg-neutral-950 relative">
            <div className='w-full h-full max-w-[1600px] ml-auto mr-auto p-9'>
                <ParentDashboardRoutes />
            </div>
        </main>
        </>
    );
}

export default ParentDashboard;