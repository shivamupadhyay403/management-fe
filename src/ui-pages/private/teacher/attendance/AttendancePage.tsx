// app/teacher/attendance/page.tsx

export default function AttendancePage() {
  const students = [
    "Rahul Sharma",
    "Priya Singh",
    "Aman Verma",
  ]

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Attendance
          </h1>

          <p className="text-muted-foreground">
            Mark today's attendance
          </p>
        </div>

        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student}
              className="flex items-center justify-between rounded-xl bg-zinc-50 p-4"
            >
              <p className="font-medium">
                {student}
              </p>

              <div className="flex gap-3">
                <button className="rounded-xl bg-green-500 px-4 py-2 text-white">
                  Present
                </button>

                <button className="rounded-xl bg-red-500 px-4 py-2 text-white">
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 rounded-xl bg-black px-5 py-3 text-white">
          Submit Attendance
        </button>
      </div>
    </div>
  )
}