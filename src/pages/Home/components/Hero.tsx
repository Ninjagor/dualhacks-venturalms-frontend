import React from 'react';

import HeroTags from './HeroTags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import DashboardImg from "../../../assets/HeroAssets/DashboardImg.svg";
import DashboardImgDark from "../../../assets/HeroAssets/DashboardImgDark.svg";

const Hero = () => {
  return (
   <>
   <main className="z-20 w-full h-[730px] flex items-center justify-center">
    <section className="w-full max-w-[1445px] h-full bg-white border-[1px] border-[#E9EBED] rounded-b-[30px] dark:bg-neutral-900 dark:border-neutral-700 flex justify-center items-end relative">
        <div className="w-full h-[calc(730px-215px)] mt-[110px] flex justify-between max-w-[1234px] p-3 bg-red-500/0 max-[670px]:mt-[0px] max-[670px]:mb-[5%]">
            <div className="flex flex-col gap-6 max-w-[50%] max-[1000px]:w-[2000px] max-[1000px]:max-w-[70%] max-[670px]:items-center max-[670px]:max-w-[100%]">
              <h1 className="text-[42px] tracking-[-2px] font-semibold max-w-[100%] leading-tight dark:text-neutral-100 max-[670px]:max-w-[100%] max-[670px]:text-center max-[670px]:text-[35px]">Progress your learning with a powerful LMS.</h1>
              <p className="text-[18px] max-w-[100%] font-medium text-neutral-500 dark:text-neutral-400 max-[1000px]:max-w-[80%] max-[670px]:max-w-[90%] max-[670px]:text-center max-[670px]:text-[15px]">Trusted by educators and students alike, fuel student success with our all-in-one powerful LMS. All your needs in one place:</p>
              <div className='flex flex-col gap-2 mt-3 mb-3 max-[670px]:items-center'>
                <div className="flex gap-2">
                  <HeroTags imgAsNumber="2" content="Quizzes" />
                  <HeroTags imgAsNumber="4" content="Communication" />
                  <HeroTags imgAsNumber="1" content="Grades" />
                </div>
                <div className="flex gap-2">
                  <HeroTags imgAsNumber="6" content="Analytical AI" />
                  <HeroTags imgAsNumber="5" content="And More" />
                </div>
              </div>

              <button onClick={() => {
                window.location.replace("/signup");
            }}  className="p-[0.5rem] pl-5 pr-6 w-fit bg-[#2563EB] text-neutral-50 rounded-full text-sm flex items-center gap-2 group relative hover:bg-[#2563EB] transition-all 
                duration-200 
                ease-out   dark:hover:bg-[#2563EB] dark:hover:text-neutral-50 shadow-[0px_0px_8px_0px_rgba(37,99,235,0.36)] hover:shadow-[0px_0px_10px_0px_rgba(37,99,235,0.65)]">
                <p className="text-[13px] tracking-[-0.3px] font-medium mr-3">Sign Up</p> 

                <FontAwesomeIcon className="text-[13px] absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all 
                duration-200 
                ease-out" icon={faArrowRight} />

                <FontAwesomeIcon className="text-[13px] absolute right-4 opacity-100 group-hover:opacity-0 group-hover:right-2 transition-all 
                duration-200 
                ease-out" icon={faChevronRight} /></button>


            </div>
            <div className='flex justify-center w-full max-w-[50%] max-[670px]:hidden'>
              <div className='absolute right-0 bottom-0 w-[47%] h-full bg-red-500/0 flex items-end justify-end overflow-hidden max-[1000px]:w-[30%]'>
                <img src={DashboardImgDark} className="w-full min-w-[640px] absolute left-0 hidden dark:block" />
                <img src={DashboardImg} className="w-full min-w-[640px] absolute left-0 block dark:hidden" />
              </div>
              {/* <img src={DashboardImg} className="absolute right-0 bottom-0 w-[45%] h-full bg-red-500 flex items-end" /> */}
            </div>
        </div>
    </section>
   </main>
   </>
  );
}

export default Hero;
