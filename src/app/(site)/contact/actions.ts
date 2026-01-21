"use server";

import { z } from "zod";
import { collection, addDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from "@/firebase/config";

// A self-contained, server-safe Firebase initialization function.
// This avoids importing any 'use client' modules.
function getFirestoreInstance() {
  if (getApps().length) {
    return getFirestore(getApp());
  }
  // In a server-side context like a Server Action, it's safer to initialize
  // with the explicit config.
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
  submissionType: z.enum(["brand", "creator"]),
});

export async function submitContactForm(values: unknown) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }
  
  const data = parsed.data;

  try {
    // 1. Save to Firestore
    const firestore = getFirestoreInstance();
    const submissionsCollection = collection(firestore, "contact_form_submissions");
    await addDoc(submissionsCollection, {
      ...data,
      submissionDate: serverTimestamp(),
    });

    // 2. Send to Discord
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      const isBrand = data.submissionType === "brand";
      const embed = {
        title: `📩 New ${isBrand ? "Brand" : "Creator"} Submission`,
        description: data.subject,
        color: isBrand ? 3447003 : 5763719, // Discord's Blurple for Brand, Green for Creator
        fields: [
          { name: "From", value: `${data.name} (<${data.email}>)`, inline: true },
          { name: "Type", value: isBrand ? "Brand" : "Creator", inline: true },
          { name: "Message", value: "```" + data.message + "```" },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Inspira Contact Form",
        },
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] }),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
