"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
  userType: "farmer" | "dealer" | "admin"
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    router.push("/")
  }

  const getFarmerNavItems = () => [
    {
      title: "Dashboard",
      href: "/dashboard/farmer",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "My Products",
      href: "/dashboard/farmer/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Orders",
      href: "/dashboard/farmer/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/farmer/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const getDealerNavItems = () => [
    {
      title: "Dashboard",
      href: "/dashboard/dealer",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Market",
      href: "/dashboard/dealer/market",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Purchases",
      href: "/dashboard/dealer/purchases",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/dealer/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const getAdminNavItems = () => [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Farmers",
      href: "/dashboard/admin/farmers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Dealers",
      href: "/dashboard/admin/dealers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const getNavItems = () => {
    switch (userType) {
      case "farmer":
        return getFarmerNavItems()
      case "dealer":
        return getDealerNavItems()
      case "admin":
        return getAdminNavItems()
      default:
        return []
    }
  }

  const navItems = getNavItems()

  const getUserTitle = () => {
    switch (userType) {
      case "farmer":
        return "Farmer Dashboard"
      case "dealer":
        return "Dealer Dashboard"
      case "admin":
        return "Admin Dashboard"
      default:
        return "Dashboard"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-white">
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link href={`/dashboard/${userType}`} className="flex items-center">
              <span className="text-xl font-bold text-green-800">AgroTech</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="space-y-1 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === item.href ? "bg-green-50 text-green-800" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white shadow">
          <div className="flex flex-1 items-center justify-between px-6">
            <h1 className="text-xl font-bold text-green-800">{getUserTitle()}</h1>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
