"use server";
import { serverApiCall } from "@/middleware/serverApi";
import { LOGIN } from "@/utils/endpoints";

export async function postLogin(credentials: { email: string; password: string }) {
  try {
    const response = await serverApiCall({
      url: LOGIN,
      method: "POST",
      data: credentials,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
