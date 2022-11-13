import { AnimatePresence, motion } from "framer-motion";

const bars = {
  hidden: {
    scaleY: 0
  },
  show: {
    scaleY: 1,
    transition: {
      scaleY: {}
    }
  }
};
const PageTransition = () => {
  return (
    <motion.div
      className='grid grid-cols-5 h-screen'
      initial='hidden'
      animate='show'
    >
      <motion.div className='page-bars' variants={bars} />
      <motion.div className='page-bars' variants={bars} />
      <motion.div className='page-bars' variants={bars} />
      <motion.div className='page-bars' variants={bars} />
      <motion.div className='page-bars' variants={bars} />
    </motion.div>
  );
};
export default PageTransition;
