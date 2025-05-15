"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function HexRgbHslConverter() {
  const [hex, setHex] = useState("#6366f1")
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 })
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 })
  const [activeTab, setActiveTab] = useState("hex")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

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
    } else {
      r = Number.parseInt(hex.substring(0, 2), 16)
      g = Number.parseInt(hex.substring(2, 4), 16)
      b = Number.parseInt(hex.substring(4, 6), 16)
    }

    return { r, g, b }
  }

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360
    s /= 100
    l /= 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }

  // Update all values when HEX changes
  const handleHexChange = (value: string) => {
    if (/^#?([0-9A-F]{3}){1,2}$/i.test(value)) {
      const formattedHex = value.startsWith("#") ? value : `#${value}`
      setHex(formattedHex)

      const newRgb = hexToRgb(formattedHex)
      setRgb(newRgb)

      const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
      setHsl(newHsl)
    } else {
      setHex(value)
    }
  }

  // Update all values when RGB changes
  const handleRgbChange = (channel: "r" | "g" | "b", value: number) => {
    const newValue = Math.max(0, Math.min(255, value))
    const newRgb = { ...rgb, [channel]: newValue }
    setRgb(newRgb)

    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)

    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
    setHsl(newHsl)
  }

  // Update all values when HSL changes
  const handleHslChange = (channel: "h" | "s" | "l", value: number) => {
    const maxValues = { h: 360, s: 100, l: 100 }
    const newValue = Math.max(0, Math.min(maxValues[channel], value))
    const newHsl = { ...hsl, [channel]: newValue }
    setHsl(newHsl)

    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(newRgb)

    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: text,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">HEX ↔ RGB ↔ HSL Converter</h1>
          <p className="text-muted-foreground">Convert between color formats with real-time preview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Color Converter</CardTitle>
              <CardDescription>Enter a value in any format to convert it to the others</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hex" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hex">HEX</TabsTrigger>
                  <TabsTrigger value="rgb">RGB</TabsTrigger>
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                </TabsList>
                <TabsContent value="hex" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="hex-input">HEX Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="hex-input"
                        value={hex}
                        onChange={(e) => handleHexChange(e.target.value)}
                        placeholder="#000000"
                      />
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(hex)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="rgb" className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rgb-r">R</Label>
                      <Input
                        id="rgb-r"
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.r}
                        onChange={(e) => handleRgbChange("r", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rgb-g">G</Label>
                      <Input
                        id="rgb-g"
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.g}
                        onChange={(e) => handleRgbChange("g", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rgb-b">B</Label>
                      <Input
                        id="rgb-b"
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.b}
                        onChange={(e) => handleRgbChange("b", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input readOnly value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="hsl" className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hsl-h">H</Label>
                      <Input
                        id="hsl-h"
                        type="number"
                        min="0"
                        max="360"
                        value={hsl.h}
                        onChange={(e) => handleHslChange("h", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hsl-s">S (%)</Label>
                      <Input
                        id="hsl-s"
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.s}
                        onChange={(e) => handleHslChange("s", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hsl-l">L (%)</Label>
                      <Input
                        id="hsl-l"
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.l}
                        onChange={(e) => handleHslChange("l", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input readOnly value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Preview</CardTitle>
              <CardDescription>Live preview of the current color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square rounded-md border" style={{ backgroundColor: hex }} />
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HEX:</span>
                  <span className="font-mono">{hex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RGB:</span>
                  <span className="font-mono">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HSL:</span>
                  <span className="font-mono">{`${hsl.h}, ${hsl.s}%, ${hsl.l}%`}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About Color Formats</CardTitle>
            <CardDescription>Understanding different color representation systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">HEX (Hexadecimal)</h3>
              <p className="text-muted-foreground text-sm">
                A 6-digit hexadecimal notation preceded by a # symbol. Each pair of digits represents the intensity of
                red, green, and blue (RGB) on a scale of 00 to FF (0-255).
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">RGB (Red, Green, Blue)</h3>
              <p className="text-muted-foreground text-sm">
                Represents colors using three values from 0 to 255 for red, green, and blue channels. Higher values
                create brighter colors.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">HSL (Hue, Saturation, Lightness)</h3>
              <p className="text-muted-foreground text-sm">
                A more intuitive color model where hue is represented as an angle (0-360°), saturation as a percentage
                (0-100%), and lightness as a percentage (0-100%).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
