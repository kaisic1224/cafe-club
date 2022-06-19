import React from "react";
import { message } from "./ChatWindow";

export const ChatBubble = ({ msg }: { msg: message }) => {
  return (
    <>
      <li>
        <div className='flex flex-col'>
          <div>{msg.sender}</div>
          <div className='bg-blue-200 rounded-2xl max-w-[500px] overflow-ellipses overflow-hidden whitespace-nowrap'>
            {msg.content}
          </div>
        </div>
      </li>
    </>
  );
};
