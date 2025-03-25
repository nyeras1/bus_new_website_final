"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc, Timestamp } from "firebase/firestore"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyDcjhpCEGyL2FGXBoWXfWvTQC6ctp_adsY",
  authDomain: "rfid-937d8.firebaseapp.com",
  databaseURL: "https://rfid-937d8-default-rtdb.firebaseio.com",
  projectId: "rfid-937d8",
  storageBucket: "rfid-937d8.firebasestorage.app",
  messagingSenderId: "980552143223",
  appId: "1:980552143223:web:04dc787a69a384cc069172",
  measurementId: "G-9XVQWPTGP1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const adminSidebarItems = [
  { title: "Students", href: "/admin/students" },
  { title: "Fee Payments", href: "/admin/fee-details" },
  { title: "Student Management", href: "/admin/section-filter" },
  { title: "Student Status", href: "/admin/student-status" },
  { title: "Boarding", href: "/admin/boarding-filter" },
]

const boardingPoints = ["Vijaywada", "Gudivada", "Machilipatnam", "Pamarru"]
const sections = ["Section A", "Section B", "Section C"]
const year = ["1st Year","2nd Year","3rd Year","4th Year"]
const branch = ["CSE","IT","EEE","ECE","Mech","Civil"]

// Interface for the student data
interface Student {
  id: string
  name: string
  boardingPoint: string
  email: string
  phone: string
  section: string
  feePaid: number
  tagID: string
  status: string
  lastLogin?: Date | null
  lastLogout?: Date | null
}

// Interface for the form data
interface FormData {
  name: string
  boardingPoint: string
  email: string
  phone: string
  section: string
  feePaid: string
  tagID: string
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    boardingPoint: "",
    email: "",
    phone: "",
    section: "",
    feePaid: "",
    tagID: "",
  })

  const [filters, setFilters] = useState({
    name: "",
    boardingPoint: "",
    email: "",
    phone: "",
    section: "",
    feePaid: "",
    tagID: "",
    status: "",
  })

  // Fetch students data from Firebase
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const rfidTagsCollection = collection(db, "RFIDTags")
        const rfidTagsSnapshot = await getDocs(rfidTagsCollection)

        const studentsData: Student[] = []

        rfidTagsSnapshot.forEach((doc) => {
          const data = doc.data()

          // Extract the latest login and logout times from history
          let lastLogin: Date | null = null
          let lastLogout: Date | null = null

          if (data.history && Array.isArray(data.history)) {
            for (const entry of data.history) {
              if (entry.status === "LOGGED IN" && entry.timeIn) {
                const loginTime = entry.timeIn instanceof Timestamp ? entry.timeIn.toDate() : new Date(entry.timeIn)

                if (!lastLogin || loginTime > lastLogin) {
                  lastLogin = loginTime
                }
              }

              if (entry.status === "LOGGED OUT" && entry.timeOut) {
                const logoutTime = entry.timeOut instanceof Timestamp ? entry.timeOut.toDate() : new Date(entry.timeOut)

                if (!lastLogout || logoutTime > lastLogout) {
                  lastLogout = logoutTime
                }
              }
            }
          }

          // Create a student object from the RFID tag data
          // Note: Some fields are placeholders as they don't exist in the RFID data
          studentsData.push({
            id: doc.id,
            name: `Student ${doc.id.substring(0, 5)}`, // Placeholder
            boardingPoint: "Vijaywada", // Placeholder
            email: `student-${doc.id.substring(0, 5)}@example.com`, // Placeholder
            phone: `123-${doc.id.substring(0, 7)}`, // Placeholder
            section: "Section A", // Placeholder
            feePaid: 1000, // Placeholder
            tagID: data.tagID || doc.id,
            status: data.status || "UNKNOWN",
            lastLogin,
            lastLogout,
          })
        })

        setStudents(studentsData)
      } catch (error) {
        console.error("Error fetching students:", error)
        toast({
          title: "Error",
          description: "Failed to fetch student data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setLoading(true)

      // Validate form data
      if (!formData.name || !formData.tagID || !formData.boardingPoint || !formData.section) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      // Add new RFID tag to Firebase
      const rfidTagsCollection = collection(db, "RFIDTags")
      const newTagRef = await addDoc(rfidTagsCollection, {
        tagID: formData.tagID,
        status: "LOGGED OUT",
        history: [],
      })

      // Add the new student to the local state
      const newStudent: Student = {
        id: newTagRef.id,
        name: formData.name,
        boardingPoint: formData.boardingPoint,
        email: formData.email,
        phone: formData.phone,
        section: formData.section,
        feePaid: Number.parseInt(formData.feePaid) || 0,
        tagID: formData.tagID,
        status: "LOGGED OUT",
      }

      setStudents((prev) => [...prev, newStudent])

      // Reset form
      setFormData({
        name: "",
        boardingPoint: "",
        email: "",
        phone: "",
        section: "",
        feePaid: "",
        tagID: "",
      })

      toast({
        title: "Success",
        description: "Student added successfully",
      })
    } catch (error) {
      console.error("Error adding student:", error)
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredStudents = students.filter((student) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true

      const studentValue = student[key as keyof typeof student]
      if (studentValue === undefined || studentValue === null) return false

      return studentValue.toString().toLowerCase().includes(value.toLowerCase())
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
            <Input id="name" placeholder="Enter student name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagID">RFID Tag ID</Label>
            <Input id="tagID" placeholder="Enter RFID tag ID" value={formData.tagID} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="boardingPoint">Boarding Point</Label>
            <Select onValueChange={(value) => handleSelectChange("boardingPoint", value)}>
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
            <Label htmlFor="Year of Study">Year</Label>
            <Select onValueChange={(value) => handleSelectChange("Year", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {year.map((point) => (
                  <SelectItem key={point} value={point}>
                    {point}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="Branch">Branch</Label>
            <Select onValueChange={(value) => handleSelectChange("Branch", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branch.map((point) => (
                  <SelectItem key={point} value={point}>
                    {point}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Select onValueChange={(value) => handleSelectChange("section", value)}>
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
            <Label htmlFor="feePaid">Fee Amount</Label>
            <Input
              id="feePaid"
              type="number"
              placeholder="Enter fee amount"
              value={formData.feePaid}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Add Student"
          )}
        </Button>
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

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Tag ID</TableHead>
                  <TableHead>Boarding Point</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Fee Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.tagID}</TableCell>
                      <TableCell>{student.boardingPoint}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.feePaid}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            student.status === "LOGGED IN" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell>{student.lastLogin ? new Date(student.lastLogin).toLocaleString() : "N/A"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

