import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CafeUser {
  photo: string;
  nickname: string;
}

export const User = ({
  nickname,
  profilePicture,
  chibi
}: {
  nickname: string;
  profilePicture: string;
  chibi: string;
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{
        left: 0,
        right: 1600,
        top: 0,
        bottom: 550
      }}
      dragElastic={0.7}
      className='p-6 w-fit h-fit'
    >
      <motion.div className='w-fit flex flex-col items-center justify-center'>
        <div className='w-fit bg-slate-300/[0.4] px-4 py-2 rounded-xl backdrop-blur-sm text-white text-center flex group'>
          <img
            className='rounded-[50%] select-none aspect-square w-12 pointer-events-none'
            src={profilePicture}
          />
          <div className='ml-2 my-auto hidden group-hover:block'>
            {nickname}
          </div>
        </div>
        <motion.img
          className='-translate-y-7 select-none pointer-events-none'
          src={chibi}
          width={300}
          height={300}
        />
      </motion.div>
    </motion.div>
  );
};
