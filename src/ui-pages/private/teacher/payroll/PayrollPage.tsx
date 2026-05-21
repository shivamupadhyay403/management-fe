// app/teacher/payroll/page.tsx

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Payroll Summary
          </h1>

          <p className="text-muted-foreground">
            Salary and payslips
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-zinc-50 p-5">
            <p className="text-sm text-muted-foreground">
              Salary
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹55,000
            </h2>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-5">
            <p className="text-sm text-muted-foreground">
              Deductions
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹2,000
            </h2>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-5">
            <p className="text-sm text-muted-foreground">
              Net Salary
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹53,000
            </h2>
          </div>
        </div>

        <button className="mt-6 rounded-xl bg-black px-5 py-3 text-white">
          Download Payslip PDF
        </button>
      </div>
    </div>
  )
}