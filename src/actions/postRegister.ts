"use server";
import { serverApiCall } from "@/middleware/serverApi";
import { REGISTER } from "@/utils/endpoints";

export async function postRegister(credentials: { email: string; password: string }) {
  try {
    const response = await serverApiCall({
      url: REGISTER,
      method: "POST",
      data: credentials,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
