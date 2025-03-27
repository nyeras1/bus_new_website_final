"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const adminSidebarItems = [
  { title: "Students", href: "/admin/students" },
  { title: "Fee Payments", href: "/admin/fee-details" },
  { title: "Student Management", href: "/admin/section-filter" },
  { title: "Student Status", href: "/admin/student-status" },
  { title: "Boarding", href: "/admin/boarding-filter" },
]

const students = [
  {
    id: "S001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "1234567890",
    boardingPoint: "Vijayawada",
    feeStatus: "Paid",
  },
  {
    id: "S002",
    name: "Siya Verma",
    email: "siya@example.com",
    phone: "2345678901",
    boardingPoint: "Gudivada",
    feeStatus: "Pending",
  },
  {
    id: "S003",
    name: "Rohan Iyer",
    email: "rohan@example.com",
    phone: "3456789012",
    boardingPoint: "Machilipatnam",
    feeStatus: "Paid",
  },
  {
    id: "S004",
    name: "Neha Reddy",
    email: "neha@example.com",
    phone: "4567890123",
    boardingPoint: "Vijayawada",
    feeStatus: "Pending",
  },
  {
    id: "S005",
    name: "Kabir Nair",
    email: "kabir@example.com",
    phone: "5678901234",
    boardingPoint: "Gudivada",
    feeStatus: "Paid",
  },
  {
    id: "S006",
    name: "Ananya Rao",
    email: "ananya@example.com",
    phone: "6789012345",
    boardingPoint: "Machilipatnam",
    feeStatus: "Paid",
  },
  {
    id: "S007",
    name: "Vihaan Patel",
    email: "vihaan@example.com",
    phone: "7890123456",
    boardingPoint: "Vijayawada",
    feeStatus: "Pending",
  },
  {
    id: "S008",
    name: "Ishita Menon",
    email: "ishita@example.com",
    phone: "8901234567",
    boardingPoint: "Gudivada",
    feeStatus: "Paid",
  },
  {
    id: "S009",
    name: "Aditya Pillai",
    email: "aditya@example.com",
    phone: "9012345678",
    boardingPoint: "Machilipatnam",
    feeStatus: "Paid",
  },
  {
    id: "S010",
    name: "Meera Gupta",
    email: "meera@example.com",
    phone: "0123456789",
    boardingPoint: "Vijayawada",
    feeStatus: "Paid",
  },
  {
    id: "S011",
    name: "Harsh Vardhan",
    email: "harsh@example.com",
    phone: "1234567890",
    boardingPoint: "Gudivada",
    feeStatus: "Pending",
  },
  {
    id: "S012",
    name: "Tanya Mishra",
    email: "tanya@example.com",
    phone: "2345678901",
    boardingPoint: "Machilipatnam",
    feeStatus: "Paid",
  },
  {
    id: "S013",
    name: "Yash Desai",
    email: "yash@example.com",
    phone: "3456789012",
    boardingPoint: "Vijayawada",
    feeStatus: "Paid",
  },
  {
    id: "S014",
    name: "Pooja Malhotra",
    email: "pooja@example.com",
    phone: "4567890123",
    boardingPoint: "Gudivada",
    feeStatus: "Paid",
  },
  {
    id: "S015",
    name: "Siddharth Joshi",
    email: "siddharth@example.com",
    phone: "5678901234",
    boardingPoint: "Machilipatnam",
    feeStatus: "Pending",
  },
  {
    id: "S016",
    name: "Ritika Kapoor",
    email: "ritika@example.com",
    phone: "6789012345",
    boardingPoint: "Vijayawada",
    feeStatus: "Pending",
  },
  {
    id: "S017",
    name: "Kunal Chatterjee",
    email: "kunal@example.com",
    phone: "7890123456",
    boardingPoint: "Gudivada",
    feeStatus: "Pending",
  },
  {
    id: "S018",
    name: "Sneha Ghosh",
    email: "sneha@example.com",
    phone: "8901234567",
    boardingPoint: "Machilipatnam",
    feeStatus: "Paid",
  },
  {
    id: "S019",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "9012345678",
    boardingPoint: "Vijayawada",
    feeStatus: "Pending",
  },
  {
    id: "S020",
    name: "Priya Agarwal",
    email: "priya@example.com",
    phone: "0123456789",
    boardingPoint: "Gudivada",
    feeStatus: "Paid",
  },
];


export default function BoardingFilter() {
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<string | undefined>()
  const [selectedFeeStatus, setSelectedFeeStatus] = useState<string | undefined>()

  // Filter students based on both boarding point and fee status
  const filteredStudents = students.filter((student) => {
    // Check if student matches boarding point filter (if selected)
    const matchesBoardingPoint = !selectedBoardingPoint || student.boardingPoint === selectedBoardingPoint

    // Check if student matches fee status filter (if selected)
    const matchesFeeStatus = !selectedFeeStatus || student.feeStatus === selectedFeeStatus

    // Return true only if both conditions are met
    return matchesBoardingPoint && matchesFeeStatus
  })

  // Count of students by fee status
  const paidCount = students.filter((student) => student.feeStatus === "Paid").length
  const pendingCount = students.filter((student) => student.feeStatus === "Pending").length

  // Reset all filters
  const resetFilters = () => {
    setSelectedBoardingPoint(undefined)
    setSelectedFeeStatus(undefined)
  }

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <h2 className="mb-4 text-2xl font-bold">Boarding Details</h2>
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Filter by Boarding Point</p>
            <Select value={selectedBoardingPoint} onValueChange={setSelectedBoardingPoint}>
              <SelectTrigger>
                <SelectValue placeholder="All Boarding Points" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vijaywada">Vijaywada</SelectItem>
                <SelectItem value="Gudivada">Gudivada</SelectItem>
                <SelectItem value="Machilipatnam">Machilipatnam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Filter by Fee Status</p>
            <Select value={selectedFeeStatus} onValueChange={setSelectedFeeStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Fee Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            {(selectedBoardingPoint || selectedFeeStatus) && (
              <button
                onClick={resetFilters}
                className="rounded-md bg-muted px-3 py-2 text-sm font-medium hover:bg-muted/80"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Paid: {paidCount}
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Pending: {pendingCount}
          </Badge>
          <Badge variant="outline">Total: {students.length}</Badge>
          {(selectedBoardingPoint || selectedFeeStatus) && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Filtered: {filteredStudents.length}
            </Badge>
          )}
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Boarding Point</TableHead>
                <TableHead>Fee Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.boardingPoint}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          student.feeStatus === "Paid" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }
                      >
                        {student.feeStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No students match the selected filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}

