"use server";
import { serverApiCall } from "@/middleware/serverApi";
import { JOBS } from "@/utils/endpoints";

export async function getJob(id: string) {
  try {
    const response = await serverApiCall({
      url: `${JOBS}/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}