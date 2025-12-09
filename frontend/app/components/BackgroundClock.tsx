"use client";

import React from "react";

export default function BackgroundClock() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none flex items-center justify-center bg-[#f8f9fa]">
            {/* Abstract Clock Container */}
            <div className="relative w-[80vh] h-[80vh] opacity-5">
                {/* Clock Face Ring */}
                <div className="absolute inset-0 border-4 border-black rounded-full" />

                {/* Hour Hand */}
                <div className="absolute top-1/2 left-1/2 w-2 h-[25%] bg-black origin-bottom -translate-x-1/2 -translate-y-full animate-spin-slow rounded-full" />

                {/* Minute Hand */}
                <div className="absolute top-1/2 left-1/2 w-1 h-[35%] bg-black origin-bottom -translate-x-1/2 -translate-y-full animate-spin-medium rounded-full" />

                {/* Second Hand (Optional, maybe too distracting? Let's keep it subtle) */}
                <div className="absolute top-1/2 left-1/2 w-0.5 h-[40%] bg-red-500 origin-bottom -translate-x-1/2 -translate-y-full animate-spin-fast rounded-full opacity-50" />

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
}
