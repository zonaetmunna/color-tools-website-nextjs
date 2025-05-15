"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Upload, Crosshair, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ColorPicker() {
  const [image, setImage] = useState<string | null>(null)
  const [pickedColors, setPickedColors] = useState<string[]>([])
  const [currentColor, setCurrentColor] = useState<string>("#ffffff")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
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
      setImage(event.target?.result as string)
      setPickedColors([])
    }
    reader.readAsDataURL(file)
  }

  // Initialize canvas when image is loaded
  useEffect(() => {
    if (!image) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = image
    imageRef.current = img

    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions to match image
      canvas.width = img.width
      canvas.height = img.height

      // Draw image on canvas
      ctx.drawImage(img, 0, 0, img.width, img.height)
    }
  }, [image])

  // Handle canvas click to pick color
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get click coordinates relative to canvas
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width))
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height))

    // Get pixel data
    const pixelData = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbToHex(pixelData[0], pixelData[1], pixelData[2])

    setCurrentColor(hex)

    // Add to picked colors if not already present
    if (!pickedColors.includes(hex)) {
      setPickedColors((prev) => [hex, ...prev].slice(0, 20))
    }

    toast({
      title: "Color picked",
      description: `${hex} has been added to your palette`,
    })
  }

  // Handle canvas mouse move to show color preview
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get mouse coordinates relative to canvas
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width))
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height))

    setMousePosition({ x, y })

    // Get pixel data
    const pixelData = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbToHex(pixelData[0], pixelData[1], pixelData[2])
    setCurrentColor(hex)
  }

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  // Copy color to clipboard
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: `${color} has been copied to your clipboard`,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // Add current color to palette
  const addCurrentColor = () => {
    if (!pickedColors.includes(currentColor)) {
      setPickedColors((prev) => [currentColor, ...prev].slice(0, 20))
      toast({
        title: "Color added",
        description: `${currentColor} has been added to your palette`,
      })
    } else {
      toast({
        title: "Color already in palette",
        description: `${currentColor} is already in your palette`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Color Picker from Image</h1>
          <p className="text-muted-foreground">Upload an image and pick colors from it</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Image Upload</CardTitle>
              <CardDescription>Upload an image to pick colors from</CardDescription>
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
                <div className="relative border rounded-md overflow-hidden">
                  <div className="overflow-auto max-h-[500px]">
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      onMouseMove={handleCanvasMouseMove}
                      className="cursor-crosshair"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md flex items-center space-x-2 border">
                    <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: currentColor }}></div>
                    <span className="font-mono text-sm">{currentColor}</span>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(currentColor)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={addCurrentColor}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-md text-sm border">
                    <span className="font-mono">
                      x: {mousePosition.x}, y: {mousePosition.y}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Colors picked from the image</CardDescription>
            </CardHeader>
            <CardContent>
              {pickedColors.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {pickedColors.map((color, index) => (
                      <button
                        key={index}
                        className="aspect-square rounded-md border overflow-hidden hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                        title={`Copy ${color}`}
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label>Selected Colors</Label>
                    <div className="space-y-2">
                      {pickedColors.slice(0, 10).map((color, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: color }}></div>
                            <span className="font-mono text-sm">{color}</span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => copyToClipboard(color)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                  <Crosshair className="h-12 w-12 mb-4 opacity-20" />
                  <p>Click on the image to pick colors</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
            <CardDescription>Tips for picking colors from images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Upload an Image</h3>
                <p className="text-sm text-muted-foreground">
                  Start by uploading an image you want to extract colors from. The tool supports common image formats
                  like JPG, PNG, and WebP.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pick Colors</h3>
                <p className="text-sm text-muted-foreground">
                  Click anywhere on the image to pick a color. The selected color will be added to your palette and
                  displayed with its HEX code.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Copy Colors</h3>
                <p className="text-sm text-muted-foreground">
                  Click on any color in your palette to copy its HEX code to your clipboard. You can then use these
                  colors in your designs or code.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Create a Palette</h3>
                <p className="text-sm text-muted-foreground">
                  Build a cohesive color palette by picking multiple colors from your image. The tool will remember your
                  selections for easy reference.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
