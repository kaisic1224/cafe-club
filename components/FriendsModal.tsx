import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface friend {
  friendId: string;
  status: boolean;
  username: string;
}

const FriendsModal = ({ friendsList }: { friendsList: friend[] }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [open]);

  return (
    <div
      ref={bgRef}
      className={`fixed inset-0 transition-colors duration-300 ${
        open ? `bg-black/40` : "bg-transparent pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === bgRef.current) {
          setOpen(false);
        }
      }}
    >
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className='after:absolute after:top-1/2 after:left-2 after:-translate-y-1/2 after:w-32 after:aspect-square after:backdrop-blur-sm
          after:bg-gradient-to-t after:from-amber-800 after:to-amber-300 after:rounded-full after:via-amber-500 after:-rotate-45'
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='after:absolute after:top-1/2 after:left-2 after:translate-x-1/2 after:w-52 after:aspect-square after:backdrop-blur-sm
        after:bg-gradient-to-t after:from-amber-500 after:to-amber-50 after:rounded-full after:via-amber-200 after:-rotate-45'
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white/10 backdrop-blur-sm min-h-screen px-8 relative max-w-fit isolate
        text-white shadow-lg border-[1px] border-white border-l-0'
          >
            <h2 className='font-bold text-3xl uppercase text-center py-2'>
              Friends List
            </h2>
            <ul className='flex flex-col gap-2 py-4'>
              {friendsList.map((friend) => (
                <li key={friend.friendId} className='flex items-center'>
                  <span className='flex items-center font-semibold text-lg gap-2'>
                    {friend.status ? (
                      <div className='rounded-full aspect-square w-3 bg-green-400' />
                    ) : (
                      <div className='rounded-full aspect-square w-3 bg-slate-600' />
                    )}
                    {friend.username}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default FriendsModal;
