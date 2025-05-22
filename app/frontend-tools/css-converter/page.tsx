"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function CssConverterPage() {
  const [cssInput, setCssInput] = useState("")
  const [tailwindInput, setTailwindInput] = useState("")
  const [cssOutput, setCssOutput] = useState("")
  const [tailwindOutput, setTailwindOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Simple CSS to Tailwind conversion rules (basic example)
  const cssPropertiesToTailwind: Record<string, Record<string, string>> = {
    "margin-top": { "10px": "mt-2.5", "20px": "mt-5", "16px": "mt-4" },
    "margin-bottom": { "10px": "mb-2.5", "20px": "mb-5", "16px": "mb-4" },
    "margin-left": { "10px": "ml-2.5", "20px": "ml-5", "16px": "ml-4" },
    "margin-right": { "10px": "mr-2.5", "20px": "mr-5", "16px": "mr-4" },
    "padding-top": { "10px": "pt-2.5", "20px": "pt-5", "16px": "pt-4" },
    "padding-bottom": { "10px": "pb-2.5", "20px": "pb-5", "16px": "pb-4" },
    "padding-left": { "10px": "pl-2.5", "20px": "pl-5", "16px": "pl-4" },
    "padding-right": { "10px": "pr-2.5", "20px": "pr-5", "16px": "pr-4" },
    "font-size": { "12px": "text-xs", "14px": "text-sm", "16px": "text-base", "18px": "text-lg", "20px": "text-xl" },
    "font-weight": { "400": "font-normal", "500": "font-medium", "600": "font-semibold", "700": "font-bold" },
    "text-align": { "center": "text-center", "left": "text-left", "right": "text-right" },
    "display": { "flex": "flex", "block": "block", "inline-block": "inline-block", "grid": "grid" },
    "flex-direction": { "row": "flex-row", "column": "flex-col" },
    "align-items": { "center": "items-center", "flex-start": "items-start", "flex-end": "items-end" },
    "justify-content": { "center": "justify-center", "flex-start": "justify-start", "flex-end": "justify-end", "space-between": "justify-between" },
    "color": { "#ffffff": "text-white", "#000000": "text-black", "#FF0000": "text-red-500", "#0000FF": "text-blue-500" },
    "background-color": { "#ffffff": "bg-white", "#000000": "bg-black", "#FF0000": "bg-red-500", "#0000FF": "bg-blue-500" },
    "border-radius": { "4px": "rounded", "8px": "rounded-lg", "9999px": "rounded-full" },
    "border": { "1px solid #000": "border border-black", "1px solid #ddd": "border border-gray-200" },
  }

  // Simple Tailwind to CSS conversion rules (basic example)
  const tailwindToCSS: Record<string, string> = {
    "mt-2.5": "margin-top: 10px;",
    "mb-2.5": "margin-bottom: 10px;",
    "ml-2.5": "margin-left: 10px;",
    "mr-2.5": "margin-right: 10px;",
    "pt-2.5": "padding-top: 10px;",
    "pb-2.5": "padding-bottom: 10px;",
    "pl-2.5": "padding-left: 10px;",
    "pr-2.5": "padding-right: 10px;",
    "mt-5": "margin-top: 20px;",
    "mb-5": "margin-bottom: 20px;",
    "ml-5": "margin-left: 20px;",
    "mr-5": "margin-right: 20px;",
    "pt-5": "padding-top: 20px;",
    "pb-5": "padding-bottom: 20px;",
    "pl-5": "padding-left: 20px;",
    "pr-5": "padding-right: 20px;",
    "text-xs": "font-size: 12px;",
    "text-sm": "font-size: 14px;",
    "text-base": "font-size: 16px;",
    "text-lg": "font-size: 18px;",
    "text-xl": "font-size: 20px;",
    "font-normal": "font-weight: 400;",
    "font-medium": "font-weight: 500;",
    "font-semibold": "font-weight: 600;",
    "font-bold": "font-weight: 700;",
    "text-center": "text-align: center;",
    "text-left": "text-align: left;",
    "text-right": "text-align: right;",
    "flex": "display: flex;",
    "block": "display: block;",
    "inline-block": "display: inline-block;",
    "grid": "display: grid;",
    "flex-row": "flex-direction: row;",
    "flex-col": "flex-direction: column;",
    "items-center": "align-items: center;",
    "items-start": "align-items: flex-start;",
    "items-end": "align-items: flex-end;",
    "justify-center": "justify-content: center;",
    "justify-start": "justify-content: flex-start;",
    "justify-end": "justify-content: flex-end;",
    "justify-between": "justify-content: space-between;",
    "text-white": "color: #ffffff;",
    "text-black": "color: #000000;",
    "text-red-500": "color: #ef4444;",
    "text-blue-500": "color: #3b82f6;",
    "bg-white": "background-color: #ffffff;",
    "bg-black": "background-color: #000000;",
    "bg-red-500": "background-color: #ef4444;",
    "bg-blue-500": "background-color: #3b82f6;",
    "rounded": "border-radius: 4px;",
    "rounded-lg": "border-radius: 8px;",
    "rounded-full": "border-radius: 9999px;",
    "border": "border: 1px solid;",
    "border-black": "border-color: #000000;",
    "border-gray-200": "border-color: #e5e7eb;",
  }

  const convertCssToTailwind = () => {
    if (!cssInput.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some CSS to convert.",
        variant: "destructive",
      })
      return
    }
    
    try {
      // Basic CSS parser (this is simplified and won't handle all CSS)
      const cssRules = cssInput.trim().split(';').filter(Boolean)
      let tailwindClasses: string[] = []
      
      for (let rule of cssRules) {
        rule = rule.trim()
        if (!rule || rule.startsWith('}') || rule.startsWith('{')) continue
        
        const [property, value] = rule.split(':').map(part => part.trim())
        
        if (property && value) {
          const possibleValues = cssPropertiesToTailwind[property]
          if (possibleValues && possibleValues[value]) {
            tailwindClasses.push(possibleValues[value])
          } else {
            // For demonstration - in a real app, we would have more sophisticated conversion
            tailwindClasses.push(`/* ${property}: ${value} - No direct Tailwind equivalent */`)
          }
        }
      }
      
      setTailwindOutput(tailwindClasses.join(' '))
      
      toast({
        title: "Conversion Complete",
        description: "CSS converted to Tailwind classes.",
      })
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Could not convert CSS to Tailwind. Check syntax.",
        variant: "destructive",
      })
    }
  }

  const convertTailwindToCss = () => {
    if (!tailwindInput.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some Tailwind classes to convert.",
        variant: "destructive",
      })
      return
    }
    
    try {
      const tailwindClasses = tailwindInput.trim().split(/\s+/).filter(Boolean)
      let cssLines: string[] = []
      
      for (let cls of tailwindClasses) {
        if (tailwindToCSS[cls]) {
          cssLines.push(tailwindToCSS[cls])
        } else {
          // For demonstration - in a real app, we would have more sophisticated conversion
          cssLines.push(`/* ${cls} - No direct CSS equivalent */`)
        }
      }
      
      setCssOutput(cssLines.join('\n'))
      
      toast({
        title: "Conversion Complete",
        description: "Tailwind classes converted to CSS.",
      })
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Could not convert Tailwind to CSS. Check input.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Conversion result copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">CSS ↔ Tailwind Converter</h1>
          <p className="text-muted-foreground">
            Convert between CSS and Tailwind CSS classes
          </p>
        </div>

        <Tabs defaultValue="css-to-tailwind" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="css-to-tailwind">CSS to Tailwind</TabsTrigger>
            <TabsTrigger value="tailwind-to-css">Tailwind to CSS</TabsTrigger>
          </TabsList>

          <TabsContent value="css-to-tailwind" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Convert CSS to Tailwind</CardTitle>
                <CardDescription>
                  Enter CSS properties and convert them to Tailwind classes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CSS Input</label>
                    <textarea
                      value={cssInput}
                      onChange={(e) => setCssInput(e.target.value)}
                      placeholder="Enter CSS properties (e.g., margin-top: 10px; padding: 20px;)"
                      className="w-full h-60 p-3 border rounded-md font-mono text-sm bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Enter one property per line ending with semicolons.
                    </p>
                    <Button onClick={convertCssToTailwind} className="w-full mt-2">
                      Convert to Tailwind
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Tailwind Classes</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        disabled={!tailwindOutput}
                        onClick={() => copyToClipboard(tailwindOutput)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <textarea
                      value={tailwindOutput}
                      readOnly
                      className="w-full h-60 p-3 border rounded-md font-mono text-sm bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Note: This is a basic converter and may not handle all CSS properties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tailwind-to-css" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Convert Tailwind to CSS</CardTitle>
                <CardDescription>
                  Enter Tailwind classes and convert them to CSS properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tailwind Input</label>
                    <textarea
                      value={tailwindInput}
                      onChange={(e) => setTailwindInput(e.target.value)}
                      placeholder="Enter Tailwind classes (e.g., mt-5 flex items-center p-4)"
                      className="w-full h-60 p-3 border rounded-md font-mono text-sm bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Enter class names separated by spaces.
                    </p>
                    <Button onClick={convertTailwindToCss} className="w-full mt-2">
                      Convert to CSS
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">CSS Properties</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        disabled={!cssOutput}
                        onClick={() => copyToClipboard(cssOutput)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <textarea
                      value={cssOutput}
                      readOnly
                      className="w-full h-60 p-3 border rounded-md font-mono text-sm bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Note: This is a basic converter and may not handle all Tailwind classes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 border rounded-md bg-muted/50">
          <h3 className="text-lg font-medium mb-2">About this Tool</h3>
          <p className="text-muted-foreground mb-2">
            This converter provides a basic transformation between CSS properties and Tailwind CSS classes. The conversion is based on common mappings but may not cover all edge cases or complex CSS values.
          </p>
          <p className="text-muted-foreground">
            For more advanced conversions, consider using specialized tools or refer to the <a href="https://tailwindcss.com/docs" className="text-primary underline" target="_blank" rel="noopener noreferrer">Tailwind CSS documentation</a>.
          </p>
        </div>
      </div>
    </div>
  )
} 