"use client"
import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  blue:   "#185FA5", blueL: "#E6F1FB", blueDark: "#0C447C",
  green:  "#639922", greenL: "#EAF3DE", greenDark: "#3B6D11",
  amber:  "#EF9F27", amberL: "#FAEEDA", amberDark: "#854F0B",
  red:    "#E24B4A", redL:   "#FCEBEB", redDark:   "#A32D2D",
  teal:   "#1D9E75", tealL:  "#E1F5EE", tealDark:  "#0F6E56",
  purple: "#7F77DD", purpleL:"#EEEDFE", purpleDark:"#534AB7",
  coral:  "#D85A30", coralL: "#FAECE7", coralDark: "#993C1D",
  gray:   "#888780", grayL:  "#F1EFE8", grayDark:  "#5F5E5A",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const attendanceTrend = [
  {m:"Jun",pct:88},{m:"Jul",pct:90},{m:"Aug",pct:87},{m:"Sep",pct:92},
  {m:"Oct",pct:91},{m:"Nov",pct:89},{m:"Dec",pct:93},{m:"Jan",pct:91},
  {m:"Feb",pct:88},{m:"Mar",pct:92},{m:"Apr",pct:94},{m:"May",pct:91},
];
const feeData = [
  {name:"Collected",value:72,color:C.blue},
  {name:"Pending",value:18,color:C.amber},
  {name:"Overdue",value:10,color:C.red},
];
const enrollmentData = [
  {grade:"Grade 6",boys:68,girls:72},{grade:"Grade 7",boys:74,girls:68},
  {grade:"Grade 8",boys:80,girls:76},{grade:"Grade 9",boys:72,girls:78},
  {grade:"Grade 10",boys:85,girls:82},{grade:"Grade 11",boys:70,girls:74},
  {grade:"Grade 12",boys:66,girls:70},
];
const revenueData = [
  {m:"Jan",collected:320000,pending:80000},{m:"Feb",collected:290000,pending:95000},
  {m:"Mar",collected:410000,pending:60000},{m:"Apr",collected:380000,pending:70000},
  {m:"May",collected:182000,pending:36000},
];
const admissions = [
  {name:"Aanya Reddy",class:"10-A",date:"May 14",status:"Active",av:"AR",avc:C.blueL,avt:C.blue},
  {name:"Siddh Kumar",class:"8-B", date:"May 13",status:"Active",av:"SK",avc:C.tealL,avt:C.teal},
  {name:"Priya Mehta", class:"12-C",date:"May 12",status:"Pending",av:"PM",avc:C.coralL,avt:C.coral},
  {name:"Rajan Arora", class:"6-A", date:"May 11",status:"Active",av:"RA",avc:C.purpleL,avt:C.purple},
  {name:"Nisha Gupta", class:"9-B", date:"May 10",status:"Active",av:"NG",avc:C.greenL,avt:C.green},
];
const staffList = [
  {name:"Mr. Arvind Sharma",dept:"Mathematics",classes:4,exp:"12 yrs",status:"Active"},
  {name:"Ms. Lata Krishnan", dept:"Physics",    classes:3,exp:"8 yrs", status:"Active"},
  {name:"Mr. Suresh Nair",   dept:"English",    classes:5,exp:"15 yrs",status:"Active"},
  {name:"Ms. Priti Verma",   dept:"Chemistry",  classes:3,exp:"6 yrs", status:"On Leave"},
  {name:"Mr. Dev Iyer",      dept:"History",    classes:4,exp:"10 yrs",status:"Active"},
];

// Teacher
const teacherTimetable = [
  {subj:"Mathematics",class:"10-A",time:"08:00–08:45",room:"Room 204",status:"Done",color:C.blue},
  {subj:"Physics Lab", class:"10-A",time:"09:00–09:45",room:"Lab 1",  status:"Now", color:C.green},
  {subj:"Mathematics",class:"9-B", time:"11:00–11:45",room:"Room 101",status:"Up",  color:C.amber},
  {subj:"Free Period", class:"—",   time:"12:00–12:45",room:"—",      status:"—",   color:C.gray},
  {subj:"Mathematics",class:"8-A", time:"14:00–14:45",room:"Room 204",status:"Up",  color:C.blue},
];
const classStudents = [
  {name:"Aanya Reddy", roll:"01",status:"Present"},{name:"Bhavesh Singh",roll:"02",status:"Absent"},
  {name:"Charu Verma", roll:"03",status:"Present"},{name:"Dev Patel",    roll:"04",status:"Late"},
  {name:"Esha Joshi",  roll:"05",status:"Present"},{name:"Farhan Khan",  roll:"06",status:"Present"},
  {name:"Geeta Rao",   roll:"07",status:"Present"},{name:"Harsh Mehta",  roll:"08",status:"Absent"},
];
const assignments = [
  {title:"Trigonometry worksheet",  subj:"Mathematics",due:"Today",   subs:18,total:28,status:"Pending Review"},
  {title:"Newton's laws lab report",subj:"Physics",    due:"May 19",  subs:25,total:28,status:"Pending Review"},
  {title:"Algebra problem set",     subj:"Mathematics",due:"Today",   subs:5, total:28,status:"Open"},
  {title:"Wave optics summary",     subj:"Physics",    due:"May 22",  subs:0, total:28,status:"Draft"},
];
const marksDistribution = [
  {range:"90-100",count:8,color:C.blue},{range:"75-90",count:12,color:C.green},
  {range:"60-75",count:5,color:C.amber},{range:"<60",count:3,color:C.red},
];
const teacherMessages = [
  {from:"Priya's Parent",av:"PP",avc:C.tealL,avt:C.teal,time:"10:22 AM",
   msgs:[{out:false,text:"Good morning! Priya was absent due to fever. She'll submit tomorrow."},
         {out:true,text:"Noted, thank you. Please share a medical note when she returns."},
         {out:false,text:"Of course, will do. Thanks!"}]},
  {from:"Rajan's Parent", av:"RP",avc:C.purpleL,avt:C.purple,time:"09:05 AM",
   msgs:[{out:false,text:"Will Rajan's marks be updated before June 1?"},
         {out:true,text:"Yes, all marks will be published by May 25."}]},
];

// Student
const studentSchedule = [
  {subj:"Mathematics",teacher:"Mr. Arvind",room:"Room 204",time:"08:00–08:45",status:"Done",color:C.blue},
  {subj:"Physics",    teacher:"Ms. Lata",  room:"Lab 1",  time:"09:00–09:45",status:"Now", color:C.green},
  {subj:"English Lit",teacher:"Mr. Suresh",room:"Room 110",time:"11:00–11:45",status:"Up",  color:C.purple},
  {subj:"Chemistry",  teacher:"Ms. Priti", room:"Lab 2",  time:"12:00–12:45",status:"Up",  color:C.coral},
  {subj:"Computer Sc",teacher:"Mr. Dev",   room:"Room 302",time:"14:00–14:45",status:"Up",  color:C.teal},
];
const grades = [
  {subj:"Mathematics", marks:92,total:100,grade:"A+",color:C.green},
  {subj:"Physics",     marks:85,total:100,grade:"A", color:C.green},
  {subj:"Chemistry",   marks:78,total:100,grade:"B+",color:C.blue},
  {subj:"English Lit", marks:88,total:100,grade:"A", color:C.green},
  {subj:"Computer Sc", marks:95,total:100,grade:"A+",color:C.green},
  {subj:"History",     marks:74,total:100,grade:"B", color:C.blue},
];
const studentPendingAsgn = [
  {title:"Algebra problem set",  subj:"Mathematics",due:"Today",   urgency:"red"},
  {title:"Newton's laws lab report",subj:"Physics",due:"May 19",urgency:"amber"},
  {title:"Chapter 5 summary",   subj:"English Lit",due:"May 21",urgency:"blue"},
];
const attendanceDots = [
  "P","P","A","P","P","H","H","P","P","P","L","P","P","H","H","P","P","A","P","P","P","H","H"
];
const studentAttTrend = [
  {m:"Dec",pct:88},{m:"Jan",pct:90},{m:"Feb",pct:95},{m:"Mar",pct:91},{m:"Apr",pct:92},{m:"May",pct:92}
];

