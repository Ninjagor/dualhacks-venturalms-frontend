import React from 'react';

const Overview = () => {
    return (
        <>
            <div>
                <h1 className="text-3xl mt-3 font-semibold tracking-tight">Welcome back, { localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data") as any).name: "" }! 👋</h1>

                <button className="mt-10 p-2 pl-4 text-white text-[15px] font-medium tracking-tight pr-4 bg-blue-600 rounded-[7px]" onClick={() => {
                    localStorage.removeItem("user_data");
                    window.location.reload();
                }}>Log Out</button>
            </div> 
        </>
    );
};

export default Overview;