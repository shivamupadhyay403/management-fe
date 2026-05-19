import React from 'react'
interface NotifItemProps {
    iconBg: string;
    iconColor?: string;
    icon?: string;
    title?: string;
    sub?: string;
    time?: string;
}
const NotifItem: React.FC<NotifItemProps> = ({ iconBg, iconColor, icon, title, sub, time }) => {
    return (
        <div style={{
            display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 0",
            borderBottom: "0.5px solid #ece9e1"
        }}>
            <div style={{
                width: 32, height: 32, borderRadius: 8, background: iconBg,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                fontSize: 15
            }}>
                {icon}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a18" }}>{title}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{sub}</div>
            </div>
            <div style={{ fontSize: 10, color: "#aaa", whiteSpace: "nowrap", marginTop: 2 }}>{time}</div>
        </div>
    )
}

export default NotifItem