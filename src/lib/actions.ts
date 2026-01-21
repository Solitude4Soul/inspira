"use server";

import { redirect } from "next/navigation";
import { ADMIN_CREDENTIALS } from "./constants";
import { createSession, deleteSession } from "./session";

export async function login(
  prevState: { error: string | null } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    await createSession(username);
    redirect("/portal");
  } else {
    return { error: "Invalid username or password." };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
