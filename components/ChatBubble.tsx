import React from "react";
import { message } from "./ChatWindow";

export const ChatBubble = ({ msg }: { msg: message }) => {
  return (
    <>
      <div className="flex p-4 w-fit max-w-md">
        <div className="flex ml-2">
          <h1 className="pr-4 text-slate-500">{msg.sender}</h1>
        </div>
        <div className="w-fit text-white rounded-2xl break-all">
          <span className="">{msg.content}</span>
        </div>
      </div>
    </>
  );
};
