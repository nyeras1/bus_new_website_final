"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

// Define sidebar items
const studentSidebarItems = [
  { title: "Fee Details", href: "/student/fee-details" },
  { title: "E-Pass", href: "/student/epass" },
  { title: "Student Status", href: "/student/status" },
  { title: "Scanner", href: "/student/scanner" },
]

export default function Scanner() {
  const [showScanner, setShowScanner] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Clean up function to stop camera stream
  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  // Handle scanner toggle
  const toggleScanner = async () => {
    if (showScanner) {
      stopCameraStream()
      setShowScanner(false)
      return
    }

    setError(null)
    setShowScanner(true)

    try {
      // Choose camera based on device type
      const facingMode = isMobile ? { exact: "environment" } : "user"

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      })

      setStream(mediaStream)
      setHasPermission(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Camera access denied. Please check your permissions.")
      setHasPermission(false)
      setShowScanner(false)
    }
  }

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopCameraStream()
    }
  }, [])

  // Handle successful scan
  const handleScan = (result: string) => {
    if (result) {
      setScanResult(result)
      toast({
        title: "QR Code Scanned",
        description: `Result: ${result}`,
      })
      stopCameraStream()
      setShowScanner(false)
    }
  }

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Scanner</h2>
          <Button onClick={toggleScanner} variant={showScanner ? "destructive" : "default"}>
            {showScanner ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Close Scanner
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Open Scanner
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            {showScanner && hasPermission ? (
              <div className="relative mx-auto max-w-md overflow-hidden rounded-lg">
                <QRScanner stream={stream} onScan={handleScan} />
              </div>
            ) : (
              <div className="text-center">
                {scanResult ? (
                  <div className="space-y-4">
                    <p className="text-lg font-medium">Last scan result:</p>
                    <div className="rounded-md bg-muted p-4">
                      <p className="break-all font-mono">{scanResult}</p>
                    </div>
                    <Button onClick={() => setScanResult(null)} variant="outline">
                      Clear Result
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 py-8">
                    <Camera className="mx-auto h-16 w-16 text-muted-foreground" />
                    <p>Click the "Open Scanner" button to scan a QR code</p>
                    <p className="text-sm text-muted-foreground">
                      {isMobile
                        ? "This will use your back camera on mobile devices"
                        : "This will use your front camera on laptops/desktops"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

// QR Scanner component using video stream
function QRScanner({
  stream,
  onScan,
}: {
  stream: MediaStream | null
  onScan: (result: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    if (!stream) return

    const video = document.createElement("video")
    videoRef.current = video
    video.srcObject = stream
    video.setAttribute("playsinline", "true") // required for iOS
    video.play()

    const canvas = document.createElement("canvas")
    canvasRef.current = canvas

    const scanQRCode = () => {
      if (!scanning) return

      const video = videoRef.current
      const canvas = canvasRef.current

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const context = canvas.getContext("2d")
        if (!context) return

        canvas.height = video.videoHeight
        canvas.width = video.videoWidth

        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        try {
          // Here you would normally use a QR code detection library
          // For this example, we'll simulate a successful scan after 3 seconds
          setTimeout(() => {
            if (scanning) {
              onScan("https://example.com/scanned-qr-code")
              setScanning(false)
            }
          }, 3000)
        } catch (error) {
          console.error("QR scanning error:", error)
        }
      }

      if (scanning) {
        requestAnimationFrame(scanQRCode)
      }
    }

    scanQRCode()

    return () => {
      setScanning(false)
    }
  }, [stream, onScan])

  return (
    <div className="relative aspect-square w-full bg-black">
      {stream && (
        <>
          <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[70%] w-[70%] rounded-lg border-4 border-white/50" />
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            Position QR code within the frame
          </div>
        </>
      )}
    </div>
  )
}

