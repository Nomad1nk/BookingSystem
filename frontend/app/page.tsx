"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "./context/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";

// TypeScript: Датаны бүтэц
interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
}

interface Booking {
  id: number;
  startTime: string;
  endTime: string;
  service: { name: string };
  user: { name: string };
  status: string;
}

export default function Home() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState({
    startTime: "",
    endTime: "",
  });

  const fetchData = async () => {
    try {
      const servicesRes = await axios.get("http://localhost:3000/services");
      setServices(servicesRes.data);

      const bookingsRes = await axios.get("http://localhost:3000/bookings");
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Дата татахад алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload();
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/services", {
        name: formData.name,
        duration: Number(formData.duration),
        price: Number(formData.price),
      });
      setFormData({ name: "", duration: "", price: "" });
      fetchData();
      alert(t.serviceAdded);
    } catch (error) {
      alert(t.serviceAddError);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm(t.confirmDeleteService)) return;
    try {
      await axios.delete(`http://localhost:3000/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
      alert(t.serviceDeleted);
    } catch (error) {
      alert(t.serviceDeleteError);
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    try {
      const res = await axios.post("http://localhost:3000/bookings", {
        serviceId: selectedService.id,
        startTime: new Date(bookingData.startTime).toISOString(),
        endTime: new Date(bookingData.endTime).toISOString(),
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert(t.paymentLinkMissing);
      }
    } catch (error) {
      const err = error as any;
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        console.error(err);
        alert(t.bookingError);
      }
    }
  };

  const handleCancelBooking = async (id: number) => {
    if (!confirm(t.confirmCancelBooking)) return;
    try {
      await axios.delete(`http://localhost:3000/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      alert(t.bookingCanceled);
    } catch (error) {
      alert(t.cancelError);
    }
  };

  const openBookingModal = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto p-8 pb-32">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-extrabold tracking-tight text-black">
            {t.title}
          </h1>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-600">
                  {t.welcome}, <span className="text-black font-bold">{currentUser.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                {t.login}
              </a>
            )}
          </div>
        </header>

        {/* Create Service Section */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12 transition-all hover:shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-100">
            {t.createService}
          </h2>
          <form
            onSubmit={handleCreateService}
            className="flex gap-6 items-end flex-wrap"
          >
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t.name}
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                placeholder={t.placeholderName}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t.duration}
              </label>
              <input
                type="number"
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                placeholder="60"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                required
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t.price}
              </label>
              <input
                type="number"
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                placeholder="5000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t.add}
            </button>
          </form>
        </section>

        {/* Services Table */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{t.services}</h2>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-16">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t.id}
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t.name}
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t.duration}
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t.price}
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t.action}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-5 text-gray-600 font-mono text-sm">
                    #{service.id}
                  </td>
                  <td className="p-5 font-bold text-gray-900 text-lg">
                    {service.name}
                  </td>
                  <td className="p-5 text-gray-600">{service.duration} min</td>
                  <td className="p-5 font-bold text-black">¥{service.price}</td>
                  <td className="p-5 flex gap-3">
                    <button
                      onClick={() => openBookingModal(service)}
                      className="bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
                    >
                      {t.book}
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-gray-400 hover:text-red-500 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-red-100 hover:bg-red-50"
                    >
                      {t.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bookings Table */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {t.allBookings}
        </h2>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-5 text-xs font-bold uppercase tracking-wider opacity-80">
                  {t.id}
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider opacity-80">
                  {t.service}
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider opacity-80">
                  {t.time}
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider opacity-80">
                  {t.status}
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider opacity-80">
                  {t.action}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-400">
                    {t.noBookings}
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-5 text-gray-500 font-mono text-sm">
                      #{booking.id}
                    </td>
                    <td className="p-5 font-bold text-gray-900">
                      {booking.service?.name}
                    </td>
                    <td className="p-5 text-gray-600">
                      {new Date(booking.startTime).toLocaleString(
                        language === "mn" ? "mn-MN" : "en-US"
                      )}
                    </td>
                    <td className="p-5">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      >
                        {t.cancel}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Booking Modal */}
        {isBookingOpen && selectedService && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] border border-gray-100 transform transition-all scale-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {selectedService.name} <span className="font-light">{t.bookingTitle}</span>
              </h2>
              <form
                onSubmit={handleCreateBooking}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {t.startTime}
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    value={bookingData.startTime}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        startTime: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {t.endTime}
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    value={bookingData.endTime}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        endTime: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    {t.cancelAction}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    {t.confirm}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
