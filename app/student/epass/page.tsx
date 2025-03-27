"use client"

import Image from "next/image"
import QRCodeSVG from "react-qr-code"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Printer } from "lucide-react"

const studentSidebarItems = [
  { title: "Fee Details", href: "/student/fee-details" },
  { title: "E-Pass", href: "/student/epass" },
  { title: "Student Status", href: "/student/status" },
  { title: "Scanner", href: "/student/scanner" },
]

// Sample student data
const studentData = {
  name: "Rahul Sharma",
  id: "ST2023001",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  validUntil: "31 Dec 2023",
  busRoute: "Route 7: Campus - City Center",
  busNumber: "KA-01-F-7890",
  photo: "/placeholder.svg?height=150&width=150",
  qrCodeUrl: "https://bus-new-website-final.vercel.app/verify/ST2023001",
}

export default function StudentEPass() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">Student E-Pass</h2>

      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden border-2 border-primary/20 print:border-none">
          <CardHeader className="bg-primary text-center text-primary-foreground">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">SRGEC Transportation</h3>
              <p className="text-sm">Official Student Bus Pass</p>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Student Photo */}
              <div className="flex flex-col items-center justify-center">
                <div className="overflow-hidden rounded-full border-4 border-primary/20">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9qpXNZSpP0QLDs7qf37o9PZTCXdMa1u834o0xomcbykTbuLTyLpG62z0bZDyk-SaNo0&usqp=CAU"
                    alt="Student Photo"
                    width={150}
                    height={150}
                    className="h-32 w-32 object-cover"
                  />
                </div>
                <Badge variant="outline" className="mt-2 border-primary/50 font-semibold text-primary">
                  {studentData.year}
                </Badge>
              </div>

              {/* Student Details */}
              <div className="col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{studentData.name}</h3>
                  <p className="text-muted-foreground">{studentData.course}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="font-medium">{studentData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valid Until</p>
                    <p className="font-medium">{studentData.validUntil}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bus Route</p>
                    <p className="font-medium">{studentData.busRoute}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bus Number</p>
                    <p className="font-medium">{studentData.busNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="rounded-lg border-2 border-primary/20 p-4">
                <QRCodeSVG value={studentData.qrCodeUrl} size={180} level="H" />
              </div>
              <p className="mt-2 text-center text-sm text-muted-foreground">Scan to verify pass authenticity</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 bg-muted/20 p-4 print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>

          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 rounded-lg bg-white p-4 shadow sm:p-6">
        <h3 className="mb-4 text-lg font-semibold">E-Pass Instructions</h3>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>Always carry your e-pass while traveling in college transportation</li>
          <li>Show your e-pass to the bus conductor when requested</li>
          <li>This pass is valid only for the specified route and bus</li>
          <li>Report immediately if your pass is lost or stolen</li>
          <li>The e-pass is non-transferable and for personal use only</li>
        </ul>
      </div>
    </DashboardLayout>
  )
}

