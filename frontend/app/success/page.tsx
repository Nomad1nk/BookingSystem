// frontend/app/success/page.tsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("booking_id");

  useEffect(() => {
    if (bookingId) {
      // Төлбөр төлөгдсөн тул захиалгыг баталгаажуулах
      axios
        .patch(`http://localhost:3000/bookings/${bookingId}/confirm`)
        .then(() => console.log("Booking confirmed"))
        .catch((err) => console.error(err));
    }
  }, [bookingId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Төлбөр амжилттай! ✅
      </h1>
      <p className="text-gray-700 mb-8">Таны захиалга баталгаажлаа.</p>
      <button
        onClick={() => router.push("/")}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Нүүр хуудас руу буцах
      </button>
    </div>
  );
}
