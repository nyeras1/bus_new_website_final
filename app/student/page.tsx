import { DashboardLayout } from "@/components/dashboard-layout"

const studentSidebarItems = [
  { title: "Fee Details", href: "/student/fee-details" },
  { title: "Student Status", href: "/student/status" },
  { title: "Scanner", href: "/student/scanner" },
]

export default function StudentDashboard() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Student Dashboard</h1>
      <p className="text-sm sm:text-base">
        Welcome to your student dashboard. Select an option from the sidebar to view details.
      </p>
    </DashboardLayout>
  )
}


