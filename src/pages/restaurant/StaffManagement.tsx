import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit2, Trash2, Key, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const staff = [
  { id: "1", name: "John Smith", role: "Manager", email: "john@spicegarden.com", pin: "****", status: "active", lastActive: "2 hours ago" },
  { id: "2", name: "Sarah Johnson", role: "Server", email: "sarah@spicegarden.com", pin: "****", status: "active", lastActive: "30 mins ago" },
  { id: "3", name: "Mike Chen", role: "Server", email: "mike@spicegarden.com", pin: "****", status: "active", lastActive: "1 hour ago" },
  { id: "4", name: "Emily Davis", role: "Cashier", email: "emily@spicegarden.com", pin: "****", status: "inactive", lastActive: "3 days ago" },
  { id: "5", name: "Alex Brown", role: "Server", email: "alex@spicegarden.com", pin: "****", status: "active", lastActive: "Just now" }
];

const roles = ["Manager", "Server", "Cashier", "Kitchen"];

export default function StaffManagement() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground">Manage your restaurant staff and access</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-green-600">4</p>
              <p className="text-sm text-muted-foreground">Active Now</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Managers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Servers</p>
            </CardContent>
          </Card>
        </div>

        {/* Roles Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {roles.map((role) => (
                <div key={role} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{role}</h3>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {role === "Manager" && "Full access to all features"}
                    {role === "Server" && "Process orders & redemptions"}
                    {role === "Cashier" && "Handle payments & deals"}
                    {role === "Kitchen" && "View orders only"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>PIN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <span className="font-mono">{member.pin}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            Reset PIN
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
