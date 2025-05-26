import { useState } from "react";
import Navbar from "../components/Navbar";
import { trpc } from "../api/trpc";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  stockQuantity: number;
  description: string;
  imageUrl: string | null;
  minimumOrderQuantity: number;
  brand: string;
  condition: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function Admin() {
  const [, setActiveTab] = useState("products");

  const { data: products, isLoading: productsLoading } = trpc.product.getProducts.useQuery();

  return (
    <>
      <div className="bg-background dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>

          <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6 dark:bg-gray-800 rounded-md">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Products Management</h2>
                <Button className="bg-blue-500 text-white shadow">Add New Product</Button>
              </div>

              <Card className="bg-background dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>All Products</CardTitle>
                  <CardDescription>
                    Manage your product inventory, prices, and details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {productsLoading ? (
                    <div className="animate-pulse space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left pb-3 font-medium">Name</th>
                            <th className="text-left pb-3 font-medium">SKU</th>
                            <th className="text-left pb-3 font-medium">Price</th>
                            <th className="text-left pb-3 font-medium">Stock</th>
                            <th className="text-right pb-3 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products?.products.map((product: Product) => (
                            <tr key={product.id} className="border-b">
                              <td className="py-3">{product.name}</td>
                              <td className="py-3">{product.sku}</td>
                              <td className="py-3">${product.price.toString()}</td>
                              <td className="py-3">{product.stockQuantity}</td>
                              <td className="py-3">
                                <div className="flex gap-2 justify-end">
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    className="shadow bg-red-500"
                                    size="sm"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card className="bg-background dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">User management feature is under development.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="bg-background dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Order management feature is under development.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-background dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Configure global site settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">General Settings</h3>
                      <Separator className="mb-4" />
                      <p className="text-gray-500">Site settings feature is under development.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
