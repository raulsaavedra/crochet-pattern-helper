"use client";

import { FormField, Input } from "@/components/Form";
import Button from "@/components/Button";

import { useForm } from "react-hook-form";
import { login, signup } from "../actions/auth";
import { LoginData } from "../actions/auth/login";
import { useState } from "react";

const initialState = {
  status: "idle",
  message: "",
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const [state, setState] = useState(initialState);

  const handleLogin = async (data: LoginData) => {
    const { email, password } = data;

    const response = await login({ email, password });

    if (response.status === "success") {
      setState({ status: "success", message: response.message });
    } else {
      setState({ status: "error", message: response.message });
    }
  };

  const handleSignup = async (data: LoginData) => {
    const { email, password } = data;
    const response = await signup({ email, password });
    console.log(response);

    if (response.status === "success") {
      setState({ status: "success", message: response.message });
    } else {
      setState({ status: "error", message: response.message });
    }
  };

  const getCurrentStatus = () => {
    if (state.status !== "idle") {
      return state.status;
    }
    return "idle";
  };

  const getCurrentMessage = () => {
    if (state.message) {
      return state.message;
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col gap-4">
        <FormField>
          <label htmlFor="email">Email:</label>
          <Input
            id="email"
            type="text"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </FormField>
        <FormField>
          <label htmlFor="password">Password:</label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </FormField>
      </div>
      {getCurrentStatus() === "success" && (
        <p className="text-green-500 text-sm">{getCurrentMessage()}</p>
      )}
      {getCurrentStatus() === "error" && (
        <p className="text-red-500 text-sm">{getCurrentMessage()}</p>
      )}
      <div className="flex flex-col gap-4">
        <Button variant="filled" type="submit">
          Log in
        </Button>
        <Button variant="ghost" onClick={handleSubmit(handleSignup)}>
          Sign up
        </Button>
      </div>
    </form>
  );
}
