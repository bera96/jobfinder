const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const REGISTER = "register";
const LOGIN = "login";
const REFRESH_TOKEN = `${baseUrl + "refresh"}`;
const PROFILE = "profile";
const JOBS = "jobs";

export { REGISTER, LOGIN, REFRESH_TOKEN, PROFILE, JOBS };
