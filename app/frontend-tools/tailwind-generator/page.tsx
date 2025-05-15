"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TailwindGenerator() {
  const [spacing, setSpacing] = useState(4)
  const [paddingX, setPaddingX] = useState(4)
  const [paddingY, setPaddingY] = useState(2)
  const [marginX, setMarginX] = useState(0)
  const [marginY, setMarginY] = useState(0)
  const [borderRadius, setBorderRadius] = useState(2)
  const [borderWidth, setBorderWidth] = useState(1)
  const [fontSize, setFontSize] = useState("sm")
  const [fontWeight, setFontWeight] = useState("medium")
  const [textColor, setTextColor] = useState("gray-700")
  const [backgroundColor, setBackgroundColor] = useState("white")
  const [borderColor, setBorderColor] = useState("gray-300")
  const [shadowSize, setShadowSize] = useState("sm")
  const [width, setWidth] = useState("auto")
  const [height, setHeight] = useState("auto")
  const [display, setDisplay] = useState("block")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Generate Tailwind classes
  const generateTailwindClasses = () => {
    const classes = [
      // Spacing
      paddingX > 0 ? `px-${paddingX}` : "",
      paddingY > 0 ? `py-${paddingY}` : "",
      marginX > 0 ? `mx-${marginX}` : "",
      marginY > 0 ? `my-${marginY}` : "",

      // Border
      borderRadius > 0 ? `rounded${borderRadius === 1 ? "" : `-${borderRadius}`}` : "",
      borderWidth > 0 ? `border${borderWidth === 1 ? "" : `-${borderWidth}`}` : "",
      borderWidth > 0 ? `border-${borderColor}` : "",

      // Typography
      fontSize ? `text-${fontSize}` : "",
      fontWeight ? `font-${fontWeight}` : "",
      textColor ? `text-${textColor}` : "",

      // Background
      backgroundColor ? `bg-${backgroundColor}` : "",

      // Shadow
      shadowSize ? `shadow${shadowSize === "DEFAULT" ? "" : `-${shadowSize}`}` : "",

      // Sizing
      width !== "auto" ? `w-${width}` : "w-auto",
      height !== "auto" ? `h-${height}` : "h-auto",

      // Display
      display ? display : "",
    ]
      .filter(Boolean)
      .join(" ")

    return classes
  }

  // Copy classes to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTailwindClasses())
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Tailwind classes copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // Reset all values
  const resetValues = () => {
    setSpacing(4)
    setPaddingX(4)
    setPaddingY(2)
    setMarginX(0)
    setMarginY(0)
    setBorderRadius(2)
    setBorderWidth(1)
    setFontSize("sm")
    setFontWeight("medium")
    setTextColor("gray-700")
    setBackgroundColor("white")
    setBorderColor("gray-300")
    setShadowSize("sm")
    setWidth("auto")
    setHeight("auto")
    setDisplay("block")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Tailwind CSS Generator</h1>
          <p className="text-muted-foreground">Generate Tailwind CSS classes with live preview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tailwind Controls</CardTitle>
                  <CardDescription>Customize your Tailwind CSS classes</CardDescription>
                </div>
                <Button variant="outline" size="icon" onClick={resetValues}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="spacing">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="spacing">Spacing</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="borders">Borders</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>

                <TabsContent value="spacing" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="padding-x">Padding X: {paddingX}</Label>
                    </div>
                    <Slider
                      id="padding-x"
                      min={0}
                      max={12}
                      step={1}
                      value={[paddingX]}
                      onValueChange={(value) => setPaddingX(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="padding-y">Padding Y: {paddingY}</Label>
                    </div>
                    <Slider
                      id="padding-y"
                      min={0}
                      max={12}
                      step={1}
                      value={[paddingY]}
                      onValueChange={(value) => setPaddingY(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="margin-x">Margin X: {marginX}</Label>
                    </div>
                    <Slider
                      id="margin-x"
                      min={0}
                      max={12}
                      step={1}
                      value={[marginX]}
                      onValueChange={(value) => setMarginX(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="margin-y">Margin Y: {marginY}</Label>
                    </div>
                    <Slider
                      id="margin-y"
                      min={0}
                      max={12}
                      step={1}
                      value={[marginY]}
                      onValueChange={(value) => setMarginY(value[0])}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <Select value={width} onValueChange={setWidth}>
                        <SelectTrigger id="width">
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="full">Full</SelectItem>
                          <SelectItem value="1/2">1/2</SelectItem>
                          <SelectItem value="1/3">1/3</SelectItem>
                          <SelectItem value="2/3">2/3</SelectItem>
                          <SelectItem value="1/4">1/4</SelectItem>
                          <SelectItem value="3/4">3/4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Select value={height} onValueChange={setHeight}>
                        <SelectTrigger id="height">
                          <SelectValue placeholder="Select height" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="full">Full</SelectItem>
                          <SelectItem value="screen">Screen</SelectItem>
                          <SelectItem value="12">12 (3rem)</SelectItem>
                          <SelectItem value="16">16 (4rem)</SelectItem>
                          <SelectItem value="20">20 (5rem)</SelectItem>
                          <SelectItem value="24">24 (6rem)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display">Display</Label>
                    <Select value={display} onValueChange={setDisplay}>
                      <SelectTrigger id="display">
                        <SelectValue placeholder="Select display" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="block">Block</SelectItem>
                        <SelectItem value="inline-block">Inline Block</SelectItem>
                        <SelectItem value="inline">Inline</SelectItem>
                        <SelectItem value="flex">Flex</SelectItem>
                        <SelectItem value="inline-flex">Inline Flex</SelectItem>
                        <SelectItem value="grid">Grid</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger id="font-size">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">xs (0.75rem)</SelectItem>
                        <SelectItem value="sm">sm (0.875rem)</SelectItem>
                        <SelectItem value="base">base (1rem)</SelectItem>
                        <SelectItem value="lg">lg (1.125rem)</SelectItem>
                        <SelectItem value="xl">xl (1.25rem)</SelectItem>
                        <SelectItem value="2xl">2xl (1.5rem)</SelectItem>
                        <SelectItem value="3xl">3xl (1.875rem)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="font-weight">Font Weight</Label>
                    <Select value={fontWeight} onValueChange={setFontWeight}>
                      <SelectTrigger id="font-weight">
                        <SelectValue placeholder="Select font weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thin">Thin (100)</SelectItem>
                        <SelectItem value="extralight">Extra Light (200)</SelectItem>
                        <SelectItem value="light">Light (300)</SelectItem>
                        <SelectItem value="normal">Normal (400)</SelectItem>
                        <SelectItem value="medium">Medium (500)</SelectItem>
                        <SelectItem value="semibold">Semibold (600)</SelectItem>
                        <SelectItem value="bold">Bold (700)</SelectItem>
                        <SelectItem value="extrabold">Extra Bold (800)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <Select value={textColor} onValueChange={setTextColor}>
                      <SelectTrigger id="text-color">
                        <SelectValue placeholder="Select text color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="gray-50">Gray 50</SelectItem>
                        <SelectItem value="gray-100">Gray 100</SelectItem>
                        <SelectItem value="gray-200">Gray 200</SelectItem>
                        <SelectItem value="gray-300">Gray 300</SelectItem>
                        <SelectItem value="gray-400">Gray 400</SelectItem>
                        <SelectItem value="gray-500">Gray 500</SelectItem>
                        <SelectItem value="gray-600">Gray 600</SelectItem>
                        <SelectItem value="gray-700">Gray 700</SelectItem>
                        <SelectItem value="gray-800">Gray 800</SelectItem>
                        <SelectItem value="gray-900">Gray 900</SelectItem>
                        <SelectItem value="red-500">Red</SelectItem>
                        <SelectItem value="green-500">Green</SelectItem>
                        <SelectItem value="blue-500">Blue</SelectItem>
                        <SelectItem value="yellow-500">Yellow</SelectItem>
                        <SelectItem value="purple-500">Purple</SelectItem>
                        <SelectItem value="pink-500">Pink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="borders" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="border-radius">Border Radius: {borderRadius}</Label>
                    </div>
                    <Slider
                      id="border-radius"
                      min={0}
                      max={8}
                      step={1}
                      value={[borderRadius]}
                      onValueChange={(value) => setBorderRadius(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="border-width">Border Width: {borderWidth}</Label>
                    </div>
                    <Slider
                      id="border-width"
                      min={0}
                      max={4}
                      step={1}
                      value={[borderWidth]}
                      onValueChange={(value) => setBorderWidth(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="border-color">Border Color</Label>
                    <Select value={borderColor} onValueChange={setBorderColor}>
                      <SelectTrigger id="border-color">
                        <SelectValue placeholder="Select border color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transparent">Transparent</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="gray-100">Gray 100</SelectItem>
                        <SelectItem value="gray-200">Gray 200</SelectItem>
                        <SelectItem value="gray-300">Gray 300</SelectItem>
                        <SelectItem value="gray-400">Gray 400</SelectItem>
                        <SelectItem value="gray-500">Gray 500</SelectItem>
                        <SelectItem value="gray-600">Gray 600</SelectItem>
                        <SelectItem value="gray-700">Gray 700</SelectItem>
                        <SelectItem value="gray-800">Gray 800</SelectItem>
                        <SelectItem value="gray-900">Gray 900</SelectItem>
                        <SelectItem value="red-500">Red</SelectItem>
                        <SelectItem value="green-500">Green</SelectItem>
                        <SelectItem value="blue-500">Blue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="background-color">Background Color</Label>
                    <Select value={backgroundColor} onValueChange={setBackgroundColor}>
                      <SelectTrigger id="background-color">
                        <SelectValue placeholder="Select background color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transparent">Transparent</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="gray-50">Gray 50</SelectItem>
                        <SelectItem value="gray-100">Gray 100</SelectItem>
                        <SelectItem value="gray-200">Gray 200</SelectItem>
                        <SelectItem value="gray-300">Gray 300</SelectItem>
                        <SelectItem value="gray-400">Gray 400</SelectItem>
                        <SelectItem value="gray-500">Gray 500</SelectItem>
                        <SelectItem value="gray-600">Gray 600</SelectItem>
                        <SelectItem value="gray-700">Gray 700</SelectItem>
                        <SelectItem value="gray-800">Gray 800</SelectItem>
                        <SelectItem value="gray-900">Gray 900</SelectItem>
                        <SelectItem value="red-50">Red 50</SelectItem>
                        <SelectItem value="red-500">Red 500</SelectItem>
                        <SelectItem value="green-50">Green 50</SelectItem>
                        <SelectItem value="green-500">Green 500</SelectItem>
                        <SelectItem value="blue-50">Blue 50</SelectItem>
                        <SelectItem value="blue-500">Blue 500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="effects" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shadow-size">Shadow Size</Label>
                    <Select value={shadowSize} onValueChange={setShadowSize}>
                      <SelectTrigger id="shadow-size">
                        <SelectValue placeholder="Select shadow size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="DEFAULT">Default</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                        <SelectItem value="2xl">2XL</SelectItem>
                        <SelectItem value="inner">Inner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-2">
                <Label htmlFor="tailwind-classes">Generated Tailwind Classes</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tailwind-classes"
                    value={generateTailwindClasses()}
                    readOnly
                    className="font-mono text-sm"
                  />
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
              <CardDescription>Live preview of your Tailwind styles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 flex items-center justify-center">
                <div className={generateTailwindClasses()}>Preview Element</div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-medium">Common Combinations:</h3>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPaddingX(4)
                      setPaddingY(2)
                      setBorderRadius(2)
                      setBorderWidth(1)
                      setBorderColor("gray-300")
                      setBackgroundColor("white")
                      setShadowSize("sm")
                      setFontSize("sm")
                      setFontWeight("medium")
                      setTextColor("gray-700")
                    }}
                  >
                    Button
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPaddingX(4)
                      setPaddingY(3)
                      setBorderRadius(2)
                      setBorderWidth(1)
                      setBorderColor("gray-300")
                      setBackgroundColor("white")
                      setShadowSize("sm")
                      setWidth("full")
                    }}
                  >
                    Card
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPaddingX(3)
                      setPaddingY(2)
                      setBorderRadius(2)
                      setBorderWidth(1)
                      setBorderColor("gray-300")
                      setBackgroundColor("white")
                      setFontSize("sm")
                      setWidth("full")
                    }}
                  >
                    Input
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
