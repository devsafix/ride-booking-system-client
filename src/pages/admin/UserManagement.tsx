/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Search,
  Filter,
  Users,
  MoreVertical,
  Shield,
  Car,
  User,
  UserX,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  useApproveDriverMutation,
  useBlockUserMutation,
  useGetUsersQuery,
  useSuspendDriverMutation,
  useUnblockUserMutation,
} from "@/redux/features/admin/admin.api";
import type { IResponse, TRole } from "@/types";

// User interface for the component
interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  isBlocked: boolean;
  isApproved?: boolean;
}

const UserManagement = () => {
  const { data, isLoading, isError } = useGetUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const users = (data as unknown as IResponse<IUser[]>)?.data || [];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAction = async (action: string, userId: string) => {
    try {
      if (action === "block") {
        await blockUser(userId).unwrap();
        toast.success("User blocked successfully.");
      } else if (action === "unblock") {
        await unblockUser(userId).unwrap();
        toast.success("User unblocked successfully.");
      } else if (action === "approve") {
        await approveDriver(userId).unwrap();
        toast.success("Driver approved successfully.");
      } else if (action === "suspend") {
        await suspendDriver(userId).unwrap();
        toast.success("Driver suspended successfully.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Action failed.");
    }
  };

  // Helper functions for better styling
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "driver":
        return <Car className="h-4 w-4" />;
      case "rider":
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "driver":
        return "secondary";
      case "rider":
        return "outline";
      default:
        return "outline";
    }
  };

  // Statistics for better overview
  const stats = {
    total: users.length,
    riders: users.filter((u) => u.role === "rider").length,
    drivers: users.filter((u) => u.role === "driver").length,
    admins: users.filter((u) => u.role === "admin").length,
    blocked: users.filter((u) => u.isBlocked).length,
    pendingDrivers: users.filter((u) => u.role === "driver" && !u.isApproved)
      .length,
  };

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground"></div>
              <span>Loading user data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive font-medium">
                Failed to fetch users
              </p>
              <p className="text-muted-foreground text-sm">
                Please try refreshing the page
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-foreground" />
            <h1 className="text-3xl font-bold text-foreground">
              User Management
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage riders, drivers, and administrators across your platform
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.total}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.riders}
                  </p>
                  <p className="text-xs text-muted-foreground">Riders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.drivers}
                  </p>
                  <p className="text-xs text-muted-foreground">Drivers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.admins}
                  </p>
                  <p className="text-xs text-muted-foreground">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <UserX className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.blocked}
                  </p>
                  <p className="text-xs text-muted-foreground">Blocked</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.pendingDrivers}
                  </p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="rider">Rider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto overflow-y-auto rounded-lg border-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow
                        key={user._id}
                        className="border-border hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {user.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getRoleVariant(user.role)}
                            className="flex items-center space-x-1 w-fit"
                          >
                            {getRoleIcon(user.role)}
                            <span className="capitalize">{user.role}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {user.isBlocked && (
                              <Badge
                                variant="destructive"
                                className="flex items-center space-x-1"
                              >
                                <UserX className="h-3 w-3" />
                                <span>Blocked</span>
                              </Badge>
                            )}
                            {user.role === "driver" && (
                              <Badge
                                variant={
                                  user.isApproved ? "default" : "outline"
                                }
                                className={`flex items-center space-x-1 ${
                                  user.isApproved
                                    ? "bg-foreground text-background hover:bg-foreground/90"
                                    : "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                }`}
                              >
                                {user.isApproved ? (
                                  <>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Approved</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="h-3 w-3" />
                                    <span>Pending/Suspended</span>
                                  </>
                                )}
                              </Badge>
                            )}
                            {!user.isBlocked && user.role !== "driver" && (
                              <Badge
                                variant="outline"
                                className="flex items-center space-x-1 border-foreground/20 text-foreground"
                              >
                                <CheckCircle className="h-3 w-3" />
                                <span>Active</span>
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-muted"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              {user.role !== "admin" && (
                                <>
                                  <DropdownMenuSeparator />
                                  {!user.isBlocked ? (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAction("block", user._id)
                                      }
                                      className="flex items-center space-x-2 cursor-pointer text-destructive focus:text-destructive"
                                    >
                                      <UserX className="h-4 w-4" />
                                      <span>Block User</span>
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAction("unblock", user._id)
                                      }
                                      className="flex items-center space-x-2 cursor-pointer text-foreground focus:text-foreground"
                                    >
                                      <UserCheck className="h-4 w-4" />
                                      <span>Unblock User</span>
                                    </DropdownMenuItem>
                                  )}
                                </>
                              )}

                              {user.role === "driver" && (
                                <>
                                  <DropdownMenuSeparator />
                                  {!user.isApproved ? (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAction("approve", user._id)
                                      }
                                      className="flex items-center space-x-2 cursor-pointer text-foreground focus:text-foreground"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Approve Driver</span>
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAction("suspend", user._id)
                                      }
                                      className="flex items-center space-x-2 cursor-pointer text-muted-foreground focus:text-muted-foreground"
                                    >
                                      <Clock className="h-4 w-4" />
                                      <span>Suspend Driver</span>
                                    </DropdownMenuItem>
                                  )}
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <div className="flex flex-col items-center space-y-2">
                          <Users className="h-12 w-12 text-muted-foreground" />
                          <p className="text-muted-foreground font-medium">
                            No users found
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {searchTerm || roleFilter !== "all"
                              ? "Try adjusting your search or filter criteria"
                              : "No users have been registered yet"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
