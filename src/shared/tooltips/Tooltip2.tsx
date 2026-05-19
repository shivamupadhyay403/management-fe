import React from 'react'
interface Tooltip2Props {
    label: string;
    value?: string;
}

const Tooltip2: React.FC<Tooltip2Props> = ({ label, value }) => {
    return (
        <div style={{
            background: "#fff", border: "0.5px solid #e4e2da", borderRadius: 8,
            padding: "6px 12px", fontSize: 12
        }}>
            <div style={{ fontWeight: 600, color: "#1a1a18" }}>{label}</div>
            <div style={{ color: "#666" }}>{value}</div>
        </div>
    )
}

export default Tooltip2