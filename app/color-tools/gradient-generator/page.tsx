"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Copy, Check, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ColorStop = {
  color: string
  position: number
}

export default function GradientGenerator() {
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear")
  const [angle, setAngle] = useState(90)
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: "#6366f1", position: 0 },
    { color: "#ec4899", position: 100 },
  ])
  const [cssCode, setCssCode] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Generate CSS code
  useEffect(() => {
    let gradientCSS = ""

    if (gradientType === "linear") {
      const stopsCSS = colorStops
        .sort((a, b) => a.position - b.position)
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ")

      gradientCSS = `background: linear-gradient(${angle}deg, ${stopsCSS});`
    } else {
      const stopsCSS = colorStops
        .sort((a, b) => a.position - b.position)
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ")

      gradientCSS = `background: radial-gradient(circle, ${stopsCSS});`
    }

    setCssCode(gradientCSS)
  }, [gradientType, angle, colorStops])

  // Add a new color stop
  const addColorStop = () => {
    if (colorStops.length < 10) {
      const newPosition = 50
      const newColor = "#ffffff"

      setColorStops([...colorStops, { color: newColor, position: newPosition }])
    } else {
      toast({
        title: "Maximum color stops reached",
        description: "You can have a maximum of 10 color stops.",
        variant: "destructive",
      })
    }
  }

  // Remove a color stop
  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      const newStops = [...colorStops]
      newStops.splice(index, 1)
      setColorStops(newStops)
    } else {
      toast({
        title: "Minimum color stops required",
        description: "You need at least 2 color stops for a gradient.",
        variant: "destructive",
      })
    }
  }

  // Update color stop
  const updateColorStop = (index: number, field: "color" | "position", value: string | number) => {
    const newStops = [...colorStops]

    if (field === "position") {
      newStops[index].position = value as number
    } else {
      newStops[index].color = value as string
    }

    setColorStops(newStops)
  }

  // Copy CSS to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "CSS code copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Gradient Generator</h1>
          <p className="text-muted-foreground">
            Create beautiful linear and radial gradients with multiple color stops
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Gradient Controls</CardTitle>
              <CardDescription>Customize your gradient settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Gradient Type</Label>
                  <RadioGroup
                    defaultValue="linear"
                    value={gradientType}
                    onValueChange={(value) => setGradientType(value as "linear" | "radial")}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="linear" id="linear" />
                      <Label htmlFor="linear">Linear</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="radial" id="radial" />
                      <Label htmlFor="radial">Radial</Label>
                    </div>
                  </RadioGroup>
                </div>

                {gradientType === "linear" && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="angle">Angle: {angle}°</Label>
                    </div>
                    <Slider
                      id="angle"
                      min={0}
                      max={360}
                      step={1}
                      value={[angle]}
                      onValueChange={(value) => setAngle(value[0])}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Color Stops</Label>
                    <Button variant="outline" size="sm" onClick={addColorStop}>
                      <Plus className="h-4 w-4 mr-2" /> Add Color
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {colorStops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-md border overflow-hidden">
                          <input
                            type="color"
                            value={stop.color}
                            onChange={(e) => updateColorStop(index, "color", e.target.value)}
                            className="w-12 h-12 -ml-1 -mt-1 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <Label htmlFor={`position-${index}`}>Position: {stop.position}%</Label>
                          </div>
                          <Slider
                            id={`position-${index}`}
                            min={0}
                            max={100}
                            step={1}
                            value={[stop.position]}
                            onValueChange={(value) => updateColorStop(index, "position", value[0])}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeColorStop(index)}
                          disabled={colorStops.length <= 2}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="css-code">CSS Code</Label>
                <div className="flex space-x-2">
                  <Input id="css-code" value={cssCode} readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="icon" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Live preview of your gradient</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="w-full aspect-square rounded-md border"
                style={{
                  background:
                    gradientType === "linear"
                      ? `linear-gradient(${angle}deg, ${colorStops
                          .sort((a, b) => a.position - b.position)
                          .map((stop) => `${stop.color} ${stop.position}%`)
                          .join(", ")})`
                      : `radial-gradient(circle, ${colorStops
                          .sort((a, b) => a.position - b.position)
                          .map((stop) => `${stop.color} ${stop.position}%`)
                          .join(", ")})`,
                }}
              />
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-medium">Tips:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Add more color stops for complex gradients</li>
                  <li>Adjust positions to control color distribution</li>
                  <li>Try different angles for linear gradients</li>
                  <li>Use radial gradients for circular effects</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Gradient Examples</CardTitle>
            <CardDescription>Click on any example to apply it to the generator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                {
                  type: "linear",
                  angle: 90,
                  stops: [
                    { color: "#f43f5e", position: 0 },
                    { color: "#8b5cf6", position: 100 },
                  ],
                },
                {
                  type: "linear",
                  angle: 45,
                  stops: [
                    { color: "#3b82f6", position: 0 },
                    { color: "#10b981", position: 100 },
                  ],
                },
                {
                  type: "linear",
                  angle: 135,
                  stops: [
                    { color: "#f97316", position: 0 },
                    { color: "#eab308", position: 100 },
                  ],
                },
                {
                  type: "radial",
                  stops: [
                    { color: "#6366f1", position: 0 },
                    { color: "#ec4899", position: 100 },
                  ],
                },
                {
                  type: "linear",
                  angle: 90,
                  stops: [
                    { color: "#0ea5e9", position: 0 },
                    { color: "#8b5cf6", position: 50 },
                    { color: "#ec4899", position: 100 },
                  ],
                },
              ].map((example, index) => (
                <button
                  key={index}
                  className="aspect-square rounded-md border overflow-hidden hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all"
                  style={{
                    background:
                      example.type === "linear"
                        ? `linear-gradient(${example.angle}deg, ${example.stops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")})`
                        : `radial-gradient(circle, ${example.stops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")})`,
                  }}
                  onClick={() => {
                    setGradientType(example.type as "linear" | "radial")
                    if (example.type === "linear" && example.angle) {
                      setAngle(example.angle)
                    }
                    setColorStops(example.stops)
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
