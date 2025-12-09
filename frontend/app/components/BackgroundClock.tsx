"use client";

import React from "react";

export default function BackgroundClock() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none flex items-center justify-center bg-[#f8f9fa]">
            {/* 
        PREMIUM CLOCK DESIGN 
        - Metallic Rim
        - Depth Shadows
        - Detailed Face
      */}
            <div className="relative w-[80vh] h-[80vh] opacity-20 scale-110">

                {/* Outer Rim (Metallic Gradient Effect) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 via-white to-gray-300 shadow-2xl" />

                {/* Inner Rim (Depth) */}
                <div className="absolute inset-4 rounded-full bg-[#f8f9fa] shadow-inner border border-gray-100" />

                {/* Clock Face Details */}
                <div className="absolute inset-0 rounded-full flex items-center justify-center">

                    {/* Hour Markers (12, 3, 6, 9) */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl font-serif font-bold text-gray-300">XII</div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-6xl font-serif font-bold text-gray-300">VI</div>
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 text-6xl font-serif font-bold text-gray-300">IX</div>
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 text-6xl font-serif font-bold text-gray-300">III</div>

                    {/* Tick Marks Ring */}
                    <div className="absolute inset-12 border border-gray-100 rounded-full opacity-50" />
                </div>

                {/* Center Mechanism */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-br from-gray-700 to-black rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 border-2 border-gray-400" />

                {/* Hour Hand (Tapered & Shadowed) */}
                <div className="absolute top-1/2 left-1/2 w-4 h-[25%] bg-black origin-bottom -translate-x-1/2 -translate-y-[90%] animate-spin-slow rounded-full shadow-xl z-10"
                    style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />

                {/* Minute Hand (Longer, Thinner) */}
                <div className="absolute top-1/2 left-1/2 w-2 h-[38%] bg-gray-800 origin-bottom -translate-x-1/2 -translate-y-[90%] animate-spin-medium rounded-full shadow-xl z-10" />

                {/* Second Hand (Accent) */}
                <div className="absolute top-1/2 left-1/2 w-1 h-[42%] bg-red-500 origin-bottom -translate-x-1/2 -translate-y-[85%] animate-spin-fast shadow-md z-10 opacity-80" />

                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)" }} />
            </div>
        </div>
    );
}
