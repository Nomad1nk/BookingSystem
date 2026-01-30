"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher"; // Import Language Switcher if desired on login page, or just rely on translations

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage(); // Get translations
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await axios.post(
        `${apiUrl}/auth/signin`,
        formData
      );

      // Token-ийг хөтөч дээр хадгалах (LocalStorage)
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(t.loginSuccess);
      router.push("/"); // Нүүр хуудас руу
    } catch (error: any) {
      alert(error.response?.data?.message || t.loginError);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 flex-col gap-4">
      {/* Optional: Add Language Switcher here if not in global layout, 
          but usually layout handles it. If layout works, it's fine. 
          Assuming layout wraps everything. */}

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.login}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder={t.email}
            className="border p-2 rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder={t.password}
            className="border p-2 rounded"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {t.login}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {t.noAccount}{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            {t.register}
          </a>
        </p>
      </div>
    </div>
  );
}
