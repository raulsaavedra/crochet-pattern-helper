"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: "success" | "error";
  message: string;
};

export async function login({
  email,
  password,
}: LoginData): Promise<LoginResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  redirect("/");
}
