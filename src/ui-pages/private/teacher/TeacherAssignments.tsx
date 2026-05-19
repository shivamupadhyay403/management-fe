import Card from "@/src/shared/cards/Card";

improt Card
function TeacherAssignments() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:18,fontWeight:600,color:"#1a1a18"}}>Assignments</h2>
        <button style={{background:C.teal,color:"#fff",border:"none",borderRadius:8,
          padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
          + New assignment
        </button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {assignments.map((a,i)=>(
          <Card key={i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:"#1a1a18",marginBottom:4}}>{a.title}</div>
                <div style={{fontSize:11,color:"#888"}}>{a.subj} · Due: {a.due}</div>
              </div>
              <Badge color={a.status==="Open"?"blue":a.status==="Draft"?"gray":
                a.status==="Pending Review"?"amber":"green"}>{a.status}</Badge>
            </div>
            {a.subs > 0 && (
              <div style={{marginTop:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}>
                  <span style={{color:"#888"}}>Submissions</span>
                  <span style={{fontWeight:600}}>{a.subs} / {a.total}</span>
                </div>
                <ProgressBar pct={(a.subs/a.total)*100} color={C.blue}/>
              </div>
            )}
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button style={{fontSize:11,border:"0.5px solid #e4e2da",background:"none",borderRadius:7,
                padding:"5px 12px",cursor:"pointer",color:"#666",fontFamily:"inherit"}}>View submissions</button>
              <button style={{fontSize:11,border:"0.5px solid #e4e2da",background:"none",borderRadius:7,
                padding:"5px 12px",cursor:"pointer",color:"#666",fontFamily:"inherit"}}>Grade all</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
