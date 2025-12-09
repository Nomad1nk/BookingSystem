// frontend/app/admin/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  // 1. Backend-аас дата татах
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. Захиалга ЦУЦЛАХ (Шинээр нэмсэн функц)
  const handleCancel = async (id: number) => {
    // Устгахын өмнө заавал асуух хэрэгтэй
    if (!confirm("Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу?")) return;

    try {
      await axios.delete(`http://localhost:3000/bookings/${id}`);

      // Амжилттай бол жагсаалтаас шууд хасах (Дахиж API дуудахгүйгээр хурдан харагдуулна)
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      alert("Захиалга цуцлагдлаа.");
    } catch (error) {
      alert("Алдаа гарлаа. (Backend ажиллаж байгаа эсэхийг шалгана уу)");
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <a href="/" className="text-blue-600 hover:underline">
          ← Нүүр хуудас руу буцах
        </a>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800 text-white">
            <th className="p-4">ID</th>
            <th className="p-4">Үйлчилгээ</th>
            <th className="p-4">Хэрэглэгч</th>
            <th className="p-4">Цаг</th>
            <th className="p-4">Төлөв</th>
            <th className="p-4">Үйлдэл</th> {/* Шинэ багана */}
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Захиалга одоогоор алга.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 border-b">
                  <td className="p-4 font-mono text-sm">{booking.id}</td>
                  <td className="p-4 font-bold text-blue-700">
                    {booking.service?.name || "Deleted Service"}
                  </td>
                  <td className="p-4">
                    {booking.user?.name} <br />
                    <span className="text-xs text-gray-500">
                      {booking.user?.email}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700 text-sm">
                    <div>
                      Эхлэх:{" "}
                      {new Date(booking.startTime).toLocaleString("mn-MN")}
                    </div>
                    <div>
                      Дуусах:{" "}
                      {new Date(booking.endTime).toLocaleString("mn-MN")}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  {/* Шинэ товч */}
                  <td className="p-4">
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition shadow"
                    >
                      Цуцлах
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
