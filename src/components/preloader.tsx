"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const text = "Inspira";

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
}

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the preloader after an animation cycle
    const timer = setTimeout(() => setLoading(false), 2500); 
    return () => clearTimeout(timer);
  }, []);

  // AnimatePresence is used to gracefully animate the component's exit
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
          data-testid="preloader"
        >
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             <motion.h1 
                className="font-headline text-5xl font-bold tracking-tight text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
             >
                {text.split("").map((char, i) => (
                    <motion.span 
                        key={i} 
                        variants={textVariants} 
                        custom={i}
                        className="text-gradient bg-gradient-to-r from-primary to-secondary"
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.h1>
          </motion.div>
          <motion.div 
            className="absolute bottom-1/4 h-1 w-48 overflow-hidden rounded-full bg-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
