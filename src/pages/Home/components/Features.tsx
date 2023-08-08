import React from 'react';


import BookIcon from "../../../assets/HeroAssets/BookIcon.svg"

import Documentation from "../../../assets/HeroAssets/Documentation.png";

import HeroTags from './HeroTags';
import BrainIcon from "../../../assets/HeroAssets/BrainIcon.svg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import LightModeFeaturesPicture from "../../../assets/HeroAssets/LightModeFeaturesPicture.svg";

import DarkModeFeaturesPicture from "../../../assets/HeroAssets/DarkModeFeaturesPicture.svg";

import { Link } from 'react-router-dom';

const Features = () => {
    return (
        <>
        <section className="w-full h-fit bg-red-500/0 flex items-center justify-center mt-20 mb-5">
            <div className="max-w-[1445px] bg-blue-500/0 w-full h-full relative p-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[34px] font-semibold text-neutral-800 tracking-tight dark:text-neutral-100">An <span className="text-blue-600">easy and intuitive</span> solution.</h1>
                    <p className="text-[18px] font-medium text-neutral-600 tracking-tight dark:text-neutral-400">Easy integration, and advanced AI tools to monitor student growth.</p>
                </div>
                <div className="w-full h-[700px] bg-blue-600/0 mt-14 flex items-end justify-between gap-2 relative max-[980px]:flex-col">
                    <div className="w-full h-full bg-white border-[1px] border-[#E9EBED] rounded-[13px] p-3 dark:bg-neutral-900 dark:border-neutral-800 flex flex-col items-center justify-around gap-5">
                        <div className="ml-5 mt-5 flex flex-col gap-4">
                            <div className="cursor-pointer flex items-center justify-center bg-[#E3EBFD] dark:bg-[#192133] w-fit h-fit p-1 pl-5 pr-5 gap-2   border-[1px] border-blue-600 rounded-[3px]">
                            <p className=" text-blue-600 text-[13px] font-medium ">Analytical AI</p>
                            <img src={BrainIcon} className='w-[15px] h-[15px]'/>
                            </div>
                            <h1 className='text-[27px] font-semibold max-w-[50%] tracking-tight text-neutral-600 leading-tight dark:text-neutral-200 max-[980px]:max-w-[100%]'>Monitor student progress, and get notified if they stuggle.</h1>
                            <Link to="/signup" className="group relative bg-red-500/0 w-fit pr-9">

                                <p className="text-[18px] font-semibold tracking-tight text-blue-600">Get Started</p>

                                <FontAwesomeIcon className="text-[13px] absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all 
                                duration-200 
                                ease-out top-[50%] translate-y-[-50%] text-blue-600" icon={faChevronRight} />

                                <FontAwesomeIcon className="text-[13px] absolute right-4 opacity-100 group-hover:opacity-0 group-hover:right-2 transition-all 
                                duration-200 
                                ease-out top-[50%]  translate-y-[-50%]  text-blue-600" icon={faArrowRight} />
                                </Link>
                        </div>


                        <img src={LightModeFeaturesPicture} className="w-full block dark:hidden" />
                        <img src={DarkModeFeaturesPicture} className="w-full hidden dark:block" />
                    </div>
                    {/* <div className="w-full h-full bg-red-500">
                    </div> */}
                    <div className="w-full h-full bg-white border-[1px] border-[#E9EBED] rounded-[13px] p-3 dark:bg-neutral-900 dark:border-neutral-800 flex flex-col items-center justify-around gap-5">
                        <div className="ml-5 mt-5 flex flex-col gap-4">
                            <div className="cursor-pointer flex items-center justify-center bg-[#E0F2E7] dark:bg-green-900 w-fit h-fit p-1 pl-5 pr-5 gap-2   border-[1px] border-[#17A636] rounded-[3px]">
                                <p className=" text-[#17A636] green-400 text-[13px] font-medium">Documentation</p>
                                <img src={BookIcon} className='w-[15px] h-[15px]' alt="Book Icon"/>
                            </div>
                            <h1 className='text-[27px] font-semibold max-w-[50%] tracking-tight text-neutral-600 leading-tight dark:text-neutral-200 max-[980px]:max-w-[100%]'>Utilize our in-depth documentation to begin your<span className='text-blue-600'> ventura</span> journey.</h1>
                            <Link to="/about" className="group relative bg-red-500/0 w-fit pr-9">
                            <p className="text-[18px] font-semibold tracking-tight text-[#17A636]">Take me there</p>
                                    <FontAwesomeIcon className="text-[13px] absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-200 ease-out top-[50%] translate-y-[-50%] text-[#17A636]" icon={faChevronRight} />
                                    <FontAwesomeIcon className="text-[13px] absolute right-4 opacity-100 group-hover:opacity-0 group-hover:right-2 transition-all duration-200 ease-out top-[50%]  translate-y-[-50%]  text-[#17A636]" icon={faArrowRight} />
                            </Link>
                        </div>
                        {/* Right Box Images */}
                        <img src={Documentation} className="w-full block" alt="Documentation"/>
                </div>
            </div>
            </div>
        </section>
        </>
    )
}

export default Features;