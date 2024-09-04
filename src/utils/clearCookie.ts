import { NextRequest } from "next/server";
import {deleteCookie} from 'cookies-next';

export function clearCookies() {
  deleteCookie("accessToken")
  deleteCookie("refreshToken")
}
