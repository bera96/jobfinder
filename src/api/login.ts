import { toast } from "react-toastify";
import axios from "axios";
import { LOGIN } from "@/utils/endpoints";

export async function loginUser(credentials: { email: string; password: string }) {
  try {
    const response = await axios.post(LOGIN, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(`Login failed: ${error.response.data.message || "Unknown error"}`);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
}
