import { useEffect, useState } from "react";
import { message } from "../pages/rooms/[roomId]";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

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
  return <div>ChatWindow</div>;
};
export default ChatWindow;
