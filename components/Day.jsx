"use client";

import { isSameDay, isInRange, isToday, isWeekend } from "@/utils/dateUtils";

export default function Day({
    dayObj,
    startDate,
    endDate,
    hoverDate,
    onSelect,
    onHover,
    hasNote   // ✅ NEW PROP
}) {
    const { date, isCurrentMonth } = dayObj;

    const isStart = isSameDay(date, startDate);
    const isEnd = isSameDay(date, endDate);
    const isEndpoint = isStart || isEnd;

    // Use hoverDate as preview end when endDate not yet chosen
    const effectiveEnd = endDate || hoverDate;
    const inRange = isInRange(date, startDate, effectiveEnd);

    // Is this the hover endpoint (preview)?
    const isHoverEnd = !endDate && isSameDay(date, hoverDate) && !!startDate;

    const today = isToday(date);
    const weekend = isWeekend(date);

    // Build class list
    let cellClass = "day-cell";
    if (!isCurrentMonth) cellClass += " other-month";
    if (isEndpoint || isHoverEnd) cellClass += " is-endpoint";
    if (inRange) cellClass += " in-range";
    if (isStart && effectiveEnd) cellClass += " range-start-cell";
    if ((isEnd || isHoverEnd) && startDate) cellClass += " range-end-cell";
    if (today && isCurrentMonth) cellClass += " is-today";
    if (weekend && isCurrentMonth) cellClass += " is-weekend";

    const handleClick = () => { if (isCurrentMonth) onSelect(date); };
    const handleEnter = () => { if (isCurrentMonth) onHover(date); };
    const handleLeave = () => onHover(null);

    return (
        <div
            className={cellClass}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            title={isCurrentMonth ? date.toDateString() : ""}
        >
            <div className="day-inner">
                {date.getDate()}
            </div>

            {/* ✅ NOTE DOT (NEW) */}
            {hasNote && isCurrentMonth && (
                <span className="note-dot" />
            )}

            {/* Existing today dot */}
            {today && isCurrentMonth && !isEndpoint && (
                <span className="today-dot" />
            )}
        </div>
    );
}