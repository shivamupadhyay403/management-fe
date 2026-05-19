import React from "react";

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
interface AvatarProps {
    initials: string;
    bg?: string;
    color?: string;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
    initials,
    bg = C.blueL,
    color = C.blue,
    size = 32,
}) => {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: bg,
                color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: size * 0.32,
                fontWeight: 600,
                flexShrink: 0,
            }}
        >
            {initials}
        </div>
    );
};

export default Avatar;