// Parent
const feeLedger = [
  {item:"Tuition fee — Q1",amount:18000,status:"Paid",date:"Apr 1"},
  {item:"Tuition fee — Q2",amount:18000,status:"Paid",date:"Jan 1"},
  {item:"Transport fee",   amount:6000, status:"Paid",date:"Apr 1"},
  {item:"Exam fee",        amount:2500, status:"Paid",date:"Mar 10"},
  {item:"Library fee",     amount:1500, status:"Paid",date:"Apr 1"},
  {item:"Tuition fee — Q3",amount:18000,status:"Due Jun 1",date:"Jun 1"},
];
const parentNotifications = [
  {icon:"🔔",title:"Mid-term report card available",sub:"Aanya scored 8.6 GPA · Download PDF",time:"Today",color:C.tealL,tc:C.teal},
  {icon:"📅",title:"Parent-teacher meeting — May 24",sub:"10:00 AM · Auditorium · RSVP required",time:"Yesterday",color:C.amberL,tc:C.amber},
  {icon:"🧾",title:"Q3 fee due June 1 — ₹18,000",sub:"Pay online via Razorpay or at school office",time:"2d ago",color:C.blueL,tc:C.blue},
  {icon:"✅",title:"Attendance marked present",sub:"Aanya arrived at 07:52 AM",time:"Today",color:C.greenL,tc:C.green},
];

// ─── Tiny Components ─────────────────────────────────────────────────────────
const statusBadge = (s) => {
  if (s==="Present"||s==="Active"||s==="Done")  return <Badge color="green">{s}</Badge>;
  if (s==="Absent" ||s==="Overdue"||s==="Pending") return <Badge color="red">{s}</Badge>;
  if (s==="Late"   ||s==="On Leave") return <Badge color="amber">{s}</Badge>;
  if (s==="Now")  return <Badge color="blue">Now</Badge>;
  if (s==="Up")   return <Badge color="gray">Upcoming</Badge>;
  return <Badge color="gray">{s||"—"}</Badge>;
};







// ─── Sidebar ─────────────────────────────────────────────────────────────────
const ROLE_NAVS = {
  admin: [
    {id:"overview",   icon:"🏠", label:"Overview"},
    {id:"students",   icon:"👨‍🎓",label:"Students"},
    {id:"staff",      icon:"👨‍🏫",label:"Staff"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"fees",       icon:"💳", label:"Fees"},
    {id:"academics",  icon:"📚", label:"Academics"},
    {id:"timetable",  icon:"🗓", label:"Timetable"},
    {id:"comms",      icon:"💬", label:"Communication"},
    {id:"reports",    icon:"📊", label:"Reports"},
    {id:"settings",   icon:"⚙️", label:"Settings"},
  ],
  teacher: [
    {id:"overview",   icon:"🏠", label:"My Dashboard"},
    {id:"timetable",  icon:"🗓", label:"My Timetable"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"assignments",icon:"📝", label:"Assignments"},
    {id:"grades",     icon:"🎯", label:"Grades & Marks"},
    {id:"comms",      icon:"💬", label:"Messages"},
  ],
  student: [
    {id:"overview",   icon:"🏠", label:"My Dashboard"},
    {id:"timetable",  icon:"🗓", label:"Schedule"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"academics",  icon:"📚", label:"Grades"},
    {id:"assignments",icon:"📝", label:"Assignments"},
    {id:"fees",       icon:"💳", label:"Fee Status"},
    {id:"comms",      icon:"💬", label:"Notices"},
  ],
  parent: [
    {id:"overview",   icon:"🏠", label:"Overview"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"academics",  icon:"📚", label:"Grades"},
    {id:"fees",       icon:"💳", label:"Fees"},
    {id:"comms",      icon:"💬", label:"Messages"},
    {id:"notices",    icon:"🔔", label:"Notifications"},
  ],
};

const ROLE_META = {
  admin:   {label:"Admin",   sub:"St. Xavier's School", color:C.blue,   icon:"🛡"},
  teacher: {label:"Mr. Arvind Sharma", sub:"Mathematics · Grade 10A", color:C.teal, icon:"👨‍🏫"},
  student: {label:"Aanya Reddy", sub:"Grade 10-A · Roll No. 01", color:C.purple, icon:"👩‍🎓"},
  parent:  {label:"Mr. Sunil Reddy", sub:"Parent of Aanya Reddy", color:C.coral, icon:"👨‍👧"},
};


