"use server";

import { createClient } from "@/lib/supabase/server";
import { LoginData } from "./login";

type SignupResponse = {
  status: "success" | "error";
  message: string;
};

export async function signup({
  email,
  password,
}: LoginData): Promise<SignupResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "Account created successfully",
  };
}
