export type ActionState = {
  status: "idle" | "error" | "success";
  message: string | null;
};
