import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { User } from "../components/User";
import FriendsModal from "../components/FriendsModal";
import { FaPlus, FaUserFriends } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authoptions } from "./api/auth/[...nextauth]";
import { User as UserModel } from "@prisma/client";
import PageTransition from "../components/PageTransition";

const chibis = [
  "/chibigirl-1.png",
  "/chibigirl-2.png",
  "/chibigirl-3.png",
  "/chibigirl-4.png",
  "/chibigirl-5.png",
  "/chibiboy-1.png",
  "/chibiboy-2.png",
  "/chibiboy-3.png",
  "/chibiboy-4.png",
  "/chibigirl-6.png"
];

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authoptions
  );

  if (!session || Date.parse(session.updatedAt as string) < Date.now()) {
    return {
      props: {
        friends: []
      }
    };
  }

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email! },
    include: {
      friends: true
    }
  });

  const formatedFriends = user?.friends.map((friend) => {
    return {
      ...friend,
      updatedAt: friend.updatedAt.toString(),
      createdAt: friend.createdAt.toString()
    };
  });

  return {
    props: {
      friends: formatedFriends
    }
  };
}

const Home: NextPage<{ friends: UserModel[] }> = ({
  friends
}: {
  friends: UserModel[];
}) => {
  const { data: session } = useSession();
  const [display, setDisplay] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [playing, setPlaying] = useState(false);

  const buttons = [
    {
      icon: <FaPlus />,
      tooltip: "Create a room",
      func: () => router.push("rooms/qwrt")
    },
    {
      icon: <FaUserFriends />,
      tooltip: "Friends List",
      func: () => setOpen(true)
    },
    { icon: <ImExit />, tooltip: "Exit" }
  ];

  return (
    <div className='h-screen overflow-x-hidden overflow-y-hidden'>
      <Head>
        <title>Cafe Club | Login</title>
      </Head>

      <FriendsModal open={open} setOpen={setOpen} friendsList={friends ?? []} />

      {/* <div className='fixed top-0 right-0'>
        <button
          onClick={() =>
            playing ? audioRef.current?.pause() : audioRef.current?.play()
          }
        >
          click me to stop da music
        </button>
        <audio autoPlay loop ref={audioRef}>
          <source src='lofi.mp3' />
        </audio>
      </div> */}

      <div className='relative -z-50'>
        <div className='absolute'>
          <img
            src='/cafe.jpg'
            className='w-screen aspect-video'
            alt='Cafe background image'
          />
        </div>
      </div>

      <div className='fixed bottom-2 flex items-center justify-center left-1/2 -translate-x-1/2 text-white gap-2'>
        {buttons.map((button) => {
          return (
            <div key={button.tooltip} className='relative'>
              <div
                onClick={button.func}
                className='bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer z-50 peer'
              >
                {button.icon}
              </div>
              <span
                className='absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1 whitespace-nowrap bg-black border-gray-800 border-2 rounded-lg scale-0 peer-hover:scale-100
               transition-transform delay-200 duration-200'
              >
                {button.tooltip}
              </span>
            </div>
          );
        })}
      </div>

      {session ? (
        <>
          <div className='text-6xl font-bold text-white'>
            Welcome back {session.user?.name}
          </div>
          <h2 className='text-white text-4xl'>
            Hover above your icon and drag your character around!
          </h2>
          <button
            className='bg-red-500 w-fit px-4 py-2 rounded-xl text-white'
            onClick={() => signOut()}
          >
            LogOut
          </button>
          <User
            nickname={session.user?.name!}
            profilePicture={session.user?.image!}
            chibi={chibis[Math.floor(Math.random() * 9)]}
          />
        </>
      ) : (
        <>
          {display && (
            <motion.div
              className='fixed inset-0 bg-black/[0.8]'
              onClick={() => setDisplay(!display)}
            >
              <div className='bg w-[800px] h-[450px] shadow-2xl rounded-md absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-4'>
                <motion.h1
                  initial={{ y: 100, opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1 }}
                  className='text-center hover-underline-animation'
                >
                  Welcome, to Cafe Club
                </motion.h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className='bg-purple-600 text-white py-2 px-4 rounded-2xl text-2xl font-semibold block mx-auto mt-14 hover:bg-purple-500'
                  onClick={() => signIn()}
                >
                  Sign Up
                </motion.button>
              </div>
            </motion.div>
          )}

          <button
            className='bg-red-500 w-fit px-4 py-2 rounded-xl text-white'
            onClick={() => setDisplay(!display)}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
