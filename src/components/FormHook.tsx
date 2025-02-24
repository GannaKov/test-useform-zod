"use client";
import clsx from "clsx";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FormType from "@/types/types";
import { sendEmail } from "@/app/actions/email";
import toast, { Toaster } from "react-hot-toast";

const FormHook = () => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },

    formState: { isSubmitSuccessful },
    clearErrors,
  } = useForm<FormType>({
    defaultValues: {
      firstName: "",
      secondName: "",
      age: 18,
      email: "",
      telefon: "",
    },
  });
  const [firstName, secondName, age, email, telefon] = watch([
    "firstName",
    "secondName",
    "age",
    "email",
    "telefon",
  ]);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ firstName: "", secondName: "", age: 18, email: "", telefon: "" });
    }
  }, [isSubmitSuccessful, reset]);

  const submit: SubmitHandler<FormType> = async (data) => {
    try {
      const response = await sendEmail(data);
      if (!response.success) {
        throw new Error(response.error as string);
      }
      // sec var
      // const response = await fetch("/api/sendEmail", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();

      // if (!result.success) {
      //   throw new Error(result.error);
      // }
      //end sec var
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
      <button
        type="button"
        className="border border-blue-700 w-32 rounded-md h-6 px-4 mt-3"
        onClick={() => resetField("firstName")}
      >
        Clear Field
      </button>
      {errors.firstName && <p>{errors.firstName.message}</p>}
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

      {errors.secondName && <p>{errors.secondName.message}</p>}
      {/* //--------------- */}
      <input
        {...register("age", { min: 18, max: 99, required: true })}
        aria-invalid={errors.age ? "true" : "false"}
        className={clsx(
          "border border-black w-full lg:w-3/5  rounded-md h-12 px-4",
          { "border-red-500": errors.age }
        )}
      />
      {errors.age?.type === "required" && (
        <p role="alert" className="text-red-600">
          Age is required
        </p>
      )}
      {(errors.age?.type === "min" || errors.age?.type === "max") && (
        <p role="alert" className="text-red-600">
          Age should be between 18 and 99
        </p>
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
      {errors.email && <p>{errors.email.message}</p>}
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
      <button
        type="button"
        className="border border-blue-700 w-32 rounded-md h-12 px-4 mt-3"
        onClick={() => clearErrors()}
      >
        Clear Errors
      </button>
      <p>
        {firstName} {secondName} {age} {email} {telefon}
      </p>
    </form>
  );
};

export default FormHook;
