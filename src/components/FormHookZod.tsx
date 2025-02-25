"use client";
import React from "react";
import clsx from "clsx";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { sendEmail } from "@/app/actions/email";
import toast, { Toaster } from "react-hot-toast";

// name: z.string().min(1, { message: 'Required' }),
const schema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name is required" })
      .regex(/^[\p{L}\s-]+$/u, {
        message: "First Name cannot contain emojis or special characters",
      }),
    secondName: z
      .string()
      .min(2, { message: "Second Name is too short" })
      .regex(/^[\p{L}\s-]+$/u, {
        message: "Second Name cannot contain emojis or special characters",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    telefon: z.string().min(10, { message: "Not valid phone number" }),
    password: z.string().min(4, { message: "Password is too short" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

const FormHookZod = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      firstName: "",
      secondName: "",

      email: "",
      telefon: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      const response = await sendEmail(data);
      if (!response.success) {
        throw new Error(response.error as string);
      }
      reset();
      toast.success(`Successfully saved, ${data.firstName}`, {
        duration: 4000,

        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } catch (error) {
      console.error("error-", error);
      toast.error("This is an error!", {
        duration: 4000,

        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  const errorForm: SubmitErrorHandler<z.infer<typeof schema>> = (er) => {
    console.log("er-", er);
  };
  return (
    <form
      onSubmit={handleSubmit(submit, errorForm)}
      className="flex flex-col gap-4 text-black w-full items-center"
    >
      <input
        type="text"
        {...register("firstName")}
        aria-invalid={errors.firstName ? "true" : "false"}
        placeholder="First Name"
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.firstName }
        )}
      />
      {errors.firstName && (
        <p className="text-red-500">{errors.firstName.message}</p>
      )}
      {/* //--------------- */}
      <input
        type="text"
        {...register("secondName")}
        placeholder="Second Name"
        aria-invalid={errors.secondName ? "true" : "false"}
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.secondName }
        )}
      />
      {errors.secondName && (
        <p className="text-red-500">{errors.secondName.message}</p>
      )}
      {/* //--------------- */}
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        aria-invalid={errors.email ? "true" : "false"}
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.email }
        )}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      {/* //--------------- */}
      <input
        type="tel"
        placeholder="+1234567890"
        {...register("telefon")}
        aria-invalid={errors.telefon ? "true" : "false"}
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.telefon }
        )}
      />
      {errors.telefon && (
        <p className="text-red-500">{errors.telefon.message}</p>
      )}
      {/* ........................ */}
      <input
        type="password"
        {...register("password")}
        aria-invalid={errors.password ? "true" : "false"}
        placeholder="Password"
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.password }
        )}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      {/* ........................ */}
      <input
        type="password"
        {...register("confirmPassword")}
        aria-invalid={errors.confirmPassword ? "true" : "false"}
        placeholder="Confirm Password"
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.confirmPassword }
        )}
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}
      <Toaster
        position="top-center"
        toastOptions={{ style: { minWidth: "200px", padding: "16px" } }}
      />
      <button
        type="submit"
        className="border border-black w-32 rounded-md h-12 px-4 mt-7"
      >
        {isSubmitting ? "loading..." : "Submit"}
      </button>
    </form>
  );
};

export default FormHookZod;
