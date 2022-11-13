import { useEffect, useState, useRef, FormEvent } from "react";
import { io } from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";
import { ChatBubble } from "./ChatBubble";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export interface message {
  sender: string;
  senderId: string;
  content: string;
  id: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<message[]>([]);
  const [send, setSend] = useState("");
  const { data: session } = useSession();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const socket = io("http://localhost:3001");

  function sendMessage(e: KeyboardEvent | MouseEvent) {
    if (
      (e as KeyboardEvent).key != "Enter" &&
      (e.target as HTMLElement)?.dataset.btn != "msg"
    )
      return;
    socket.emit("msg", {
      content: send,
      senderId: session?.userId,
      sender: session?.user?.name,
      id: uuidv4()
    });
    setSend("");
    inputRef.current!.style.height = "auto";
  }

  useEffect(() => {
    socket.on("receive_msg", (data: message) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ delay: 5 * 0.15 + 1, ease: "easeOut", duration: 0.6 }}
        className='absolute top-0 right-0 h-screen bg-amber-900 flex flex-col max-w-md w-full gap-4'
      >
        <div className='flex flex-col overflow-y-auto text-white p-4 flex-1 msgs-scroll'>
          {messages.map((msg) => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
        </div>

        <div className='mb-2 flex w-full px-4 gap-2'>
          <textarea
            ref={inputRef}
            value={send}
            minLength={1}
            maxLength={250}
            className='rounded-md bg-rose-100 w-full p-2 outline-none font-bold resize-none'
            placeholder='Type here...'
            onChange={(e) => {
              setSend(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={(e) => sendMessage(e as unknown as KeyboardEvent)}
          />
          <button
            data-btn='msg'
            onClick={(e) => sendMessage(e as unknown as MouseEvent)}
            className='rounded-md bg-orange-400 p-3 text-white font-bold uppercase'
          >
            Send
          </button>
        </div>
      </motion.div>
    </>
  );
};
export default ChatWindow;
