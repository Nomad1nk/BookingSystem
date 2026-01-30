"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await axios.post(`${apiUrl}/auth/signup`, formData);
      alert(t.registerSuccess);
      router.push("/login"); // Нэвтрэх хуудас руу шилжүүлэх
    } catch (error: any) {
      alert(error.response?.data?.message || t.registerError);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.register}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t.name}
            className="border p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
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
            {t.register}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {t.haveAccount}{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            {t.login}
          </a>
        </p>
      </div>
    </div>
  );
}
