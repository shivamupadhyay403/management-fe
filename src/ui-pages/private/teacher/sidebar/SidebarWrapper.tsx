import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 overflow-x-hidden">
          <div className="p-4">
            <SidebarTrigger />
          </div>

          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}