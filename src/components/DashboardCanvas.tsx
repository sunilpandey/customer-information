import { Outlet } from "react-router-dom";
import { LeftPanel } from "./dashboard/LeftPanel";
import { AnimatePresence, motion } from "framer-motion";
const pageVariants = {
  initial: { opacity: 0, x: '-100%' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '100%' },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.5,
};

export function DashboardCanvas() {
  return (
    <div className="flex w-full h-screen">
      <LeftPanel />
      {/* <AnimatePresence>
        <motion.div
          className="flex-1"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={pageTransition}
        > */}
          <Outlet />
        {/* </motion.div>
      </AnimatePresence> */}
    </div>
  );
}
