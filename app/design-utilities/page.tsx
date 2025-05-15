import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Box } from "lucide-react"

export default function DesignUtilitiesPage() {
  const tools = [
    {
      title: "Box Shadow Generator",
      description: "Create and customize box shadows with live preview",
      href: "/design-utilities/box-shadow",
    },
    {
      title: "Border Radius Generator",
      description: "Design custom border radius for each corner with preview",
      href: "/design-utilities/border-radius",
    },
    {
      title: "Glassmorphism Generator",
      description: "Create modern glass effect UI components",
      href: "/design-utilities/glassmorphism",
    },
    {
      title: "Neumorphism Generator",
      description: "Generate soft UI/neumorphic design elements",
      href: "/design-utilities/neumorphism",
    },
    {
      title: "Text Shadow Generator",
      description: "Add and customize text shadows with live preview",
      href: "/design-utilities/text-shadow",
    },
    {
      title: "CSS Filter Generator",
      description: "Apply and customize CSS filters like blur, grayscale, sepia",
      href: "/design-utilities/css-filters",
    },
    {
      title: "CSS Animation Generator",
      description: "Create CSS animations with visual timeline editor",
      href: "/design-utilities/css-animation",
    },
    {
      title: "Typography Scale Calculator",
      description: "Calculate modular scale for consistent typography",
      href: "/design-utilities/typography-scale",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Box className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Design Utilities</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tools to help you create beautiful UI elements with live previews and code generation.
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
