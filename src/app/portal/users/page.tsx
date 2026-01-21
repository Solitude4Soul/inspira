"use client";

import { useMemo } from "react";
import Link from "next/link";
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { firebaseConfig } from "@/firebase/config";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { PermissionErrorDisplay } from "@/components/admin/PermissionError";


type AdminUser = {
  id: string; // This will be the UID
  role?: string;
};

export default function AdminUsersPage() {
  const firestore = useFirestore();
  const authUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/users`;
  const rolesUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/data/roles_admin`;

  const rolesQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, "roles_admin") : null),
    [firestore]
  );
  const { data: adminUsers, isLoading, error } = useCollection<AdminUser>(rolesQuery);

  if (error) {
      return (
          <div className="space-y-6">
              <h1 className="font-headline text-3xl font-bold">User Management</h1>
              <PermissionErrorDisplay />
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">User Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription className="space-y-2 pt-2">
                <p>For security, new admin users must be created in the Firebase console. This involves two steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Create an email/password user in <Link href={authUrl} target="_blank" className="text-primary underline">Firebase Authentication</Link> and copy their UID.</li>
                    <li>Create a new document in the <Link href={rolesUrl} target="_blank" className="text-primary underline">roles_admin</Link> collection with the user's UID as the document ID.</li>
                </ol>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-username" className="text-right">
                  Email
                </Label>
                <Input id="new-username" className="col-span-3" placeholder="user@example.com" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-password" className="text-right">
                  Password
                </Label>
                <Input id="new-password" type="password" className="col-span-3" disabled />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled>Create in Firebase Console</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administrators</CardTitle>
          <CardDescription>
            A live list of all administrator accounts from the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <UserTableSkeleton />
            ) : adminUsers && adminUsers.length > 0 ? (
                 <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>User ID (UID)</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {adminUsers.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell className="font-mono text-xs">{user.id}</TableCell>
                        <TableCell>
                            <Badge variant={user.role === "Super Admin" ? "default" : "secondary"}>
                            {user.role || 'Admin'}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">No admin users found.</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

function UserTableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4 px-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
