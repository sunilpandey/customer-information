import { Outlet } from "react-router-dom";
import { LeftPanel } from "./dashboard/LeftPanel";
import { AnimatePresence, motion } from "framer-motion";
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween" as const,
  ease: ["easeInOut"],
  duration: 0.5,
};

export function DashboardCanvas() {
  return (
    <div className="flex w-full h-screen">
      <LeftPanel />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="flex-1"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
