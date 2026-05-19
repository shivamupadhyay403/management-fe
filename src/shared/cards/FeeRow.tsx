import React from 'react'
interface FeeRowProps {
  label: string;
  value?: string;
  right?: string;
}

const FeeRow: React.FC<FeeRowProps> = ({ label, value, right }) => {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "7px 0", borderBottom: "0.5px solid #ece9e1", fontSize: 12
    }}>
      <span style={{ color: "#666" }}>{label}</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {value && <span style={{ fontWeight: 600, color: "#1a1a18" }}>{value}</span>}
        {right}
      </div>
    </div>
  )
}


export default FeeRow