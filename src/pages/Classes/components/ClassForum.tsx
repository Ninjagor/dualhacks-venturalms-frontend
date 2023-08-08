import React, { useState, useEffect } from "react";
import { useOnMountUnsafe } from "../../../functions/useOnMountUnsafe";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../../api_url";
import { off } from "process";


import toast, {Toaster} from "react-hot-toast";

interface ClassForumProps {
    isStudent: boolean | null
}


interface ForumPostProps {
    post: any;
    replies: any[];
    opId: string;
}

// Post Component
const ForumPost: React.FC<ForumPostProps> = ({ post, replies, opId }) => {

    const [replyInput, setReplyInput] = useState("");

    const { classId } = useParams();

    const handleReplyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplyInput(event.target.value);
    };

    const createNewReply = async() => {
        try {
            const response = await fetch(`${BASE_URL}/create/reply`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                },
                body: JSON.stringify({
                  postId: post.id,
                  content: replyInput,
                  classCode: classId
                })
              });
        
              if(response.ok) {
                const data = await response.json();
                console.log('Creation successful:', data);
                window.location.reload();
              } else {
                const data = await response.json();
                console.log("ERROR creating", response.status, response.statusText, data)
                window.location.reload();
              }
        } catch(error) {
            console.error("Error creating reply", error)
        }
        setReplyInput(""); 
    }

    const handleReplyCreate = () => {
        if (replyInput.trim()) {
            createNewReply();
        } else {
            notify("Reply cannot be blank", true)
        }
        

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

    return (
        <>
            <div className="w-full h-fit dark:bg-neutral-900 dark:border-neutral-700 border-[1px] rounded-[7px]">
                <div className="p-5">
                    <div className="text-[17px] tracking-tight flex items-center gap-2 font-medium">testing1@gmail.com <span className="text-blue-600 font-semibold dark:text-blue-400">{post.creatorId===post.class.classAdministratorId && "Admin"}</span></div>
                    <p className="mt-5 text-[16px] tracking-normal font-regular">{post.content}</p>
                    {replies.length < 5 ? <><div className="flex mt-5 gap-3">
                        <input type="text" placeholder="Enter Reply Text" className="w-full border-[1px] p-2 pl-3 rounded-[5px] focus:outline-none border-[#dbdcde] dark:bg-neutral-800 dark:border-neutral-700" maxLength={200} 
                        
                        value={replyInput}
                        onChange={handleReplyInputChange}/>
                        <button className="p-3 w-[60px] flex items-center justify-center h-[50px] rounded-[5px] bg-neutral-950 dark:bg-white dark:text-neutral-950"
                        onClick={handleReplyCreate}>
                            
                        <FontAwesomeIcon icon={faPaperPlane} className="text-white dark:text-neutral-950"
                        
                        /></button>
                        
                    </div></> : <><p className="mt-7 text-[15px] opacity-60">Post reached max reply limit. This is to save storage, as VenturaLMS is still in Beta.</p></>}
                    
                </div>

                {/* Replies */}

                <div className=" w-full  rounded-b-[7px] mt-5 border-t-[1px] dark:border-neutral-700">
                    <h1 className="text-[19px] font-medium p-5 mb-5">Replies ({replies.length})</h1>
                    
                    {replies.length===0 ?

                    <p className="p-5 mt-[-2.5rem]">No Replies</p>
                    : (
                        replies.map((reply) => (
                            <>
                                <ForumReply reply={reply} opId={opId} post={post}/>
                            </>
                        ))
                    )
                    }
                    {/* {replies.map((reply, index) => (
                        <ForumReply content={reply./>
                    ))} */}
                </div>
                
            </div>
        </>
    )
}

interface ForumReplyInterface {
    reply: any
    opId: string;
    post: any;
}

const ForumReply: React.FC<ForumReplyInterface> = ({ reply, opId, post }) => {
    return (
        <>
        <div className="p-5 ml-5 pt-5 pr-7 mt-[-1.25rem] border-l-[1px] mb-5 dark:border-neutral-700">
            <div className="text-[17px] tracking-tight flex items-center gap-2 font-medium">testing2@gmail.com </div>
            <p className="mt-5 text-[16px] tracking-normal font-regular">{reply.content}</p>
        </div>
        </>
    )
}


interface PostDetailsInterface {
    post: any;
    replies: any;
}

