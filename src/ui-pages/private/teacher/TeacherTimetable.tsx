// ─── TEACHER TIMETABLE FULL ──────────────────────────────────────────────────
import Card from "@/src/shared/cards/Card";
import StatRow from "@/src/shared/cards/StatRow";
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
const assignments = [
  {title:"Trigonometry worksheet",  subj:"Mathematics",due:"Today",   subs:18,total:28,status:"Pending Review"},
  {title:"Newton's laws lab report",subj:"Physics",    due:"May 19",  subs:25,total:28,status:"Pending Review"},
  {title:"Algebra problem set",     subj:"Mathematics",due:"Today",   subs:5, total:28,status:"Open"},
  {title:"Wave optics summary",     subj:"Physics",    due:"May 22",  subs:0, total:28,status:"Draft"},
];
const teacherTimetableFull = {
  Mon:[{subj:"Mathematics",class:"10-A",time:"08:00",room:"204"},{subj:"Free",class:"—",time:"09:00",room:"—"},{subj:"Mathematics",class:"9-B",time:"11:00",room:"101"},{subj:"Mathematics",class:"8-A",time:"14:00",room:"204"}],
  Tue:[{subj:"Physics",class:"10-A",time:"08:00",room:"Lab 1"},{subj:"Mathematics",class:"10-B",time:"09:00",room:"205"},{subj:"Free",class:"—",time:"11:00",room:"—"},{subj:"Mathematics",class:"9-A",time:"14:00",room:"102"}],
  Wed:[{subj:"Mathematics",class:"10-A",time:"08:00",room:"204"},{subj:"Mathematics",class:"8-B",time:"09:00",room:"103"},{subj:"Physics",class:"9-B",time:"11:00",room:"Lab 1"},{subj:"Free",class:"—",time:"14:00",room:"—"}],
  Thu:[{subj:"Free",class:"—",time:"08:00",room:"—"},{subj:"Mathematics",class:"10-A",time:"09:00",room:"204"},{subj:"Mathematics",class:"10-B",time:"11:00",room:"205"},{subj:"Physics",class:"8-A",time:"14:00",room:"Lab 1"}],
  Fri:[{subj:"Mathematics",class:"9-B",time:"08:00",room:"101"},{subj:"Physics",class:"10-A",time:"09:00",room:"Lab 1"},{subj:"Free",class:"—",time:"11:00",room:"—"},{subj:"Mathematics",class:"8-B",time:"14:00",room:"103"}],
  Sat:[{subj:"Mathematics",class:"10-A",time:"08:00",room:"204"},{subj:"Mathematics",class:"9-A",time:"09:00",room:"102"},{subj:"Free",class:"—",time:"11:00",room:"—"},{subj:"Free",class:"—",time:"14:00",room:"—"}],
};
const SUBJ_COLORS = {"Mathematics":C.blue,"Physics":C.green,"English":C.purple,"Chemistry":C.coral,"History":C.amber,"Computer Sc":C.teal,"Free":C.grayL};
export default function TeacherTimetable() {
  const days = Object.keys(teacherTimetableFull);
  const periods = ["08:00","09:00","11:00","14:00"];
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",margin:0}}>My weekly timetable</h2>
          <p style={{fontSize:12,color:"#888",marginTop:4}}>Mr. Arvind Sharma · Mathematics & Physics · 2024–25</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button style={{fontSize:11,border:"0.5px solid #e4e2da",background:"#fff",borderRadius:8,
            padding:"7px 14px",cursor:"pointer",color:"#666",fontFamily:"inherit"}}>Export PDF</button>
          <button style={{fontSize:11,background:C.blue,color:"#fff",border:"none",borderRadius:8,
            padding:"7px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>Request change</button>
        </div>
      </div>
      <StatRow items={[
        {label:"Classes per week",value:"18",sub:"Across 5 sections"},
        {label:"Free periods",     value:"6", sub:"This week"},
        {label:"Total hours",      value:"13.5h",sub:"Teaching time"},
        {label:"Classes today",    value:"3", sub:"Next at 11:00 AM"},
      ]}/>
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:600}}>
            <thead>
              <tr>
                <th style={{padding:"8px 12px",textAlign:"left",fontSize:10,fontWeight:600,
                  textTransform:"uppercase",color:"#aaa",borderBottom:"0.5px solid #ece9e1",width:80}}>Time</th>
                {days.map(d=>(
                  <th key={d} style={{padding:"8px 12px",textAlign:"center",fontSize:10,fontWeight:600,
                    textTransform:"uppercase",color: d==="Mon"?C.blue:"#aaa",
                    borderBottom:"0.5px solid #ece9e1"}}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((time,pi)=>(
                <tr key={time}>
                  <td style={{padding:"8px 12px",borderBottom:"0.5px solid #ece9e1",
                    fontSize:10,color:"#aaa",fontWeight:600,whiteSpace:"nowrap"}}>{time}</td>
                  {days.map(d=>{
                    const slot = teacherTimetableFull[d][pi];
                    const isFree = slot.subj==="Free";
                    const color = SUBJ_COLORS[slot.subj]||C.gray;
                    return (
                      <td key={d} style={{padding:4,borderBottom:"0.5px solid #ece9e1"}}>
                        {isFree ? (
                          <div style={{background:"#f8f8f6",borderRadius:8,padding:"8px",
                            textAlign:"center",color:"#ccc",fontSize:10,minHeight:52,
                            display:"flex",alignItems:"center",justifyContent:"center"}}>Free</div>
                        ) : (
                          <div style={{background:color+"18",border:`0.5px solid ${color}33`,
                            borderRadius:8,padding:"8px",cursor:"pointer",minHeight:52,
                            transition:"transform 0.1s"}}>
                            <div style={{fontSize:11,fontWeight:700,color}}>{slot.subj}</div>
                            <div style={{fontSize:10,color:"#888",marginTop:2}}>{slot.class}</div>
                            <div style={{fontSize:9,color:"#aaa",marginTop:1}}>Room {slot.room}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",gap:16,marginTop:14,flexWrap:"wrap"}}>
          {Object.entries(SUBJ_COLORS).filter(([k])=>k!=="Free").map(([subj,color])=>(
            <span key={subj} style={{fontSize:10,color:"#888",display:"flex",alignItems:"center",gap:4}}>
              <span style={{width:8,height:8,borderRadius:2,background:color,display:"inline-block"}}/>
              {subj}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
