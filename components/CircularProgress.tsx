"use client"

import React, { useEffect, useState } from "react"

interface CircularProgressProps {
    progress?: number // 0 to 100
    size?: number     // diameter in px
    strokeWidth?: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    progress = 0, // default 0
    size = 120,
    strokeWidth = 10,
}) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    const [offset, setOffset] = useState(circumference)

    useEffect(() => {
        const validProgress = isNaN(progress) ? 0 : Math.min(Math.max(progress, 0), 100)
        const progressOffset = circumference - (validProgress / 100) * circumference
        setOffset(progressOffset)
    }, [progress, circumference])

    return (
        <svg width={size} height={size}>
            {/* Background Circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#374151"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Progress Circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#3b82f6"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset.toString()} // cast to string
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
            />
            {/* Text in center */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={size / 5} // scales with circle
                fontWeight="bold"
            >
                {Math.round(isNaN(progress) ? 0 : progress)}%
            </text>
        </svg>
    )
}

export default CircularProgress
