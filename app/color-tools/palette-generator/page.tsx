"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PaletteType = "analogous" | "complementary" | "triadic" | "tetradic" | "monochromatic" | "split-complementary"

export default function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#6366f1")
  const [paletteType, setPaletteType] = useState<PaletteType>("analogous")
  const [palette, setPalette] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Generate palette when base color or palette type changes
  useState(() => {
    generatePalette()
  })

  // Generate color palette based on selected type
  const generatePalette = () => {
    const hsl = hexToHSL(baseColor)
    let newPalette: string[] = []

    switch (paletteType) {
      case "analogous":
        // Colors adjacent on the color wheel (30° apart)
        newPalette = [
          hslToHex(hsl.h - 60, hsl.s, hsl.l),
          hslToHex(hsl.h - 30, hsl.s, hsl.l),
          baseColor,
          hslToHex(hsl.h + 30, hsl.s, hsl.l),
          hslToHex(hsl.h + 60, hsl.s, hsl.l),
        ]
        break
      case "complementary":
        // Colors opposite on the color wheel (180° apart)
        newPalette = [
          hslToHex(hsl.h, hsl.s, hsl.l - 20),
          hslToHex(hsl.h, hsl.s - 20, hsl.l),
          baseColor,
          hslToHex((hsl.h + 180) % 360, hsl.s - 20, hsl.l),
          hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l - 20),
        ]
        break
      case "triadic":
        // Three colors evenly spaced on the color wheel (120° apart)
        newPalette = [
          hslToHex(hsl.h, hsl.s - 20, hsl.l),
          baseColor,
          hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 240) % 360, hsl.s - 20, hsl.l),
        ]
        break
      case "tetradic":
        // Four colors forming a rectangle on the color wheel
        newPalette = [
          baseColor,
          hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l),
        ]
        break
      case "monochromatic":
        // Different shades and tints of the same hue
        newPalette = [
          hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 40)),
          hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
          baseColor,
          hslToHex(hsl.h, Math.max(0, hsl.s - 30), Math.min(100, hsl.l + 20)),
          hslToHex(hsl.h, Math.max(0, hsl.s - 50), Math.min(100, hsl.l + 40)),
        ]
        break
      case "split-complementary":
        // Base color and two colors adjacent to its complement
        newPalette = [
          hslToHex(hsl.h, hsl.s - 20, hsl.l),
          baseColor,
          hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 210) % 360, hsl.s - 20, hsl.l),
        ]
        break
    }

    setPalette(newPalette)
  }

  // Convert HEX to HSL
  const hexToHSL = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, "")

    // Parse hex values
    let r = 0,
      g = 0,
      b = 0
    if (hex.length === 3) {
      r = Number.parseInt(hex[0] + hex[0], 16) / 255
      g = Number.parseInt(hex[1] + hex[1], 16) / 255
      b = Number.parseInt(hex[2] + hex[2], 16) / 255
    } else {
      r = Number.parseInt(hex.substring(0, 2), 16) / 255
      g = Number.parseInt(hex.substring(2, 4), 16) / 255
      b = Number.parseInt(hex.substring(4, 6), 16) / 255
    }

    // Find min and max values
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    // Calculate hue and saturation
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

      h = Math.round(h * 60)
    }

    s = Math.round(s * 100)
    l = Math.round(l * 100)

    return { h, s, l }
  }

  // Convert HSL to HEX
  const hslToHex = (h: number, s: number, l: number) => {
    h = ((h % 360) + 360) % 360 // Ensure h is between 0 and 359
    s = Math.max(0, Math.min(100, s)) / 100
    l = Math.max(0, Math.min(100, l)) / 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0,
      g = 0,
      b = 0

    if (h >= 0 && h < 60) {
      r = c
      g = x
      b = 0
    } else if (h >= 60 && h < 120) {
      r = x
      g = c
      b = 0
    } else if (h >= 120 && h < 180) {
      r = 0
      g = c
      b = x
    } else if (h >= 180 && h < 240) {
      r = 0
      g = x
      b = c
    } else if (h >= 240 && h < 300) {
      r = x
      g = 0
      b = c
    } else {
      r = c
      g = 0
      b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    const toHex = (value: number) => {
      const hex = value.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
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

  // Copy all colors as CSS variables
  const copyAllAsCSS = () => {
    const cssVariables = palette.map((color, index) => `  --color-${index + 1}: ${color};`).join("\n")
    const css = `:root {\n${cssVariables}\n}`

    navigator.clipboard.writeText(css)
    toast({
      title: "CSS variables copied",
      description: "All colors have been copied as CSS variables",
    })
  }

  // Generate a random color
  const generateRandomColor = () => {
    const randomHex = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    setBaseColor(randomHex)
    generatePalette()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Color Palette Generator</h1>
          <p className="text-muted-foreground">Create harmonious color palettes based on color theory</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Palette Controls</CardTitle>
              <CardDescription>Customize your color palette</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="base-color">Base Color</Label>
                <div className="flex space-x-3">
                  <div className="w-10 h-10 rounded-md border overflow-hidden">
                    <input
                      type="color"
                      id="base-color"
                      value={baseColor}
                      onChange={(e) => {
                        setBaseColor(e.target.value)
                        generatePalette()
                      }}
                      className="w-12 h-12 -ml-1 -mt-1 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 flex space-x-2">
                    <Input
                      value={baseColor}
                      onChange={(e) => {
                        setBaseColor(e.target.value)
                        generatePalette()
                      }}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={generateRandomColor}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Palette Type</Label>
                <RadioGroup
                  value={paletteType}
                  onValueChange={(value) => {
                    setPaletteType(value as PaletteType)
                    generatePalette()
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="analogous" id="analogous" />
                      <Label htmlFor="analogous">Analogous</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="complementary" id="complementary" />
                      <Label htmlFor="complementary">Complementary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="triadic" id="triadic" />
                      <Label htmlFor="triadic">Triadic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tetradic" id="tetradic" />
                      <Label htmlFor="tetradic">Tetradic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monochromatic" id="monochromatic" />
                      <Label htmlFor="monochromatic">Monochromatic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="split-complementary" id="split-complementary" />
                      <Label htmlFor="split-complementary">Split Complementary</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Generated Palette</Label>
                <div className="flex h-20 rounded-md overflow-hidden">
                  {palette.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                        <Copy className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Click on a color to copy its HEX code</span>
                  <Button variant="link" size="sm" className="h-auto p-0" onClick={copyAllAsCSS}>
                    Copy all as CSS variables
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {palette.map((color, index) => (
                  <div key={index} className="space-y-1 text-center">
                    <div
                      className="aspect-square rounded-md border overflow-hidden hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    />
                    <p className="text-xs font-mono">{color}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Harmony</CardTitle>
              <CardDescription>Understanding color relationships</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Analogous</h3>
                <p className="text-xs text-muted-foreground">
                  Colors that are adjacent to each other on the color wheel. These create harmonious and comfortable
                  designs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Complementary</h3>
                <p className="text-xs text-muted-foreground">
                  Colors that are opposite each other on the color wheel. These create high contrast and vibrant
                  designs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Triadic</h3>
                <p className="text-xs text-muted-foreground">
                  Three colors evenly spaced on the color wheel. These offer strong visual contrast while maintaining
                  harmony.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tetradic</h3>
                <p className="text-xs text-muted-foreground">
                  Four colors arranged in two complementary pairs. These offer rich color schemes with many
                  possibilities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Monochromatic</h3>
                <p className="text-xs text-muted-foreground">
                  Different shades and tints of a single hue. These create a cohesive and sophisticated look.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Split Complementary</h3>
                <p className="text-xs text-muted-foreground">
                  A base color and two colors adjacent to its complement. These provide high contrast with less tension.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Using Your Palette</CardTitle>
            <CardDescription>Tips for applying your color palette effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">60-30-10 Rule</h3>
                <p className="text-sm text-muted-foreground">
                  Use your dominant color for 60% of the design, secondary color for 30%, and accent color for 10%. This
                  creates a balanced and visually appealing design.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure there's enough contrast between text and background colors. Use our Contrast Checker tool to
                  verify WCAG compliance.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Consistency</h3>
                <p className="text-sm text-muted-foreground">
                  Apply your palette consistently across your design. Use the same colors for the same types of elements
                  to create a cohesive look.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">CSS Implementation</h3>
                <p className="text-sm text-muted-foreground">
                  Use CSS variables to implement your palette. This makes it easy to update colors across your entire
                  project.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
