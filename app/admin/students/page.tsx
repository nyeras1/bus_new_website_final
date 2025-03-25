"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adminSidebarItems = [
    { title: "Students", href: "/admin/students" },
    { title: "Fee Payments", href: "/admin/fee-details" },
    { title: "Student Management", href: "/admin/section-filter" },
    { title: "Student Status", href: "/admin/student-status" },
    { title: "Boarding", href: "/admin/boarding-filter" },
  ]
const boardingPoints = ["Vijaywada", "Gudivada", "Machilipatnam", "Pamarru"]
const sections = ["Section A", "Section B", "Section C"]

export default function Students() {
  const [students, setStudents] = useState([
    {
      name: "John Doe",
      boardingPoint: "Vijaywada",
      email: "john@example.com",
      phone: "1234567890",
      section: "Section A",
      feePaid: 1000,
    },
    {
      name: "Jane Smith",
      boardingPoint: "Gudivada",
      email: "jane@example.com",
      phone: "0987654321",
      section: "Section B",
      feePaid: 1500,
    },
    // Add more sample data as needed
  ])

  const [filters, setFilters] = useState({
    name: "",
    boardingPoint: "",
    email: "",
    phone: "",
    section: "",
    feePaid: "",
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredStudents = students.filter((student) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      return student[key as keyof typeof student].toString().toLowerCase().includes(value.toLowerCase())
    })
  })

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <h2 className="mb-4 text-2xl font-bold">Student Management</h2>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Boarding Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boardingPoints.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sections.length}</div>
          </CardContent>
        </Card>
      </div>


      <form onSubmit={handleSubmit} className="mb-8 space-y-4 rounded-lg bg-white p-6 shadow">
        <h3 className="text-xl font-semibold">Add New Student</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input id="name" placeholder="Enter student name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="boardingPoint">Boarding Point</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select boarding point" />
              </SelectTrigger>
              <SelectContent>
                {boardingPoints.map((point) => (
                  <SelectItem key={point} value={point}>
                    {point}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Enter phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fee">Monthly fee</Label>
            <Input id="fee" type="number" placeholder="Enter fee amount" />
          </div>
        </div>
        <Button type="submit">Add Student</Button>
      </form>
     
    
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-xl font-semibold">Student List</h3>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`filter-${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input
                id={`filter-${key}`}
                value={value}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                placeholder={`Filter by ${key}`}
              />
            </div>
          ))}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Boarding Point</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Monthly Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.boardingPoint}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.feePaid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}

