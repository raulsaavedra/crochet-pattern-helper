"use server";

import { createClient } from "@/lib/supabase/server";

type ForgotPasswordData = {
  email: string;
};

export async function forgotPassword(data: ForgotPasswordData) {
  const { email } = data;

  if (!email) {
    return {
      status: "error",
      message: "Email is required",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(data.email);

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "Password reset instructions have been sent to your email",
  };
}
