"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function GlassmorphismPage() {
  const [glass, setGlass] = useState({
    opacity: 20,
    blur: 8,
    saturation: 180,
    borderRadius: 10,
    borderOpacity: 20,
    backgroundColor: "#ffffff",
  })
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGlassChange = (property: keyof typeof glass, value: number | string) => {
    setGlass({ ...glass, [property]: value })
  }

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
  }

  const glassCssString = `.glassmorphism {
  background: ${hexToRgba(glass.backgroundColor, glass.opacity)};
  backdrop-filter: blur(${glass.blur}px) saturate(${glass.saturation}%);
  -webkit-backdrop-filter: blur(${glass.blur}px) saturate(${glass.saturation}%);
  border-radius: ${glass.borderRadius}px;
  border: 1px solid ${hexToRgba("#ffffff", glass.borderOpacity)};
}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(glassCssString)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Glassmorphism CSS copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Glassmorphism Generator</h1>
          <p className="text-muted-foreground">Create modern glass effect designs with this visual generator</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Glass Effect Controls</CardTitle>
              <CardDescription>Adjust the settings to customize your glass effect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="opacity">Background Opacity: {glass.opacity}%</Label>
                  </div>
                  <Slider
                    id="opacity"
                    min={0}
                    max={100}
                    step={1}
                    value={[glass.opacity]}
                    onValueChange={(value) => handleGlassChange("opacity", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="blur">Blur Amount: {glass.blur}px</Label>
                  </div>
                  <Slider
                    id="blur"
                    min={0}
                    max={20}
                    step={0.5}
                    value={[glass.blur]}
                    onValueChange={(value) => handleGlassChange("blur", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="saturation">Saturation: {glass.saturation}%</Label>
                  </div>
                  <Slider
                    id="saturation"
                    min={100}
                    max={300}
                    step={5}
                    value={[glass.saturation]}
                    onValueChange={(value) => handleGlassChange("saturation", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="border-radius">Border Radius: {glass.borderRadius}px</Label>
                  </div>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={50}
                    step={1}
                    value={[glass.borderRadius]}
                    onValueChange={(value) => handleGlassChange("borderRadius", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="border-opacity">Border Opacity: {glass.borderOpacity}%</Label>
                  </div>
                  <Slider
                    id="border-opacity"
                    min={0}
                    max={100}
                    step={1}
                    value={[glass.borderOpacity]}
                    onValueChange={(value) => handleGlassChange("borderOpacity", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: glass.backgroundColor }}
                    ></div>
                    <Input
                      id="background-color"
                      type="color"
                      value={glass.backgroundColor}
                      onChange={(e) => handleGlassChange("backgroundColor", e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setGlass({
                        opacity: 20,
                        blur: 8,
                        saturation: 180,
                        borderRadius: 10,
                        borderOpacity: 20,
                        backgroundColor: "#ffffff",
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
                <CardDescription>See your glass effect in action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img 
                    src="/glassmorphism-bg.jpg" 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-3/4 h-3/4 p-4 flex items-center justify-center"
                      style={{
                        background: hexToRgba(glass.backgroundColor, glass.opacity),
                        backdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}%)`,
                        WebkitBackdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}%)`,
                        borderRadius: `${glass.borderRadius}px`,
                        border: `1px solid ${hexToRgba("#ffffff", glass.borderOpacity)}`,
                      }}
                    >
                      <p className="text-lg font-medium">Glassmorphism Effect</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="css-output">CSS Code</Label>
                  <div className="relative">
                    <textarea
                      id="css-output"
                      readOnly
                      value={glassCssString}
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