import React from 'react'
import Badge from './Badge';
interface SchedItemProps {
    subj: string;
    meta1?: string;
    meta2?: string;
    status?: string;
    color?: string;
    right?: string;
}
const statusBadge = (s:string) => {
  if (s==="Present"||s==="Active"||s==="Done")  return <Badge color="green">{s}</Badge>;
  if (s==="Absent" ||s==="Overdue"||s==="Pending") return <Badge color="red">{s}</Badge>;
  if (s==="Late"   ||s==="On Leave") return <Badge color="amber">{s}</Badge>;
  if (s==="Now")  return <Badge color="blue">Now</Badge>;
  if (s==="Up")   return <Badge color="gray">Upcoming</Badge>;
  return <Badge color="gray">{s||"—"}</Badge>;
};
const SchedItem: React.FC<SchedItemProps> = ({ subj, meta1, meta2, status, color, right }) => {
    return (
        <div style={{
            display: "flex", gap: 10, alignItems: "stretch", padding: "9px 0",
            borderBottom: "0.5px solid #ece9e1"
        }}>
            <div style={{ width: 3, borderRadius: 2, background: color, flexShrink: 0, minHeight: 36 }} />
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a18" }}>{subj}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{meta1}{meta2 ? ` · ${meta2}` : ""}</div>
            </div>
            {status && statusBadge(status)}
            {right}
        </div>
    )
}


export default SchedItem