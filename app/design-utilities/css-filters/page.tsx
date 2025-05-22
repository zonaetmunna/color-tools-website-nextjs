"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function CssFiltersPage() {
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
    saturate: 100,
    sepia: 0,
  })
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleFilterChange = (filter: keyof typeof filters, value: number) => {
    setFilters({ ...filters, [filter]: value })
  }

  const cssFilterString = `
filter: ${filters.blur > 0 ? `blur(${filters.blur}px) ` : ""}${
    filters.brightness !== 100 ? `brightness(${filters.brightness}%) ` : ""
  }${filters.contrast !== 100 ? `contrast(${filters.contrast}%) ` : ""}${
    filters.grayscale > 0 ? `grayscale(${filters.grayscale}%) ` : ""
  }${filters.hueRotate > 0 ? `hue-rotate(${filters.hueRotate}deg) ` : ""}${
    filters.invert > 0 ? `invert(${filters.invert}%) ` : ""
  }${filters.opacity !== 100 ? `opacity(${filters.opacity}%) ` : ""}${
    filters.saturate !== 100 ? `saturate(${filters.saturate}%) ` : ""
  }${filters.sepia > 0 ? `sepia(${filters.sepia}%) ` : ""};
`.trim()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssFilterString)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "CSS filter code copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const resetFilters = () => {
    setFilters({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
      saturate: 100,
      sepia: 0,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">CSS Filters Generator</h1>
          <p className="text-muted-foreground">
            Create and preview CSS filter effects with a visual editor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Filters Controls</CardTitle>
              <CardDescription>
                Adjust the sliders to create your custom filter effect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="blur">Blur: {filters.blur}px</Label>
                  </div>
                  <Slider
                    id="blur"
                    min={0}
                    max={20}
                    step={0.5}
                    value={[filters.blur]}
                    onValueChange={(value) => handleFilterChange("blur", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="brightness">Brightness: {filters.brightness}%</Label>
                  </div>
                  <Slider
                    id="brightness"
                    min={0}
                    max={200}
                    step={1}
                    value={[filters.brightness]}
                    onValueChange={(value) => handleFilterChange("brightness", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="contrast">Contrast: {filters.contrast}%</Label>
                  </div>
                  <Slider
                    id="contrast"
                    min={0}
                    max={200}
                    step={1}
                    value={[filters.contrast]}
                    onValueChange={(value) => handleFilterChange("contrast", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="grayscale">Grayscale: {filters.grayscale}%</Label>
                  </div>
                  <Slider
                    id="grayscale"
                    min={0}
                    max={100}
                    step={1}
                    value={[filters.grayscale]}
                    onValueChange={(value) => handleFilterChange("grayscale", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="hueRotate">Hue Rotate: {filters.hueRotate}deg</Label>
                  </div>
                  <Slider
                    id="hueRotate"
                    min={0}
                    max={360}
                    step={1}
                    value={[filters.hueRotate]}
                    onValueChange={(value) => handleFilterChange("hueRotate", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="invert">Invert: {filters.invert}%</Label>
                  </div>
                  <Slider
                    id="invert"
                    min={0}
                    max={100}
                    step={1}
                    value={[filters.invert]}
                    onValueChange={(value) => handleFilterChange("invert", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="opacity">Opacity: {filters.opacity}%</Label>
                  </div>
                  <Slider
                    id="opacity"
                    min={0}
                    max={100}
                    step={1}
                    value={[filters.opacity]}
                    onValueChange={(value) => handleFilterChange("opacity", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="saturate">Saturate: {filters.saturate}%</Label>
                  </div>
                  <Slider
                    id="saturate"
                    min={0}
                    max={200}
                    step={1}
                    value={[filters.saturate]}
                    onValueChange={(value) => handleFilterChange("saturate", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="sepia">Sepia: {filters.sepia}%</Label>
                  </div>
                  <Slider
                    id="sepia"
                    min={0}
                    max={100}
                    step={1}
                    value={[filters.sepia]}
                    onValueChange={(value) => handleFilterChange("sepia", value[0])}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={resetFilters}>
                    Reset All
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
                <CardDescription>See your filters in action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square relative overflow-hidden rounded-lg border">
                  <img
                    src="/placeholder.jpg"
                    alt="Preview image"
                    className="object-cover w-full h-full"
                    style={{
                      filter: `
                        ${filters.blur > 0 ? `blur(${filters.blur}px) ` : ""}
                        ${filters.brightness !== 100 ? `brightness(${filters.brightness}%) ` : ""}
                        ${filters.contrast !== 100 ? `contrast(${filters.contrast}%) ` : ""}
                        ${filters.grayscale > 0 ? `grayscale(${filters.grayscale}%) ` : ""}
                        ${filters.hueRotate > 0 ? `hue-rotate(${filters.hueRotate}deg) ` : ""}
                        ${filters.invert > 0 ? `invert(${filters.invert}%) ` : ""}
                        ${filters.opacity !== 100 ? `opacity(${filters.opacity}%) ` : ""}
                        ${filters.saturate !== 100 ? `saturate(${filters.saturate}%) ` : ""}
                        ${filters.sepia > 0 ? `sepia(${filters.sepia}%) ` : ""}
                      `,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="css-output">CSS Code</Label>
                  <div className="relative">
                    <Input
                      id="css-output"
                      readOnly
                      value={cssFilterString}
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