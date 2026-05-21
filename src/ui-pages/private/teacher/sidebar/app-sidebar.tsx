"use client"
import Link from "next/link"
import {
  User,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Wallet,
  Watch
} from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Classes",
    url: "/teacher/classes",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    url: "/teacher/assignments",
    icon: BookOpen,
  },
  {
    title: "Class Teacher Role",
    url: "/teacher/class-role",
    icon: GraduationCap,
  },
  {
    title: "Leave Tracking",
    url: "/teacher/leaves",
    icon: CalendarDays,
  },
  {
    title: "Payroll",
    url: "/teacher/payroll",
    icon: Wallet,
  },
  {
    title: "Attendance",
    url: "/teacher/attendance",
    icon: User,
  },
  {
    title: "Time Table",
    url: "/teacher/timetable",
    icon: Watch,
  },
  {
    title: "Profile",
    url: "/teacher/profile",
    icon: User,
  },
]
export function AppSidebar() {
    const pathname = usePathname()
  return (
    <Sidebar className="border-r bg-white">
      {/* HEADER */}
      <SidebarHeader className="border-b px-6 py-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            EduExcel
          </h2>

          {/* <p className="text-sm text-muted-foreground">
            Management System
          </p> */}
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive =
                  pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        h-11 rounded-xl px-3 transition-all
                        ${isActive
                          ? "bg-zinc-800 text-white"
                          : "hover:bg-zinc-800 hover:text-white"
                        }
                      `}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3"
                      >
                        <item.icon className="h-5 w-5" />

                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            S
          </div>

          <div>
            <p className="text-sm font-semibold">
              Shivam
            </p>

            <p className="text-xs text-muted-foreground">
              Full Stack Dev
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}