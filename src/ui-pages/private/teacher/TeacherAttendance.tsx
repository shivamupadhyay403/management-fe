
function TeacherAttendance() {
  const [attendance, setAttendance] = useState(
    classStudents.reduce((acc,s)=>({...acc,[s.roll]:s.status}),{})
  );
  const toggle = (roll) => {
    const cycle = {Present:"Absent",Absent:"Late",Late:"Present"};
    setAttendance(prev=>({...prev,[roll]:cycle[prev[roll]]||"Present"}));
  };
  const counts = Object.values(attendance).reduce((acc,s)=>({...acc,[s]:(acc[s]||0)+1}),{});
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18",margin:0}}>Mark attendance</h2>
          <p style={{fontSize:12,color:"#888",marginTop:4}}>Grade 10-A · May 17, 2025</p>
        </div>
        <button style={{background:C.green,color:"#fff",border:"none",borderRadius:8,
          padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
          Save & notify parents
        </button>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        <KpiCard label="Present" value={counts.Present||0} subColor={C.greenDark}/>
        <KpiCard label="Absent" value={counts.Absent||0} subColor={C.redDark}/>
        <KpiCard label="Late" value={counts.Late||0} subColor={C.amberDark}/>
      </div>
      <Card title="Click to toggle status">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead>
            <tr>{["Roll","Student","Status","Action"].map(h=>(
              <th key={h} style={{textAlign:"left",fontSize:10,fontWeight:600,textTransform:"uppercase",
                letterSpacing:"0.06em",color:"#aaa",paddingBottom:8,borderBottom:"0.5px solid #ece9e1"}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {classStudents.map((s)=>{
              const st = attendance[s.roll];
              return (
                <tr key={s.roll}>
                  <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",color:"#888"}}>{s.roll}</td>
                  <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1",fontWeight:500,color:"#1a1a18"}}>{s.name}</td>
                  <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1"}}>
                    {statusBadge(st)}
                  </td>
                  <td style={{padding:"9px 0",borderBottom:"0.5px solid #ece9e1"}}>
                    <button onClick={()=>toggle(s.roll)}
                      style={{fontSize:10,border:"0.5px solid #e4e2da",background:"none",
                        borderRadius:6,padding:"3px 8px",cursor:"pointer",color:"#666",fontFamily:"inherit"}}>
                      Toggle
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
