"use client";
import React, { useEffect, useState } from "react";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Logo from "../logo/Logo";
import LanguageSwitcher from "../language/LanguageSwitcher";

const Header = () => {
  const [loading, setLoading] = useState(true);
  const { user, clearAuth, setUser, modalStatuses, setModalStatuses } = useAuthStore();
  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, [setUser]);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    queryClient.clear();
    router.push("/");
  };

  return (
    <>
      <nav className="flex justify-between p-7 border-b-2 ">
        <Logo />
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3"></li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="/jobs"
                  className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
                >
                  Job List
                </a>
              </li>
              {user && (
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <a
                    onClick={handleLogout}
                    className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
          <LanguageSwitcher />
          {loading ? (
            <div className="flex max-lg:ml-auto space-x-3">
              <span className="text-sm font-semibold">Loading...</span>
            </div>
          ) : !user ? (
            <div className="flex gap-5">
              <button
                className="px-4 py-2 border-2 rounded-lg text-center"
                onClick={() => setModalStatuses({ login: true, register: false })}
              >
                Login
              </button>
              <button
                className="border px-4 py-2 rounded-lg text-center bg-black text-white"
                onClick={() => setModalStatuses({ login: false, register: true })}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <p>{user.email}</p>
              <img
                src={user.profileImage}
                alt="User Profile"
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
            </div>
          )}
        </div>
      </nav>
      {modalStatuses.login && <LoginModal />}
      {modalStatuses.register && <RegisterModal />}
    </>
  );
};

export default Header;