// ─── STUDENT SECTIONS ─────────────────────────────────────────────────────────
function StudentOverview() {
  return (
    <div>
      <SectionLabel>My dashboard</SectionLabel>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>
        <KpiCard label="Current GPA" value="8.6" sub="Mid-term 2025" subColor={C.greenDark}/>
        <KpiCard label="Attendance" value="92%" sub="This month" subColor={C.greenDark}/>
        <KpiCard label="Pending tasks" value="3" sub="Due this week" subColor={C.redDark}/>
        <KpiCard label="Notices" value="2" sub="Unread"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <Card title="Today's schedule">
          {studentSchedule.map((s,i)=>(
            <SchedItem key={i} subj={s.subj} meta1={s.time} meta2={`${s.teacher} · ${s.room}`}
              status={s.status} color={s.color}/>
          ))}
        </Card>
        <Card title="My grades — Mid-term 2025">
          {grades.map((g,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",
              borderBottom:"0.5px solid #ece9e1"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:500,color:"#1a1a18"}}>{g.subj}</div>
                <div style={{marginTop:4}}>
                  <ProgressBar pct={g.marks} color={g.color} height={4}/>
                </div>
              </div>
              <span style={{fontSize:12,color:"#888",minWidth:40,textAlign:"right"}}>{g.marks}/100</span>
              <span style={{fontSize:14,fontWeight:700,color:g.color,minWidth:28,textAlign:"right"}}>{g.grade}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:12,paddingTop:10,
            borderTop:"0.5px solid #ece9e1",fontSize:12}}>
            <span style={{color:"#888"}}>Overall GPA</span>
            <span style={{fontWeight:700,fontSize:14,color:C.green}}>8.6 / 10</span>
          </div>
        </Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card title="Attendance — May 2025">
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
            {attendanceDots.map((d,i)=>(
              <div key={i} title={d==="P"?"Present":d==="A"?"Absent":d==="L"?"Late":"Holiday"}
                style={{width:14,height:14,borderRadius:3,
                  background:d==="P"?C.green:d==="A"?C.red:d==="L"?C.amber:"#f0ede6"}}/>
            ))}
          </div>
          <div style={{display:"flex",gap:12,fontSize:10,color:"#888",marginBottom:12}}>
            {[["P",C.green,"Present"],["A",C.red,"Absent"],["L",C.amber,"Late"],["H","#f0ede6","Holiday"]].map(([k,c,l])=>(
              <span key={k}><span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:c,marginRight:4}}/>
              {l}</span>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}>
            <span style={{color:"#888"}}>Monthly attendance</span><span style={{fontWeight:600}}>92%</span>
          </div>
          <ProgressBar pct={92} color={C.green}/>
        </Card>
        <Card title="Pending assignments">
          {studentPendingAsgn.map((a,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"9px 0",
              borderBottom:"0.5px solid #ece9e1"}}>
              <div style={{width:32,height:32,borderRadius:8,background:C[a.urgency+"L"]||C.blueL,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                📝
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:500,color:"#1a1a18"}}>{a.title}</div>
                <div style={{fontSize:11,color:"#888",marginTop:2}}>{a.subj}</div>
              </div>
              <Badge color={a.urgency}>{a.due}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function StudentAttendance() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>My attendance</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Grade 10-A · Academic Year 2024–25</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
        <KpiCard label="Present days" value="84" sub="Out of 92 working days"/>
        <KpiCard label="Absent days" value="5" sub="3 with medical note"/>
        <KpiCard label="Late arrivals" value="3" sub="This year"/>
        <KpiCard label="Attendance %" value="92%" sub="Required: 75%" subColor={C.greenDark}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16}}>
        <Card title="Subject-wise attendance">
          {grades.map((g,i)=>{
            const pct=[96,90,88,94,98,85][i];
            return (
              <div key={i} style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{fontWeight:500,color:"#1a1a18"}}>{g.subj}</span>
                  <span style={{fontWeight:600,color:pct>=90?C.greenDark:C.amberDark}}>{pct}%</span>
                </div>
                <ProgressBar pct={pct} color={pct>=90?C.green:C.amber}/>
              </div>
            );
          })}
        </Card>
        <Card title="Monthly trend">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={studentAttTrend}>
              <defs>
                <linearGradient id="sattGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.green} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6"/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}/>
              <YAxis domain={[80,100]} tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}
                tickFormatter={v=>v+"%"}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="pct" name="Attendance %" stroke={C.green}
                fill="url(#sattGrad)" strokeWidth={2} dot={{r:3,fill:C.green}}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function StudentAcademics() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>My grades</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Mid-term 2025 · Grade 10-A</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
        <KpiCard label="GPA" value="8.6 / 10" sub="Mid-term 2025" subColor={C.greenDark}/>
        <KpiCard label="Class rank" value="2nd" sub="Out of 28 students"/>
        <KpiCard label="Best subject" value="Computer Sc." sub="95/100 · A+"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card title="Subject report card">
          {grades.map((g,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"10px 0",borderBottom:"0.5px solid #ece9e1"}}>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:"#1a1a18"}}>{g.subj}</div>
                <div style={{fontSize:10,color:"#888",marginTop:2}}>{g.marks}/{g.total} marks</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <ProgressBar pct={g.marks} color={g.color} height={5}/>
                <span style={{fontSize:15,fontWeight:700,color:g.color,minWidth:30}}>{g.grade}</span>
              </div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0",
            fontSize:13,fontWeight:700}}>
            <span>Overall GPA</span>
            <span style={{color:C.green}}>8.6 / 10</span>
          </div>
        </Card>
        <Card title="Performance radar">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={grades} layout="vertical" barSize={10} margin={{left:60}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" horizontal={false}/>
              <XAxis type="number" domain={[0,100]} tick={{fontSize:9,fill:"#aaa"}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="subj" tick={{fontSize:10,fill:"#666"}} axisLine={false} tickLine={false}
                width={60}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="marks" name="Marks" radius={[0,4,4,0]}>
                {grades.map((g,i)=><Cell key={i} fill={g.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function StudentFees() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>Fee status</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Academic Year 2024–25</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
        <KpiCard label="Total fee" value="₹64,000" sub="Annual 2024–25"/>
        <KpiCard label="Paid to date" value="₹46,000" sub="↑ All dues cleared" subColor={C.greenDark}/>
        <KpiCard label="Next due" value="₹18,000" sub="Q3 · Due Jun 1" subColor={C.amberDark}/>
      </div>
      <Card title="Fee ledger">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead>
            <tr>{["Fee item","Amount","Due date","Paid on","Status"].map(h=>(
              <th key={h} style={{textAlign:"left",fontSize:10,fontWeight:600,textTransform:"uppercase",
                letterSpacing:"0.06em",color:"#aaa",paddingBottom:8,borderBottom:"0.5px solid #ece9e1"}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {feeLedger.map((f,i)=>(
              <tr key={i}>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",fontWeight:500,color:"#1a1a18"}}>{f.item}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>₹{f.amount.toLocaleString()}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{f.date}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>
                  {f.status==="Paid"?"May 16":f.date}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1"}}>
                  <Badge color={f.status==="Paid"?"green":"amber"}>{f.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function StudentComms() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:20}}>Notices & announcements</h2>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[{icon:"📢",title:"Annual Day rehearsal — All students",
            body:"All students must report to the auditorium by 3:00 PM on May 20 for Annual Day rehearsal. Attendance is mandatory.",
            from:"School Admin",date:"May 17",color:C.blueL},
          {icon:"📅",title:"Holiday declared — May 19",
            body:"School will remain closed on May 19 due to a state-level examination. Classes will resume on May 20.",
            from:"Principal's Office",date:"May 16",color:C.amberL},
          {icon:"📚",title:"Library books due — May 22",
            body:"All borrowed library books must be returned by May 22 to avoid fine charges.",
            from:"Library Dept.",date:"May 15",color:C.greenL},
        ].map((n,i)=>(
          <Card key={i}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{width:38,height:38,borderRadius:10,background:n.color,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{n.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:"#1a1a18",marginBottom:4}}>{n.title}</div>
                <div style={{fontSize:12,color:"#666",lineHeight:1.6}}>{n.body}</div>
                <div style={{fontSize:10,color:"#aaa",marginTop:8}}>{n.from} · {n.date}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StudentAssignments() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>My assignments</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Active submissions</p>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[{...studentPendingAsgn[0],desc:"Solve problems 1–15 from Chapter 8.",maxMarks:20,submitted:false},
          {title:"Newton's laws lab report",subj:"Physics",due:"May 19",urgency:"amber",
            desc:"Submit a 2-page lab report on your observations from the last experiment.",maxMarks:30,submitted:false},
          {title:"Chapter 5 summary",subj:"English Lit",due:"May 21",urgency:"blue",
            desc:"Write a 500-word summary of Chapter 5 from the prescribed novel.",maxMarks:15,submitted:false},
          {title:"Periodic table quiz",subj:"Chemistry",due:"May 10",urgency:"green",
            desc:"Completed online quiz.",maxMarks:10,submitted:true,marks:9},
        ].map((a,i)=>(
          <Card key={i}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:"#1a1a18"}}>{a.title}</div>
                <div style={{fontSize:11,color:"#888",marginTop:2}}>{a.subj} · Max marks: {a.maxMarks}</div>
              </div>
              <Badge color={a.submitted?"green":a.urgency}>{a.submitted?`${a.marks}/${a.maxMarks}`:a.due}</Badge>
            </div>
            <p style={{fontSize:12,color:"#666",lineHeight:1.6,margin:0}}>{a.desc}</p>
            {!a.submitted && (
              <button style={{marginTop:12,background:C.blue,color:"#fff",border:"none",borderRadius:8,
                padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                Upload submission
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── PARENT SECTIONS ──────────────────────────────────────────────────────────
function ParentOverview() {
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:14,background:"#f8f8f6",
        borderRadius:12,padding:"14px 16px",marginBottom:20}}>
        <Avatar initials="AR" bg={C.blueL} color={C.blue} size={44}/>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:"#1a1a18"}}>Aanya Reddy</div>
          <div style={{fontSize:12,color:"#888",marginTop:2}}>Grade 10 – Section A · Roll No. 01</div>
        </div>
        <Badge color="green" style={{marginLeft:"auto"}}>Present today</Badge>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>
        <KpiCard label="Attendance" value="92%" sub="Above class avg" subColor={C.greenDark}/>
        <KpiCard label="GPA" value="8.6" sub="Mid-term 2025"/>
        <KpiCard label="Fees due" value="₹0" sub="All cleared ✓" subColor={C.greenDark}/>
        <KpiCard label="Assignments" value="3" sub="Pending" subColor={C.amberDark}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <Card title="Attendance trend — last 6 months">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={studentAttTrend}>
              <defs>
                <linearGradient id="pattGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.green} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6"/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}/>
              <YAxis domain={[80,100]} tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}
                tickFormatter={v=>v+"%"}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="pct" name="Attendance %" stroke={C.green}
                fill="url(#pattGrad)" strokeWidth={2} dot={{r:3,fill:C.green}}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Aanya's grades — Mid-term">
          {grades.map((g,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",
              borderBottom:"0.5px solid #ece9e1"}}>
              <span style={{flex:1,fontSize:11,color:"#1a1a18",fontWeight:500}}>{g.subj}</span>
              <span style={{fontSize:11,color:"#888"}}>{g.marks}/100</span>
              <Badge color={g.grade.includes("A")?"green":"blue"}>{g.grade}</Badge>
            </div>
          ))}
        </Card>
      </div>
      <Card title="Notifications">
        {parentNotifications.map((n,i)=>(
          <NotifItem key={i} iconBg={n.color} icon={n.icon} title={n.title} sub={n.sub} time={n.time}/>
        ))}
      </Card>
    </div>
  );
}

function ParentFees() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>Fee management</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Aanya Reddy · Grade 10-A · 2024–25</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
        <KpiCard label="Total annual fee" value="₹64,000"/>
        <KpiCard label="Paid" value="₹46,000" sub="72% complete" subColor={C.greenDark}/>
        <KpiCard label="Next due" value="₹18,000" sub="Jun 1, 2025" subColor={C.amberDark}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16}}>
        <Card title="Fee ledger">
          {feeLedger.map((f,i)=>(
            <FeeRow key={i} label={f.item} value={"₹"+f.amount.toLocaleString()}
              right={<Badge color={f.status==="Paid"?"green":"amber"}>{f.status}</Badge>}/>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:14,paddingTop:10,
            borderTop:"0.5px solid #ece9e1",fontSize:13,fontWeight:700}}>
            <span>Total paid</span>
            <span style={{color:C.greenDark}}>₹46,000</span>
          </div>
        </Card>
        <Card title="Quick payment">
          <div style={{fontSize:13,fontWeight:600,color:"#1a1a18",marginBottom:4}}>Tuition fee — Q3</div>
          <div style={{fontSize:22,fontWeight:700,color:"#1a1a18",marginBottom:4}}>₹18,000</div>
          <div style={{fontSize:11,color:C.amberDark,marginBottom:16}}>Due: June 1, 2025</div>
          {["UPI / QR Code","Credit / Debit Card","Net Banking"].map((m,i)=>(
            <button key={i} style={{width:"100%",background:"#f8f8f6",border:"0.5px solid #e4e2da",
              borderRadius:8,padding:"10px 12px",fontSize:12,cursor:"pointer",marginBottom:8,
              textAlign:"left",fontFamily:"inherit",display:"flex",alignItems:"center",gap:8}}>
              <span>{["📱","💳","🏦"][i]}</span> {m}
            </button>
          ))}
          <button style={{width:"100%",background:C.blue,color:"#fff",border:"none",borderRadius:8,
            padding:10,fontSize:12,fontWeight:700,cursor:"pointer",marginTop:4}}>
            Pay now →
          </button>
        </Card>
      </div>
    </div>
  );
}

function ParentComms() {
  const [draft, setDraft] = useState("");
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:20}}>Messages to teachers</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
        <Card>
          {[{name:"Ms. Lata",sub:"Physics",av:"ML",avc:C.tealL,avt:C.teal},
            {name:"Mr. Arvind",sub:"Mathematics",av:"MA",avc:C.blueL,avt:C.blue},
            {name:"Mr. Suresh",sub:"English",av:"MS",avc:C.purpleL,avt:C.purple},
          ].map((t,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",
              cursor:"pointer",borderBottom:"0.5px solid #ece9e1"}}>
              <Avatar initials={t.av} bg={t.avc} color={t.avt} size={32}/>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:"#1a1a18"}}>{t.name}</div>
                <div style={{fontSize:10,color:"#888"}}>{t.sub}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card title="Ms. Lata (Physics)">
          <div style={{display:"flex",flexDirection:"column",gap:8,minHeight:200,marginBottom:16}}>
            {[{out:true,text:"Hello, Aanya missed the lab session last week. Is there a makeup class?"},
              {out:false,text:"Hi! Yes, there's a makeup session this Saturday 10 AM. Please confirm attendance."},
              {out:true,text:"Thank you! She'll be there."},
            ].map((m,i)=>(
              <div key={i} style={{
                background:m.out?"#185FA5":"#f8f8f6",color:m.out?"#fff":"#1a1a18",
                padding:"9px 13px",borderRadius:10,fontSize:12,
                alignSelf:m.out?"flex-end":"flex-start",maxWidth:"80%"
              }}>{m.text}</div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <input value={draft} onChange={e=>setDraft(e.target.value)}
              placeholder="Write a message..."
              style={{flex:1,border:"0.5px solid #e4e2da",borderRadius:8,padding:"9px 12px",
                fontSize:12,outline:"none",fontFamily:"inherit"}}/>
            <button onClick={()=>setDraft("")}
              style={{background:C.blue,color:"#fff",border:"none",borderRadius:8,
                padding:"9px 16px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Send</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ParentNotices() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:20}}>Notifications</h2>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[...parentNotifications,
          {icon:"📋",title:"Mid-term results published",sub:"Aanya's report card is ready to download",time:"3d ago",color:C.purpleL},
          {icon:"🚌",title:"Bus route change — May 20",sub:"Route B will take the new bypass road from May 20.",time:"4d ago",color:C.coralL},
        ].map((n,i)=>(
          <Card key={i}>
            <NotifItem iconBg={n.color} icon={n.icon} title={n.title} sub={n.sub} time={n.time}/>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ParentAttendance() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>Aanya's attendance</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Grade 10-A · Academic Year 2024–25</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
        <KpiCard label="Present" value="84" sub="Out of 92 days"/>
        <KpiCard label="Absent" value="5" sub="3 notified in advance"/>
        <KpiCard label="Late" value="3" sub="This year"/>
        <KpiCard label="Overall" value="92%" sub="Target: 75%" subColor={C.greenDark}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card title="May 2025 — daily view">
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
            {attendanceDots.map((d,i)=>(
              <div key={i} style={{width:16,height:16,borderRadius:4,
                background:d==="P"?C.green:d==="A"?C.red:d==="L"?C.amber:"#f0ede6"}}/>
            ))}
          </div>
          <div style={{display:"flex",gap:12,fontSize:10,color:"#888"}}>
            {[["P",C.green,"Present"],["A",C.red,"Absent"],["L",C.amber,"Late"],["H","#f0ede6","Holiday"]].map(([k,c,l])=>(
              <span key={k}><span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:c,marginRight:4}}/>
              {l}</span>
            ))}
          </div>
        </Card>
        <Card title="6-month trend">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={studentAttTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6"/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}/>
              <YAxis domain={[80,100]} tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}
                tickFormatter={v=>v+"%"}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Line type="monotone" dataKey="pct" name="%" stroke={C.green} strokeWidth={2}
                dot={{r:4,fill:C.green}}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

// ─── Section routers ─────────────────────────────────────────────────────────
// ─── EXTRA DATA ──────────────────────────────────────────────────────────────
const busRoutes = [
  {id:"R1",name:"Route A — North",stops:["School","MG Road","Gandhi Nagar","Sector 12","Rajpur"],students:38,driver:"Ram Singh",bus:"KA-01-1234",status:"Active"},
  {id:"R2",name:"Route B — South",stops:["School","Station Road","New Colony","Palm Ave","Lake View"],students:42,driver:"Shyam Rao",bus:"KA-01-5678",status:"Active"},
  {id:"R3",name:"Route C — East", stops:["School","Ring Road","Whitefield","Marathahalli","ORR"],students:29,driver:"Anwar Khan",bus:"KA-01-9012",status:"On route"},
  {id:"R4",name:"Route D — West", stops:["School","Old Town","Heritage Rd","Civil Lines"],students:33,driver:"Sunil Das",bus:"KA-01-3456",status:"Inactive"},
];
const libraryBooks = [
  {title:"Mathematics — Part I",author:"NCERT",isbn:"978-81-7450-000-1",copies:8,available:5,genre:"Textbook"},
  {title:"The Alchemist",       author:"Paulo Coelho",isbn:"978-0-06-231609-7",copies:4,available:2,genre:"Fiction"},
  {title:"Wings of Fire",       author:"A.P.J. Abdul Kalam",isbn:"978-81-7371-146-6",copies:6,available:6,genre:"Biography"},
  {title:"Physics — Vol 1",     author:"H.C. Verma",isbn:"978-81-7709-187-7",copies:10,available:3,genre:"Textbook"},
  {title:"To Kill a Mockingbird",author:"Harper Lee",isbn:"978-0-06-112008-4",copies:3,available:1,genre:"Fiction"},
  {title:"Python Programming",  author:"Mark Lutz",isbn:"978-1-4493-5547-2",copies:5,available:4,genre:"Technology"},
];
const hostelBlocks = [
  {block:"Block A — Boys",   rooms:40,occupied:36,capacity:80,warden:"Mr. Kapoor",   meals:"Veg"},
  {block:"Block B — Boys",   rooms:35,occupied:30,capacity:70,warden:"Mr. Mehta",    meals:"Veg/Non-veg"},
  {block:"Block C — Girls",  rooms:40,occupied:38,capacity:80,warden:"Ms. Sharma",   meals:"Veg"},
  {block:"Block D — Girls",  rooms:30,occupied:22,capacity:60,warden:"Ms. Krishnan", meals:"Veg"},
];
const examSchedule = [
  {name:"Mathematics Unit Test", class:"Grade 10",date:"May 22",time:"09:00",duration:90, room:"Hall A",marks:50, status:"Scheduled"},
  {name:"Physics Lab Test",      class:"Grade 9", date:"May 23",time:"10:00",duration:60, room:"Lab 1", marks:30, status:"Scheduled"},
  {name:"English Essay",         class:"Grade 11",date:"May 24",time:"09:00",duration:120,room:"Hall B",marks:40, status:"Scheduled"},
  {name:"Chemistry Mid-term",    class:"Grade 12",date:"May 25",time:"09:00",duration:180,room:"Room 305",marks:100,status:"Scheduled"},
  {name:"History Test",          class:"Grade 8", date:"May 20",time:"11:00",duration:60, room:"Room 201",marks:50, status:"Completed"},
  {name:"Computer Science",      class:"Grade 10",date:"May 18",time:"09:00",duration:90, room:"Lab 2", marks:50, status:"Completed"},
];
const reportCardData = {
  student:"Aanya Reddy", class:"Grade 10-A", rollNo:"01", exam:"Mid-term 2025",
  subjects:[
    {name:"Mathematics",   max:100,ut:18,mid:38,asgn:9, total:65,grade:"A+"},
    {name:"Physics",       max:100,ut:16,mid:35,asgn:8, total:59,grade:"A"},
    {name:"Chemistry",     max:100,ut:14,mid:32,asgn:8, total:54,grade:"B+"},
    {name:"English Lit",   max:100,ut:17,mid:36,asgn:9, total:62,grade:"A"},
    {name:"Computer Sc",   max:100,ut:19,mid:40,asgn:10,total:69,grade:"A+"},
    {name:"History",       max:100,ut:13,mid:30,asgn:7, total:50,grade:"B"},
  ],
  gpa:8.6, rank:2, totalStudents:28, teacherRemark:"Excellent performance. Keep it up!",
};
const teacherTimetableFull = {
  Mon:[{subj:"Mathematics",class:"10-A",time:"08:00",room:"204"},{subj:"Free",class:"—",time:"09:00",room:"—"},{subj:"Mathematics",class:"9-B",time:"11:00",room:"101"},{subj:"Mathematics",class:"8-A",time:"14:00",room:"204"}],
  Tue:[{subj:"Physics",class:"10-A",time:"08:00",room:"Lab 1"},{subj:"Mathematics",class:"10-B",time:"09:00",room:"205"},{subj:"Free",class:"—",time:"11:00",room:"—"},{subj:"Mathematics",class:"9-A",time:"14:00",room:"102"}],
  Wed:[{subj:"Mathematics",class:"10-A",time:"08:00",room:"204"},{subj:"Mathematics",class:"8-B",time:"09:00",room:"103"},{subj:"Physics",class:"9-B",time:"11:00",room:"Lab 1"},{subj:"Free",class:"—",time:"14:00",room:"—"}],
  Thu:[{subj:"Free",class:"—",time:"08:00",room:"—"},{subj:"Mathematics",class:"10-A",time:"09:00",room:"204"},{subj:"Mathematics",class:"10-B",time:"11:00",room:"205"},{subj:"Physics",class:"8-A",time:"14:00",room:"Lab 1"}],
  Fri:[{subj:"Mathematics",class:"9-B",time:"08:00",room:"101"},{subj:"Physics",class:"10-A",time:"09:00",room:"Lab 1"},{subj:"Free",class:"—",time:"11:00",room:"—"},{subj:"Mathematics",class:"8-B",time:"14:00",room:"103"}],
  Sat:[{subj:"Mathematics",class:"10-A",time:"08:00",room:"204"},{subj:"Mathematics",class:"9-A",time:"09:00",room:"102"},{subj:"Free",class:"—",time:"11:00",room:"—"},{subj:"Free",class:"—",time:"14:00",room:"—"}],
};
const SUBJ_COLORS = {"Mathematics":C.blue,"Physics":C.green,"English":C.purple,"Chemistry":C.coral,"History":C.amber,"Computer Sc":C.teal,"Free":C.grayL};

// ─── SHARED SEARCH BAR ────────────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div style={{position:"relative"}}>
      <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",
        fontSize:14,color:"#aaa",pointerEvents:"none"}}>🔍</span>
      <input value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        style={{border:"0.5px solid #e4e2da",borderRadius:8,padding:"8px 12px 8px 32px",
          fontSize:12,outline:"none",fontFamily:"inherit",width:"100%",background:"#faf9f6"}}/>
    </div>
  );
}

// ─── STAT ROW ────────────────────────────────────────────────────────────────
function StatRow({ items }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:`repeat(${items.length},1fr)`,gap:10,marginBottom:20}}>
      {items.map((it,i)=><KpiCard key={i} {...it}/>)}
    </div>
  );
}

