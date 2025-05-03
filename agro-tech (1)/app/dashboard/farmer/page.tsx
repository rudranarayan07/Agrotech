"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface Product {
  id: number
  name: string
  description: string
  quantity: number
  price: number
  status: "available" | "pending" | "sold"
}

export default function FarmerDashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Organic Wheat",
      description: "Premium quality wheat",
      quantity: 500,
      price: 25,
      status: "available",
    },
    { id: 2, name: "Rice", description: "Basmati rice", quantity: 300, price: 35, status: "pending" },
    { id: 3, name: "Corn", description: "Sweet corn", quantity: 200, price: 15, status: "available" },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const product: Product = {
      id: products.length + 1,
      ...newProduct,
      status: "available",
    }

    setProducts([...products, product])
    setNewProduct({ name: "", description: "", quantity: 0, price: 0 })
    setShowAddForm(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout userType="farmer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">My Products</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        {showAddForm && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-quantity">Quantity (kg)</Label>
                    <Input
                      id="product-quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price per kg (₹)</Label>
                    <Input
                      id="product-price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea
                      id="product-description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Save Product
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Price (₹/kg)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
