"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AlertCircle, Check, X, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContrastChecker() {
  const [foregroundColor, setForegroundColor] = useState("#ffffff")
  const [backgroundColor, setBackgroundColor] = useState("#6366f1")
  const [contrastRatio, setContrastRatio] = useState(0)
  const [wcagAA, setWcagAA] = useState(false)
  const [wcagAAA, setWcagAAA] = useState(false)
  const [sampleText, setSampleText] = useState("Sample Text")
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState("normal")
  const { toast } = useToast()

  // Calculate contrast ratio when colors change
  useEffect(() => {
    calculateContrastRatio()
  }, [foregroundColor, backgroundColor])

  // Calculate contrast ratio between two colors
  const calculateContrastRatio = () => {
    // Convert hex to RGB
    const fgRGB = hexToRgb(foregroundColor)
    const bgRGB = hexToRgb(backgroundColor)

    if (!fgRGB || !bgRGB) return

    // Calculate relative luminance
    const fgLuminance = calculateLuminance(fgRGB)
    const bgLuminance = calculateLuminance(bgRGB)

    // Calculate contrast ratio
    const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05)

    setContrastRatio(ratio)

    // Check WCAG compliance
    setWcagAA(ratio >= 4.5 || fontSize >= 18 || (fontSize >= 14 && fontWeight === "bold" && ratio >= 3))
    setWcagAAA(ratio >= 7 || fontSize >= 18 || (fontSize >= 14 && fontWeight === "bold" && ratio >= 4.5))
  }

  // Convert hex to RGB
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

  // Calculate relative luminance
  const calculateLuminance = (rgb: { r: number; g: number; b: number }) => {
    const { r, g, b } = rgb

    // Convert RGB to sRGB
    const sR = r / 255
    const sG = g / 255
    const sB = b / 255

    // Calculate luminance
    const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4)
    const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4)
    const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4)

    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }

  // Swap foreground and background colors
  const swapColors = () => {
    const temp = foregroundColor
    setForegroundColor(backgroundColor)
    setBackgroundColor(temp)
  }

  // Generate random colors
  const generateRandomColors = () => {
    const randomHex = () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
    setForegroundColor(randomHex())
    setBackgroundColor(randomHex())
  }

  // Get contrast ratio rating
  const getContrastRating = () => {
    if (contrastRatio >= 7) return "Excellent"
    if (contrastRatio >= 4.5) return "Good"
    if (contrastRatio >= 3) return "Fair"
    return "Poor"
  }

  // Get contrast ratio color
  const getContrastRatingColor = () => {
    if (contrastRatio >= 7) return "text-green-600 dark:text-green-400"
    if (contrastRatio >= 4.5) return "text-yellow-600 dark:text-yellow-400"
    if (contrastRatio >= 3) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Contrast Checker</h1>
          <p className="text-muted-foreground">Check WCAG accessibility compliance for color combinations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Color Contrast</CardTitle>
              <CardDescription>Check the contrast between text and background colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foreground-color">Text Color</Label>
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 rounded-md border overflow-hidden">
                      <input
                        type="color"
                        id="foreground-color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-12 h-12 -ml-1 -mt-1 cursor-pointer"
                      />
                    </div>
                    <Input
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 rounded-md border overflow-hidden">
                      <input
                        type="color"
                        id="background-color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-12 -ml-1 -mt-1 cursor-pointer"
                      />
                    </div>
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={swapColors} className="flex-1">
                  Swap Colors
                </Button>
                <Button variant="outline" onClick={generateRandomColors} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Random Colors
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample-text">Sample Text</Label>
                <Input id="sample-text" value={sampleText} onChange={(e) => setSampleText(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="font-size"
                      type="number"
                      min="8"
                      max="72"
                      value={fontSize}
                      onChange={(e) => {
                        setFontSize(Number.parseInt(e.target.value))
                        calculateContrastRatio()
                      }}
                    />
                    <span>px</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-weight">Font Weight</Label>
                  <select
                    id="font-weight"
                    value={fontWeight}
                    onChange={(e) => {
                      setFontWeight(e.target.value)
                      calculateContrastRatio()
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>
              </div>

              <div
                className="p-6 rounded-md flex items-center justify-center"
                style={{ backgroundColor: backgroundColor }}
              >
                <p
                  style={{
                    color: foregroundColor,
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                  }}
                >
                  {sampleText}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contrast Results</CardTitle>
              <CardDescription>WCAG accessibility compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{contrastRatio.toFixed(2)}:1</div>
                <div className={`text-lg font-medium ${getContrastRatingColor()}`}>{getContrastRating()}</div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">WCAG AA</span>
                    {wcagAA ? (
                      <span className="flex items-center text-green-600 dark:text-green-400">
                        <Check className="h-4 w-4 mr-1" /> Pass
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 dark:text-red-400">
                        <X className="h-4 w-4 mr-1" /> Fail
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">WCAG AAA</span>
                    {wcagAAA ? (
                      <span className="flex items-center text-green-600 dark:text-green-400">
                        <Check className="h-4 w-4 mr-1" /> Pass
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 dark:text-red-400">
                        <X className="h-4 w-4 mr-1" /> Fail
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Large Text</span>
                    <span className="text-sm text-muted-foreground">
                      {fontSize >= 18 || (fontSize >= 14 && fontWeight === "bold") ? "Yes" : "No"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Text is considered large if it's at least 18px or 14px bold.
                  </p>
                </div>
              </div>

              {!wcagAA && (
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        Accessibility Warning
                      </h4>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                        This color combination does not meet WCAG AA standards for accessibility. Consider adjusting the
                        colors to improve contrast.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About WCAG Contrast Guidelines</CardTitle>
            <CardDescription>Understanding accessibility requirements for color contrast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">What is WCAG?</h3>
                <p className="text-sm text-muted-foreground">
                  The Web Content Accessibility Guidelines (WCAG) are developed by the W3C to provide a single shared
                  standard for web content accessibility. They define how to make web content more accessible to people
                  with disabilities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Contrast Levels</h3>
                <p className="text-sm text-muted-foreground">
                  WCAG defines two levels of contrast compliance: AA (minimum) and AAA (enhanced). AA requires a
                  contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. AAA requires at least 7:1 for
                  normal text and 4.5:1 for large text.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Why Contrast Matters</h3>
                <p className="text-sm text-muted-foreground">
                  Sufficient contrast between text and its background is essential for people with low vision, color
                  blindness, or who are viewing screens in bright environments. Good contrast makes your content
                  readable for everyone.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Large Text Exception</h3>
                <p className="text-sm text-muted-foreground">
                  Large text (at least 18px or 14px bold) can have slightly lower contrast because it's easier to read.
                  This is why WCAG has different requirements for large text.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
