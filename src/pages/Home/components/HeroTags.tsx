import React from 'react';
import Hero from './Hero';
import OneHundredIcon from "../../../assets/HeroAssets/100Icon.svg";
import BookIcon from "../../../assets/HeroAssets/BookIcon.svg";
import CalendarIcon from "../../../assets/HeroAssets/CalendarIcon.svg";
import CommunicationIcon from "../../../assets/HeroAssets/CommunicationIcon.svg";
import MoreIcon from "../../../assets/HeroAssets/MoreIcon.svg";
import BrainIcon from "../../../assets/HeroAssets/BrainIcon.svg";

interface HeroTagsProps {
    imgAsNumber: string;
    content: string;
}

const SrcDictionary: { [key: string ]: string} = {
    "1": OneHundredIcon,
    "2": BookIcon,
    "3": CalendarIcon,
    "4": CommunicationIcon,
    "5": MoreIcon,
    "6": BrainIcon
}

const HeroTags: React.FC<HeroTagsProps> = ({imgAsNumber, content}) => {
    return (
        <>
        <div className="cursor-pointer flex items-center justify-center bg-white w-fit h-fit p-1 pl-2 pr-2 gap-2 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_0px_5px_0px_rgba(50,50,50,50.06)] dark:bg-neutral-800">
            <p className="text-neutral-600 text-[13px] font-medium dark:text-neutral-300 ">{content}</p>
            <img src={SrcDictionary[imgAsNumber]} className='w-[15px] h-[15px]'/>
        </div>
        </>
    );
}

export default HeroTags;