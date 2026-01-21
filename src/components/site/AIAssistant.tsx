"use client";

import { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Sparkles } from "lucide-react";
import ChatWidget from "./ChatWidget";
import { cn } from "@/lib/utils";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // When closing, always reset maximization state
    if (isOpen) {
      setIsMaximized(false);
    }
  };
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  // When maximized, render separately to break out of the draggable container
  if (isOpen && isMaximized) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-2 z-50 sm:inset-4"
        >
          <ChatWidget
            isMaximized={isMaximized}
            onClose={toggleOpen}
            onToggleMaximize={toggleMaximize}
            dragControls={dragControls} // Pass for consistency, though it won't be used for dragging here
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={{ top: 16, left: 16, right: 16, bottom: 16 }}
    >
      {/* Draggable button area */}
      <motion.div
        onPointerDown={(e) => {
          // Only allow dragging the button when chat is closed
          if (!isOpen) {
            dragControls.start(e);
          }
        }}
        className={cn(
          "cursor-grab active:cursor-grabbing",
          isOpen && "pointer-events-none"
        )}
      >
        <motion.button
          onClick={toggleOpen}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-2xl"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open AI Assistant"
          animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/50 blur-lg"></div>
          <Sparkles className="relative h-8 w-8" />
        </motion.button>
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-full right-0 mb-4" // Position above the button
          >
            <ChatWidget
              isMaximized={isMaximized}
              onClose={toggleOpen}
              onToggleMaximize={toggleMaximize}
              dragControls={dragControls} // This will be used by the header
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
