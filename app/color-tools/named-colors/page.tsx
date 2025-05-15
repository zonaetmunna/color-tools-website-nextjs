"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// CSS named colors
const namedColors = [
  { name: "AliceBlue", hex: "#F0F8FF" },
  { name: "AntiqueWhite", hex: "#FAEBD7" },
  { name: "Aqua", hex: "#00FFFF" },
  { name: "Aquamarine", hex: "#7FFFD4" },
  { name: "Azure", hex: "#F0FFFF" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Bisque", hex: "#FFE4C4" },
  { name: "Black", hex: "#000000" },
  { name: "BlanchedAlmond", hex: "#FFEBCD" },
  { name: "Blue", hex: "#0000FF" },
  { name: "BlueViolet", hex: "#8A2BE2" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "BurlyWood", hex: "#DEB887" },
  { name: "CadetBlue", hex: "#5F9EA0" },
  { name: "Chartreuse", hex: "#7FFF00" },
  { name: "Chocolate", hex: "#D2691E" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "CornflowerBlue", hex: "#6495ED" },
  { name: "Cornsilk", hex: "#FFF8DC" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "DarkBlue", hex: "#00008B" },
  { name: "DarkCyan", hex: "#008B8B" },
  { name: "DarkGoldenRod", hex: "#B8860B" },
  { name: "DarkGray", hex: "#A9A9A9" },
  { name: "DarkGreen", hex: "#006400" },
  { name: "DarkKhaki", hex: "#BDB76B" },
  { name: "DarkMagenta", hex: "#8B008B" },
  { name: "DarkOliveGreen", hex: "#556B2F" },
  { name: "DarkOrange", hex: "#FF8C00" },
  { name: "DarkOrchid", hex: "#9932CC" },
  { name: "DarkRed", hex: "#8B0000" },
  { name: "DarkSalmon", hex: "#E9967A" },
  { name: "DarkSeaGreen", hex: "#8FBC8F" },
  { name: "DarkSlateBlue", hex: "#483D8B" },
  { name: "DarkSlateGray", hex: "#2F4F4F" },
  { name: "DarkTurquoise", hex: "#00CED1" },
  { name: "DarkViolet", hex: "#9400D3" },
  { name: "DeepPink", hex: "#FF1493" },
  { name: "DeepSkyBlue", hex: "#00BFFF" },
  { name: "DimGray", hex: "#696969" },
  { name: "DodgerBlue", hex: "#1E90FF" },
  { name: "FireBrick", hex: "#B22222" },
  { name: "FloralWhite", hex: "#FFFAF0" },
  { name: "ForestGreen", hex: "#228B22" },
  { name: "Fuchsia", hex: "#FF00FF" },
  { name: "Gainsboro", hex: "#DCDCDC" },
  { name: "GhostWhite", hex: "#F8F8FF" },
  { name: "Gold", hex: "#FFD700" },
  { name: "GoldenRod", hex: "#DAA520" },
  { name: "Gray", hex: "#808080" },
  { name: "Green", hex: "#008000" },
  { name: "GreenYellow", hex: "#ADFF2F" },
  { name: "HoneyDew", hex: "#F0FFF0" },
  { name: "HotPink", hex: "#FF69B4" },
  { name: "IndianRed", hex: "#CD5C5C" },
  { name: "Indigo", hex: "#4B0082" },
  { name: "Ivory", hex: "#FFFFF0" },
  { name: "Khaki", hex: "#F0E68C" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "LavenderBlush", hex: "#FFF0F5" },
  { name: "LawnGreen", hex: "#7CFC00" },
  { name: "LemonChiffon", hex: "#FFFACD" },
  { name: "LightBlue", hex: "#ADD8E6" },
  { name: "LightCoral", hex: "#F08080" },
  { name: "LightCyan", hex: "#E0FFFF" },
  { name: "LightGoldenRodYellow", hex: "#FAFAD2" },
  { name: "LightGray", hex: "#D3D3D3" },
  { name: "LightGreen", hex: "#90EE90" },
  { name: "LightPink", hex: "#FFB6C1" },
  { name: "LightSalmon", hex: "#FFA07A" },
  { name: "LightSeaGreen", hex: "#20B2AA" },
  { name: "LightSkyBlue", hex: "#87CEFA" },
  { name: "LightSlateGray", hex: "#778899" },
  { name: "LightSteelBlue", hex: "#B0C4DE" },
  { name: "LightYellow", hex: "#FFFFE0" },
  { name: "Lime", hex: "#00FF00" },
  { name: "LimeGreen", hex: "#32CD32" },
  { name: "Linen", hex: "#FAF0E6" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Maroon", hex: "#800000" },
  { name: "MediumAquaMarine", hex: "#66CDAA" },
  { name: "MediumBlue", hex: "#0000CD" },
  { name: "MediumOrchid", hex: "#BA55D3" },
  { name: "MediumPurple", hex: "#9370DB" },
  { name: "MediumSeaGreen", hex: "#3CB371" },
  { name: "MediumSlateBlue", hex: "#7B68EE" },
  { name: "MediumSpringGreen", hex: "#00FA9A" },
  { name: "MediumTurquoise", hex: "#48D1CC" },
  { name: "MediumVioletRed", hex: "#C71585" },
  { name: "MidnightBlue", hex: "#191970" },
  { name: "MintCream", hex: "#F5FFFA" },
  { name: "MistyRose", hex: "#FFE4E1" },
  { name: "Moccasin", hex: "#FFE4B5" },
  { name: "NavajoWhite", hex: "#FFDEAD" },
  { name: "Navy", hex: "#000080" },
  { name: "OldLace", hex: "#FDF5E6" },
  { name: "Olive", hex: "#808000" },
  { name: "OliveDrab", hex: "#6B8E23" },
  { name: "Orange", hex: "#FFA500" },
  { name: "OrangeRed", hex: "#FF4500" },
  { name: "Orchid", hex: "#DA70D6" },
  { name: "PaleGoldenRod", hex: "#EEE8AA" },
  { name: "PaleGreen", hex: "#98FB98" },
  { name: "PaleTurquoise", hex: "#AFEEEE" },
  { name: "PaleVioletRed", hex: "#DB7093" },
  { name: "PapayaWhip", hex: "#FFEFD5" },
  { name: "PeachPuff", hex: "#FFDAB9" },
  { name: "Peru", hex: "#CD853F" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Plum", hex: "#DDA0DD" },
  { name: "PowderBlue", hex: "#B0E0E6" },
  { name: "Purple", hex: "#800080" },
  { name: "RebeccaPurple", hex: "#663399" },
  { name: "Red", hex: "#FF0000" },
  { name: "RosyBrown", hex: "#BC8F8F" },
  { name: "RoyalBlue", hex: "#4169E1" },
  { name: "SaddleBrown", hex: "#8B4513" },
  { name: "Salmon", hex: "#FA8072" },
  { name: "SandyBrown", hex: "#F4A460" },
  { name: "SeaGreen", hex: "#2E8B57" },
  { name: "SeaShell", hex: "#FFF5EE" },
  { name: "Sienna", hex: "#A0522D" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "SkyBlue", hex: "#87CEEB" },
  { name: "SlateBlue", hex: "#6A5ACD" },
  { name: "SlateGray", hex: "#708090" },
  { name: "Snow", hex: "#FFFAFA" },
  { name: "SpringGreen", hex: "#00FF7F" },
  { name: "SteelBlue", hex: "#4682B4" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Teal", hex: "#008080" },
  { name: "Thistle", hex: "#D8BFD8" },
  { name: "Tomato", hex: "#FF6347" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Violet", hex: "#EE82EE" },
  { name: "Wheat", hex: "#F5DEB3" },
  { name: "White", hex: "#FFFFFF" },
  { name: "WhiteSmoke", hex: "#F5F5F5" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "YellowGreen", hex: "#9ACD32" },
]

export default function NamedColorsViewer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedColor, setCopiedColor] = useState("")
  const { toast } = useToast()

  // Filter colors based on search term
  const filteredColors = namedColors.filter(
    (color) =>
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.hex.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Copy color to clipboard
  const copyToClipboard = (text: string, type: "name" | "hex") => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)

    toast({
      title: "Copied to clipboard",
      description: `${text} has been copied to your clipboard`,
    })

    setTimeout(() => setCopiedColor(""), 2000)
  }

  // Group colors by first letter
  const groupedColors = filteredColors.reduce<Record<string, typeof namedColors>>((groups, color) => {
    const firstLetter = color.name[0]
    if (!groups[firstLetter]) {
      groups[firstLetter] = []
    }
    groups[firstLetter].push(color)
    return groups
  }, {})

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">CSS Named Colors</h1>
          <p className="text-muted-foreground">Browse and search all CSS named colors</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Colors</CardTitle>
            <CardDescription>Search by color name or hex value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {filteredColors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No colors found matching "{searchTerm}"</p>
          </div>
        ) : searchTerm ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredColors.map((color) => (
              <div key={color.name} className="space-y-2">
                <div
                  className="aspect-square rounded-md border overflow-hidden hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color.hex, "hex")}
                />
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate">{color.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(color.name, "name")}
                    >
                      {copiedColor === color.name ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-muted-foreground">{color.hex}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(color.hex, "hex")}
                    >
                      {copiedColor === color.hex ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.entries(groupedColors)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, colors]) => (
              <div key={letter} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{letter}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {colors.map((color) => (
                    <div key={color.name} className="space-y-2">
                      <div
                        className="aspect-square rounded-md border overflow-hidden hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => copyToClipboard(color.hex, "hex")}
                      />
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium truncate">{color.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(color.name, "name")}
                          >
                            {copiedColor === color.name ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono text-muted-foreground">{color.hex}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(color.hex, "hex")}
                          >
                            {copiedColor === color.hex ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}
