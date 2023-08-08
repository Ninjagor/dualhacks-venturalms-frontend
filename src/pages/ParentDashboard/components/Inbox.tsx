import React, { useState, useEffect } from "react";
import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";
import { BASE_URL } from "../../../api_url";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faLink } from "@fortawesome/free-solid-svg-icons";

import toast, { Toaster } from "react-hot-toast"

interface MessageProps {
    messageData: any;
}

const Message: React.FC<MessageProps> = ({messageData}) => {
    return (
        <>
        <div className="p-5 border-[1px] rounded-[5px] max-w-[800px] flex flex-col items-center gap-5 dark:bg-neutral-900 dark:border-neutral-700">
            <p className="text-center text-[18px] tracking-tight opacity-95">{messageData.message}</p>
            <p className="opacity-40 font-medium">From: {messageData.sender}</p>
        </div>
        </>
    )
}

const Inbox = () => {

    const [inbox, setInbox] = useState<any[]>([]);

    const test = {
        message: "Hello, Parent test 1! Your child, Beta Tester has scored 100 out of 100 in the assignment Test Assignment. This leaves your child's average grade in the class Test class 3 at 100%. If we notice a difference in your child's grade trends, VenturaAI will notify you!",
        sender: "Ventura Assistant"
    }

    const fetchInbox = async() => {
        try {
            const response = await fetch(`${BASE_URL}/get/parentinbox/0`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                }
              });
        
              if(response.ok) {
                const data = await response.json();
                console.log('Fetch Inbox successful:', data);
                setInbox((prev) => data.data)
              } else {
                const data = await response.json();
                console.log("ERROR fetching Inbox", response.status, response.statusText, data)
              }
        } catch(error) {
            console.error("Error fetching", error)
        }
    }

    useOnMountUnsafe(() => {
        fetchInbox();
    })
    return (
        <>
        <div className="flex flex-col gap-5 items-center">
            <h1 className="text-[28px] tracking-tight font-semibold mt-2">Inbox</h1>
            

            {inbox.length===0 ? (
                "No messages"
            ) : (
                inbox.map((item, index) => (
                    <>
                    <div key={index}>
                        <Message messageData={item}/>
                    </div>
                    </>
                ))
            )}
        </div>
        </>
    )
}

export default Inbox;