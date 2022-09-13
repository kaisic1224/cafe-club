import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { user } from "./FriendsModal";
import { FaPaperPlane } from "react-icons/fa";
import { ChatBubble } from "./ChatBubble";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const socket = io("http://localhost:3001");

export interface message {
  sender: user;
  content: string;
  id: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<message[]>([]);
  const [send, setSend] = useState("");

  function sendMessage() {
    socket.emit("msg", {
      content: send,
      sender: "me",
      id: uuidv4()
    });
  }

  useEffect(() => {
    socket.on("receive_msg", (data: message) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  return (
    <>
      <div className='absolute top-0 right-0 h-fit bg-amber-900 max-w-md w-md'>
        <div className='flex flex-col overflow-y-auto max-w-md w-md'>
          <div className='flex p-4 w-fit max-w-md'>
            <div className='w-fit text-white rounded-2xl break-word'>
              <span className=''>
                Please be respectful in chat! Refrain from using profanity and
                enjoy :)
              </span>
            </div>
          </div>
          {messages.map((msg) => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
        </div>
      </div>
      <Link href='/'>
        <a className='bg-orange-400 px-4 py-2 text-white rounded fixed bottom-0'>
          Go back
        </a>
      </Link>
      <div className='relative'>
        <div className='min-w-2xl fixed bottom-0 right-[425px]'>
          <input
            value={send}
            className='min-h-[40px] rounded-md bg-rose-100 w-3/5 ml-6 p-2 outline-none font-bold'
            placeholder='Type here...'
            onChange={(e) => {
              setSend(e.target.value);
            }}
            type='text'
          />
          <label htmlFor=''></label>
          <button
            className='text-white px-4 py-2 rounded bg-orange-300 ml-2'
            onClick={() => {
              sendMessage();
              setSend("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
export default ChatWindow;
