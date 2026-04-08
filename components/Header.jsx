"use client";

import { MONTHS } from "@/utils/dateUtils";

export default function Header({ year, month, onPrev, onNext, darkMode, onToggleDark }) {
    return (
        <div className="cal-nav">
            {/* Prev */}
            <button className="nav-btn" onClick={onPrev} aria-label="Previous month">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            {/* Title */}
            <span className="nav-title">
                {MONTHS[month]} {year}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {/* Dark mode */}
                <button
                    className="dark-toggle"
                    onClick={onToggleDark}
                    aria-label="Toggle dark mode"
                    title="Toggle dark mode"
                >
                    {darkMode ? "☀" : "☽"}
                </button>
                {/* Next */}
                <button className="nav-btn" onClick={onNext} aria-label="Next month">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}