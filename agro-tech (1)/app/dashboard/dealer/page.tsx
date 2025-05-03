"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface Product {
  id: number
  name: string
  description: string
  quantity: number
  farmerPrice: number
  dealerPrice: number | null
  farmer: string
  status: "available" | "pending" | "purchased"
}

export default function DealerDashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Organic Wheat",
      description: "Premium quality wheat",
      quantity: 500,
      farmerPrice: 25,
      dealerPrice: 28,
      farmer: "John Smith",
      status: "available",
    },
    {
      id: 2,
      name: "Rice",
      description: "Basmati rice",
      quantity: 300,
      farmerPrice: 35,
      dealerPrice: null,
      farmer: "Maria Garcia",
      status: "available",
    },
    {
      id: 3,
      name: "Corn",
      description: "Sweet corn",
      quantity: 200,
      farmerPrice: 15,
      dealerPrice: 18,
      farmer: "Robert Johnson",
      status: "pending",
    },
    {
      id: 4,
      name: "Potatoes",
      description: "Fresh potatoes",
      quantity: 400,
      farmerPrice: 12,
      dealerPrice: 15,
      farmer: "John Smith",
      status: "purchased",
    },
  ])

  const [dealerPrices, setDealerPrices] = useState<{ [key: number]: number }>({})

  const handleSetPrice = (id: number) => {
    if (!dealerPrices[id]) return

    setProducts(
      products.map((product) => (product.id === id ? { ...product, dealerPrice: dealerPrices[id] } : product)),
    )

    // Clear the input after setting the price
    const newDealerPrices = { ...dealerPrices }
    delete newDealerPrices[id]
    setDealerPrices(newDealerPrices)
  }

  const handlePurchase = (id: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, status: "purchased" } : product)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "purchased":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout userType="dealer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">Available Products</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Market Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Farmer's Price (₹/kg)</TableHead>
                  <TableHead>Your Offer (₹/kg)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.farmer}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.farmerPrice}</TableCell>
                    <TableCell>
                      {product.status === "available" ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={dealerPrices[product.id] || ""}
                            onChange={(e) =>
                              setDealerPrices({
                                ...dealerPrices,
                                [product.id]: Number(e.target.value),
                              })
                            }
                            className="w-20"
                            placeholder={product.dealerPrice?.toString() || ""}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSetPrice(product.id)}
                            disabled={!dealerPrices[product.id]}
                          >
                            Set
                          </Button>
                        </div>
                      ) : (
                        product.dealerPrice
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {product.status === "available" && product.dealerPrice && (
                        <Button
                          size="sm"
                          onClick={() => handlePurchase(product.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" /> Purchase
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">My Purchases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Purchase Price (₹/kg)</TableHead>
                  <TableHead>Total Value (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products
                  .filter((product) => product.status === "purchased")
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{product.farmer}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.dealerPrice}</TableCell>
                      <TableCell>{product.dealerPrice ? product.quantity * product.dealerPrice : 0}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
