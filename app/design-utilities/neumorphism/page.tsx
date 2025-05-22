"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function NeumorphismPage() {
  const [neomorph, setNeomorph] = useState({
    size: 200,
    radius: 50,
    distance: 20,
    intensity: 15,
    blur: 30,
    shape: "flat" as "flat" | "concave" | "convex" | "pressed",
    color: "#e0e0e0",
  })
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleChange = (property: keyof typeof neomorph, value: number | string) => {
    setNeomorph({ ...neomorph, [property]: value })
  }

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  // Lighten color
  const lightenColor = (hex: string, amount: number) => {
    const { r, g, b } = hexToRgb(hex)
    const lightR = Math.min(r + amount, 255)
    const lightG = Math.min(g + amount, 255)
    const lightB = Math.min(b + amount, 255)
    return `rgb(${lightR}, ${lightG}, ${lightB})`
  }

  // Darken color
  const darkenColor = (hex: string, amount: number) => {
    const { r, g, b } = hexToRgb(hex)
    const darkR = Math.max(r - amount, 0)
    const darkG = Math.max(g - amount, 0)
    const darkB = Math.max(b - amount, 0)
    return `rgb(${darkR}, ${darkG}, ${darkB})`
  }

  const getNeumorphismStyle = () => {
    const { shape, distance, blur, intensity, color } = neomorph
    const lightShadow = lightenColor(color, intensity)
    const darkShadow = darkenColor(color, intensity)
    
    let boxShadow = ""
    
    switch (shape) {
      case "flat":
        boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow},
                     -${distance}px -${distance}px ${blur}px ${lightShadow}`
        break
      case "concave":
        boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow},
                     -${distance}px -${distance}px ${blur}px ${lightShadow},
                     inset 5px 5px 10px rgba(0, 0, 0, 0.05),
                     inset -5px -5px 10px rgba(255, 255, 255, 0.05)`
        break
      case "convex":
        boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow},
                     -${distance}px -${distance}px ${blur}px ${lightShadow},
                     inset -3px -3px 6px rgba(0, 0, 0, 0.01),
                     inset 3px 3px 6px rgba(255, 255, 255, 0.05)`
        break
      case "pressed":
        boxShadow = `inset ${distance}px ${distance}px ${blur}px ${darkShadow},
                     inset -${distance}px -${distance}px ${blur}px ${lightShadow}`
        break
    }
    
    return {
      background: color,
      boxShadow,
    }
  }

  const neumorphismCss = `.neumorphism {
  width: ${neomorph.size}px;
  height: ${neomorph.size}px;
  border-radius: ${neomorph.radius}px;
  background: ${neomorph.color};
  box-shadow: ${getNeumorphismStyle().boxShadow};
}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(neumorphismCss)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Neumorphism CSS copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Neumorphism Generator</h1>
          <p className="text-muted-foreground">
            Create soft UI/neumorphic designs with this visual generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Neumorphism Controls</CardTitle>
              <CardDescription>Adjust the settings to customize your soft UI effect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="size">Size: {neomorph.size}px</Label>
                  </div>
                  <Slider
                    id="size"
                    min={50}
                    max={300}
                    step={10}
                    value={[neomorph.size]}
                    onValueChange={(value) => handleChange("size", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="radius">Border Radius: {neomorph.radius}px</Label>
                  </div>
                  <Slider
                    id="radius"
                    min={0}
                    max={100}
                    step={1}
                    value={[neomorph.radius]}
                    onValueChange={(value) => handleChange("radius", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="distance">Shadow Distance: {neomorph.distance}px</Label>
                  </div>
                  <Slider
                    id="distance"
                    min={5}
                    max={50}
                    step={1}
                    value={[neomorph.distance]}
                    onValueChange={(value) => handleChange("distance", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="intensity">Shadow Intensity: {neomorph.intensity}</Label>
                  </div>
                  <Slider
                    id="intensity"
                    min={5}
                    max={30}
                    step={1}
                    value={[neomorph.intensity]}
                    onValueChange={(value) => handleChange("intensity", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="blur">Shadow Blur: {neomorph.blur}px</Label>
                  </div>
                  <Slider
                    id="blur"
                    min={10}
                    max={80}
                    step={1}
                    value={[neomorph.blur]}
                    onValueChange={(value) => handleChange("blur", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Shadow Type</Label>
                  <RadioGroup
                    value={neomorph.shape}
                    onValueChange={(value) => handleChange("shape", value)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flat" id="flat" />
                      <Label htmlFor="flat">Flat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="concave" id="concave" />
                      <Label htmlFor="concave">Concave</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="convex" id="convex" />
                      <Label htmlFor="convex">Convex</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pressed" id="pressed" />
                      <Label htmlFor="pressed">Pressed</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: neomorph.color }}
                    ></div>
                    <Input
                      id="color"
                      type="color"
                      value={neomorph.color}
                      onChange={(e) => handleChange("color", e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tip: Light pastel colors work best with neumorphism (e.g., #e0e0e0)
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setNeomorph({
                        size: 200,
                        radius: 50,
                        distance: 20,
                        intensity: 15,
                        blur: 30,
                        shape: "flat",
                        color: "#e0e0e0",
                      })
                    }
                  >
                    Reset
                  </Button>
                  <Button onClick={copyToClipboard}>
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy CSS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>See your neumorphic design in action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg border flex items-center justify-center"
                     style={{ background: neomorph.color }}>
                  <div
                    style={{
                      width: `${Math.min(neomorph.size, 250)}px`,
                      height: `${Math.min(neomorph.size, 250)}px`,
                      borderRadius: `${neomorph.radius}px`,
                      ...getNeumorphismStyle(),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="text-sm opacity-50">Neumorphism</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="css-output">CSS Code</Label>
                  <div className="relative">
                    <textarea
                      id="css-output"
                      readOnly
                      value={neumorphismCss}
                      rows={7}
                      className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 