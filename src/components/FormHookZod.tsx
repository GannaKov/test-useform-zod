"use client";
import clsx from "clsx";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FormType from "@/types/types";
import { sendEmail } from "@/app/actions/email";
import toast, { Toaster } from "react-hot-toast";

const FormHookZod = () => {
  const {
    register,
    handleSubmit,
    reset,

    watch,
    formState: { errors },

    formState: { isSubmitSuccessful },
  } = useForm<FormType>({
    defaultValues: {
      firstName: "",
      secondName: "",

      email: "",
      telefon: "",
      password: "",
      confirmPassword: "",
    },
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        secondName: "",
        email: "",
        telefon: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const submit: SubmitHandler<FormType> = async (data) => {
    try {
      const response = await sendEmail(data);
      if (!response.success) {
        throw new Error(response.error as string);
      }

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

  const errorForm: SubmitErrorHandler<FormType> = (er) => {
    console.log("er-", er);
  };
  return (
    <form
      onSubmit={handleSubmit(submit, errorForm)}
      className="flex flex-col gap-4 text-black w-full items-center"
    >
      <input
        {...register("firstName", {
          required: "First name is required",
          minLength: { value: 2, message: "First Name is too short" },
        })}
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
        {...register("secondName", {
          required: true,
          minLength: { value: 2, message: "Second Name is too short" },
        })}
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
        placeholder="Email"
        {...register("email", {
          required: "Email is required",

          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "Invalid email address",
          },
        })}
        aria-invalid={errors.email ? "true" : "false"}
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.email }
        )}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      {/* //--------------- */}
      <input
        placeholder="+1234567890"
        {...register("telefon", {
          required: "Tel is required",
          pattern: {
            value: /^[+]?[0-9]{10,15}$/,
            message: "Not valid phone number",
          },
        })}
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
        {...register("password", {
          required: "Password is required",
          minLength: { value: 4, message: "Password is too short" },
        })}
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
        {...register("confirmPassword", {
          required: "Password is required",
          minLength: { value: 4, message: "Password is too short" },
          validate: (value) =>
            value === watch("password") || "The passwords do not match",
        })}
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
        Submit
      </button>
    </form>
  );
};

export default FormHookZod;
