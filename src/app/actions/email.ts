"use server";
import React from "react";
import { Resend } from "resend";
import FormType from "@/types/types";

import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL;

export async function sendEmail(formData: FormType) {
  try {
    const { firstName, secondName, age, email, telefon } = formData;
    console.log(firstName, secondName, age, email, telefon);

    const message = `Name: ${firstName} ${secondName}, Age: ${age}, Email: ${email}, Telefon: ${telefon}`;
    const emailContent = React.createElement(EmailTemplate, { message });
    if (!myEmail) {
      throw new Error("MY_EMAIL is not defined in environment variables.");
    }

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: myEmail,
      subject: "From useForm",
      react: emailContent,
    });
    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
