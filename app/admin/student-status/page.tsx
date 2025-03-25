"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

// Firebase configuration
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

// Define sidebar items
const adminSidebarItems = [
  { title: "Students", href: "/admin/students" },
  { title: "Fee Payments", href: "/admin/fee-details" },
  { title: "Student Management", href: "/admin/section-filter" },
  { title: "Student Status", href: "/admin/student-status" },
  { title: "Boarding", href: "/admin/boarding-filter" },
]

// Define the type for RFID tag data
interface HistoryEntry {
  date: string
  status: string
  timeIn: { seconds: number; nanoseconds: number } | null
  timeOut: { seconds: number; nanoseconds: number } | null
}

interface RFIDTag {
  id: string
  status: string
  tagID: string
  history: HistoryEntry[]
}

export default function Status() {
  const [rfidTags, setRfidTags] = useState<RFIDTag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRFIDTags() {
      try {
        const tagsCollection = collection(db, "RFIDTags")
        const tagSnapshot = await getDocs(tagsCollection)

        const tagsData: RFIDTag[] = []

        tagSnapshot.forEach((doc) => {
          const data = doc.data()
          tagsData.push({
            id: doc.id,
            status: data.status || "UNKNOWN",
            tagID: data.tagID || doc.id,
            history: data.history || [],
          })
        })

        setRfidTags(tagsData)

        // Set the first tag as selected by default
        if (tagsData.length > 0 && !selectedTag) {
          setSelectedTag(tagsData[0].id)
        }
      } catch (err) {
        console.error("Error fetching RFID tags:", err)
        setError("Failed to load RFID tag data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchRFIDTags()
  }, [selectedTag])

  // Format timestamp to readable date/time
  const formatTimestamp = (timestamp: { seconds: number; nanoseconds: number } | null) => {
    if (!timestamp) return "N/A"
    return format(new Date(timestamp.seconds * 1000), "MMM d, yyyy h:mm a")
  }

  // Get the selected tag data
  const getSelectedTagData = () => {
    return rfidTags.find((tag) => tag.id === selectedTag)
  }

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Status</h2>
        <Card>
          <CardHeader>
            <CardTitle>RFID Tags Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : error ? (
              <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>
            ) : rfidTags.length === 0 ? (
              <p>No RFID tags found.</p>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue={selectedTag || rfidTags[0].id} onValueChange={setSelectedTag}>
                  <TabsList className="mb-4 flex flex-wrap">
                    {rfidTags.map((tag) => (
                      <TabsTrigger key={tag.id} value={tag.id} className="flex-grow">
                        {tag.tagID}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {rfidTags.map((tag) => (
                    <TabsContent key={tag.id} value={tag.id}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Tag ID: {tag.tagID}</h3>
                          <Badge variant={tag.status === "LOGGED IN" ? "default" : "secondary"}>{tag.status}</Badge>
                        </div>

                        <div className="rounded-md bg-muted p-4">
                          <h4 className="mb-2 font-medium">History</h4>
                          {tag.history && tag.history.length > 0 ? (
                            <div className="space-y-3">
                              {tag.history.map((entry, index) => (
                                <div key={index} className="rounded-md bg-card p-3 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{entry.date}</span>
                                    <Badge variant={entry.status === "LOGGED IN" ? "default" : "secondary"}>
                                      {entry.status}
                                    </Badge>
                                  </div>
                                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">Time In:</span>{" "}
                                      {formatTimestamp(entry.timeIn)}
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Time Out:</span>{" "}
                                      {formatTimestamp(entry.timeOut)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No history available</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}