import React from 'react';
import { FaGithub } from 'react-icons/fa';
import venturaLogo from '../../../assets/ventura-logo.png';
import Person1 from '../../../assets/DevelopersAssets/Person1.png';
import Person2 from '../../../assets/DevelopersAssets/Person2.png';

const Introductions: React.FC = () => {
  return (
    <div className="py-8 mt-[150px] bg-white border-[1px] border-[#E9EBED] rounded-[30px] dark:bg-neutral-900 dark:border-neutral-700">
      <p className='text-black dark:text-white text-3xl text-center font-semibold'>Meet the <span className="text-blue-600 font-bold">ventura</span> developers!</p>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <div className="p-4 bg-white border-[1px] dark:bg-neutral-900 dark:border-neutral-700 shadow-lg rounded-lg dark:shadow-neutral-800 hover:shadow-md transition duration-300 ease-in-out">
            <img src={Person1} alt="Person 1 Avatar" className="h-32 w-32 bg-gray-300 mb-4 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Rohit (Ninjagor)</h3>
            <p>
              I am a high schooler, and coding enthusiast from the United States! I am excited to be a part of the DualHacks experience, and can't wait to build applications that bridge real world education problems! I am experienced with ReactJS, Typescript, ExpressJS, NodeJS, TailwindCSS, and Python. Besides programming, I enjoy playing cricket.
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/Ninjagor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FaGithub className="mr-2" /> Ninjagor on GitHub
              </a>
            </div>
          </div>
          <div className="p-4 bg-white border-[1px] dark:bg-neutral-900 dark:border-neutral-700 shadow-lg rounded-lg dark:shadow-neutral-800 hover:shadow-md transition duration-300 ease-in-out">
            <img src={Person2} alt="Person 2 Avatar" className="h-32 w-32 bg-gray-300 mb-4 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Krish G (kkgaba686)</h3>
            <p>
            I am a tech-savvy high school student from Melbourne, Australia, with a profound passion for all things technology. I am thrilled to be part of DualHacks' amazing hackathon. I bring hands-on experience in both Android app development using Kotlin and Java, as well as web development expertise, including React, HTML, CSS, and various JS libraries. Currently, I am exploring the world of backend development, with a focus on MongoDB for large-scale projects. Beyond software, I also enjoy tinkering with hardware, making me a well-rounded tech enthusiast.
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/kkgaba686"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FaGithub className="mr-2" /> kkgaba686 on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introductions;