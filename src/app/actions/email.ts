"use server";

import FormType from "@/types/types";

export async function sendEmail(formData: FormType): Promise<void> {
  try {
    const { firstName, secondName, age, email, telefon } = formData;
    console.log(firstName, secondName, age, email, telefon);
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}`);
  }
}
