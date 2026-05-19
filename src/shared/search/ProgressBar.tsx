import React from 'react'
interface ProgressBarProps {
    pct: string,
    color: string,
    height: number
}
const C = {
    blue: "#185FA5", blueL: "#E6F1FB", blueDark: "#0C447C",
    green: "#639922", greenL: "#EAF3DE", greenDark: "#3B6D11",
    amber: "#EF9F27", amberL: "#FAEEDA", amberDark: "#854F0B",
    red: "#E24B4A", redL: "#FCEBEB", redDark: "#A32D2D",
    teal: "#1D9E75", tealL: "#E1F5EE", tealDark: "#0F6E56",
    purple: "#7F77DD", purpleL: "#EEEDFE", purpleDark: "#534AB7",
    coral: "#D85A30", coralL: "#FAECE7", coralDark: "#993C1D",
    gray: "#888780", grayL: "#F1EFE8", grayDark: "#5F5E5A",
};
const ProgressBar: React.FC<ProgressBarProps> = ({ pct, color = C.blue, height = 6 }) => {
    return (
        <div style={{ height, borderRadius: height / 2, background: "#f0ede6", overflow: "hidden" }}>
            <div style={{
                width: `${pct}%`, height: "100%", background: color, borderRadius: height / 2,
                transition: "width 0.6s ease"
            }} />
        </div>
    )
}
export default ProgressBar