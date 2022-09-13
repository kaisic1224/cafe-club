import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User } from "../components/User";
import FriendsModal from "../components/FriendsModal";

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
  "/chibigirl-6.png",
];

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [modal, setModal] = useState(true);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(!display);
  }, [modal]);

  return (
    <div className="h-screen overflow-x-hidden overflow-y-hidden">
      <Head>
        <title>Cafe Club | Login</title>
      </Head>

      {session ? (
        <div className="">
          <div className="relative -z-50">
            <div className="absolute">
              <img src="/cafe.jpg" className="w-screen aspect-video" />
            </div>
          </div>
          <div className="text-6xl font-bold text-white">
            Welcome back {session.user?.name}
          </div>
          <h2 className="text-white text-4xl">
            Hover above your icon and drag your character around!
          </h2>
          <button
            className="bg-red-500 w-fit px-4 py-2 rounded-xl text-white"
            onClick={() => signOut()}
          >
            LogOut
          </button>
          <User
            nickname={session.user?.name!}
            profilePicture={session.user?.image!}
            chibi={chibis[Math.floor(Math.random() * 9)]}
          />
        </div>
      ) : (
        <>
          {display ? (
            <div
              className="fixed inset-0 bg-black/[0.8]"
              onClick={() => setModal(!modal)}
            >
              <div className="bg-slate-400 w-[800px] h-[450px] shadow-2xl rounded-md absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-4">
                <motion.h1
                  initial={{ y: "-100vh", opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center hover-underline-animation"
                >
                  Welcome, to Cafe Club
                </motion.h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-purple-600 text-white py-2 px-4 rounded-2xl text-2xl font-semibold block mx-auto mt-14 hover:bg-purple-500"
                  onClick={() => signIn()}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="relative -z-50">
            <div className="absolute">
              <img src="/cafe.jpg" className="w-screen aspect-video" />
            </div>
          </div>
          <div className="text-6xl font-bold text-white">Die shitty</div>
          <button
            className="bg-red-500 w-fit px-4 py-2 rounded-xl text-white"
            onClick={() => setModal(!modal)}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
