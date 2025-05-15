"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ColorBlindnessType = "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia" | "normal"

export default function ColorBlindnessSimulator() {
  const [image, setImage] = useState<string | null>(null)
  const [simulatedImages, setSimulatedImages] = useState<Record<ColorBlindnessType, string | null>>({
    normal: null,
    protanopia: null,
    deuteranopia: null,
    tritanopia: null,
    achromatopsia: null,
  })
  const [activeTab, setActiveTab] = useState<ColorBlindnessType>("normal")
  const [color, setColor] = useState("#6366f1")
  const [simulatedColors, setSimulatedColors] = useState<Record<ColorBlindnessType, string>>({
    normal: "#6366f1",
    protanopia: "#6366f1",
    deuteranopia: "#6366f1",
    tritanopia: "#6366f1",
    achromatopsia: "#6366f1",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string
      setImage(imageDataUrl)

      // Reset simulated images
      setSimulatedImages({
        normal: imageDataUrl,
        protanopia: null,
        deuteranopia: null,
        tritanopia: null,
        achromatopsia: null,
      })

      // Generate simulated images
      simulateColorBlindness(imageDataUrl)
    }
    reader.readAsDataURL(file)
  }

  // Simulate color blindness for the image
  const simulateColorBlindness = (imageDataUrl: string) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageDataUrl

    img.onload = () => {
      // Create canvas for each type
      const types: ColorBlindnessType[] = ["protanopia", "deuteranopia", "tritanopia", "achromatopsia"]

      const newSimulatedImages = { ...simulatedImages, normal: imageDataUrl }

      types.forEach((type) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = img.width
        canvas.height = img.height

        // Draw original image
        ctx.drawImage(img, 0, 0, img.width, img.height)

        // Apply color blindness filter
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          const simulated = simulatePixel(r, g, b, type)

          data[i] = simulated.r
          data[i + 1] = simulated.g
          data[i + 2] = simulated.b
        }

        ctx.putImageData(imageData, 0, 0)
        newSimulatedImages[type] = canvas.toDataURL()
      })

      setSimulatedImages(newSimulatedImages)
    }
  }

  // Simulate color blindness for a single color
  useEffect(() => {
    const newSimulatedColors = { ...simulatedColors, normal: color }

    const types: ColorBlindnessType[] = ["protanopia", "deuteranopia", "tritanopia", "achromatopsia"]

    types.forEach((type) => {
      const rgb = hexToRgb(color)
      if (!rgb) return

      const simulated = simulatePixel(rgb.r, rgb.g, rgb.b, type)
      newSimulatedColors[type] = rgbToHex(simulated.r, simulated.g, simulated.b)
    })

    setSimulatedColors(newSimulatedColors)
  }, [color])

  // Simulate color blindness for a single pixel
  const simulatePixel = (r: number, g: number, b: number, type: ColorBlindnessType) => {
    // Convert RGB to LMS color space
    let L = 17.8824 * r + 43.5161 * g + 4.11935 * b
    let M = 3.45565 * r + 27.1554 * g + 3.86714 * b
    let S = 0.0299566 * r + 0.184309 * g + 1.46709 * b

    // Apply color blindness simulation
    switch (type) {
      case "protanopia": // Red-blind
        L = 0.0 * L + 2.02344 * M + 0.0 * S
        M = 0.494207 * L + 0.0 * M + 1.24827 * S
        S = 0.0 * L + 0.0 * M + 1.0 * S
        break
      case "deuteranopia": // Green-blind
        L = 1.0 * L + 0.0 * M + 0.0 * S
        M = 0.866435 * L + 0.0 * M + 0.133565 * S
        S = 0.0 * L + 0.0 * M + 1.0 * S
        break
      case "tritanopia": // Blue-blind
        L = 1.0 * L + 0.0 * M + 0.0 * S
        M = 0.0 * L + 1.0 * M + 0.0 * S
        S = -0.395913 * L + 0.801109 * M + 0.0 * S
        break
      case "achromatopsia": // Monochromacy
        const gray = (r + g + b) / 3
        return { r: gray, g: gray, b: gray }
      default:
        return { r, g, b }
    }

    // Convert back to RGB
    const R = 0.080944 * L + -0.130504 * M + 0.116721 * S
    const G = -0.0102485 * L + 0.0540194 * M + -0.113615 * S
    const B = -0.000365294 * L + -0.00412163 * M + 0.693513 * S

    return {
      r: Math.min(255, Math.max(0, Math.round(R))),
      g: Math.min(255, Math.max(0, Math.round(G))),
      b: Math.min(255, Math.max(0, Math.round(B))),
    }
  }

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, "")

    // Parse hex values
    let r, g, b
    if (hex.length === 3) {
      r = Number.parseInt(hex[0] + hex[0], 16)
      g = Number.parseInt(hex[1] + hex[1], 16)
      b = Number.parseInt(hex[2] + hex[2], 16)
    } else if (hex.length === 6) {
      r = Number.parseInt(hex.substring(0, 2), 16)
      g = Number.parseInt(hex.substring(2, 4), 16)
      b = Number.parseInt(hex.substring(4, 6), 16)
    } else {
      return null
    }

    return { r, g, b }
  }

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  // Download simulated image
  const downloadImage = () => {
    if (!simulatedImages[activeTab]) return

    const link = document.createElement("a")
    link.href = simulatedImages[activeTab] as string
    link.download = `color-blindness-${activeTab}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Color Blindness Simulator</h1>
          <p className="text-muted-foreground">Preview colors and images for different color vision types</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Image Simulator</CardTitle>
              <CardDescription>Upload an image to see how it appears to people with color blindness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <Button
                  variant="outline"
                  className="w-full h-32 border-dashed"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2" />
                    <span>Click to upload an image</span>
                    <span className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, WebP, and more</span>
                  </div>
                </Button>
              </div>

              {image && (
                <div className="space-y-4">
                  <Tabs
                    defaultValue="normal"
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as ColorBlindnessType)}
                  >
                    <TabsList className="grid grid-cols-5 w-full">
                      <TabsTrigger value="normal">Normal</TabsTrigger>
                      <TabsTrigger value="protanopia">Protanopia</TabsTrigger>
                      <TabsTrigger value="deuteranopia">Deuteranopia</TabsTrigger>
                      <TabsTrigger value="tritanopia">Tritanopia</TabsTrigger>
                      <TabsTrigger value="achromatopsia">Achromatopsia</TabsTrigger>
                    </TabsList>

                    {Object.entries(simulatedImages).map(([type, src]) => (
                      <TabsContent key={type} value={type} className="mt-4">
                        {src ? (
                          <div className="border rounded-md overflow-hidden">
                            <img src={src || "/placeholder.svg"} alt={`${type} simulation`} className="w-full h-auto" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-64 border rounded-md">
                            <p className="text-muted-foreground">Processing image...</p>
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>

                  {simulatedImages[activeTab] && (
                    <div className="flex justify-end">
                      <Button onClick={downloadImage}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Image
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Simulator</CardTitle>
              <CardDescription>See how a specific color appears to people with color blindness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="color">Select Color</Label>
                <div className="flex space-x-3">
                  <div className="w-10 h-10 rounded-md border overflow-hidden">
                    <input
                      type="color"
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-12 -ml-1 -mt-1 cursor-pointer"
                    />
                  </div>
                  <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Normal Vision</Label>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: simulatedColors.normal }}
                    ></div>
                    <span className="font-mono text-sm">{simulatedColors.normal}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Protanopia (Red-Blind)</Label>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: simulatedColors.protanopia }}
                    ></div>
                    <span className="font-mono text-sm">{simulatedColors.protanopia}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Deuteranopia (Green-Blind)</Label>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: simulatedColors.deuteranopia }}
                    ></div>
                    <span className="font-mono text-sm">{simulatedColors.deuteranopia}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tritanopia (Blue-Blind)</Label>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: simulatedColors.tritanopia }}
                    ></div>
                    <span className="font-mono text-sm">{simulatedColors.tritanopia}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Achromatopsia (Monochromacy)</Label>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: simulatedColors.achromatopsia }}
                    ></div>
                    <span className="font-mono text-sm">{simulatedColors.achromatopsia}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About Color Blindness</CardTitle>
            <CardDescription>Understanding different types of color vision deficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Protanopia (Red-Blind)</h3>
                <p className="text-sm text-muted-foreground">
                  People with protanopia have difficulty distinguishing between red and green colors. Reds appear darker
                  and are confused with black or dark gray. Affects approximately 1% of males.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Deuteranopia (Green-Blind)</h3>
                <p className="text-sm text-muted-foreground">
                  People with deuteranopia also have difficulty distinguishing between red and green, but unlike
                  protanopia, reds don't appear as dark. This is the most common form of color blindness, affecting
                  about 6% of males.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tritanopia (Blue-Blind)</h3>
                <p className="text-sm text-muted-foreground">
                  People with tritanopia have difficulty distinguishing between blue and yellow colors. This is a rare
                  form of color blindness, affecting less than 0.1% of the population.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Achromatopsia (Monochromacy)</h3>
                <p className="text-sm text-muted-foreground">
                  People with achromatopsia see no colors at all, only shades of gray. This is an extremely rare
                  condition, affecting about 0.003% of the population.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
