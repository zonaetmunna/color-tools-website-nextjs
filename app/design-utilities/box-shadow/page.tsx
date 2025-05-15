"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BoxShadowGenerator() {
  const [horizontalOffset, setHorizontalOffset] = useState(5)
  const [verticalOffset, setVerticalOffset] = useState(5)
  const [blurRadius, setBlurRadius] = useState(10)
  const [spreadRadius, setSpreadRadius] = useState(0)
  const [shadowColor, setShadowColor] = useState("#0000001a")
  const [inset, setInset] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Generate CSS code
  const generateCssCode = () => {
    return `box-shadow: ${inset ? "inset " : ""}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${shadowColor};`
  }

  // Copy CSS to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCssCode())
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
          <h1 className="text-3xl font-bold mb-2">Box Shadow Generator</h1>
          <p className="text-muted-foreground">Create and customize box shadows with live preview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Shadow Controls</CardTitle>
              <CardDescription>Adjust the parameters to customize your box shadow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="horizontal-offset">Horizontal Offset: {horizontalOffset}px</Label>
                  </div>
                  <Slider
                    id="horizontal-offset"
                    min={-50}
                    max={50}
                    step={1}
                    value={[horizontalOffset]}
                    onValueChange={(value) => setHorizontalOffset(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="vertical-offset">Vertical Offset: {verticalOffset}px</Label>
                  </div>
                  <Slider
                    id="vertical-offset"
                    min={-50}
                    max={50}
                    step={1}
                    value={[verticalOffset]}
                    onValueChange={(value) => setVerticalOffset(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="blur-radius">Blur Radius: {blurRadius}px</Label>
                  </div>
                  <Slider
                    id="blur-radius"
                    min={0}
                    max={100}
                    step={1}
                    value={[blurRadius]}
                    onValueChange={(value) => setBlurRadius(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="spread-radius">Spread Radius: {spreadRadius}px</Label>
                  </div>
                  <Slider
                    id="spread-radius"
                    min={-50}
                    max={50}
                    step={1}
                    value={[spreadRadius]}
                    onValueChange={(value) => setSpreadRadius(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shadow-color">Shadow Color</Label>
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 rounded-md border overflow-hidden">
                      <input
                        type="color"
                        id="shadow-color"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="w-12 h-12 -ml-1 -mt-1 cursor-pointer"
                      />
                    </div>
                    <Input value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="flex-1" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="inset" checked={inset} onCheckedChange={setInset} />
                  <Label htmlFor="inset">Inset Shadow</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="css-code">CSS Code</Label>
                <div className="flex space-x-2">
                  <Input id="css-code" value={generateCssCode()} readOnly className="font-mono text-sm" />
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
              <CardDescription>Live preview of your box shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 bg-background rounded-md">
                <div
                  className="w-32 h-32 bg-white rounded-md"
                  style={{
                    boxShadow: `${inset ? "inset " : ""}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${shadowColor}`,
                  }}
                />
              </div>
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-medium">Presets:</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setHorizontalOffset(5)
                      setVerticalOffset(5)
                      setBlurRadius(10)
                      setSpreadRadius(0)
                      setShadowColor("#0000001a")
                      setInset(false)
                    }}
                  >
                    Subtle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setHorizontalOffset(0)
                      setVerticalOffset(10)
                      setBlurRadius(15)
                      setSpreadRadius(-3)
                      setShadowColor("#00000033")
                      setInset(false)
                    }}
                  >
                    Medium
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setHorizontalOffset(0)
                      setVerticalOffset(20)
                      setBlurRadius(25)
                      setSpreadRadius(-5)
                      setShadowColor("#00000040")
                      setInset(false)
                    }}
                  >
                    Large
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setHorizontalOffset(0)
                      setVerticalOffset(0)
                      setBlurRadius(10)
                      setSpreadRadius(0)
                      setShadowColor("#0000004d")
                      setInset(true)
                    }}
                  >
                    Inset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Box Shadow Tips</CardTitle>
            <CardDescription>How to use box shadows effectively in your designs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Elevation</h3>
                <p className="text-sm text-muted-foreground">
                  Use larger vertical offsets and blur radius to create a sense of elevation. The higher the element
                  should appear, the larger these values should be.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Subtle Shadows</h3>
                <p className="text-sm text-muted-foreground">
                  For subtle shadows, use small offset values, moderate blur, and low opacity colors. These work well
                  for cards and subtle UI elements.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Inset Shadows</h3>
                <p className="text-sm text-muted-foreground">
                  Inset shadows are great for creating pressed or sunken effects, like for buttons in their active state
                  or for form inputs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Multiple Shadows</h3>
                <p className="text-sm text-muted-foreground">
                  For more realistic shadows, consider using multiple box-shadows together - one for the ambient light
                  and one for the direct light.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
