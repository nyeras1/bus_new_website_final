import { DashboardLayout } from "@/components/dashboard-layout"

const adminSidebarItems = [
  { title: "Students", href: "/admin/students" },
  { title: "Fee Payments", href: "/admin/fee-details" },
  { title: "Student Management", href: "/admin/section-filter" },
  { title: "Student Status", href: "/admin/student-status" },
  { title: "Boarding", href: "/admin/boarding-filter" },
]

export default function LoginCount() {
  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <h2 className="mb-4 text-2xl font-bold">Total Login Count</h2>
      <div className="rounded-lg bg-white p-6 shadow">
        <p>
          Total logins today: <span className="font-bold">150</span>
        </p>
      </div>
    </DashboardLayout>
  )
}

