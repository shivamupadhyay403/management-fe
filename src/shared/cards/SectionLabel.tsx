import React from 'react'
interface SectionLabelProps {
    children: any
}
const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => {
    return (
        <div style={{
            fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
            color: "#aaa", marginBottom: 12
        }}>{children}</div>
    )
}
export default SectionLabel