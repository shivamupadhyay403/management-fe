// app/teacher/profile/page.tsx

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
            A
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Amit Sharma
            </h1>

            <p className="text-muted-foreground">
              Mathematics Teacher
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-zinc-50 p-5">
            <p className="text-sm text-muted-foreground">
              Qualification
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              M.Sc Mathematics
            </h2>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-5">
            <p className="text-sm text-muted-foreground">
              Experience
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              8 Years
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}