const ClassForum: React.FC<ClassForumProps> = ({ isStudent }) => {
    const [postDetails, setPostDetails] = useState<PostDetailsInterface[]>([])
    const [offset, setOffset] = useState(0)
    const [moreToBeLoaded, setMoreToBeLoaded] = useState(true)
    const { classId } = useParams();
    const [newPostModalOpen, setNewPostModalOpen] = useState(false);
    const [newPostInputValue, setnewPostInputValue] = useState("");


    const handleNewPostInputValue = (e: any) => {
        setnewPostInputValue((prev) => e.target.value)
    }

    const createNewPost = async() => {
        try {
            const response = await fetch(`${BASE_URL}/create/post`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                },
                body: JSON.stringify({
                  content: newPostInputValue,
                  classCode: classId
                })
              });
        
              if(response.ok) {
                const data = await response.json();
                console.log('Creation successful:', data);
                window.location.reload();
              } else {
                const data = await response.json();
                console.log("ERROR creating", response.status, response.statusText, data)
                // window.location.reload();
              }
        } catch(error) {
            console.error("Error creating post", error)
        }
    }

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

    const handleNewPostBtn = () => {
        if (newPostInputValue.trim()) {
            //
            createNewPost()
        } else {
            notify("Post content is required", true)
        }
    }




    const fetchPosts = async() => {
        try {
            const response = await fetch(`${BASE_URL}/getposts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user_data") as any).jwt}`,
                },
                body: JSON.stringify({
                    classCode: classId,
                    offset: offset
                })
            });

            if(response.ok) {
                const data = await response.json();
                console.log('Fetch successful:', data);
                if(data.postDetails.length < 5) {
                    setMoreToBeLoaded((prev) => false)
                }
                setPostDetails(() => data.postDetails)
              } else {
                const data = await response.json();
                console.log("ERROR fetching", response.status, response.statusText, data)
              }
        } catch(error) {
            console.error("Error fetching posts", error)
        }
    }

    

    useOnMountUnsafe(() => {
        fetchPosts();
    })


    return (
        <>


        <button className="fixed bottom-10 left-10 p-5 bg-neutral-950 w-[60px] h-[60px] rounded-full flex items-center justify-center dark:bg-white"  onClick={() => setNewPostModalOpen(prev => true)}><FontAwesomeIcon icon={faPlus} className="text-white text-[20px] dark:text-neutral-950"/></button>

<div className={`fixed left-0 top-0 w-full h-screen min-h-[600px]  bg-neutral-950/70 z-50 backdrop-blur-[5px]  flex items-center justify-center transition-all duration-150 ease-out
      
      ${newPostModalOpen ? "opacity-100" : "opacity-0"}
      ${newPostModalOpen ? "pointer-events-all" : "pointer-events-none"}
      
      `}>
        <section className="w-full h-full bg-white max-w-[450px] max-h-[310px] rounded-[10px] dark:bg-neutral-900 dark:border-[1px] border-transparent dark:border-neutral-700 p-5 flex flex-col relative overflow-hidden">
            <h1 className="text-[23px] mt-1 tracking-tight font-bold text-neutral-800 dark:text-neutral-50">New Post</h1>
            <div className="mt-1">
              {/* <p className="text-[16px] font-regular opacity-80">Enter class code</p> */}

              <div className="flex items-center justify-between gap-2 flex-col">
              {/* <input type="text" className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-3 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] focus:outline-none font-medium" placeholder='Enter class code' onChange={handleNewPostInputValue} value={newPostInputValue} /> */}
              <textarea  className="bg-white dark:bg-neutral-800 border-[1px] dark:border-neutral-700 w-full mt-3 rounded-[5px] p-2 border-[#a8aaac] focus:border-[#a8aaac] h-full min-h-[120px] max-h-[120px] focus:outline-none font-medium" placeholder='Enter post content' maxLength={250} onChange={handleNewPostInputValue} value={newPostInputValue} ></textarea>
              <p className="self-start text-[12px]">{newPostInputValue.length}/250</p>

              {/* <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] text-[14px] font-medium min-w-[75px] min-h-[42px] mb-[2px] dark:bg-white dark:border-[1px] mt-4 dark:border-white dark:text-neutral-950 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-400  transition-all duration-150 ease-out hover:bg-blue-500"
              >Join</button> */}
              </div>
              
            </div>
            <div className="w-full h-[70px] bg-white dark:bg-neutral-900 absolute bottom-0 left-0 border-t-[1px] flex items-center dark:border-t-neutral-700">
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-5 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out"   onClick={() => setNewPostModalOpen(newPostModalOpen ? false : true)}>Close</button>
                <button className="bg-neutral-950 text-white p-1 pl-3 pr-3 rounded-[5px] ml-2 text-[14px] font-medium min-w-[75px] min-h-[35px] dark:bg-neutral-800 dark:border-[1px] dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white transition-all duration-150 ease-out" onClick={handleNewPostBtn}>Create</button>
            </div>
        </section>
      </div>

            <section className="w-full p-3 flex flex-col gap-5 items-center">
                <h1 className="text-[24px] tracking-tight font-semibold">Ventura Communication Center</h1>
                {postDetails.length===0 ?

                    <p>No active Ventura Communications</p>

                    :

                    <>
                    <div className="w-full p-3 max-w-[900px] mt-5 flex flex-col gap-10 items-center">
                    {postDetails.map((postDetail, index) => (
                        <ForumPost key={index} post={postDetail.post} replies={postDetail.replies} opId={postDetail.post.creatorId} />
                    ))}
                    
                </div>
                    </>
                }
                
            </section>

            <Toaster />
        </>
    )
}

export default ClassForum;