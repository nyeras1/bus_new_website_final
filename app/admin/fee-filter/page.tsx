import { DashboardLayout } from "@/components/dashboard-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const adminSidebarItems = [
  { title: "Students", href: "/admin/students" },
  { title: "Fee Payments", href: "/admin/fee-details" },
  { title: "Student Management", href: "/admin/section-filter" },
  { title: "Student Status", href: "/admin/student-status" },
  { title: "Boarding", href: "/admin/boarding-filter" },
]
export default function FeeFilter() {
  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <h2 className="mb-4 text-2xl font-bold">Fee Payment Filter</h2>
      <div className="rounded-lg bg-white p-6 shadow">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select fee status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="partial">Partially Paid</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-4">
          <p>Student list for the selected fee payment status will be displayed here.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

