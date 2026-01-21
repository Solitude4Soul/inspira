"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const AdminAccess = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const secretCode = "INSPIRA";

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const newInput = input + key;

      if (secretCode.startsWith(newInput)) {
        setInput(newInput);
        if (newInput === secretCode) {
          router.push("/login");
          setInput("");
        }
      } else {
        // Reset if the sequence is wrong
        setInput(secretCode.startsWith(key) ? key : "");
      }
    },
    [input, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return null; // This component does not render anything
};

export default AdminAccess;
