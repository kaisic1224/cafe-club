import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { user } from "./FriendsModal";
import { FaPaperPlane } from "react-icons/fa";

const socket = io("http://localhost:3001");

export interface message {
  sender: user;
  content: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<message[]>([]);
  const [send, setSend] = useState("");

  function sendMessage() {
    socket.emit("msg", {
      content: send,
      sender: "me"
    });
  }

  useEffect(() => {
    socket.on("receive_msg", (data: message) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  return (
    <div className='absolute top-0 right-0 min-h-screen bg-amber-900'>
      <ul className='flex flex-col overflow-y-scroll'>
        {messages.map((msg) => (
          <li>{msg.content}</li>
        ))}
      </ul>
      <div>
        <input type='text' />
        <label htmlFor=''></label>
      </div>
    </div>
  );
};
export default ChatWindow;
