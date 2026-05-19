"use client"
import React, { useState } from 'react'
import Card from '@/src/shared/cards/Card';
import Avatar from '@/src/shared/cards/Avatar';
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
const teacherMessages = [
    {
        from: "Priya's Parent", av: "PP", avc: C.tealL, avt: C.teal, time: "10:22 AM",
        msgs: [{ out: false, text: "Good morning! Priya was absent due to fever. She'll submit tomorrow." },
        { out: true, text: "Noted, thank you. Please share a medical note when she returns." },
        { out: false, text: "Of course, will do. Thanks!" }]
    },
    {
        from: "Rajan's Parent", av: "RP", avc: C.purpleL, avt: C.purple, time: "09:05 AM",
        msgs: [{ out: false, text: "Will Rajan's marks be updated before June 1?" },
        { out: true, text: "Yes, all marks will be published by May 25." }]
    },
];
function TeacherComms() {
    const [selected, setSelected] = useState(0);
    const [draft, setDraft] = useState("");
    return (
        <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", marginBottom: 20 }}>Messages</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
                <Card>
                    {teacherMessages.map((t, i) => (
                        <div key={i} onClick={() => setSelected(i)}
                            style={{
                                display: "flex", gap: 10, alignItems: "center", padding: "10px 0", cursor: "pointer",
                                borderBottom: "0.5px solid #ece9e1", background: selected === i ? "#f8f8f6" : "none",
                                borderRadius: selected === i ? 8 : 0, paddingLeft: selected === i ? 8 : 0
                            }}>
                            <Avatar initials={t.av} bg={t.avc} color={t.avt} size={32} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a18" }}>{t.from}</div>
                                <div style={{
                                    fontSize: 10, color: "#888", overflow: "hidden", whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}>{t.msgs[t.msgs.length - 1].text}</div>
                            </div>
                            <div style={{ fontSize: 10, color: "#aaa" }}>{t.time}</div>
                        </div>
                    ))}
                </Card>
                <Card>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
                        paddingBottom: 12, borderBottom: "0.5px solid #ece9e1"
                    }}>
                        <Avatar initials={teacherMessages[selected].av}
                            bg={teacherMessages[selected].avc} color={teacherMessages[selected].avt} size={34} />
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a18" }}>{teacherMessages[selected].from}</div>
                            <div style={{ fontSize: 10, color: "#aaa" }}>Parent</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 200, marginBottom: 16 }}>
                        {teacherMessages[selected].msgs.map((m, i) => (
                            <div key={i} style={{
                                background: m.out ? "#185FA5" : "#f8f8f6", color: m.out ? "#fff" : "#1a1a18",
                                padding: "9px 13px", borderRadius: 10, fontSize: 12,
                                alignSelf: m.out ? "flex-end" : "flex-start", maxWidth: "80%"
                            }}>{m.text}</div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <input value={draft} onChange={e => setDraft(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1, border: "0.5px solid #e4e2da", borderRadius: 8, padding: "9px 12px",
                                fontSize: 12, outline: "none", fontFamily: "inherit"
                            }} />
                        <button onClick={() => setDraft("")}
                            style={{
                                background: C.blue, color: "#fff", border: "none", borderRadius: 8,
                                padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                            }}>Send</button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default TeacherComms