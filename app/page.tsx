import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Palette, Box, Code, ImageIcon, Wrench } from "lucide-react"

export default function Home() {
  const categories = [
    {
      title: "Color Tools",
      description: "Convert, pick, generate and analyze colors",
      icon: <Palette className="h-8 w-8 text-primary" />,
      href: "/color-tools",
    },
    {
      title: "Design Utilities",
      description: "Create shadows, borders, animations and more",
      icon: <Box className="h-8 w-8 text-primary" />,
      href: "/design-utilities",
    },
    {
      title: "Frontend Dev Tools",
      description: "Tailwind, CSS, Flexbox and Grid generators",
      icon: <Code className="h-8 w-8 text-primary" />,
      href: "/frontend-tools",
    },
    {
      title: "Code Utilities",
      description: "Format, convert and test code snippets",
      icon: <Wrench className="h-8 w-8 text-primary" />,
      href: "/code-utilities",
    },
    {
      title: "Image Tools",
      description: "Compress, resize, convert and generate images",
      icon: <ImageIcon className="h-8 w-8 text-primary" />,
      href: "/image-tools",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                All-in-One Design Tools Hub
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Everything you need for color manipulation, design utilities, frontend development, and more - all in
                one place.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/color-tools">
                <Button className="px-8">Get Started</Button>
              </Link>
              <Link href="#categories">
                <Button variant="outline" className="px-8">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Tool Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={category.href} key={category.title} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {category.icon}
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {category.title === "Color Tools" && (
                      <>
                        <li>HEX ↔ RGB ↔ HSL Converter</li>
                        <li>Color Picker from Image</li>
                        <li>Color Palette Generator</li>
                        <li>Gradient Generator</li>
                      </>
                    )}
                    {category.title === "Design Utilities" && (
                      <>
                        <li>Box Shadow Generator</li>
                        <li>Border Radius Generator</li>
                        <li>Glassmorphism Generator</li>
                        <li>CSS Animation Generator</li>
                      </>
                    )}
                    {category.title === "Frontend Dev Tools" && (
                      <>
                        <li>Tailwind CSS Generator</li>
                        <li>CSS Minifier / Beautifier</li>
                        <li>Flexbox Playground</li>
                        <li>Grid Layout Generator</li>
                      </>
                    )}
                    {category.title === "Code Utilities" && (
                      <>
                        <li>JSON Formatter</li>
                        <li>Base64 Encoder/Decoder</li>
                        <li>HTML ↔ JSX Converter</li>
                        <li>Regex Tester</li>
                      </>
                    )}
                    {category.title === "Image Tools" && (
                      <>
                        <li>Image Compressor</li>
                        <li>Image to Base64</li>
                        <li>Image Resizer & Cropper</li>
                        <li>Favicon Generator</li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 bg-muted rounded-lg mt-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Boost Your Design Workflow
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Save time and enhance your projects with our comprehensive suite of design and development tools.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Link href="/color-tools/hex-rgb-hsl-converter">
                <Button className="w-full">Try Color Converter</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