// ─── TEACHER TIMETABLE FULL ──────────────────────────────────────────────────
function TeacherTimetable() {
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

// ─── LIBRARY ─────────────────────────────────────────────────────────────────
function LibraryManagement() {
  const [search, setSearch] = useState("");
  const filtered = libraryBooks.filter(b=>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",margin:0}}>Library management</h2>
          <p style={{fontSize:12,color:"#888",marginTop:4}}>Book catalog · Issue & return tracking</p>
        </div>
        <button style={{background:C.teal,color:"#fff",border:"none",borderRadius:8,
          padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add book</button>
      </div>
      <StatRow items={[
        {label:"Total books",    value:"428", sub:"Across 24 genres"},
        {label:"Issued",         value:"94",  sub:"Currently out",subColor:C.amberDark},
        {label:"Available",      value:"334", sub:"Ready to issue",subColor:C.greenDark},
        {label:"Overdue",        value:"12",  sub:"Fine pending",  subColor:C.redDark},
      ]}/>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:20}}>
        <Card title="Book catalog">
          <div style={{marginBottom:12}}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by title or author..."/>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr>{["Title","Author","Genre","Copies","Available","Action"].map(h=>(
                <th key={h} style={{textAlign:"left",fontSize:10,fontWeight:600,textTransform:"uppercase",
                  letterSpacing:"0.06em",color:"#aaa",paddingBottom:8,borderBottom:"0.5px solid #ece9e1"}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((b,i)=>(
                <tr key={i}>
                  <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1",fontWeight:500,color:"#1a1a18",maxWidth:140}}>
                    <div style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{b.title}</div>
                  </td>
                  <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{b.author}</td>
                  <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1"}}>
                    <Badge color={b.genre==="Textbook"?"blue":b.genre==="Fiction"?"purple":"teal"}>{b.genre}</Badge>
                  </td>
                  <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1",color:"#666",textAlign:"center"}}>{b.copies}</td>
                  <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1",textAlign:"center"}}>
                    <span style={{fontWeight:600,color:b.available>0?C.greenDark:C.redDark}}>{b.available}</span>
                  </td>
                  <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1"}}>
                    <button disabled={b.available===0}
                      style={{fontSize:10,background:b.available>0?C.teal:"#f0ede6",
                        color:b.available>0?"#fff":"#aaa",border:"none",borderRadius:6,
                        padding:"3px 10px",cursor:b.available>0?"pointer":"not-allowed",fontFamily:"inherit"}}>
                      Issue
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card title="Recent issues">
          {[{name:"Aanya Reddy",book:"The Alchemist",due:"May 24",status:"Active"},
            {name:"Bhavesh Singh",book:"Physics Vol 1",due:"May 20",status:"Overdue"},
            {name:"Charu Verma",book:"Wings of Fire",due:"May 28",status:"Active"},
            {name:"Dev Patel",book:"Python Programming",due:"May 26",status:"Active"},
            {name:"Esha Joshi",book:"Mockingbird",due:"May 18",status:"Overdue"},
          ].map((it,i)=>(
            <div key={i} style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:500,color:"#1a1a18"}}>{it.name}</div>
                  <div style={{fontSize:10,color:"#888",marginTop:2}}>{it.book}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <Badge color={it.status==="Overdue"?"red":"green"}>{it.status}</Badge>
                  <div style={{fontSize:10,color:"#aaa",marginTop:3}}>Due {it.due}</div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── TRANSPORT ───────────────────────────────────────────────────────────────
function TransportManagement() {
  const [selected, setSelected] = useState(0);
  const route = busRoutes[selected];
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",margin:0}}>Transport management</h2>
          <p style={{fontSize:12,color:"#888",marginTop:4}}>4 routes · 4 buses · 142 students</p>
        </div>
        <button style={{background:C.blue,color:"#fff",border:"none",borderRadius:8,
          padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add route</button>
      </div>
      <StatRow items={[
        {label:"Total routes",  value:"4",   sub:"Covering 18 stops"},
        {label:"Students",      value:"142", sub:"Using transport"},
        {label:"Buses active",  value:"3",   sub:"1 inactive",subColor:C.amberDark},
        {label:"On time today", value:"100%",sub:"All on schedule",subColor:C.greenDark},
      ]}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
        <Card title="Route list">
          {busRoutes.map((r,i)=>(
            <div key={i} onClick={()=>setSelected(i)}
              style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",marginBottom:6,
                background:selected===i?C.blueL:"#f8f8f6",
                border:`0.5px solid ${selected===i?C.blue+"44":"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:12,fontWeight:600,color:"#1a1a18"}}>{r.name}</div>
                <Badge color={r.status==="Active"?"green":r.status==="On route"?"blue":"gray"}>{r.status}</Badge>
              </div>
              <div style={{fontSize:10,color:"#888",marginTop:4}}>{r.students} students · {r.driver}</div>
            </div>
          ))}
        </Card>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card title={route.name}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[["Driver",route.driver],["Bus No.",route.bus],["Students",route.students],["Status",route.status]].map(([k,v],i)=>(
                <div key={i} style={{background:"#f8f8f6",borderRadius:8,padding:"10px 12px"}}>
                  <div style={{fontSize:10,color:"#aaa",marginBottom:3}}>{k}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#1a1a18"}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:12,fontWeight:600,color:"#1a1a18",marginBottom:10}}>Stops</div>
            <div style={{display:"flex",alignItems:"center",gap:0,overflowX:"auto",paddingBottom:8}}>
              {route.stops.map((stop,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{width:10,height:10,borderRadius:"50%",
                      background:i===0?C.green:i===route.stops.length-1?C.red:C.blue,
                      border:"2px solid #fff",boxShadow:`0 0 0 2px ${i===0?C.green:i===route.stops.length-1?C.red:C.blue}22`}}/>
                    <div style={{fontSize:10,color:"#666",whiteSpace:"nowrap",textAlign:"center",maxWidth:70,
                      overflow:"hidden",textOverflow:"ellipsis"}}>{stop}</div>
                  </div>
                  {i<route.stops.length-1 && (
                    <div style={{width:40,height:2,background:"#e4e2da",flexShrink:0,marginBottom:16}}/>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <Card title="Student allocation">
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr>{["Student","Class","Boarding stop","Fee status"].map(h=>(
                  <th key={h} style={{textAlign:"left",fontSize:10,fontWeight:600,textTransform:"uppercase",
                    letterSpacing:"0.06em",color:"#aaa",paddingBottom:8,borderBottom:"0.5px solid #ece9e1"}}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {admissions.slice(0,4).map((a,i)=>(
                  <tr key={i}>
                    <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1",fontWeight:500,color:"#1a1a18"}}>{a.name}</td>
                    <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{a.class}</td>
                    <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{route.stops[i+1]||route.stops[1]}</td>
                    <td style={{padding:"8px 0",borderBottom:"0.5px solid #ece9e1"}}>
                      <Badge color={i===2?"amber":"green"}>{i===2?"Pending":"Paid"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── HOSTEL ──────────────────────────────────────────────────────────────────
function HostelManagement() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",margin:0}}>Hostel management</h2>
          <p style={{fontSize:12,color:"#888",marginTop:4}}>4 blocks · 145 rooms · 290 beds</p>
        </div>
        <button style={{background:C.purple,color:"#fff",border:"none",borderRadius:8,
          padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Allot room</button>
      </div>
      <StatRow items={[
        {label:"Total residents", value:"126",sub:"126 of 290 beds"},
        {label:"Available beds",  value:"164",sub:"Across all blocks",subColor:C.greenDark},
        {label:"Occupancy rate",  value:"43%", sub:"Below capacity"},
        {label:"Fee pending",     value:"₹1.2L",sub:"18 residents",subColor:C.redDark},
      ]}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        {hostelBlocks.map((b,i)=>{
          const occ = Math.round((b.occupied/b.rooms)*100);
          const color = [C.blue,C.teal,C.purple,C.coral][i];
          return (
            <Card key={i}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"#1a1a18"}}>{b.block}</div>
                  <div style={{fontSize:11,color:"#888",marginTop:2}}>Warden: {b.warden}</div>
                </div>
                <Badge color={i<2?"blue":"purple"}>{b.meals}</Badge>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                {[["Rooms",b.rooms],["Occupied",b.occupied],["Capacity",b.capacity]].map(([k,v])=>(
                  <div key={k} style={{background:"#f8f8f6",borderRadius:8,padding:"8px",textAlign:"center"}}>
                    <div style={{fontSize:14,fontWeight:700,color:"#1a1a18"}}>{v}</div>
                    <div style={{fontSize:10,color:"#aaa",marginTop:2}}>{k}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{color:"#888"}}>Occupancy</span>
                <span style={{fontWeight:600,color}}>{occ}%</span>
              </div>
              <ProgressBar pct={occ} color={color}/>
            </Card>
          );
        })}
      </div>
      <Card title="Mess menu — this week">
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
          {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((day,i)=>(
            <div key={i} style={{background:"#f8f8f6",borderRadius:10,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:8}}>{day.slice(0,3)}</div>
              {[["🥣","Poha","Breakfast"],["🍛","Dal Rice","Lunch"],["🍜","Upma","Dinner"]].map(([emoji,item,meal],j)=>(
                <div key={j} style={{marginBottom:6}}>
                  <div style={{fontSize:16}}>{emoji}</div>
                  <div style={{fontSize:9,fontWeight:600,color:"#1a1a18"}}>{item}</div>
                  <div style={{fontSize:8,color:"#aaa"}}>{meal}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── EXAM SCHEDULE (shared) ──────────────────────────────────────────────────
function ExamSchedule() {
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>Exam schedule</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Mid-term 2025 · All grades</p>
      <StatRow items={[
        {label:"Scheduled",  value:"8", sub:"Upcoming exams"},
        {label:"Completed",  value:"4", sub:"Marks entry pending: 1"},
        {label:"Total marks",value:"560",sub:"Cumulative"},
        {label:"Next exam",  value:"May 22",sub:"Mathematics",subColor:C.blueDark},
      ]}/>
      <Card title="Full exam schedule">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead>
            <tr>{["Exam","Class","Date","Time","Duration","Marks","Venue","Status"].map(h=>(
              <th key={h} style={{textAlign:"left",fontSize:10,fontWeight:600,textTransform:"uppercase",
                letterSpacing:"0.06em",color:"#aaa",paddingBottom:8,borderBottom:"0.5px solid #ece9e1"}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {examSchedule.map((e,i)=>(
              <tr key={i}>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",fontWeight:500,color:"#1a1a18"}}>{e.name}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{e.class}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{e.date}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{e.time}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{e.duration} min</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{e.marks}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#666"}}>{e.room}</td>
                <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1"}}>
                  <Badge color={e.status==="Completed"?"green":"blue"}>{e.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── REPORT CARD ─────────────────────────────────────────────────────────────
function ReportCard() {
  const d = reportCardData;
  const totalMax = d.subjects.length * 100;
  const totalObt = d.subjects.reduce((s,x)=>s+x.total,0);
  const overallPct = Math.round((totalObt/totalMax)*100);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",margin:0}}>Report card</h2>
        <div style={{display:"flex",gap:8}}>
          <button style={{fontSize:11,border:"0.5px solid #e4e2da",background:"#fff",borderRadius:8,
            padding:"7px 14px",cursor:"pointer",color:"#666",fontFamily:"inherit"}}>📧 Email to parent</button>
          <button style={{fontSize:11,background:C.blue,color:"#fff",border:"none",borderRadius:8,
            padding:"7px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>📄 Download PDF</button>
        </div>
      </div>

      {/* Header card */}
      <Card style={{marginBottom:16,background:"linear-gradient(135deg,#185FA5,#0C447C)",border:"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",
              letterSpacing:"0.1em",marginBottom:6}}>St. Xavier's Higher Secondary School</div>
            <div style={{fontSize:20,fontWeight:700,color:"#fff"}}>{d.student}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:4}}>
              {d.class} · Roll No. {d.rollNo} · {d.exam}
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginBottom:4}}>Overall GPA</div>
            <div style={{fontSize:36,fontWeight:800,color:"#fff",lineHeight:1}}>{d.gpa}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:4}}>
              Rank {d.rank} / {d.totalStudents}
            </div>
          </div>
        </div>
      </Card>

      <Card title="Subject-wise marks">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead>
            <tr>
              <th style={{textAlign:"left",fontSize:10,fontWeight:600,textTransform:"uppercase",
                letterSpacing:"0.06em",color:"#aaa",paddingBottom:8,borderBottom:"0.5px solid #ece9e1",width:"30%"}}>Subject</th>
              {["Unit Test /20","Mid-term /40","Assignment /10","Total /70","Grade","Bar"].map(h=>(
                <th key={h} style={{textAlign:"center",fontSize:10,fontWeight:600,textTransform:"uppercase",
                  letterSpacing:"0.06em",color:"#aaa",paddingBottom:8,borderBottom:"0.5px solid #ece9e1"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.subjects.map((s,i)=>{
              const pct = Math.round((s.total/70)*100);
              const gradeColor = s.grade.includes("A+")?C.green:s.grade.includes("A")?C.teal:s.grade.includes("B+")?C.blue:C.amber;
              return (
                <tr key={i}>
                  <td style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1",fontWeight:500,color:"#1a1a18"}}>{s.name}</td>
                  <td style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1",textAlign:"center",color:"#666"}}>{s.ut}</td>
                  <td style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1",textAlign:"center",color:"#666"}}>{s.mid}</td>
                  <td style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1",textAlign:"center",color:"#666"}}>{s.asgn}</td>
                  <td style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1",textAlign:"center",fontWeight:700,color:gradeColor}}>{s.total}</td>
                  <td style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1",textAlign:"center"}}>
                    <span style={{fontSize:14,fontWeight:700,color:gradeColor}}>{s.grade}</span>
                  </td>
                  <td style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1",width:80}}>
                    <ProgressBar pct={pct} color={gradeColor} height={5}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{paddingTop:12,fontWeight:700,fontSize:13,color:"#1a1a18"}}>Total</td>
              <td style={{paddingTop:12,textAlign:"center",fontWeight:700,fontSize:13,color:C.green}}>{totalObt} / {totalMax}</td>
              <td style={{paddingTop:12,textAlign:"center"}}><Badge color="green">A · {overallPct}%</Badge></td>
              <td style={{paddingTop:12}}><ProgressBar pct={overallPct} color={C.green} height={5}/></td>
            </tr>
          </tfoot>
        </table>
        <div style={{marginTop:16,padding:"12px 14px",background:"#f8f8f6",borderRadius:10}}>
          <div style={{fontSize:11,color:"#aaa",marginBottom:4}}>Class teacher's remark</div>
          <div style={{fontSize:12,color:"#1a1a18",fontStyle:"italic"}}>"{d.teacherRemark}"</div>
        </div>
      </Card>
    </div>
  );
}

// ─── STUDENT FULL SCHEDULE ───────────────────────────────────────────────────
function StudentScheduleFull() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat"];
  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",marginBottom:4}}>My schedule</h2>
      <p style={{fontSize:12,color:"#888",marginBottom:20}}>Grade 10-A · Week of May 17, 2025</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:20}}>
        {days.map((day,di)=>(
          <Card key={day} style={{padding:"12px 14px",background:day==="Mon"?C.blueL:"#fff"}}>
            <div style={{fontSize:11,fontWeight:700,color:day==="Mon"?C.blue:"#aaa",
              textTransform:"uppercase",marginBottom:10}}>{day}</div>
            {studentSchedule.slice(0,di%2===0?4:3).map((s,i)=>(
              <div key={i} style={{marginBottom:8,padding:"6px 8px",
                background:s.color+"18",borderRadius:6,borderLeft:`2px solid ${s.color}`}}>
                <div style={{fontSize:10,fontWeight:700,color:s.color}}>{s.subj}</div>
                <div style={{fontSize:9,color:"#888",marginTop:1}}>{s.time.split("–")[0]}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>
      <Card title="Today — detailed view">
        {studentSchedule.map((s,i)=>(
          <SchedItem key={i} subj={s.subj}
            meta1={s.time} meta2={`${s.teacher} · ${s.room}`}
            status={s.status} color={s.color}/>
        ))}
      </Card>
    </div>
  );
}

// ─── NOTIFICATION PANEL ──────────────────────────────────────────────────────
function NotificationPanel({ onClose }) {
  const items = [
    {icon:"🔔",title:"2 assignments due today",sub:"Algebra worksheet · Algebra problem set",time:"Now",color:C.redL},
    {icon:"📢",title:"Annual Day rehearsal",sub:"Today 3:00 PM · Auditorium",time:"2h ago",color:C.blueL},
    {icon:"📋",title:"Attendance marked",sub:"Present · 07:52 AM",time:"Today",color:C.greenL},
    {icon:"📅",title:"Holiday — May 19",sub:"School closed tomorrow",time:"5h ago",color:C.amberL},
    {icon:"🧾",title:"Fee receipt",sub:"₹18,000 · Q2 Tuition — Paid",time:"May 16",color:C.greenL},
  ];
  return (
    <div style={{position:"fixed",top:56,right:16,width:320,
      background:"#fff",border:"0.5px solid #e4e2da",borderRadius:14,
      boxShadow:"0 12px 40px rgba(0,0,0,0.12)",zIndex:100,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",borderBottom:"0.5px solid #ece9e1",
        display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:13,fontWeight:600,color:"#1a1a18"}}>Notifications</span>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",
          fontSize:16,color:"#aaa",lineHeight:1}}>×</button>
      </div>
      <div style={{maxHeight:360,overflowY:"auto"}}>
        {items.map((n,i)=>(
          <div key={i} style={{padding:"12px 16px",borderBottom:"0.5px solid #f0ede6",
            display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer",
            transition:"background 0.1s"}}
            onMouseEnter={e=>e.currentTarget.style.background="#faf9f6"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{width:32,height:32,borderRadius:8,background:n.color,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{n.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:600,color:"#1a1a18"}}>{n.title}</div>
              <div style={{fontSize:11,color:"#888",marginTop:1}}>{n.sub}</div>
            </div>
            <div style={{fontSize:10,color:"#aaa",whiteSpace:"nowrap"}}>{n.time}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"10px 16px",borderTop:"0.5px solid #ece9e1",textAlign:"center"}}>
        <button style={{fontSize:11,color:C.blue,background:"none",border:"none",
          cursor:"pointer",fontFamily:"inherit"}}>View all notifications</button>
      </div>
    </div>
  );
}

// ─── SECTION ROUTER ──────────────────────────────────────────────────────────
function renderSection(role, section) {
  const map = {
    admin: {
      overview:   AdminOverview,
      students:   AdminStudents,
      staff:      AdminStaff,
      attendance: AdminAttendance,
      fees:       AdminFees,
      academics:  AdminAcademics,
      timetable:  AdminTimetable,
      comms:      AdminComms,
      reports:    AdminReports,
      settings:   AdminSettings,
      library:    LibraryManagement,
      transport:  TransportManagement,
      hostel:     HostelManagement,
      exams:      ExamSchedule,
      reportcard: ReportCard,
    },
    teacher: {
      overview:    TeacherOverview,
      timetable:   TeacherTimetable,
      attendance:  TeacherAttendance,
      assignments: TeacherAssignments,
      grades:      TeacherGrades,
      comms:       TeacherComms,
      exams:       ExamSchedule,
      reportcard:  ReportCard,
    },
    student: {
      overview:    StudentOverview,
      timetable:   StudentScheduleFull,
      attendance:  StudentAttendance,
      academics:   StudentAcademics,
      assignments: StudentAssignments,
      fees:        StudentFees,
      comms:       StudentComms,
      reportcard:  ReportCard,
    },
    parent: {
      overview:    ParentOverview,
      attendance:  ParentAttendance,
      academics:   () => <><StudentAcademics/></>,
      fees:        ParentFees,
      comms:       ParentComms,
      notices:     ParentNotices,
      reportcard:  ReportCard,
    },
  };
  const Comp = map[role]?.[section] || map[role]?.overview;
  return Comp ? <Comp/> : (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      minHeight:300,color:"#aaa",gap:8}}>
      <div style={{fontSize:40}}>🚧</div>
      <div style={{fontSize:14,fontWeight:600,color:"#888"}}>Coming soon</div>
      <div style={{fontSize:12}}>This section is under construction</div>
    </div>
  );
}

// ─── EXTENDED NAV (add extra items) ──────────────────────────────────────────
const ROLE_NAVS = {
  admin: [
    {id:"overview",   icon:"🏠", label:"Overview"},
    {id:"students",   icon:"👨‍🎓",label:"Students"},
    {id:"staff",      icon:"👨‍🏫",label:"Staff"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"fees",       icon:"💳", label:"Fees"},
    {id:"academics",  icon:"📚", label:"Academics"},
    {id:"exams",      icon:"📝", label:"Exam Schedule"},
    {id:"reportcard", icon:"🎓", label:"Report Cards"},
    {id:"timetable",  icon:"🗓", label:"Timetable"},
    {id:"comms",      icon:"💬", label:"Communication"},
    {id:"library",    icon:"📖", label:"Library"},
    {id:"transport",  icon:"🚌", label:"Transport"},
    {id:"hostel",     icon:"🏨", label:"Hostel"},
    {id:"reports",    icon:"📊", label:"Reports"},
    {id:"settings",   icon:"⚙️", label:"Settings"},
  ],
  teacher: [
    {id:"overview",   icon:"🏠", label:"My Dashboard"},
    {id:"timetable",  icon:"🗓", label:"My Timetable"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"assignments",icon:"📝", label:"Assignments"},
    {id:"grades",     icon:"🎯", label:"Grades & Marks"},
    {id:"exams",      icon:"📝", label:"Exam Schedule"},
    {id:"reportcard", icon:"🎓", label:"Report Cards"},
    {id:"comms",      icon:"💬", label:"Messages"},
  ],
  student: [
    {id:"overview",   icon:"🏠", label:"My Dashboard"},
    {id:"timetable",  icon:"🗓", label:"Schedule"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"academics",  icon:"📚", label:"Grades"},
    {id:"reportcard", icon:"🎓", label:"Report Card"},
    {id:"assignments",icon:"📝", label:"Assignments"},
    {id:"fees",       icon:"💳", label:"Fee Status"},
    {id:"comms",      icon:"💬", label:"Notices"},
  ],
  parent: [
    {id:"overview",   icon:"🏠", label:"Overview"},
    {id:"attendance", icon:"📋", label:"Attendance"},
    {id:"academics",  icon:"📚", label:"Grades"},
    {id:"reportcard", icon:"🎓", label:"Report Card"},
    {id:"fees",       icon:"💳", label:"Fees"},
    {id:"comms",      icon:"💬", label:"Messages"},
    {id:"notices",    icon:"🔔", label:"Notifications"},
  ],
};

// ─── ROLE SWITCHER ───────────────────────────────────────────────────────────
const ROLES = [
  {id:"admin",  label:"Admin",   icon:"🛡", color:C.blue},
  {id:"teacher",label:"Teacher", icon:"👨‍🏫",color:C.teal},
  {id:"student",label:"Student", icon:"👩‍🎓",color:C.purple},
  {id:"parent", label:"Parent",  icon:"👨‍👧",color:C.coral},
];

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [role, setRole]         = useState("admin");
  const [section, setSection]   = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showSearch, setShowSearch]   = useState(false);

  const handleRole    = (r) => { setRole(r); setSection("overview"); setShowNotif(false); };
  const handleSection = (s) => { setSection(s); setShowNotif(false); };
  const meta = ROLE_META[role];

  // Quick-search suggestions
  const suggestions = [
    {label:"Aanya Reddy — Grade 10A",icon:"👩‍🎓",action:()=>handleSection("students")},
    {label:"Fee collection report",  icon:"📊",action:()=>handleSection("reports")},
    {label:"Exam schedule",          icon:"📝",action:()=>handleSection("exams")},
    {label:"Transport — Route A",    icon:"🚌",action:()=>handleSection("transport")},
    {label:"Library catalog",        icon:"📖",action:()=>handleSection("library")},
  ].filter(s=>!globalSearch||s.label.toLowerCase().includes(globalSearch.toLowerCase()));

  return (
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"'DM Sans','Inter',system-ui,sans-serif",
      background:"#faf9f6",fontSize:14,color:"#1a1a18"}}
      onClick={()=>{setShowNotif(false);setShowSearch(false);}}>

      <Sidebar role={role} activeSection={section} onSection={handleSection}
        collapsed={collapsed} onToggle={()=>setCollapsed(p=>!p)}/>

      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        {/* ── Top bar ── */}
        <div style={{height:56,background:"#fff",borderBottom:"0.5px solid #e4e2da",
          display:"flex",alignItems:"center",padding:"0 20px",gap:12,flexShrink:0,zIndex:50}}
          onClick={e=>e.stopPropagation()}>

          {/* Role switcher pills */}
          <div style={{display:"flex",gap:3}}>
            {ROLES.map(r=>(
              <button key={r.id} onClick={()=>handleRole(r.id)}
                style={{display:"flex",alignItems:"center",gap:5,padding:"5px 11px",
                  borderRadius:20,border:"0.5px solid",fontSize:11,fontWeight:600,cursor:"pointer",
                  transition:"all 0.15s",
                  borderColor:role===r.id?r.color+"66":"#e4e2da",
                  background:role===r.id?r.color+"14":"none",
                  color:role===r.id?r.color:"#999"}}>
                <span style={{fontSize:13}}>{r.icon}</span>
                <span style={{display:"none",["@media(minWidth:640px)"]:{display:"inline"}}}>{r.label}</span>
                {r.label}
              </button>
            ))}
          </div>

          <div style={{flex:1}}/>

          {/* Global search */}
          <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"#f8f8f6",
              border:"0.5px solid #e4e2da",borderRadius:8,padding:"6px 12px",cursor:"text",
              width:showSearch?220:160,transition:"width 0.2s"}}
              onClick={()=>setShowSearch(true)}>
              <span style={{fontSize:13,color:"#aaa"}}>🔍</span>
              <input value={globalSearch} onChange={e=>setGlobalSearch(e.target.value)}
                placeholder="Quick search..."
                style={{border:"none",background:"none",outline:"none",fontSize:12,
                  fontFamily:"inherit",color:"#1a1a18",width:"100%"}}/>
            </div>
            {showSearch && suggestions.length>0 && (
              <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,width:260,
                background:"#fff",border:"0.5px solid #e4e2da",borderRadius:10,
                boxShadow:"0 8px 24px rgba(0,0,0,0.1)",overflow:"hidden",zIndex:200}}>
                {suggestions.map((s,i)=>(
                  <div key={i} onClick={()=>{s.action();setShowSearch(false);setGlobalSearch("");}}
                    style={{display:"flex",gap:10,alignItems:"center",padding:"10px 14px",cursor:"pointer",
                      fontSize:12,transition:"background 0.1s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#f8f8f6"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{fontSize:16}}>{s.icon}</span>
                    <span style={{color:"#1a1a18"}}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification bell */}
          <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setShowNotif(p=>!p)}
              style={{width:36,height:36,borderRadius:10,border:"0.5px solid #e4e2da",
                background:"#fff",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",
                justifyContent:"center",position:"relative"}}>
              🔔
              <span style={{position:"absolute",top:6,right:6,width:8,height:8,
                borderRadius:"50%",background:C.red,border:"2px solid #fff"}}/>
            </button>
            {showNotif && <NotificationPanel onClose={()=>setShowNotif(false)}/>}
          </div>

          {/* User avatar */}
          <div style={{display:"flex",alignItems:"center",gap:8,
            borderLeft:"0.5px solid #e4e2da",paddingLeft:12}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:meta.color,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{meta.icon}</div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <span style={{fontSize:11,fontWeight:600,color:"#1a1a18",lineHeight:1.2}}>{meta.label}</span>
              <span style={{fontSize:9,color:"#aaa"}}>
                {role.charAt(0).toUpperCase()+role.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div style={{padding:"10px 24px",borderBottom:"0.5px solid #f0ede6",
          display:"flex",alignItems:"center",gap:6,background:"#fff"}}>
          <span style={{fontSize:11,color:"#aaa"}}>EduCore</span>
          <span style={{fontSize:11,color:"#ddd"}}>›</span>
          <span style={{fontSize:11,color:"#aaa"}}>{meta.label}</span>
          <span style={{fontSize:11,color:"#ddd"}}>›</span>
          <span style={{fontSize:11,color:"#1a1a18",fontWeight:500,textTransform:"capitalize"}}>
            {(ROLE_NAVS[role]?.find(n=>n.id===section)?.label) || section}
          </span>
        </div>

        {/* ── Content ── */}
        <div style={{flex:1,padding:"24px",overflowY:"auto"}}
          onClick={()=>{setShowNotif(false);setShowSearch(false);}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            {renderSection(role, section)}
          </div>
        </div>
      </div>
    </div>
  );
}