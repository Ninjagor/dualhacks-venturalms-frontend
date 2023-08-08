import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSchool, faUniversity } from "@fortawesome/free-solid-svg-icons";

interface ProgramProps {
  title: string;
  catchPhrase: string;
  price: number;
  icon: any;
}

const Program: React.FC<ProgramProps> = ({ title, catchPhrase, price, icon }) => {
  return (
    <div
      className={`flex-1 bg-blue-200 dark:bg-blue-500 ${
        title === "Schools" ? "bg-green-200 dark:bg-green-700" : ""
      } ${title === "Universities" ? "bg-purple-200 dark:bg-purple-500" : ""} 
      transform transition-transform ease-in-out duration-300 hover:scale-110 hover:z-10 min-h-[200px]`}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={icon} size="4x" className="text-black dark:text-white" />
        <h2 className="text-black text-2xl font-bold mt-4 dark:text-white pr-1 pl-1">{title}</h2>
        <p className="text-black text-lg mt-2 dark:text-white text-center pr-3 pl-3">{catchPhrase}</p>
        <p className="text-black text-lg mt-2 dark:text-white">Starting from <b>${price}</b>/month</p>
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mt-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
};

const Columns: React.FC = () => {
  const schoolCatchPhrase = "Ignite academic achievement and fuel student success.";
  const universityCatchPhrase = "Unlock the potential of higher education.";
  const personalCatchPhrase = "Organize your studies."; 

  return (
    <div className="flex flex-col h-screen mt-[100px] md:flex-row md:mt-0">
      <Program
        title="Personal"
        catchPhrase={personalCatchPhrase} 
        price={0}
        icon={faUser}
      />

      <Program
        title="Schools"
        catchPhrase={schoolCatchPhrase}
        price={Math.floor(Math.random() * 500) + 100}
        icon={faSchool}
      />

      <Program
        title="Universities"
        catchPhrase={universityCatchPhrase}
        price={Math.floor(Math.random() * 2000) + 500}
        icon={faUniversity}
      />
    </div>
  );
};

export default Columns;