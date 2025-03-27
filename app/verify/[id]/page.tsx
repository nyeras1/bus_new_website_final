import { notFound } from "next/navigation"
import { CheckCircle } from "lucide-react"

// This would typically come from a database
const validStudentIds = ["ST2023001", "ST2023002", "ST2023003"]

// Sample student data - in a real app, this would be fetched from a database
const studentData = {
  ST2023001: {
    name: "Rahul Sharma",
    id: "ST2023001",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    validUntil: "31 Dec 2023",
    busRoute: "Route 7: Campus - City Center",
    busNumber: "KA-01-F-7890",
    status: "Active",
  },
}

export default function VerifyPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Check if the ID exists in our valid IDs
  if (!validStudentIds.includes(id)) {
    return notFound()
  }

  const student = studentData[id as keyof typeof studentData]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-green-100 p-3">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-600">Pass Verified</h1>
          <p className="text-muted-foreground">This is a valid SRGEC transportation pass</p>
        </div>

        <div className="space-y-4 divide-y">
          <div className="py-2">
            <p className="text-sm text-muted-foreground">Student Name</p>
            <p className="font-medium">{student.name}</p>
          </div>

          <div className="py-2">
            <p className="text-sm text-muted-foreground">Student ID</p>
            <p className="font-medium">{student.id}</p>
          </div>

          <div className="py-2">
            <p className="text-sm text-muted-foreground">Course</p>
            <p className="font-medium">{student.course}</p>
          </div>

          <div className="py-2">
            <p className="text-sm text-muted-foreground">Bus Route</p>
            <p className="font-medium">{student.busRoute}</p>
          </div>

          <div className="py-2">
            <p className="text-sm text-muted-foreground">Bus Number</p>
            <p className="font-medium">{student.busNumber}</p>
          </div>

          <div className="py-2">
            <p className="text-sm text-muted-foreground">Valid Until</p>
            <p className="font-medium">{student.validUntil}</p>
          </div>

          <div className="py-2">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-bold text-green-600">{student.status}</p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">Verified on {new Date().toLocaleString()}</div>
      </div>
    </div>
  )
}

