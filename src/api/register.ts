import { toast } from "react-toastify";
import axios from "axios";
import { REGISTER } from "@/utils/endpoints";

export async function registerUser(credentials: { email: string; password: string }) {
  try {
    const response = await axios.post(REGISTER, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(`Registration failed: ${error.response.data.message || "Unknown error"}`);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
}
