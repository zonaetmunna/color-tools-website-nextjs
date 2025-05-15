import { Github, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">DesignToolsHub</h3>
            <p className="text-sm text-muted-foreground">
              All-in-one platform for designers and developers to streamline their workflow.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Color Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/color-tools/hex-rgb-hsl-converter"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  HEX ↔ RGB ↔ HSL Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/color-tools/color-picker"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Color Picker
                </Link>
              </li>
              <li>
                <Link
                  href="/color-tools/palette-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Palette Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/color-tools/gradient-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gradient Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/color-tools/contrast-checker"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contrast Checker
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Design Utilities</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/design-utilities/box-shadow"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Box Shadow Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/design-utilities/border-radius"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Border Radius Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/design-utilities/glassmorphism"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Glassmorphism Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/design-utilities/neumorphism"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Neumorphism Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/design-utilities/css-animation"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  CSS Animation Generator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Frontend & Code</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/frontend-tools/tailwind-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tailwind CSS Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/frontend-tools/flexbox"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Flexbox Playground
                </Link>
              </li>
              <li>
                <Link
                  href="/code-utilities/json-formatter"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link
                  href="/code-utilities/html-jsx"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  HTML ↔ JSX Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/image-tools/image-compressor"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Image Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DesignToolsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
