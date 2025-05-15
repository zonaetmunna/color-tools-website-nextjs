"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [quality, setQuality] = useState(80)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [format, setFormat] = useState("jpeg")
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        })
        return
      }

      setOriginalSize(file.size)

      const reader = new FileReader()
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string)
        setCompressedImage(null)
        setCompressedSize(0)
      }
      reader.readAsDataURL(file)
    }
  }

  // Compress image
  const compressImage = () => {
    if (!originalImage) return

    setIsCompressing(true)

    const img = new Image()
    img.src = originalImage

    img.onload = () => {
      const canvas = document.createElement("canvas")
      let width = img.width
      let height = img.height

      // Resize if needed
      if (width > maxWidth) {
        const ratio = maxWidth / width
        width = maxWidth
        height = height * ratio
      }

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext("2d")
      ctx?.drawImage(img, 0, 0, width, height)

      // Convert to the selected format with the specified quality
      const compressedDataUrl = canvas.toDataURL(`image/${format}`, quality / 100)
      setCompressedImage(compressedDataUrl)

      // Calculate compressed size
      const base64str = compressedDataUrl.split(",")[1]
      const compressedBytes = atob(base64str).length
      setCompressedSize(compressedBytes)

      setIsCompressing(false)

      toast({
        title: "Image compressed",
        description: `Reduced from ${formatBytes(originalSize)} to ${formatBytes(compressedBytes)}`,
      })
    }
  }

  // Download compressed image
  const downloadImage = () => {
    if (!compressedImage) return

    const link = document.createElement("a")
    link.href = compressedImage
    link.download = `compressed-image.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Format bytes to human-readable format
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  // Calculate compression ratio
  const compressionRatio = () => {
    if (originalSize === 0 || compressedSize === 0) return 0
    return Math.round((1 - compressedSize / originalSize) * 100)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <ImageIcon className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
          <p className="text-muted-foreground">Compress and optimize your images without losing quality</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Image Compression</CardTitle>
              <CardDescription>Upload an image and adjust compression settings</CardDescription>
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

              {originalImage && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="quality">Quality: {quality}%</Label>
                    </div>
                    <Slider
                      id="quality"
                      min={1}
                      max={100}
                      step={1}
                      value={[quality]}
                      onValueChange={(value) => setQuality(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Lower quality = smaller file size, but may reduce image quality
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="max-width">Max Width: {maxWidth}px</Label>
                    </div>
                    <Slider
                      id="max-width"
                      min={100}
                      max={3840}
                      step={100}
                      value={[maxWidth]}
                      onValueChange={(value) => setMaxWidth(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Resize large images to reduce file size (preserves aspect ratio)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Output Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpeg">JPEG (best for photos)</SelectItem>
                        <SelectItem value="png">PNG (supports transparency)</SelectItem>
                        <SelectItem value="webp">WebP (modern, efficient format)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={compressImage} disabled={isCompressing}>
                    {isCompressing ? "Compressing..." : "Compress Image"}
                  </Button>
                </div>
              )}

              {compressedImage && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Compression Results</h3>
                      <p className="text-sm text-muted-foreground">
                        Original: {formatBytes(originalSize)} → Compressed: {formatBytes(compressedSize)}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">{compressionRatio()}% size reduction</p>
                    </div>
                    <Button onClick={downloadImage}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Compare original and compressed images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {originalImage ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Original</h3>
                    <div className="border rounded-md overflow-hidden">
                      <img src={originalImage || "/placeholder.svg"} alt="Original" className="w-full h-auto" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Size: {formatBytes(originalSize)}</p>
                  </div>

                  {compressedImage && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Compressed</h3>
                      <div className="border rounded-md overflow-hidden">
                        <img src={compressedImage || "/placeholder.svg"} alt="Compressed" className="w-full h-auto" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Size: {formatBytes(compressedSize)}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                  <p>Upload an image to see the preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Image Compression Tips</CardTitle>
            <CardDescription>How to get the best results when compressing images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Choose the Right Format</h3>
                <p className="text-sm text-muted-foreground">
                  JPEG: Best for photographs and complex images with many colors. PNG: Best for images with transparency
                  or simple graphics with few colors. WebP: Modern format with better compression than JPEG and PNG, but
                  not supported by all browsers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Quality Settings</h3>
                <p className="text-sm text-muted-foreground">
                  70-80% quality is usually a good balance between file size and visual quality for most images. For web
                  images, you can often go as low as 60% without noticeable quality loss.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resize Large Images</h3>
                <p className="text-sm text-muted-foreground">
                  If your image will be displayed at a smaller size (e.g., on a website), resize it before compressing.
                  There's no need to upload a 4000px wide image if it will only be displayed at 800px.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Check the Results</h3>
                <p className="text-sm text-muted-foreground">
                  Always compare the compressed image with the original to ensure the quality is acceptable. Pay
                  attention to areas with fine details or text, as these are most affected by compression.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
