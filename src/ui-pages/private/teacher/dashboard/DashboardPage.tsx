import {
  BookOpen,
  Users,
  ClipboardCheck,
  FileText,
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "My Classes",
      value: "6",
      icon: BookOpen,
    },
    {
      title: "Students",
      value: "240",
      icon: Users,
    },
    {
      title: "Attendance",
      value: "92%",
      icon: ClipboardCheck,
    },
    {
      title: "Assignments",
      value: "18",
      icon: FileText,
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-muted-foreground">
            Here's your teaching overview
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-zinc-100 p-3">
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            Today's Timetable
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-4">
              <div>
                <p className="font-semibold">
                  Mathematics - 10A
                </p>

                <p className="text-sm text-muted-foreground">
                  Room 204
                </p>
              </div>

              <span className="font-medium">
                8:00 AM
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-4">
              <div>
                <p className="font-semibold">
                  Science - 9B
                </p>

                <p className="text-sm text-muted-foreground">
                  Room 108
                </p>
              </div>

              <span className="font-medium">
                10:00 AM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}