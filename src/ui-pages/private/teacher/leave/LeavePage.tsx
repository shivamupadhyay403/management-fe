// app/teacher/leaves/page.tsx

export default function LeavePage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Leave Requests
          </h1>

          <p className="text-muted-foreground">
            Track your leave applications
          </p>
        </div>

        <button className="rounded-xl bg-black px-5 py-3 text-white">
          Apply Leave
        </button>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Sick Leave
              </h2>

              <p className="text-muted-foreground">
                12 May - 14 May
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-700">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}