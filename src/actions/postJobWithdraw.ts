"use server";
import { serverApiCall } from "@/middleware/serverApi";
import { JOBS } from "@/utils/endpoints";

export async function postJobWithdraw(id: string) {
  try {
    const response = await serverApiCall({
      url: `${JOBS}/${id}/withdraw`,
      method: "POST",
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
