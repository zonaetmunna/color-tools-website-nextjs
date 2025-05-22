"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy, Plus, Trash } from "lucide-react"
import { useState } from "react"

export default function GridGeneratorPage() {
  const [grid, setGrid] = useState({
    columns: "1fr 1fr 1fr",
    rows: "auto auto",
    columnGap: "20px",
    rowGap: "20px",
    justifyItems: "stretch",
    alignItems: "stretch",
    justifyContent: "start",
    alignContent: "start",
  })

  const [items, setItems] = useState([
    { id: 1, text: "Item 1", columnStart: "auto", columnEnd: "auto", rowStart: "auto", rowEnd: "auto", justifySelf: "auto", alignSelf: "auto" },
    { id: 2, text: "Item 2", columnStart: "auto", columnEnd: "auto", rowStart: "auto", rowEnd: "auto", justifySelf: "auto", alignSelf: "auto" },
    { id: 3, text: "Item 3", columnStart: "auto", columnEnd: "auto", rowStart: "auto", rowEnd: "auto", justifySelf: "auto", alignSelf: "auto" },
    { id: 4, text: "Item 4", columnStart: "auto", columnEnd: "auto", rowStart: "auto", rowEnd: "auto", justifySelf: "auto", alignSelf: "auto" },
    { id: 5, text: "Item 5", columnStart: "auto", columnEnd: "auto", rowStart: "auto", rowEnd: "auto", justifySelf: "auto", alignSelf: "auto" },
    { id: 6, text: "Item 6", columnStart: "auto", columnEnd: "auto", rowStart: "auto", rowEnd: "auto", justifySelf: "auto", alignSelf: "auto" },
  ])

  const [numColumns, setNumColumns] = useState(3)
  const [numRows, setNumRows] = useState(2)
  const [copied, setCopied] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const { toast } = useToast()

  const handleGridChange = (property: keyof typeof grid, value: string) => {
    setGrid({ ...grid, [property]: value })
  }

  const handleItemChange = (id: number, property: string, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [property]: value } : item)))
  }

  const updateColumnsTemplate = (num: number) => {
    setNumColumns(num)
    setGrid({ ...grid, columns: Array(num).fill("1fr").join(" ") })
  }

  const updateRowsTemplate = (num: number) => {
    setNumRows(num)
    setGrid({ ...grid, rows: Array(num).fill("auto").join(" ") })
  }

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
    setItems([
      ...items,
      {
        id: newId,
        text: `Item ${newId}`,
        columnStart: "auto",
        columnEnd: "auto",
        rowStart: "auto",
        rowEnd: "auto",
        justifySelf: "auto",
        alignSelf: "auto",
      },
    ])
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    if (selectedItem === id) {
      setSelectedItem(null)
    }
  }

  const getContainerCss = () => {
    return `
.grid-container {
  display: grid;
  grid-template-columns: ${grid.columns};
  grid-template-rows: ${grid.rows};
  column-gap: ${grid.columnGap};
  row-gap: ${grid.rowGap};
  justify-items: ${grid.justifyItems};
  align-items: ${grid.alignItems};
  justify-content: ${grid.justifyContent};
  align-content: ${grid.alignContent};
}
    `.trim()
  }

  const getItemsCss = () => {
    return items
      .map(
        (item, index) => `
.item-${index + 1} {
  grid-column-start: ${item.columnStart};
  grid-column-end: ${item.columnEnd};
  grid-row-start: ${item.rowStart};
  grid-row-end: ${item.rowEnd};
  justify-self: ${item.justifySelf};
  align-self: ${item.alignSelf};
}
      `.trim()
      )
      .join("\n\n")
  }

  const getCombinedCss = () => {
    return `${getContainerCss()}\n\n${getItemsCss()}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCombinedCss())
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Grid CSS copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">CSS Grid Generator</h1>
          <p className="text-muted-foreground">
            Create and visualize CSS grid layouts with a visual editor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Grid Container</CardTitle>
                <CardDescription>Adjust grid container properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Number of Columns</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      min={1}
                      max={12}
                      step={1}
                      value={[numColumns]}
                      onValueChange={(value) => updateColumnsTemplate(value[0])}
                    />
                    <span className="w-8 text-center">{numColumns}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Number of Rows</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      min={1}
                      max={12}
                      step={1}
                      value={[numRows]}
                      onValueChange={(value) => updateRowsTemplate(value[0])}
                    />
                    <span className="w-8 text-center">{numRows}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="columns">Grid Template Columns</Label>
                  <Input
                    id="columns"
                    value={grid.columns}
                    onChange={(e) => handleGridChange("columns", e.target.value)}
                    placeholder="e.g., 1fr 1fr 1fr"
                  />
                  <p className="text-xs text-muted-foreground">
                    Space-separated values like 1fr 2fr or 100px auto 1fr
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rows">Grid Template Rows</Label>
                  <Input
                    id="rows"
                    value={grid.rows}
                    onChange={(e) => handleGridChange("rows", e.target.value)}
                    placeholder="e.g., auto auto"
                  />
                  <p className="text-xs text-muted-foreground">
                    Space-separated values like auto 200px or 1fr 2fr
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="columnGap">Column Gap</Label>
                  <Select value={grid.columnGap} onValueChange={(value) => handleGridChange("columnGap", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select column gap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="4px">4px</SelectItem>
                      <SelectItem value="8px">8px</SelectItem>
                      <SelectItem value="16px">16px</SelectItem>
                      <SelectItem value="20px">20px</SelectItem>
                      <SelectItem value="32px">32px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rowGap">Row Gap</Label>
                  <Select value={grid.rowGap} onValueChange={(value) => handleGridChange("rowGap", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select row gap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="4px">4px</SelectItem>
                      <SelectItem value="8px">8px</SelectItem>
                      <SelectItem value="16px">16px</SelectItem>
                      <SelectItem value="20px">20px</SelectItem>
                      <SelectItem value="32px">32px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justifyItems">Justify Items</Label>
                  <Select value={grid.justifyItems} onValueChange={(value) => handleGridChange("justifyItems", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select justify-items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stretch">stretch</SelectItem>
                      <SelectItem value="start">start</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="end">end</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alignItems">Align Items</Label>
                  <Select value={grid.alignItems} onValueChange={(value) => handleGridChange("alignItems", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select align-items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stretch">stretch</SelectItem>
                      <SelectItem value="start">start</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="end">end</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Grid Preview</CardTitle>
                <CardDescription>
                  Click on an item to view and adjust its properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className="p-4 border rounded-lg min-h-[300px] bg-muted/20"
                  style={{
                    display: "grid",
                    gridTemplateColumns: grid.columns,
                    gridTemplateRows: grid.rows,
                    columnGap: grid.columnGap,
                    rowGap: grid.rowGap,
                    justifyItems: grid.justifyItems,
                    alignItems: grid.alignItems,
                    justifyContent: grid.justifyContent,
                    alignContent: grid.alignContent,
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded cursor-pointer flex items-center justify-center text-center transition-colors ${
                        selectedItem === item.id
                          ? "bg-primary/30 border-2 border-primary"
                          : "bg-primary/10 border border-primary/20 hover:border-primary/50"
                      }`}
                      style={{
                        gridColumnStart: item.columnStart,
                        gridColumnEnd: item.columnEnd,
                        gridRowStart: item.rowStart,
                        gridRowEnd: item.rowEnd,
                        justifySelf: item.justifySelf,
                        alignSelf: item.alignSelf,
                      }}
                      onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <Button onClick={addItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>

                  <Button onClick={copyToClipboard} size="sm">
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy CSS
                  </Button>
                </div>

                {selectedItem !== null && (
                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          {items.find((item) => item.id === selectedItem)?.text} Properties
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(selectedItem)}
                          className="h-8 w-8"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="itemText">Text</Label>
                        <Input
                          id="itemText"
                          value={items.find((item) => item.id === selectedItem)?.text}
                          onChange={(e) => handleItemChange(selectedItem, "text", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="columnStart">Column Start</Label>
                          <Select
                            value={items.find((item) => item.id === selectedItem)?.columnStart || "auto"}
                            onValueChange={(value) => handleItemChange(selectedItem, "columnStart", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Column start" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="columnEnd">Column End</Label>
                          <Select
                            value={items.find((item) => item.id === selectedItem)?.columnEnd || "auto"}
                            onValueChange={(value) => handleItemChange(selectedItem, "columnEnd", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Column end" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                              <SelectItem value="7">7</SelectItem>
                              <SelectItem value="span 2">span 2</SelectItem>
                              <SelectItem value="span 3">span 3</SelectItem>
                              <SelectItem value="-1">-1 (last)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rowStart">Row Start</Label>
                          <Select
                            value={items.find((item) => item.id === selectedItem)?.rowStart || "auto"}
                            onValueChange={(value) => handleItemChange(selectedItem, "rowStart", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Row start" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rowEnd">Row End</Label>
                          <Select
                            value={items.find((item) => item.id === selectedItem)?.rowEnd || "auto"}
                            onValueChange={(value) => handleItemChange(selectedItem, "rowEnd", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Row end" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                              <SelectItem value="span 2">span 2</SelectItem>
                              <SelectItem value="span 3">span 3</SelectItem>
                              <SelectItem value="-1">-1 (last)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="justifySelf">Justify Self</Label>
                          <Select
                            value={items.find((item) => item.id === selectedItem)?.justifySelf || "auto"}
                            onValueChange={(value) => handleItemChange(selectedItem, "justifySelf", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Justify self" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="start">start</SelectItem>
                              <SelectItem value="end">end</SelectItem>
                              <SelectItem value="center">center</SelectItem>
                              <SelectItem value="stretch">stretch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="alignSelf">Align Self</Label>
                          <Select
                            value={items.find((item) => item.id === selectedItem)?.alignSelf || "auto"}
                            onValueChange={(value) => handleItemChange(selectedItem, "alignSelf", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Align self" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="start">start</SelectItem>
                              <SelectItem value="end">end</SelectItem>
                              <SelectItem value="center">center</SelectItem>
                              <SelectItem value="stretch">stretch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2 mt-4">
                  <Label htmlFor="css-output">CSS Code</Label>
                  <div className="relative">
                    <textarea
                      id="css-output"
                      readOnly
                      value={getCombinedCss()}
                      rows={8}
                      className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 