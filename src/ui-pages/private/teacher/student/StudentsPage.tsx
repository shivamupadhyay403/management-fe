// app/teacher/students/page.tsx

export default function StudentsPage() {
  const students = [
    {
      name: "Rahul Sharma",
      roll: "12",
      attendance: "89%",
    },
    {
      name: "Priya Singh",
      roll: "18",
      attendance: "95%",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Students
        </h1>

        <p className="text-muted-foreground">
          View student details and performance
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <div
            key={student.roll}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                {student.name[0]}
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  {student.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Roll No: {student.roll}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-muted-foreground">
                Attendance
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {student.attendance}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}