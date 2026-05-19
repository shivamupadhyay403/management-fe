import React from 'react'
interface BadgeProps {
    children: string;
    color: string;
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
const Badge: React.FC<BadgeProps> = ({ children, color = "gray" }) => {
    const map = {
        green: { bg: C.greenL, text: C.greenDark }, amber: { bg: C.amberL, text: C.amberDark },
        red: { bg: C.redL, text: C.redDark }, blue: { bg: C.blueL, text: C.blueDark },
        gray: { bg: C.grayL, text: C.grayDark }, teal: { bg: C.tealL, text: C.tealDark },
        purple: { bg: C.purpleL, text: C.purpleDark },
    };
    const s = map[color] || map.gray;
    return (
        <span style={{
            background: s.bg, color: s.text, padding: "2px 9px", borderRadius: 20,
            fontSize: 10, fontWeight: 600, whiteSpace: "nowrap", display: "inline-block"
        }}>
            {children}
        </span>
    );
};

export default Badge