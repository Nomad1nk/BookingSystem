"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/signup", formData);
      alert("Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
      router.push("/login"); // Нэвтрэх хуудас руу шилжүүлэх
    } catch (error: any) {
      alert(error.response?.data?.message || "Бүртгүүлэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Бүртгүүлэх</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Нэр"
            className="border p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Имэйл"
            className="border p-2 rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Нууц үг"
            className="border p-2 rounded"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Бүртгүүлэх
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Бүртгэлтэй юу?{" "}
          <a href="/login" className="text-blue-500">
            Нэвтрэх
          </a>
        </p>
      </div>
    </div>
  );
}
