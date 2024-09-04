"use server";
import { serverApiCall } from "@/middleware/serverApi";
import { JOBS } from "@/utils/endpoints";

export async function postJob(id: string) {
  try {
    const response = await serverApiCall({
      url: `${JOBS}/${id}/apply`,
      method: "POST",
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
