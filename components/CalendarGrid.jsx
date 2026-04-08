"use client";

import { useState, useEffect } from "react";
import { DAYS_SHORT, buildCalendarGrid } from "@/utils/dateUtils";
import Day from "./Day";

export default function CalendarGrid({ year, month, startDate, endDate, onSelect }) {
    const [hoverDate, setHoverDate] = useState(null);
    const [noteDates, setNoteDates] = useState([]); // ✅ store all note dates

    const grid = buildCalendarGrid(year, month);

    // ✅ GET ALL NOTES FROM LOCALSTORAGE
    useEffect(() => {
        const dates = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith("cal-note-")) {
                const date = key.replace("cal-note-", "");
                dates.push(date); // YYYY-MM-DD
            }
        }

        setNoteDates(dates);
    }, [month, year]); // refresh on month change

    return (
        <div className="grid-section animate-in">
            {/* Day column headers */}
            <div className="day-headers">
                {DAYS_SHORT.map((d, i) => (
                    <div key={d} className={`day-hdr${i >= 5 ? " weekend" : ""}`}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Day cells */}
            <div className="days-grid">
                {grid.map((dayObj, idx) => {
                    const { date } = dayObj;

                    const formatted = date.toISOString().split("T")[0];

                    const hasNote = noteDates.includes(formatted); // ✅ check note

                    return (
                        <Day
                            key={idx}
                            dayObj={dayObj}
                            startDate={startDate}
                            endDate={endDate}
                            hoverDate={hoverDate}
                            onSelect={onSelect}
                            onHover={setHoverDate}
                            hasNote={hasNote} // ✅ PASS HERE
                        />
                    );
                })}
            </div>
        </div>
    );
}