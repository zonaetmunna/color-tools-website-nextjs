import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Box, Code, Wrench, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About DesignToolsHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one platform for design and development tools
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Why we built DesignToolsHub</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              DesignToolsHub was created with a simple mission: to provide designers and developers with a comprehensive
              suite of tools that streamline their workflow and boost productivity.
            </p>
            <p>
              We understand the challenges of switching between different applications and websites for various design
              and development tasks. That's why we've brought together all the essential tools in one place, with a
              consistent, user-friendly interface.
            </p>
            <p>
              Our platform is designed to be intuitive, efficient, and accessible to everyone, from beginners to
              seasoned professionals. We believe that great tools should empower creativity, not hinder it.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6 text-center">Our Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Palette className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Color Tools</CardTitle>
                <CardDescription>Everything for color manipulation</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our color tools help you convert between formats, generate palettes, create gradients, and ensure your
                color choices are accessible. Perfect for designers who work with color on a daily basis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Box className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Design Utilities</CardTitle>
                <CardDescription>Create beautiful UI elements</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                From box shadows to glassmorphism, our design utilities help you create stunning visual effects with
                ease. Generate CSS code with live previews and customize to your heart's content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Code className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Frontend Tools</CardTitle>
                <CardDescription>Streamline your development</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our frontend tools make CSS easier with Tailwind generators, flexbox playgrounds, and grid layout
                builders. Save time and reduce frustration with our intuitive interfaces.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Wrench className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Code Utilities</CardTitle>
                <CardDescription>Format, convert, and test code</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our code utilities help you format JSON, convert between HTML and JSX, encode and decode Base64, and
                more. Essential tools for every developer's toolkit.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" /> Built With Care
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              DesignToolsHub is built with modern web technologies, focusing on performance, accessibility, and user
              experience. We're constantly improving our tools based on user feedback and industry trends.
            </p>
            <p>
              Our platform is open-source and community-driven. We believe in the power of collaboration and welcome
              contributions from developers around the world.
            </p>
            <p>
              Whether you're a designer, developer, or somewhere in between, we hope DesignToolsHub becomes an essential
              part of your creative process.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have suggestions or feedback? We'd love to hear from you! Reach out to us on social media or through our
            contact form.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:contact@designtoolshub.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
