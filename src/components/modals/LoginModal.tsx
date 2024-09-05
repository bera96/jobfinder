import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { loginSchema, LoginFormValues } from "@/validations/validationSchemas";
import { Controller, useForm } from "react-hook-form";
import { usePostLogin } from "@/hooks/api/auth/usePostLogin";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const LoginModal = () => {
  const { setModalStatuses } = useAuthStore();
  const closeModal = () => setModalStatuses({ login: false, register: false });
  const postLoginMutation = usePostLogin();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues): void => {
    postLoginMutation.mutate(data, {
      onSuccess: () => {
        closeModal();
        router.push("/jobs");
      },
    });
  };

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-65"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow text-black ">
          <div className="flex  p-4 md:p-5  dark:border-gray-600">
            <div className="items-center flex justify-center text-center m-auto">
              <h3 className="text-4xl   text-black mt-5">Login</h3>
            </div>
            <button
              type="button"
              className="absolute end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => setModalStatuses({ login: false, register: false })}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="text"
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type="password"
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-black text-center border-2 bg-white  hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                LOGIN
              </button>
            </form>
            <div className="mt-2 text-sm text-center font-medium">
              Don't have an account?
              <label
                onClick={() => {
                  setModalStatuses({ login: false, register: true });
                }}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Sign Up
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
