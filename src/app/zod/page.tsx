import FormHookZod from "@/components/FormHookZod";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-4/5 mx-auto py-20">
      <h1 className="text-3xl mb-8 font-semibold">Form with useForm and Zod</h1>
      <FormHookZod />
    </div>
  );
};

export default page;
