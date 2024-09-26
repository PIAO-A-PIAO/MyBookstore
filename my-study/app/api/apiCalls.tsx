"use server";
import { cookies } from "next/headers";

export async function apiCall(endpoint: string, formData?: any) {
  const token = cookies().get("token");
  const response = await fetch(`${process.env.BASE_URL}/api/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { Cookie: `token=${token?.value}` },
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  const result = await response.json();
  return result;
}
