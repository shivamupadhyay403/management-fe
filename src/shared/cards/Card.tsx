import React from 'react'
interface CardProps {
    title?: string;
    children?: React.ReactNode;
    style?: string | any
}
const Card: React.FC<CardProps> = ({ title, children, style = {} }) => {
    return (
        <div style={{
            background: "#fff", border: "0.5px solid #e4e2da", borderRadius: 14,
            padding: "16px 18px", ...style
        }}>
            {title && <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", marginBottom: 14 }}>{title}</div>}
            {children}
        </div>
    )
}

export default Card