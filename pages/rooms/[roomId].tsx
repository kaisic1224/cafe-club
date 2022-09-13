import Head from "next/head";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ChatWindow from "../../components/ChatWindow";

const socket = io("http://localhost:3001");

const roomId = () => {
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
