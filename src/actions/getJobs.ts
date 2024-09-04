"use server";
import { serverApiCall } from "@/middleware/serverApi";
import { JOBS } from "@/utils/endpoints";

export async function getJobs(
  queryParams: { page: string; perPage: string; orderBy: string } | undefined
) {
  let params = "";
  if (!queryParams) {
    params = "page=1&perPage=100";
  } else {
    params = `page=${queryParams.page}&perPage=${queryParams.perPage}`;
  }
  try {
    const response = await serverApiCall({
      url: `${JOBS}?${params}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
