import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";

const categories = [
  { id: "1", name: "Appetizers", items: 12, active: true },
  { id: "2", name: "Main Courses", items: 24, active: true },
  { id: "3", name: "Desserts", items: 8, active: true },
  { id: "4", name: "Beverages", items: 15, active: true },
  { id: "5", name: "Specials", items: 5, active: false }
];

const menuItems = [
  { id: "1", name: "Butter Chicken", category: "Main Courses", price: 18.99, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100", active: true, popular: true },
  { id: "2", name: "Samosa (2 pcs)", category: "Appetizers", price: 6.99, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100", active: true, popular: false },
  { id: "3", name: "Tandoori Chicken", category: "Main Courses", price: 16.99, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=100", active: true, popular: true },
  { id: "4", name: "Gulab Jamun", category: "Desserts", price: 5.99, image: "https://images.unsplash.com/photo-1666190053389-88393b8e4b19?w=100", active: false, popular: false },
  { id: "5", name: "Mango Lassi", category: "Beverages", price: 4.99, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=100", active: true, popular: false }
];

export default function MenuManagement() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Menu Management</h1>
            <p className="text-muted-foreground">Manage your menu items and categories</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">64</p>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">58</p>
              <p className="text-sm text-muted-foreground">Active Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Popular Items</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Categories</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <span className={cat.active ? "" : "text-muted-foreground"}>{cat.name}</span>
                  </div>
                  <Badge variant="secondary">{cat.items}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Menu Items */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Menu Items</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search items..." className="pl-9 w-[200px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border border-border ${
                      !item.active ? "opacity-60" : ""
                    }`}
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.popular && <Badge>Popular</Badge>}
                        {!item.active && <Badge variant="secondary">Hidden</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        {item.active ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RestaurantLayout>
  );
}
