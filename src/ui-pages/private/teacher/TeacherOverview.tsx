function TeacherOverview() {
  return (
    <div>
      <SectionLabel>Today's summary</SectionLabel>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>
        <KpiCard label="Classes today" value="3" sub="Next: Physics 09:00"/>
        <KpiCard label="Students" value="28" sub="In Grade 10-A"/>
        <KpiCard label="Assignments active" value="7" sub="2 due today" subColor={C.redDark}/>
        <KpiCard label="Avg class attendance" value="94%" sub="This month" subColor={C.greenDark}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <Card title="Today's timetable">
          {teacherTimetable.map((t,i)=>(
            <SchedItem key={i} subj={t.subj} meta1={t.time} meta2={t.room}
              status={t.status} color={t.color}/>
          ))}
        </Card>
        <Card title="Class performance — Mid-term">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={marksDistribution} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6"/>
              <XAxis dataKey="range" tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:"#aaa"}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="count" name="Students" radius={[4,4,0,0]}>
                {marksDistribution.map((d,i)=><Cell key={i} fill={d.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
            {marksDistribution.map(d=>(
              <span key={d.range} style={{fontSize:10,color:"#888"}}>
                <span style={{display:"inline-block",width:8,height:8,borderRadius:2,
                  background:d.color,marginRight:4}}/>
                {d.range}: {d.count}
              </span>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Recent messages">
        {teacherMessages.map((thread,i)=>(
          <div key={i} style={{padding:"10px 0",borderBottom:"0.5px solid #ece9e1"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <Avatar initials={thread.av} bg={thread.avc} color={thread.avt} size={28}/>
              <span style={{fontSize:12,fontWeight:600,color:"#1a1a18"}}>{thread.from}</span>
              <span style={{fontSize:10,color:"#aaa",marginLeft:"auto"}}>{thread.time}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,paddingLeft:36}}>
              {thread.msgs.slice(-1).map((m,j)=>(
                <div key={j} style={{
                  background:m.out?"#185FA5":"#f8f8f6",color:m.out?"#fff":"#1a1a18",
                  padding:"7px 11px",borderRadius:8,fontSize:11,alignSelf:m.out?"flex-end":"flex-start",
                  maxWidth:"85%"
                }}>
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
