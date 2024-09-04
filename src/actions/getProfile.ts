"use server";
import { serverApiCall } from "@/middleware/serverApi";
import { PROFILE } from "@/utils/endpoints";

export async function getProfile() {
  try {
    const response = await serverApiCall({
      url: PROFILE,
      method: "GET",
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
