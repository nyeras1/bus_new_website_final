import { DashboardLayout } from "@/components/dashboard-layout"

const adminSidebarItems = [
  { title: "Students", href: "/admin/students" },
  { title: "Fee Payments", href: "/admin/fee-details" },
  { title: "Student Management", href: "/admin/section-filter" },
  { title: "Student Status", href: "/admin/student-status" },
  { title: "Boarding", href: "/admin/boarding-filter" },
  { title: "Fee Payment Filter", href: "/admin/fee-filter" },
]
export default function AdminDashboard() {
  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
      <p className="text-sm sm:text-base">
        Welcome to the admin dashboard. Select an option from the sidebar to view or manage data.
      </p>
    </DashboardLayout>
  )
}

