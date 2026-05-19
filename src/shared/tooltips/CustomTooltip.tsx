import React from "react";

interface PayloadItem {
    color?: string;
    fill?: string;
    name?: string;
    value?: string | number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: PayloadItem[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
}) => {
    if (!active || !payload?.length) return null;

    return (
        <div
            style={{
                background: "#fff",
                border: "0.5px solid #e4e2da",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 11,
            }}
        >
            <div
                style={{
                    fontWeight: 600,
                    marginBottom: 4,
                    color: "#1a1a18",
                }}
            >
                {label}
            </div>

            {payload.map((p, i) => (
                <div
                    key={i}
                    style={{
                        color: p.color || p.fill || "#000",
                    }}
                >
                    {p.name}: {p.value}
                </div>
            ))}
        </div>
    );
};

export default CustomTooltip;