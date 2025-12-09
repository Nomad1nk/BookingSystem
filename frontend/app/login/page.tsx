"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signin",
        formData
      );

      // Token-ийг хөтөч дээр хадгалах (LocalStorage)
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Амжилттай нэвтэрлээ!");
      router.push("/"); // Нүүр хуудас руу
    } catch (error: any) {
      alert(error.response?.data?.message || "Имэйл эсвэл нууц үг буруу байна");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Нэвтрэх
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Бүртгэлгүй юу?{" "}
          <a href="/register" className="text-blue-500">
            Бүртгүүлэх
          </a>
        </p>
      </div>
    </div>
  );
}
