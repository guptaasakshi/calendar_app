"use client";

import { useState, useCallback } from "react";
import ImageSection from "./ImageSection";
import Header from "./Header";
import CalendarGrid from "./CalendarGrid";
import Notes from "./Notes";
import RangeHighlight from "./RangeHighlight";

// Build ring holes array
const RING_COUNT = 18;
const rings = Array.from({ length: RING_COUNT }, (_, i) => {
    const pct = (i / (RING_COUNT - 1)) * 100;
    return `calc(${pct}% - 7px)`;
});

export default function Calendar() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStart] = useState(null);
    const [endDate, setEnd] = useState(null);
    const [darkMode, setDark] = useState(false);
    const [flipping, setFlip] = useState(false);

    // 🌗 Dark mode styles
    const darkStyle = darkMode
        ? {
            "--page-bg": "#181c24",
            "--paper": "#1e2330",
            "--line-color": "#2c3347",
            "--text-main": "#e8ecf5",
            "--text-muted": "#6a7190",
            "--range-bg": "#1a3358",
            "--sat-sun": "#4FC3F7",
        }
        : {};

    // 🔥 NAVIGATION WITH ANIMATION
    const navigate = useCallback(
        (dir) => {
            if (flipping) return;

            setFlip(true);

            setTimeout(() => {
                setCurrentDate((prev) =>
                    new Date(
                        prev.getFullYear(),
                        prev.getMonth() + dir,
                        1
                    )
                );

                setFlip(false);
            }, 300); // 👈 smooth timing
        },
        [flipping]
    );

    // Date selection
    const handleSelect = useCallback(
        (date) => {
            if (!startDate || (startDate && endDate)) {
                setStart(date);
                setEnd(null);
            } else {
                setEnd(date);
            }
        },
        [startDate, endDate]
    );

    const clearRange = () => {
        setStart(null);
        setEnd(null);
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "520px",
                margin: "0 auto",
                ...darkStyle,
            }}
        >
            {/* ── SPIRAL RINGS ── */}
            <div style={{ position: "relative", marginBottom: "-1px" }}>
                <div className="spiral-bar">
                    {rings.map((left, i) => (
                        <div
                            key={i}
                            className="ring-hole"
                            style={{ left }}
                        />
                    ))}
                </div>
            </div>

            {/* ── CALENDAR CARD ── */}
            <div
                className={`calendar-card${flipping ? " flipping" : ""}`}
                style={darkMode ? { background: "var(--paper)" } : {}}
            >
                {/* Hero image */}
                <ImageSection
                    year={currentDate.getFullYear()}
                    month={currentDate.getMonth()}
                />

                {/* Header */}
                <Header
                    year={currentDate.getFullYear()}
                    month={currentDate.getMonth()}
                    onPrev={() => navigate(-1)}
                    onNext={() => navigate(1)}
                    darkMode={darkMode}
                    onToggleDark={() => setDark((d) => !d)}
                />

                {/* Bottom Section */}
                <div className="bottom-section">
                    {/* Notes */}
                    <Notes
                        year={currentDate.getFullYear()}
                        month={currentDate.getMonth()}
                        startDate={startDate}
                        endDate={endDate}
                    />

                    {/* 🔥 Calendar Grid with animation trigger */}
                    <CalendarGrid
                        key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}  // ✅ IMPORTANT
                        year={currentDate.getFullYear()}
                        month={currentDate.getMonth()}
                        startDate={startDate}
                        endDate={endDate}
                        onSelect={handleSelect}
                    />
                </div>

                {/* Range bar */}
                <RangeHighlight
                    startDate={startDate}
                    endDate={endDate}
                    onClear={clearRange}
                />
            </div>
        </div>
    );
}