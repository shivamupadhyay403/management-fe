import React from 'react'
interface KpiCardProps {
  label?: string;
  value?: string | number;
  sub?: string;
  subColor?: string;
}
const KpiCard: React.FC<KpiCardProps> = ({ label, value, sub, subColor }) => {
    return (
        <div style={{ background: "#f8f8f6", borderRadius: 10, padding: "14px 16px", minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, color: "#1a1a18" }}>{value}</div>
            {sub && <div style={{ fontSize: 11, color: subColor || "#888", marginTop: 4 }}>{sub}</div>}
        </div>
    )
}


export default KpiCard