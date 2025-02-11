/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { login, createAccount } from "../store/slices/authenticate";

type AuthFormProps = {
  type: "login" | "createAccount";
};

const userSchema = (type: "login" | "createAccount") =>
  Yup.object().shape({
    login:
      type === "login"
        ? Yup.string()
            .required("Login is required")
            .test(
              "is-email-or-username",
              "Invalid email or username",
              (value) => {
                // Check if the value is a valid email using regex
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                // Username should be at least 3 characters long, adjust as needed
                return emailRegex.test(value) || value.length >= 3;
              }
            )
        : Yup.mixed().notRequired(),
    email:
      type === "createAccount"
        ? Yup.string().email("Invalid email").required("Email is required")
        : Yup.mixed().notRequired(),

    username:
      type === "createAccount"
        ? Yup.string().required("Username is required")
        : Yup.mixed().notRequired(),

    password: Yup.string().required("Password is required"),

    confirmPassword:
      type === "createAccount"
        ? Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required")
        : Yup.mixed().notRequired(),
  });

export const AuthForm = ({ type = "login" }: AuthFormProps) => {
  const router = useRouter();
  const error = useSelector((state: RootState) => state.authenticate.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema(type) as Yup.ObjectSchema<any>),
  });

  const dispatch = useDispatch();

  const handleFormSubmit = async (data: any) => {
    const action: any = type === "login" ? login : createAccount;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...formData } = data;
    const result = await dispatch(action(formData));
    if (result.error) return;
    router.push("/");
  };

  return (
    <div className="h-screen">
      <div className="text-center font-extrabold text-7xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent p-6">
        {type === "login" ? <h1>Login</h1> : <h1>Create Account</h1>}
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className=" flex flex-col p-8 items-center justify-center"
      >
        {type === "createAccount" ? (
          // For creating an account
          <>
            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-2xl m-2 text-black dark:text-yellow-400">
                Email
              </p>
              <input
                className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
                {...register("email", { required: true })}
              ></input>
              <p className="text-red-500">
                {errors.email?.message?.toString()}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl m-2 dark:text-yellow-400 text-black">
                Username
              </p>
              <input
                className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
                {...register("username", { required: true })}
              ></input>
              <p className="text-red-500">
                {errors.username?.message?.toString()}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-2xl m-2 text-black dark:text-yellow-400">
                Password
              </p>
              <input
                className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
                {...register("password", { required: true })}
              ></input>
              <p className="text-red-500">
                {errors.password?.message?.toString()}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl m-2 dark:text-yellow-400 text-black">
                Confirm Password
              </p>
              <input
                className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
                type="password"
                {...register("confirmPassword")}
              />
              <p className="text-red-500">
                {errors.confirmPassword?.message?.toString()}
              </p>
            </div>
          </>
        ) : (
          // For logging in
          <>
            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-2xl m-2 text-black dark:text-yellow-400">
                Username / Email
              </p>
              <input
                className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
                {...register("login", { required: true })}
              ></input>
              <p className="text-red-500">
                {errors.login?.message?.toString()}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-2xl m-2 text-black dark:text-yellow-400">
                Password
              </p>
              <input
                className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
                {...register("password", { required: true })}
              ></input>
              <p className="text-red-500">
                {errors.password?.message?.toString()}
              </p>
            </div>
          </>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-yellow-400 rounded-md p-2 m-6" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
