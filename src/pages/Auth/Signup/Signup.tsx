import React, { useState, useEffect } from 'react';

import AuthNavbar from '../components/AuthNavbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import toast, { Toaster } from 'react-hot-toast';

import { Link } from 'react-router-dom';

import { User } from 'react-feather';

import zxcvbn from 'zxcvbn';
import { BASE_URL } from '../../../api_url';
import { time } from 'console';

type OptionType = 'student' | 'parent';

type UserData = {
    name: string;
    password: string;
    email: string;
  };

const Signup = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [userData, setUserData] = useState<UserData>({
        name: '',
        password: '',
        email: '',
    });

    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleOptionSelect = (option: OptionType) => {
        setSelectedOption(option);
      };
    
    const isOptionSelected = (option: OptionType) => {
        return selectedOption === option;
    };

    
    


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
    // `${BASE_URL}/create/user`
    const createUser = async() => {
        try {
            const response = await fetch(`${BASE_URL}/create/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });


            if (response.ok) {
                notify("Success!", false)
                const data = await response.json();
                console.log('Signup successful:', data);
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
                console.error('Signup failed:', response.status, response.statusText, ", User already exists");
                // alert("User by that email already exists")
                notify("User by that email already exists", true)
              }
        } catch(error) {
            console.error('Error while signing up:', error);
        }
    }

    const createParent = async() => {
        try {
            const response = await fetch(`${BASE_URL}/create/parent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });


            if (response.ok) {
                notify("Success!", false)
                const data = await response.json();
                console.log('Signup successful:', data);
                const parentData = {
                    jwt: data.token,
                    id: data.parent.id,
                    name: data.parent.name,
                    email: data.parent.email,
                    accountType: "parent"
                }
                localStorage.removeItem("user_data")
                localStorage.setItem("user_data", JSON.stringify(parentData));
                window.location.reload()
              } else {
                console.error('Signup failed:', response.status, response.statusText, ", User already exists");
                // alert("User by that email already exists")
                notify("User by that email already exists", true)
              }
        } catch(error) {
            console.error('Error while signing up:', error);
        }
    }


    const handleSubmitBtn = async() => {
        console.log("hello")
        if (userData.email) {
            if (userData.name) {
                if (userData.password) {
                    if (selectedOption==="student") {
                        
                        const newStudent = await createUser()
                        console.log(newStudent)
                    } else {
                        const newParent = await createParent();
                    }
                } else {
                    notify("Password is required", true)
            }
            } else {
                notify("Name is required", true)
        }
        } else {
            notify("Email is required", true)
        }
    }
    


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value,
        }));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
    
        // Recalculate password strength on password change
        const newStrength = zxcvbn(value);
        setPasswordStrength(newStrength.score);
    
        // Update the password in the userData state
        setUserData((prevUserData) => ({
          ...prevUserData,
          password: value,
        }));
    };


    return (
        <>
        <AuthNavbar />
        
        <main className="w-full h-[calc(100vh-100px)] bg-red-500/0 relative mt-[100px] flex items-center justify-center min-h-[650px] bg-white dark:bg-neutral-950">
                <section className="w-[500px] h-[650px] bg-red-500/0 p-3">
                    <div className="flex flex-col gap-1 mt-5">
                        <h1 className="text-[34px] font-semibold tracking-tight">Get started today</h1>
                        <p className="text-[16px] font-medium text-neutral-600 tracking-tight dark:text-neutral-500">Sign up today, and get ready to empower the future.</p>
                    </div>



                    <div className={`flex flex-col gap-3 bg-red-500/0 w-full pt-3 pb-3 mt-7 ${currentPage===1 ? "flex" : "hidden"} `}>

                        <button className={`w-full h-full max-h-[75px] min-h-[75px] pt-5 pb-5 bg-white border-[2px] border-[#e4e6e8] rounded-[7px] flex items-center justify-start gap-2 dark:hover:border-blue-600/70 hover:border-blue-600/70 bg-gradient-to-r ${isOptionSelected('student') ? "from-[#F8FBFF]" : "from-white"} ${isOptionSelected('student') ? "border-blue-600/70" : ""} ${isOptionSelected('student') ? "to-[#ECF3FE]" : ""} ${isOptionSelected('student') ? "dark:border-blue-600/70" : " dark:border-neutral-800"}
                        
                        
                        
                        to-white hover:from-blue-300/5 hover:to-blue-500/10 transition-all duration-150 ease-out group dark:to-neutral-900 dark:from-neutral-900 `} onClick={() => handleOptionSelect('student')}>
                            
                            <div  className={`p-3 rounded-[5px] bg-white/40 ml-5 border-[2px] border-[#e4e6e8] group-hover:border-blue-600/70 transition-all  duration-150 ${isOptionSelected('student') ? "border-blue-600/70" : ""} dark:bg-neutral-900/40  ${isOptionSelected('student') ? "dark:border-blue-600/70" : "dark:border-neutral-800"} `}>
                             <User size={20} opacity={0.9} />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[16px] font-semibold text-neutral-900 dark:text-neutral-100">I'm a student or educator</h1>
                                <p className="text-[13px] font-medium text-neutral-400 text-left">I'm creating a Ventura account for education.</p>
                            </div>
                        </button >


                        <button className={`w-full h-full max-h-[75px] min-h-[75px] pt-5 pb-5 bg-white border-[2px] border-[#e4e6e8] rounded-[7px] flex items-center dark:hover:border-blue-600/70 justify-start gap-2 hover:border-blue-600/70 bg-gradient-to-r ${isOptionSelected('parent') ? "from-[#F8FBFF]" : "from-white"} ${isOptionSelected('parent') ? "border-blue-600/70" : ""} ${isOptionSelected('parent') ? "to-[#ECF3FE]" : ""}  to-white hover:from-blue-300/5 hover:to-blue-500/10 transition-all duration-150 ease-out group dark:to-neutral-900 dark:from-neutral-900   ${isOptionSelected('parent') ? "dark:border-blue-600/70" : "dark:border-neutral-800"}`} onClick={() => handleOptionSelect('parent')}>
                            
                            <div className={`p-3 rounded-[5px] bg-white/40 ml-5 border-[2px] border-[#e4e6e8] group-hover:border-blue-600/70 transition-all duration-150 ${isOptionSelected('parent') ? "border-blue-600/70" : ""} dark:bg-neutral-900/40  ${isOptionSelected('parent') ? "dark:border-blue-600/70" : "dark:border-neutral-800"} `}>
                             <User size={20} opacity={0.9} />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[16px] font-semibold text-neutral-900  dark:text-neutral-100">I'm a parent or guardian</h1>
                                <p className="text-[13px] font-medium text-neutral-400 text-left">I'm creating a Ventura account for my child.</p>
                            </div>
                        </button >

                        <button className={`w-full h-[50px] bg-blue-600 text-white mt-5 rounded-[7px] ${selectedOption ? "hover:bg-neutral-950" : ""}  text-[16px] ${selectedOption ? "" : "cursor-not-allowed"} flex items-center justify-center font-medium transition-all ease-out duration-100  ${selectedOption ? "dark:hover:bg-neutral-100" : ""} ${selectedOption ? "dark:hover:text-neutral-950" : ""} `} onClick={() => {
                            if (selectedOption) {
                                setCurrentPage((prevPage) => prevPage + 1)
                            }
                        }}
                        disabled={selectedOption ? false : true}
                        >Continue</button>
                        <p className="w-full bg-red-500/0 text-center mt-3 font-regular tracking-normal">Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link></p>
                    </div>

                    <div className={`flex flex-col gap-3 bg-red-500/0 w-full pt-3 pb-3 mt-7 ${currentPage===2 ? "flex" : "hidden"} `}>
                         <div>
                            <p className="text-[16px] font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">Name*</p>
                            <input type="text" className="w-full bg-white p-2 pt-3 pb-3 pl-4 border-[1px] rounded-[7px] border-[#a8aaac] text-neutral-900 focus:outline-none mt-2 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100" placeholder='Enter your name' name="name"
                            value={userData.name}
                            onChange={handleInputChange}/>
                        </div>
                        <div className="mt-3">
                            <p className="text-[16px] font-semibold tracking-tight text-neutral-800  dark:text-neutral-200">Email*</p>
                            <input type="email" className="w-full bg-white p-2 pt-3 pb-3 pl-4 border-[1px] rounded-[7px] border-[#a8aaac] text-neutral-900 focus:outline-none mt-2  dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100" placeholder='Enter your email' name="email"
                            value={userData.email}
                            onChange={handleInputChange}/>
                        </div>
                        <div className='mt-3'>
                            <p className="text-[16px] font-semibold tracking-tight text-neutral-800  dark:text-neutral-200">Password*</p>
                            <input type="password" className="w-full bg-white p-2 pt-3 pb-3 pl-4 border-[1px] rounded-[7px] border-[#a8aaac] text-neutral-900 focus:outline-none mt-2  dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100" placeholder='Enter your password' value={userData.password}
                            onChange={handlePasswordChange} name="password"/>
                            <div className="flex w-full  h-[12px] mt-7 items-center justify-between gap-2">
                                <div className={`h-full  rounded-[2px] transition-all duration-200 ease-out 
                                ${passwordStrength===1 ? "w-[25%]" : ""} 
                                ${passwordStrength===2 ? "w-[50%]" : ""} 
                                ${passwordStrength===3 ? "w-[75%]" : ""} 
                                ${passwordStrength===4 ? "w-[100%]" : ""} 
                                ${passwordStrength===1 ? "bg-red-600" : ""}
                                ${passwordStrength===2 ? "bg-yellow-600" : ""}
                                ${passwordStrength===3 ? "bg-green-600" : ""}
                                ${passwordStrength===4 ? "bg-blue-600" : ""}
                                ${passwordStrength===0 ? "w-[100%]" : ""}
                                ${passwordStrength===0 ? "bg-neutral-200" : ""}
                                ${passwordStrength===0 ? "dark:bg-neutral-900" : ""}`}
                                 >

                                </div> 
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className={`w-[25%] h-[50px] bg-neutral-950 text-white mt-5 rounded-[7px]  text-[16px] flex items-center justify-center font-medium transition-all ease-out duration-100  dark:bg-neutral-900 dark:border-[1px] dark:border-neutral-800`}
                             onClick={() => {
                                setCurrentPage((prevPage) => prevPage - 1)
                             }}>Back</button>
                            <button className={`w-full h-[50px] bg-blue-600 text-white mt-5 rounded-[7px]  text-[16px] flex items-center justify-center font-medium transition-all ease-out duration-100 hover:bg-neutral-950 dark:hover:bg-neutral-50 dark:hover:text-neutral-950 `}

                            onClick={handleSubmitBtn}
                            >Submit</button>
                        </div>
                        <p className="w-full bg-red-500/0 text-center mt-3 font-regular tracking-normal mb-3">Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link></p>
                    </div>


                    {/* <div className="w-full h-[11px] flex items-center justify-center gap-10 mt-7 absolute bottom-10 bg-red-500/0 left-0">
                        <div className="w-full h-full bg-blue-500/90 rounded-full max-w-[150px]">

                        </div>
                        <div className={`w-full h-full ${currentPage===2 ? "bg-blue-500/90" :"bg-neutral-200"} ${currentPage===2 ? "bg-blue-500/90" :"dark:bg-neutral-800"} rounded-full  max-w-[150px]`}>

                        </div>
                    </div> */}
                </section>
        </main>

        <Toaster />
        </> 
    );
}

export default Signup;