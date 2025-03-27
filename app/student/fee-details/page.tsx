import { DashboardLayout } from "@/components/dashboard-layout"

const studentSidebarItems = [
  { title: "Fee Details", href: "/student/fee-details" },
  { title: "E-Pass", href: "/student/epass" },
  { title: "Student Status", href: "/student/status" },
  { title: "Scanner", href: "/student/scanner" },
]
export default function FeeDetails() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">Fee Details</h2>
      <div className="rounded-lg bg-white p-4 shadow sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          
          <div className="rounded-md bg-gray-100 p-4">
            <h3 className="mb-2 font-semibold">Total Amount</h3>
            <p className="text-lg font-bold">RS: 5,500</p>
          </div>
          <div className="rounded-md bg-gray-100 p-4">
            <h3 className="mb-2 font-semibold">Paid Amount</h3>
            <p className="text-lg font-bold">RS: 2,750</p>
          </div>
          <div className="rounded-md bg-gray-100 p-4">
            <h3 className="mb-2 font-semibold">Balance</h3>
            <p className="text-lg font-bold">RS: 2,750</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

