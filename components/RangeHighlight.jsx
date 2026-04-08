"use client";

import { formatShort, countRangeDays } from "@/utils/dateUtils";

export default function RangeHighlight({ startDate, endDate, onClear }) {
    const hasStart = !!startDate;
    const hasRange = hasStart && !!endDate;

    let lo = startDate, hi = endDate;
    if (lo && hi && lo > hi) [lo, hi] = [hi, lo];

    const days = countRangeDays(lo, hi);

    return (
        <div className="range-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                {!hasStart && (
                    <span style={{ fontStyle: "italic", opacity: 0.55 }}>
                        Click a date to start selecting
                    </span>
                )}
                {hasStart && !hasRange && (
                    <>
                        <span
                            style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: "#1565c0", display: "inline-block", flexShrink: 0,
                            }}
                        />
                        <span>{formatShort(lo)}</span>
                        <span style={{ opacity: 0.4 }}>→ click end date</span>
                    </>
                )}
                {hasRange && (
                    <>
                        <span
                            style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: "#1565c0", display: "inline-block", flexShrink: 0,
                            }}
                        />
                        <span>{formatShort(lo)}</span>
                        <span style={{ opacity: 0.5 }}>→</span>
                        <span
                            style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: "#1565c0", display: "inline-block", flexShrink: 0,
                            }}
                        />
                        <span>{formatShort(hi)}</span>
                        <span className="range-pill">{days} {days === 1 ? "day" : "days"}</span>
                    </>
                )}
            </div>

            {hasStart && (
                <button className="clear-btn" onClick={onClear}>
                    ✕ Clear
                </button>
            )}
        </div>
    );
}