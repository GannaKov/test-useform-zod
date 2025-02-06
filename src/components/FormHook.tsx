"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormType = {
  firstName: string;
  secondName: string;
  age: number;
  email: string;
  telefon: string;
};

const FormHook = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormType>({ defaultValues: { age: 18 } });

  const submit: SubmitHandler<FormType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 text-black w-full items-center"
    >
      <input
        {...register("firstName", { required: true, minLength: 2 })}
        aria-invalid={errors.firstName ? "true" : "false"}
        className="border border-black w-full lg:w-3/5 rounded-md h-12 px-4"
      />
      {errors.firstName?.type === "required" && (
        <p role="alert" className="text-red-600">
          First name is required
        </p>
      )}
      {errors.firstName?.type === "minLength" && (
        <p role="alert" className="text-red-600">
          First Name is too short
        </p>
      )}
      {/* //--------------- */}
      <input
        {...register("secondName", {
          required: true,
          minLength: 2,
        })}
        aria-invalid={errors.secondName ? "true" : "false"}
        className="border border-black w-full lg:w-3/5  rounded-md h-12 px-4"
      />
      {errors.secondName?.type === "required" && (
        <p role="alert" className="text-red-600">
          Second name is required
        </p>
      )}
      {errors.secondName?.type === "minLength" && (
        <p role="alert" className="text-red-600">
          Second Name is too short
        </p>
      )}
      {/* //--------------- */}
      <input
        {...register("age", { min: 18, max: 99, required: true })}
        aria-invalid={errors.secondName ? "true" : "false"}
        className="border border-black w-full lg:w-3/5  rounded-md h-12 px-4"
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
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "Invalid email address",
          },
        })}
        className="border border-black w-full lg:w-3/5  rounded-md h-12 px-4"
      />
      {errors.email && <p>{errors.email.message}</p>}
      {/* //--------------- */}
      <input
        placeholder="+1234567890"
        {...register("telefon", {
          required: "Телефон обязателен",
          pattern: {
            value: /^[+]?[0-9]{10,15}$/,
            message: "Not valid phone number",
          },
        })}
        className="border border-black w-full lg:w-3/5  rounded-md h-12 px-4"
      />
      {errors.telefon && (
        <p className="text-red-500">{errors.telefon.message}</p>
      )}
      <button
        type="submit"
        className="border border-black w-32 rounded-md h-12 px-4 mt-7"
      >
        Submit
      </button>
    </form>
  );
};

export default FormHook;
