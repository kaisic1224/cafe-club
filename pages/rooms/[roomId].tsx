import Head from "next/head";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import Link from "next/link";
import { motion } from "framer-motion";
import useMenu from "../../lib/hooks/useMenu";

const socket = io("http://localhost:3001");

const variants = {
  show: {
    transition: {
      // staggerChildren: 0.1
    }
  }
};

const balls = {
  hidden: { scale: 0 },
  show: (i: number) => {
    const delay = i * 0.15;
    return {
      scale: delay,
      transition: {
        scale: { delay, ease: "easeInOut", duration: 0.6 }
      }
    };
  }
};

const roomId = () => {
  const user = useMenu();
  console.log(user);
  return (
    <>
      <Head>
        <title>Cafe Club | Private Room</title>
      </Head>

      <main className='relative max-h-screen h-screen w-screen overflow-hidden'>
        <ChatWindow />
        <motion.div
          variants={variants}
          className='fixed inset-0 -z-50'
          initial='hidden'
          animate='show'
        >
          <motion.div
            variants={balls}
            custom={1.5}
            className='ball bg-orange-500'
          />
          <motion.div
            variants={balls}
            custom={2}
            className='ball bg-orange-400'
          />
          <motion.div
            variants={balls}
            custom={3}
            className='ball bg-orange-300'
          />
          <motion.div
            variants={balls}
            custom={4}
            className='ball bg-orange-200'
          />
          <motion.div
            variants={balls}
            custom={5}
            className='ball bg-orange-100'
          />
          <motion.div variants={balls} custom={6} className='ball bg-white' />
        </motion.div>
        <div className='relative -z-40'>
          <div className='absolute'>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 * 0.15 + 1, duration: 0.6 }}
              src='/cafe.jpg'
              className='w-screen aspect-video'
              alt='Cafe background image'
            />
          </div>
        </div>
        <Link href='/'>
          <a className='bg-orange-400 px-4 py-2 text-white rounded fixed bottom-0'>
            Go back
          </a>
        </Link>
      </main>
    </>
  );
};
export default roomId;
