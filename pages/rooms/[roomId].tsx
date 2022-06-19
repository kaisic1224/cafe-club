import Head from "next/head";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ChatWindow from "../../components/ChatWindow";

const socket = io("http://localhost:3001");

export interface message {
  sender: string;
  content: string;
}

const roomId = () => {
  const [link, setLink] = useState("");
  const [playing, setPlaying] = useState("");
  console.log(playing);

  const queueVideo = () => {
    socket.emit("vid", {
      url: link
    });
  };

  useEffect(() => {
    socket.on("receive_vid", (data) => {
      setPlaying(data.url);
    });
  }, [playing]);

  return (
    <>
      <Head>
        <title>Cafe Club | Private Room</title>
      </Head>

      <main>
        <ChatWindow />
      </main>
    </>
  );
};
export default roomId;
