import React, { useState, useEffect } from 'react';

import AuthNavbar from '../components/AuthNavbar';

import toast, { Toaster } from 'react-hot-toast';

import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../api_url';

type UserData = {
    password: string;
    email: string;
};


const Login = () => {
    const [userData, setUserData] = useState<UserData>({
        password: '',
        email: '',
    });

    useEffect(() => {
        if (localStorage.getItem("user_data")) {
            const data: any = localStorage.getItem("user_data")
            const userData = JSON.parse(data)

            if (userData.accountType === "user") {
                window.location.replace("/dashboard")
            } else {
                window.location.replace("/parentdashboard")
            }
        }
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value,
        }));
    };

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


    const loginUser = async() => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login/credentials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });


            if (response.ok) {
                notify("Success!", false)
                const data = await response.json();
                console.log('Login successful:', data);
                const userData = {
                    jwt: data.token,
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    accountType: "user"
                }
                localStorage.removeItem("user_data")
                localStorage.setItem("user_data", JSON.stringify(userData));
                window.location.reload()
              } else {
                console.error('Login failed:', response.status, response.statusText);

                if (response.status==404) {
                    notify("User does not exist", true)
                } else if (response.status==403) {
                    notify("Incorrect password", true)
                } else {
                    notify("Internal Error", true)
                }
              }
        } catch(error) {
            console.error('Error while logging in', error);
            alert(error);
        }
    }



    const handleSubmitBtn = async() => {
        console.log("hello")
        if (userData.email) {
            if (userData.password) {
                const loggedInUser = await loginUser()
                console.log(loggedInUser)
            } else {
                notify("Password is required", true)
        }
        } else {
            notify("Email is required", true)
        }
    }

    return (
        <>
        <AuthNavbar />

        <main className="w-full h-[calc(100vh-100px)] bg-red-500/0 relative mt-[100px] flex items-center justify-center min-h-[650px] bg-white dark:bg-neutral-950">
                <section className="w-[500px] h-[650px] bg-red-500/0 p-3">
                    <div className="flex flex-col gap-1 mt-5">
                        <h1 className="text-[34px] font-semibold tracking-tight">Welcome Back!</h1>
                        <p className="text-[16px] font-medium text-neutral-600 tracking-tight dark:text-neutral-500">Welcome back to VenturaLMS! Enter your credentials to sign in.</p>
                    </div>


                    <div className={`flex flex-col gap-3 bg-red-500/0 w-full pt-3 pb-3 mt-7  `}>
                        <div className="mt-3">
                            <p className="text-[16px] font-semibold tracking-tight text-neutral-800  dark:text-neutral-200">Email*</p>
                            <input type="email" className="w-full bg-white p-2 pt-3 pb-3 pl-4 border-[1px] rounded-[7px] border-[#a8aaac] text-neutral-900 focus:outline-none mt-2  dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100" placeholder='Enter your email' name="email"
                            value={userData.email}
                            onChange={handleInputChange}/>
                        </div>
                        <div className='mt-3'>
                            <p className="text-[16px] font-semibold tracking-tight text-neutral-800  dark:text-neutral-200">Password*</p>
                            <input type="password" className="w-full bg-white p-2 pt-3 pb-3 pl-4 border-[1px] rounded-[7px] border-[#a8aaac] text-neutral-900 focus:outline-none mt-2  dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100" placeholder='Enter your email' value={userData.password}
                            onChange={handleInputChange} name="password"/>
                        </div>
                        <div className="flex gap-2">
                            <button className={`w-full h-[50px] bg-blue-600 text-white mt-5 rounded-[7px]  text-[16px] flex items-center justify-center font-medium transition-all ease-out duration-100 hover:bg-neutral-950 dark:hover:bg-neutral-50 dark:hover:text-neutral-950`}

                            onClick={handleSubmitBtn}
                            >Submit</button>
                        </div>
                        <p className="w-full bg-red-500/0 text-center mt-3 font-regular tracking-normal mb-3">Don't have an account? <Link to="/signup" className="text-blue-600 dark:text-blue-400">Signup</Link></p>
                    </div>
                </section>
            </main>
            <Toaster />
        </>
    );
}

export default Login;