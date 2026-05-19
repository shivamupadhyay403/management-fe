import Card from "@/src/shared/cards/Card";
import Badge from "@/src/shared/cards/Badge";
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
const classStudents = [
    { name: "Aanya Reddy", roll: "01", status: "Present" }, { name: "Bhavesh Singh", roll: "02", status: "Absent" },
    { name: "Charu Verma", roll: "03", status: "Present" }, { name: "Dev Patel", roll: "04", status: "Late" },
    { name: "Esha Joshi", roll: "05", status: "Present" }, { name: "Farhan Khan", roll: "06", status: "Present" },
    { name: "Geeta Rao", roll: "07", status: "Present" }, { name: "Harsh Mehta", roll: "08", status: "Absent" },
];
export default function TeacherGrades() {
    return (
        <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", marginBottom: 4 }}>Grades & marks</h2>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>Mid-term 2025 · Grade 10-A · Mathematics</p>
            <Card title="Mark entry grid — click to edit">
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: "left", fontSize: 10, fontWeight: 600, textTransform: "uppercase",
                                letterSpacing: "0.06em", color: "#aaa", paddingBottom: 8, borderBottom: "0.5px solid #ece9e1", width: "30%"
                            }}>Student</th>
                            {["Unit Test", "Mid-term", "Assignment", "Total", "Grade"].map(h => (
                                <th key={h} style={{
                                    textAlign: "center", fontSize: 10, fontWeight: 600, textTransform: "uppercase",
                                    letterSpacing: "0.06em", color: "#aaa", paddingBottom: 8, borderBottom: "0.5px solid #ece9e1"
                                }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {classStudents.slice(0, 6).map((s, i) => {
                            const ut = [18, 16, 19, 15, 20, 17][i], mt = [35, 32, 38, 28, 40, 34][i], asgn = [9, 8, 10, 7, 10, 8][i];
                            const total = ut + mt + asgn, grade = total >= 55 ? "A+" : total >= 50 ? "A" : total >= 45 ? "B+" : "B";
                            return (
                                <tr key={s.roll}>
                                    <td style={{ padding: "8px 0", borderBottom: "0.5px solid #ece9e1" }}>
                                        <span style={{ fontWeight: 500, color: "#1a1a18" }}>{s.name}</span>
                                    </td>
                                    {[ut, mt, asgn].map((v, j) => (
                                        <td key={j} style={{ padding: "8px 0", borderBottom: "0.5px solid #ece9e1", textAlign: "center" }}>
                                            <input defaultValue={v} style={{
                                                width: 40, border: "0.5px solid #e4e2da", borderRadius: 6,
                                                padding: "3px 6px", textAlign: "center", fontSize: 12, fontFamily: "inherit", outline: "none"
                                            }} />
                                        </td>
                                    ))}
                                    <td style={{
                                        padding: "8px 0", borderBottom: "0.5px solid #ece9e1", textAlign: "center",
                                        fontWeight: 600, color: "#1a1a18"
                                    }}>{total}</td>
                                    <td style={{ padding: "8px 0", borderBottom: "0.5px solid #ece9e1", textAlign: "center" }}>
                                        <Badge color={grade.includes("A") ? "green" : "blue"}>{grade}</Badge>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                    <button style={{
                        background: C.blue, color: "#fff", border: "none", borderRadius: 8,
                        padding: "9px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                    }}>Save marks</button>
                    <button style={{
                        background: "#f0ede6", color: "#1a1a18", border: "none", borderRadius: 8,
                        padding: "9px 18px", fontSize: 12, cursor: "pointer"
                    }}>Export PDF</button>
                </div>
            </Card>
        </div>
    );
}
