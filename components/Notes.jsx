"use client";

import { useState, useEffect, useRef } from "react";
import { MONTHS, formatShort } from "@/utils/dateUtils";

export default function Notes({ year, month, startDate, endDate }) {
    const [note, setNote] = useState("");
    const [status, setStatus] = useState(""); // "", "saving", "saved"
    const timer = useRef(null);

    // 👇 NEW: get all note dates
    const getAllNoteDates = () => {
        const dates = [];

        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);

            if (k.startsWith("cal-note-")) {
                const date = k.replace("cal-note-", "");
                dates.push(date); // format: YYYY-MM-DD
            }
        }

        return dates;
    };
    // ✅ KEY CHANGE → date based storage
    const key = startDate
        ? `cal-note-${startDate.toISOString().split("T")[0]}`
        : null;

    // ✅ Load note when date changes
    useEffect(() => {
        if (!key) {
            setNote("");
            return;
        }

        try {
            setNote(localStorage.getItem(key) || "");
        } catch {
            setNote("");
        }
    }, [key]);

    // ✅ Auto-save + auto-delete
    useEffect(() => {
        if (!key) return;

        clearTimeout(timer.current);

        // 👇 empty → delete
        if (note.trim() === "") {
            localStorage.removeItem(key);
            setStatus("");
            return;
        }

        setStatus("saving");

        timer.current = setTimeout(() => {
            try {
                localStorage.setItem(key, note);
                setStatus("saved");

                setTimeout(() => {
                    setStatus("");
                }, 1500);
            } catch { }
        }, 700);

        return () => clearTimeout(timer.current);
    }, [note, key]);

    // ✅ Clear button
    const handleClear = () => {
        if (!key) return;

        const confirmDelete = confirm("Delete this note?");
        if (!confirmDelete) return;

        setNote("");
        localStorage.removeItem(key);
        setStatus("");
    };

    // ✅ Label (date based)
    let rangeLabel = "";
    if (startDate && endDate) {
        let lo = startDate, hi = endDate;
        if (lo > hi) [lo, hi] = [hi, lo];
        rangeLabel = `${formatShort(lo)} – ${formatShort(hi)}`;
    } else if (startDate) {
        rangeLabel = formatShort(startDate);
    }

    return (
        <div className="notes-section">
            {/* Header */}
            <div className="notes-label">
                <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1565c0"
                    strokeWidth="2.2"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>

                Notes

                {/* Status */}
                {status === "saving" && (
                    <span className="save-badge show">Saving...</span>
                )}
                {status === "saved" && (
                    <span className="save-badge show">✓ Saved</span>
                )}
            </div>

            {/* ✅ Selected date */}
            <div className="range-label-chip">
                {startDate ? formatShort(startDate) : "Select a date"}
            </div>

            {/* ✅ Textarea */}
            <textarea
                className="notes-lined-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={!startDate}
                placeholder={
                    startDate
                        ? `Notes for ${formatShort(startDate)}…`
                        : "Select a date to add notes"
                }
                rows={7}
            />

            {/* ✅ Clear Button */}
            {note && startDate && (
                <div className="notes-footer">
                    <button className="clear-btn" onClick={handleClear}>
                        🗑 Clear Notes
                    </button>
                </div>
            )}
        </div>
    );
}