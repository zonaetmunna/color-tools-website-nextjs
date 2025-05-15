import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, ImageIcon } from "lucide-react"

export default function ImageToolsPage() {
  const tools = [
    {
      title: "Image Compressor",
      description: "Compress images without losing quality",
      href: "/image-tools/image-compressor",
    },
    {
      title: "Image to Base64",
      description: "Convert images to Base64 encoded strings",
      href: "/image-tools/image-base64",
    },
    {
      title: "Image Resizer & Cropper",
      description: "Resize and crop images to specific dimensions",
      href: "/image-tools/image-resizer",
    },
    {
      title: "Favicon Generator",
      description: "Create favicons from your images",
      href: "/image-tools/favicon-generator",
    },
    {
      title: "Image Format Converter",
      description: "Convert between WebP, PNG, JPG and other formats",
      href: "/image-tools/format-converter",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <ImageIcon className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Image Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tools to help you optimize, convert, and manipulate images for your projects.
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
