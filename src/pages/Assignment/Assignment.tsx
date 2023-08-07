import React, { useState, useEffect } from "react";

import { Route, Routes, useLocation } from 'react-router-dom';

import CreateAssignment from "./Create/CreateAssignment";
import SubmitAssignment from "./Submit/SubmitAssignment";

import "./assignmentGlobals.css"

const Assignment = () => {

    // Used for changing global tailwind style for just the assignment page.
    useEffect(() => {
        document.body.classList.add('assignmentPage');
        return () => {
          document.body.classList.remove('assignmentPage');
        };
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("user_data")) {
            window.location.replace("/login")
        }
        if (JSON.parse(localStorage.getItem("user_data") as any).accountType === "parent") {
            window.location.replace("/parentdashboard")
        }
    }, [])

    const location = useLocation();


    return (
        <>
           <Routes>
                <Route path='/new/:classId' element={<CreateAssignment />} />
                <Route path='/submit/:id' element={<SubmitAssignment />} />
            </Routes>
        </>
    )
}

export default Assignment;