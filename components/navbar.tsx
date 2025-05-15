"use client"

import React from "react"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">DesignToolsHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Color Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/color-tools/hex-rgb-hsl-converter" title="HEX ↔ RGB ↔ HSL">
                      Convert between color formats easily
                    </ListItem>
                    <ListItem href="/color-tools/color-picker" title="Color Picker">
                      Pick colors from uploaded images
                    </ListItem>
                    <ListItem href="/color-tools/palette-generator" title="Palette Generator">
                      Create harmonious color palettes
                    </ListItem>
                    <ListItem href="/color-tools/gradient-generator" title="Gradient Generator">
                      Design beautiful gradients with ease
                    </ListItem>
                    <ListItem href="/color-tools/contrast-checker" title="Contrast Checker">
                      Check WCAG accessibility compliance
                    </ListItem>
                    <ListItem href="/color-tools/color-blindness" title="Color Blindness Simulator">
                      Preview for different vision types
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Design Utilities</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/design-utilities/box-shadow" title="Box Shadow">
                      Create and customize box shadows
                    </ListItem>
                    <ListItem href="/design-utilities/border-radius" title="Border Radius">
                      Generate custom border radius styles
                    </ListItem>
                    <ListItem href="/design-utilities/glassmorphism" title="Glassmorphism">
                      Create modern glass effect designs
                    </ListItem>
                    <ListItem href="/design-utilities/neumorphism" title="Neumorphism">
                      Generate soft UI/neumorphic designs
                    </ListItem>
                    <ListItem href="/design-utilities/text-shadow" title="Text Shadow">
                      Add custom shadows to your text
                    </ListItem>
                    <ListItem href="/design-utilities/css-filters" title="CSS Filters">
                      Apply and customize CSS filters
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Frontend Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/frontend-tools/tailwind-generator" title="Tailwind CSS">
                      Generate Tailwind CSS classes
                    </ListItem>
                    <ListItem href="/frontend-tools/css-converter" title="CSS Converter">
                      Convert CSS to Tailwind and vice versa
                    </ListItem>
                    <ListItem href="/frontend-tools/flexbox" title="Flexbox Playground">
                      Experiment with flexbox layouts
                    </ListItem>
                    <ListItem href="/frontend-tools/grid" title="Grid Generator">
                      Create and visualize CSS grid layouts
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Color Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/color-tools/hex-rgb-hsl-converter" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    HEX ↔ RGB ↔ HSL
                  </Button>
                </Link>
                <Link href="/color-tools/color-picker" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Color Picker
                  </Button>
                </Link>
                <Link href="/color-tools/palette-generator" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Palette Generator
                  </Button>
                </Link>
                <Link href="/color-tools/gradient-generator" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Gradient Generator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Design Utilities</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/design-utilities/box-shadow" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Box Shadow
                  </Button>
                </Link>
                <Link href="/design-utilities/border-radius" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Border Radius
                  </Button>
                </Link>
                <Link href="/design-utilities/glassmorphism" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Glassmorphism
                  </Button>
                </Link>
                <Link href="/design-utilities/neumorphism" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Neumorphism
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Frontend Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/frontend-tools/tailwind-generator" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Tailwind CSS
                  </Button>
                </Link>
                <Link href="/frontend-tools/css-converter" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    CSS Converter
                  </Button>
                </Link>
                <Link href="/frontend-tools/flexbox" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Flexbox
                  </Button>
                </Link>
                <Link href="/frontend-tools/grid" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Grid Generator
                  </Button>
                </Link>
              </div>
            </div>
            <Link href="/about" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">
                About
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
