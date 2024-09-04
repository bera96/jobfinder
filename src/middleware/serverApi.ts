"use server";
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiResponse<T = any> {
  data?: T;
  description?: string;
}
let getAuthHeader = async (header: any): Promise<Record<string, string>> => {
  const cookieStore = cookies();
  const tokens = {
    accessToken: cookieStore.get("accessToken")?.value,
    refreshToken: cookieStore.get("refreshToken")?.value,
  };
  return {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Content-Type": "application/json",
    ...header,
  };
};

export async function serverApiCall<T>({
  url,
  method = "GET",
  data = null,
  signal,
  params = {},
  args = {
    headers: {},
  },
  tags = [],
}: {
  url: string;
  method?: HttpMethod;
  data?: any;
  signal?: any;
  args?: { headers: Object };
  params?: Record<string, string | number | boolean>;
  tags?: string[];
}): Promise<T> {
  const headers = await getAuthHeader(args?.headers);

  const queryParams = new URLSearchParams(params as Record<string, string>).toString();
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}${
    queryParams ? `?${queryParams}` : ""
  }`;

  const options: RequestInit = {
    method,
    headers,
    signal,
    body: method !== "GET" && data ? data : undefined,
    next: { tags },
  };
  if (data instanceof FormData) {
    delete headers["Content-Type"];
  } else if (method !== "GET" && data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(fullUrl, options);
  if (response.status === 401) {
    try {
      const cookieStore = cookies();
      const refreshToken = cookieStore.get("refreshToken")?.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
     const tokens = await response.json();
      if (tokens.accessToken && tokens.refreshToken) {
        cookieStore.set("accessToken", tokens.accessToken, { maxAge: 60 * 60 * 24 * 365 * 1 });
        cookieStore.set("refreshToken", tokens.refreshToken, { maxAge: 60 * 60 * 24 * 365 * 1 });
      }
    } catch (error) {
    }
  }

  const responseText = await response.text();
  if (!response.ok) {
    let errorMessage;
    try {
      const errorData = JSON.parse(responseText);
      errorMessage = errorData?.message || "An error occurred";
    } catch {
      errorMessage = responseText || "An error occurred";
    }
    throw new Error(errorMessage);
  }

  try {
    const responseData: ApiResponse<T> = JSON.parse(responseText);
    return responseData as T;
  } catch {
    throw new Error("Invalid JSON response");
  }
}
