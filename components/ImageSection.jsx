"use client";

import { MONTHS, MONTH_IMAGES } from "@/utils/dateUtils";

export default function ImageSection({ year, month }) {
    const imgSrc = MONTH_IMAGES[month];

    return (
        <div className="img-section">
            {/* Hero photo */}
            <img src={imgSrc} alt={`${MONTHS[month]} ${year}`} />

            {/* Diagonal blue shape – bottom right (exact reference) */}
            <div className="diag-blue" />

            {/* White triangle – bottom left (exact reference) */}
            <div className="diag-white" />

            {/* Year + Month text – bottom right over blue */}
            <div className="month-label">
                <span className="year-txt">{year}</span>
                <span className="month-txt">{MONTHS[month].toUpperCase()}</span>
            </div>
        </div>
    );
}