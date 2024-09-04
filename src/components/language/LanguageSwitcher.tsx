import React from "react";
import { setCookie, getCookie } from "cookies-next";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations();
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem("language", e.target.value);
    setCookie("language", selectedLanguage, { path: "/" });
    window.location.reload();
  };

  return (
    <div className="flex items-center">
      <label htmlFor="language-select" className="mr-2">
        {t("HEADER.SELECT_LANGUAGE")}
      </label>
      <select
        id="language-select"
        onChange={changeLanguage}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        defaultValue={localStorage.getItem("language") || "en"}
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
}
