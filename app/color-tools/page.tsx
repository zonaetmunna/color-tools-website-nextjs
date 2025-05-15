import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Palette } from "lucide-react"

export default function ColorToolsPage() {
  const tools = [
    {
      title: "HEX ↔ RGB ↔ HSL Converter",
      description: "Convert between different color formats with ease",
      href: "/color-tools/hex-rgb-hsl-converter",
    },
    {
      title: "Color Picker from Image",
      description: "Upload an image and pick colors from it",
      href: "/color-tools/color-picker",
    },
    {
      title: "Color Palette Generator",
      description: "Create harmonious color palettes based on color theory",
      href: "/color-tools/palette-generator",
    },
    {
      title: "Gradient Generator",
      description: "Design beautiful linear and radial gradients with multiple color stops",
      href: "/color-tools/gradient-generator",
    },
    {
      title: "Contrast Checker",
      description: "Check WCAG accessibility compliance for color combinations",
      href: "/color-tools/contrast-checker",
    },
    {
      title: "Color Blindness Simulator",
      description: "Preview colors for different color vision types",
      href: "/color-tools/color-blindness",
    },
    {
      title: "Named Colors Viewer",
      description: "Browse and search all CSS named colors",
      href: "/color-tools/named-colors",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Palette className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Color Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of tools to help you work with colors in your designs and development projects.
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
