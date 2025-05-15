import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Wrench } from "lucide-react"

export default function CodeUtilitiesPage() {
  const tools = [
    {
      title: "JSON Formatter / Beautifier",
      description: "Format, validate and beautify JSON data",
      href: "/code-utilities/json-formatter",
    },
    {
      title: "Base64 Encoder/Decoder",
      description: "Encode or decode Base64 strings and files",
      href: "/code-utilities/base64",
    },
    {
      title: "HTML ↔ JSX Converter",
      description: "Convert HTML to JSX and vice versa",
      href: "/code-utilities/html-jsx",
    },
    {
      title: "SVG to JSX Converter",
      description: "Convert SVG code to React JSX components",
      href: "/code-utilities/svg-jsx",
    },
    {
      title: "Markdown ↔ HTML Converter",
      description: "Convert between Markdown and HTML",
      href: "/code-utilities/markdown-html",
    },
    {
      title: "URL Encoder / Decoder",
      description: "Encode or decode URL components",
      href: "/code-utilities/url-encoder",
    },
    {
      title: "Regex Tester",
      description: "Test and debug regular expressions",
      href: "/code-utilities/regex-tester",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Wrench className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Code Utilities</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Helpful utilities for formatting, converting, and testing code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.title} className="group">
            <Card className="h-full transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
