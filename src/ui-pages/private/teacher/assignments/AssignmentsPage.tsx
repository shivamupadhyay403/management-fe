// app/teacher/assignments/page.tsx

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Assignments
          </h1>

          <p className="text-muted-foreground">
            Create and manage assignments
          </p>
        </div>

        <button className="rounded-xl bg-black px-5 py-3 text-white">
          + Create Assignment
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Mathematics Homework
          </h2>

          <p className="mt-2 text-muted-foreground">
            Due: 22 May
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span>Submitted: 35/42</span>

            <button className="rounded-xl bg-zinc-900 px-4 py-2 text-white">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}