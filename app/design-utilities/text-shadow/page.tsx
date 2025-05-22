"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function TextShadowPage() {
  const [shadow, setShadow] = useState({
    offsetX: 2,
    offsetY: 2,
    blur: 3,
    color: "#000000",
    opacity: 30,
  })
  const [text, setText] = useState("Text Shadow Example")
  const [fontSize, setFontSize] = useState(36)
  const [fontWeight, setFontWeight] = useState(600)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleShadowChange = (property: keyof typeof shadow, value: number | string) => {
    setShadow({ ...shadow, [property]: value })
  }

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
  }

  const textShadowString = `text-shadow: ${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${hexToRgba(
    shadow.color,
    shadow.opacity,
  )};`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textShadowString)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Text shadow CSS copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Text Shadow Generator</h1>
          <p className="text-muted-foreground">Create beautiful text shadow effects with a visual editor</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Shadow Controls</CardTitle>
              <CardDescription>Adjust the settings to customize your text shadow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="horizontal-offset">Horizontal Offset: {shadow.offsetX}px</Label>
                  </div>
                  <Slider
                    id="horizontal-offset"
                    min={-20}
                    max={20}
                    step={1}
                    value={[shadow.offsetX]}
                    onValueChange={(value) => handleShadowChange("offsetX", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="vertical-offset">Vertical Offset: {shadow.offsetY}px</Label>
                  </div>
                  <Slider
                    id="vertical-offset"
                    min={-20}
                    max={20}
                    step={1}
                    value={[shadow.offsetY]}
                    onValueChange={(value) => handleShadowChange("offsetY", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="blur-radius">Blur Radius: {shadow.blur}px</Label>
                  </div>
                  <Slider
                    id="blur-radius"
                    min={0}
                    max={20}
                    step={1}
                    value={[shadow.blur]}
                    onValueChange={(value) => handleShadowChange("blur", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="shadow-opacity">Shadow Opacity: {shadow.opacity}%</Label>
                  </div>
                  <Slider
                    id="shadow-opacity"
                    min={0}
                    max={100}
                    step={1}
                    value={[shadow.opacity]}
                    onValueChange={(value) => handleShadowChange("opacity", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shadow-color">Shadow Color</Label>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: shadow.color }}
                    ></div>
                    <Input
                      id="shadow-color"
                      type="color"
                      value={shadow.color}
                      onChange={(e) => handleShadowChange("color", e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="preview-text">Preview Text</Label>
                  <Input
                    id="preview-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to preview"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                  </div>
                  <Slider
                    id="font-size"
                    min={12}
                    max={72}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="font-weight">Font Weight: {fontWeight}</Label>
                  </div>
                  <Slider
                    id="font-weight"
                    min={100}
                    max={900}
                    step={100}
                    value={[fontWeight]}
                    onValueChange={(value) => setFontWeight(value[0])}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setShadow({
                        offsetX: 2,
                        offsetY: 2,
                        blur: 3,
                        color: "#000000",
                        opacity: 30,
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
                <CardDescription>See your text shadow in action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 rounded-lg border flex items-center justify-center min-h-[200px] bg-[#f8f9fa] dark:bg-[#1e1e2e]">
                  <p
                    style={{
                      textShadow: `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${hexToRgba(
                        shadow.color,
                        shadow.opacity
                      )}`,
                      fontSize: `${fontSize}px`,
                      fontWeight: fontWeight,
                    }}
                  >
                    {text || "Text Shadow"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="css-output">CSS Code</Label>
                  <div className="relative">
                    <Input
                      id="css-output"
                      readOnly
                      value={textShadowString}
                      className="pr-10 font-mono text-xs"
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