"use server";

import { createClient } from "@/lib/supabase/server";
import { ActionState } from "@/types/form";

export async function forgotPassword(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;

  if (!email) {
    return {
      status: "error",
      message: "Email is required",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

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
