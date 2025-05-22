"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy, Plus, Trash } from "lucide-react"
import { useState } from "react"

export default function FlexboxPlayground() {
  const [container, setContainer] = useState({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "nowrap",
    gap: "8px",
  })

  const [items, setItems] = useState([
    { id: 1, text: "Item 1", flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto" },
    { id: 2, text: "Item 2", flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto" },
    { id: 3, text: "Item 3", flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto" },
  ])

  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const [showItemSettings, setShowItemSettings] = useState<number | null>(null)

  const handleContainerChange = (property: keyof typeof container, value: string) => {
    setContainer({ ...container, [property]: value })
  }

  const handleItemChange = (id: number, property: string, value: string | number) => {
    setItems(items.map(item => (item.id === id ? { ...item, [property]: value } : item)))
  }

  const toggleItemSettings = (id: number) => {
    setShowItemSettings(showItemSettings === id ? null : id)
  }

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
    setItems([
      ...items,
      { id: newId, text: `Item ${newId}`, flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto" },
    ])
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const getContainerCss = () => {
    return `
.container {
  display: ${container.display};
  flex-direction: ${container.flexDirection};
  justify-content: ${container.justifyContent};
  align-items: ${container.alignItems};
  flex-wrap: ${container.flexWrap};
  gap: ${container.gap};
}
    `.trim()
  }

  const getItemsCss = () => {
    return items
      .map(
        (item, index) => `
.item-${index + 1} {
  flex-grow: ${item.flexGrow};
  flex-shrink: ${item.flexShrink};
  flex-basis: ${item.flexBasis};
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
      description: "Flexbox CSS copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Flexbox Playground</h1>
          <p className="text-muted-foreground">
            Experiment with flexbox layouts and visualize the results in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Container Properties</CardTitle>
                <CardDescription>Adjust the flex container settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="display">Display</Label>
                  <Select value={container.display} onValueChange={(value) => handleContainerChange("display", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select display value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex">flex</SelectItem>
                      <SelectItem value="inline-flex">inline-flex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flexDirection">Flex Direction</Label>
                  <Select
                    value={container.flexDirection}
                    onValueChange={(value) => handleContainerChange("flexDirection", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flex-direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">row</SelectItem>
                      <SelectItem value="row-reverse">row-reverse</SelectItem>
                      <SelectItem value="column">column</SelectItem>
                      <SelectItem value="column-reverse">column-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justifyContent">Justify Content</Label>
                  <Select
                    value={container.justifyContent}
                    onValueChange={(value) => handleContainerChange("justifyContent", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select justify-content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex-start">flex-start</SelectItem>
                      <SelectItem value="flex-end">flex-end</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="space-between">space-between</SelectItem>
                      <SelectItem value="space-around">space-around</SelectItem>
                      <SelectItem value="space-evenly">space-evenly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alignItems">Align Items</Label>
                  <Select
                    value={container.alignItems}
                    onValueChange={(value) => handleContainerChange("alignItems", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select align-items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stretch">stretch</SelectItem>
                      <SelectItem value="flex-start">flex-start</SelectItem>
                      <SelectItem value="flex-end">flex-end</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="baseline">baseline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flexWrap">Flex Wrap</Label>
                  <Select
                    value={container.flexWrap}
                    onValueChange={(value) => handleContainerChange("flexWrap", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flex-wrap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nowrap">nowrap</SelectItem>
                      <SelectItem value="wrap">wrap</SelectItem>
                      <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gap">Gap</Label>
                  <Select value={container.gap} onValueChange={(value) => handleContainerChange("gap", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="4px">4px</SelectItem>
                      <SelectItem value="8px">8px</SelectItem>
                      <SelectItem value="16px">16px</SelectItem>
                      <SelectItem value="24px">24px</SelectItem>
                      <SelectItem value="32px">32px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>See your flexbox layout in action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className="p-6 rounded-lg border min-h-[320px] flex flex-col"
                  style={{
                    display: container.display as any,
                    flexDirection: container.flexDirection as any,
                    justifyContent: container.justifyContent,
                    alignItems: container.alignItems,
                    flexWrap: container.flexWrap as any,
                    gap: container.gap,
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-primary/10 border border-primary/20 rounded p-3 text-center min-w-20 min-h-16 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                      style={{
                        flexGrow: item.flexGrow as number,
                        flexShrink: item.flexShrink as number,
                        flexBasis: item.flexBasis,
                        alignSelf: item.alignSelf,
                      }}
                      onClick={() => toggleItemSettings(item.id)}
                    >
                      <div>
                        <div>{item.text}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.flexGrow} {item.flexShrink} {item.flexBasis}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button onClick={addItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>
                  <Button onClick={copyToClipboard} size="sm">
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy CSS
                  </Button>
                </div>

                {showItemSettings !== null && (
                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          {items.find((item) => item.id === showItemSettings)?.text} Settings
                        </CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(showItemSettings)} 
                          className="h-8 w-8"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="flexGrow">Flex Grow</Label>
                          <Select
                            value={String(items.find((item) => item.id === showItemSettings)?.flexGrow)}
                            onValueChange={(value) =>
                              handleItemChange(showItemSettings, "flexGrow", parseInt(value))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select flex-grow" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="flexShrink">Flex Shrink</Label>
                          <Select
                            value={String(items.find((item) => item.id === showItemSettings)?.flexShrink)}
                            onValueChange={(value) =>
                              handleItemChange(showItemSettings, "flexShrink", parseInt(value))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select flex-shrink" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="flexBasis">Flex Basis</Label>
                          <Select
                            value={String(items.find((item) => item.id === showItemSettings)?.flexBasis)}
                            onValueChange={(value) => handleItemChange(showItemSettings, "flexBasis", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select flex-basis" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="100px">100px</SelectItem>
                              <SelectItem value="200px">200px</SelectItem>
                              <SelectItem value="50%">50%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="alignSelf">Align Self</Label>
                          <Select
                            value={String(items.find((item) => item.id === showItemSettings)?.alignSelf)}
                            onValueChange={(value) => handleItemChange(showItemSettings, "alignSelf", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select align-self" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">auto</SelectItem>
                              <SelectItem value="flex-start">flex-start</SelectItem>
                              <SelectItem value="flex-end">flex-end</SelectItem>
                              <SelectItem value="center">center</SelectItem>
                              <SelectItem value="stretch">stretch</SelectItem>
                              <SelectItem value="baseline">baseline</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="itemText">Text</Label>
                        <Input
                          id="itemText"
                          value={items.find((item) => item.id === showItemSettings)?.text}
                          onChange={(e) => handleItemChange(showItemSettings, "text", e.target.value)}
                        />
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
                      rows={7}
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