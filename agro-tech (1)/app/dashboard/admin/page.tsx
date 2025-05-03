"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserX } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface User {
  id: number
  name: string
  email: string
  location: string
  joinDate: string
  status: "active" | "inactive"
}

interface Transaction {
  id: number
  product: string
  farmer: string
  dealer: string
  quantity: number
  price: number
  date: string
}

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      location: "Punjab",
      joinDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      location: "Haryana",
      joinDate: "2023-02-20",
      status: "active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      location: "Uttar Pradesh",
      joinDate: "2023-03-10",
      status: "inactive",
    },
  ])

  const [dealers, setDealers] = useState<User[]>([
    {
      id: 1,
      name: "Sarah Williams",
      email: "sarah@example.com",
      location: "Delhi",
      joinDate: "2023-01-25",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael@example.com",
      location: "Maharashtra",
      joinDate: "2023-02-15",
      status: "active",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@example.com",
      location: "Gujarat",
      joinDate: "2023-03-05",
      status: "inactive",
    },
  ])

  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      product: "Organic Wheat",
      farmer: "John Smith",
      dealer: "Sarah Williams",
      quantity: 200,
      price: 28,
      date: "2023-04-15",
    },
    {
      id: 2,
      product: "Rice",
      farmer: "Maria Garcia",
      dealer: "Michael Brown",
      quantity: 150,
      price: 40,
      date: "2023-04-20",
    },
    {
      id: 3,
      product: "Potatoes",
      farmer: "John Smith",
      dealer: "Sarah Williams",
      quantity: 300,
      price: 15,
      date: "2023-04-25",
    },
  ])

  const handleDeleteFarmer = (id: number) => {
    setFarmers(farmers.filter((farmer) => farmer.id !== id))
  }

  const handleDeleteDealer = (id: number) => {
    setDealers(dealers.filter((dealer) => dealer.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">Total Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{farmers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">Total Dealers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dealers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{transactions.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="farmers">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="farmers">Farmers</TabsTrigger>
            <TabsTrigger value="dealers">Dealers</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Manage Farmers</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell className="font-medium">{farmer.name}</TableCell>
                        <TableCell>{farmer.email}</TableCell>
                        <TableCell>{farmer.location}</TableCell>
                        <TableCell>{farmer.joinDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(farmer.status)}>
                            {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteFarmer(farmer.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dealers">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Manage Dealers</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dealers.map((dealer) => (
                      <TableRow key={dealer.id}>
                        <TableCell className="font-medium">{dealer.name}</TableCell>
                        <TableCell>{dealer.email}</TableCell>
                        <TableCell>{dealer.location}</TableCell>
                        <TableCell>{dealer.joinDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(dealer.status)}>
                            {dealer.status.charAt(0).toUpperCase() + dealer.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDealer(dealer.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Dealer</TableHead>
                      <TableHead>Quantity (kg)</TableHead>
                      <TableHead>Price (₹/kg)</TableHead>
                      <TableHead>Total (₹)</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.product}</TableCell>
                        <TableCell>{transaction.farmer}</TableCell>
                        <TableCell>{transaction.dealer}</TableCell>
                        <TableCell>{transaction.quantity}</TableCell>
                        <TableCell>{transaction.price}</TableCell>
                        <TableCell>{transaction.quantity * transaction.price}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
