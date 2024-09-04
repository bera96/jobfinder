import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { loginSchema, LoginFormValues } from "@/validations/validationSchemas";
import { Controller, useForm } from "react-hook-form";
import { usePostLogin } from "@/hooks/api/auth/usePostLogin";
import { useRouter } from "next/navigation";

type LoginModal = {
  showStatus: boolean;
  setShowStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({ showStatus, setShowStatus }: LoginModal) => {
  const closeModal = () => setShowStatus(false);
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
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal={showStatus}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    Login
                  </h3>
                  <div className="mt-2">
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
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
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
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:w-auto"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={() => setShowStatus(!showStatus)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
