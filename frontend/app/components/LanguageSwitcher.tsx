"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../utils/translations";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: "mn", label: "MN", flag: "🇲🇳" },
        { code: "en", label: "EN", flag: "🇺🇸" },
        { code: "jp", label: "JP", flag: "🇯🇵" },
    ];

    const currentLang = languages.find((l) => l.code === language);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    return (
        <div
            className="relative inline-block text-left z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="flex items-center gap-2 bg-black border border-black px-4 py-2 rounded-full shadow-sm hover:bg-gray-800 transition-all duration-300">
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="font-semibold text-white text-sm">
                    {currentLang?.label}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 pt-2 w-32 animate-fadeIn">
                    <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${language === lang.code ? "bg-gray-100 font-bold" : ""
                                    }`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span className="text-gray-700 text-sm">{lang.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
