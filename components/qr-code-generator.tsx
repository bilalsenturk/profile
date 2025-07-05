"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Share2, Eye, Copy, Smartphone } from "lucide-react"

interface QRCodeGeneratorProps {
  cvUrl: string
  profileData: any
}

export default function QRCodeGenerator({ cvUrl, profileData }: QRCodeGeneratorProps) {
  const [qrContent, setQrContent] = useState(cvUrl)
  const [qrSize, setQrSize] = useState("200")
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBgColor, setQrBgColor] = useState("#ffffff")
  const [qrType, setQrType] = useState("url")
  const [customText, setCustomText] = useState("")

  const qrTypes = [
    { id: "url", label: "CV URL", icon: "🔗" },
    { id: "contact", label: "Contact Info", icon: "📞" },
    { id: "linkedin", label: "LinkedIn Profile", icon: "💼" },
    { id: "email", label: "Email Address", icon: "📧" },
    { id: "custom", label: "Custom Text", icon: "✏️" },
  ]

  const generateQRContent = () => {
    switch (qrType) {
      case "contact":
        return `BEGIN:VCARD
    VERSION:3.0
    FN:${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}
    ORG:${profileData.personalInfo.title}
    TEL:${profileData.personalInfo.phone}
    EMAIL:${profileData.personalInfo.email}
    URL:${profileData.personalInfo.linkedin}
    END:VCARD`
      case "linkedin":
        return profileData.personalInfo.linkedin || ""
      case "email":
        return `mailto:${profileData.personalInfo.email}`
      case "custom":
        return customText
      default:
        return cvUrl
    }
  }

  const getQRCodeUrl = () => {
    const content = encodeURIComponent(generateQRContent())
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${content}&color=${qrColor.replace("#", "")}&bgcolor=${qrBgColor.replace("#", "")}`
  }

  const downloadQRCode = () => {
    const link = document.createElement("a")
    link.href = getQRCodeUrl()
    link.download = `qr-code-${qrType}-${Date.now()}.png`
    link.click()
  }

  const copyQRUrl = () => {
    navigator.clipboard.writeText(getQRCodeUrl())
  }

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My CV QR Code",
          text: "Scan this QR code to view my resume",
          url: getQRCodeUrl(),
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <QrCode className="w-5 h-5 text-green-600" />
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Type Selection */}
        <div className="space-y-3">
          <Label>QR Code Type</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {qrTypes.map((type) => (
              <Button
                key={type.id}
                variant={qrType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setQrType(type.id)}
                className="justify-start text-xs"
              >
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Text Input */}
        {qrType === "custom" && (
          <div>
            <Label htmlFor="customText">Custom Text</Label>
            <Input
              id="customText"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter custom text for QR code..."
              className="mt-1"
            />
          </div>
        )}

        {/* QR Code Customization */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="qrSize">Size</Label>
            <Select value={qrSize} onValueChange={setQrSize}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="150">Small (150px)</SelectItem>
                <SelectItem value="200">Medium (200px)</SelectItem>
                <SelectItem value="300">Large (300px)</SelectItem>
                <SelectItem value="400">Extra Large (400px)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="qrColor">QR Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="qrColor"
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-12 h-10 p-1 border rounded"
              />
              <Input
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="qrBgColor">Background Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="qrBgColor"
                type="color"
                value={qrBgColor}
                onChange={(e) => setQrBgColor(e.target.value)}
                className="w-12 h-10 p-1 border rounded"
              />
              <Input
                value={qrBgColor}
                onChange={(e) => setQrBgColor(e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* QR Code Preview */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <img
              src={getQRCodeUrl() || "/placeholder.svg"}
              alt="QR Code"
              className="mx-auto"
              style={{ width: `${qrSize}px`, height: `${qrSize}px` }}
            />
          </div>

          {/* QR Code Info */}
          <div className="space-y-2">
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-xs">
                {qrTypes.find((t) => t.id === qrType)?.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 max-w-md mx-auto break-all">
              Content: {generateQRContent().substring(0, 100)}
              {generateQRContent().length > 100 && "..."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={downloadQRCode} size="sm" className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>

          <Button onClick={copyQRUrl} size="sm" variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy URL
          </Button>

          {navigator.share && (
            <Button onClick={shareQRCode} size="sm" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}

          <Button onClick={() => window.open(getQRCodeUrl(), "_blank")} size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>

        {/* Usage Instructions */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            How to Use Your QR Code:
          </h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Print the QR code on your business cards or resume</li>
            <li>• Add it to your email signature for easy contact sharing</li>
            <li>• Include it in your portfolio or presentation slides</li>
            <li>• Use it at networking events for quick information sharing</li>
            <li>• Anyone can scan it with their phone camera to access your info</li>
          </ul>
        </div>

        {/* QR Code Types Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-gray-900">QR Code Types:</h5>
            <div className="space-y-1 text-gray-600">
              <p>
                <strong>CV URL:</strong> Links to your online resume
              </p>
              <p>
                <strong>Contact Info:</strong> Creates a vCard for easy contact saving
              </p>
              <p>
                <strong>LinkedIn:</strong> Direct link to your LinkedIn profile
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-gray-900">Best Practices:</h5>
            <div className="space-y-1 text-gray-600">
              <p>• Use high contrast colors for better scanning</p>
              <p>• Test the QR code before printing</p>
              <p>• Include a brief instruction like "Scan for my resume"</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
