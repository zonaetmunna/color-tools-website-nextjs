"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, FileJson, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "name": "John Doe",\n  "age": 30,\n  "isActive": true,\n  "address": {\n    "street": "123 Main St",\n    "city": "Anytown"\n  }\n}',
  )
  const [formattedJson, setFormattedJson] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)
  const { toast } = useToast()

  // Format JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setFormattedJson(formatted)
      setError("")

      toast({
        title: "JSON formatted successfully",
        description: "Your JSON has been formatted",
      })
    } catch (err) {
      setError((err as Error).message)
      setFormattedJson("")

      toast({
        title: "Invalid JSON",
        description: (err as Error).message,
        variant: "destructive",
      })
    }
  }

  // Minify JSON
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const minified = JSON.stringify(parsed)
      setFormattedJson(minified)
      setError("")

      toast({
        title: "JSON minified successfully",
        description: "Your JSON has been minified",
      })
    } catch (err) {
      setError((err as Error).message)
      setFormattedJson("")

      toast({
        title: "Invalid JSON",
        description: (err as Error).message,
        variant: "destructive",
      })
    }
  }

  // Validate JSON
  const validateJson = () => {
    try {
      JSON.parse(jsonInput)
      setError("")

      toast({
        title: "JSON is valid",
        description: "Your JSON structure is valid",
      })
    } catch (err) {
      setError((err as Error).message)

      toast({
        title: "Invalid JSON",
        description: (err as Error).message,
        variant: "destructive",
      })
    }
  }

  // Clear JSON
  const clearJson = () => {
    setJsonInput("")
    setFormattedJson("")
    setError("")
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "JSON copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <FileJson className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-2">JSON Formatter</h1>
          <p className="text-muted-foreground">Format, validate, and beautify your JSON data</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input JSON</CardTitle>
              <CardDescription>Paste your JSON data here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                  className="font-mono h-64 resize-none"
                />

                <div className="flex flex-wrap gap-2">
                  <Button onClick={formatJson}>Format JSON</Button>
                  <Button variant="outline" onClick={minifyJson}>
                    Minify
                  </Button>
                  <Button variant="outline" onClick={validateJson}>
                    Validate
                  </Button>
                  <Button variant="outline" onClick={() => copyToClipboard(jsonInput)}>
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy
                  </Button>
                  <Button variant="outline" onClick={clearJson}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm">Indent Size:</span>
                  <Tabs
                    defaultValue="2"
                    value={indentSize.toString()}
                    onValueChange={(value) => setIndentSize(Number.parseInt(value))}
                  >
                    <TabsList>
                      <TabsTrigger value="2">2 Spaces</TabsTrigger>
                      <TabsTrigger value="4">4 Spaces</TabsTrigger>
                      <TabsTrigger value="8">8 Spaces</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card className="border-red-300 bg-red-50 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {formattedJson && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Formatted JSON</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(formattedJson)}>
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-sm font-mono">{formattedJson}</pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
