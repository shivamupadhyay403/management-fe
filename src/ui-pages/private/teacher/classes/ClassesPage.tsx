// app/teacher/classes/page.tsx

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              My Classes
            </h1>

            <p className="text-muted-foreground">
              Manage your assigned classes
            </p>
          </div>

          <input
            placeholder="Search class..."
            className="rounded-xl border px-4 py-2"
          />
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-4">Class</th>
              <th className="pb-4">Subject</th>
              <th className="pb-4">Students</th>
              <th className="pb-4">Timing</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4">10-A</td>
              <td>Mathematics</td>
              <td>42</td>
              <td>8:00 AM</td>

              <td>
                <button className="rounded-xl bg-black px-4 py-2 text-sm text-white">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}