import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Code } from "lucide-react"

export default function FrontendToolsPage() {
  const tools = [
    {
      title: "Tailwind CSS Generator",
      description: "Generate Tailwind CSS classes and preview components",
      href: "/frontend-tools/tailwind-generator",
    },
    {
      title: "CSS to Tailwind Converter",
      description: "Convert CSS code to equivalent Tailwind classes",
      href: "/frontend-tools/css-converter",
    },
    {
      title: "CSS Minifier / Beautifier",
      description: "Minify or beautify your CSS code",
      href: "/frontend-tools/css-formatter",
    },
    {
      title: "Flexbox Playground",
      description: "Experiment with flexbox layouts visually",
      href: "/frontend-tools/flexbox",
    },
    {
      title: "Grid Layout Generator",
      description: "Create and visualize CSS grid layouts",
      href: "/frontend-tools/grid",
    },
    {
      title: "Z-Index Visualizer",
      description: "Visualize and manage z-index stacking contexts",
      href: "/frontend-tools/z-index",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Code className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Frontend Development Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tools to streamline your frontend development workflow and make CSS easier.
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
