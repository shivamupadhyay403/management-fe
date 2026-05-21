// app/teacher/timetable/page.tsx

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">
          Weekly Timetable
        </h1>

        <table className="w-full text-center">
          <thead>
            <tr className="border-b">
              <th className="pb-4">Time</th>
              <th className="pb-4">Monday</th>
              <th className="pb-4">Tuesday</th>
              <th className="pb-4">Wednesday</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4">8:00 AM</td>

              <td>
                <div className="rounded-xl bg-blue-100 p-3">
                  10-A Maths
                </div>
              </td>

              <td>
                <div className="rounded-xl bg-green-100 p-3">
                  9-B Science
                </div>
              </td>

              <td>
                <div className="rounded-xl bg-yellow-100 p-3">
                  8-C Physics
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}