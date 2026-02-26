import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Shield, ShieldOff, KeyRound, Users } from "lucide-react";

const FALLBACK_URL = "https://dlwiktowlhbrlcjeojcc.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2lrdG93bGhicmxjamVvamNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1ODE1ODMsImV4cCI6MjA4NzE1NzU4M30.LxNDV4FrhS_kRlQodQ5kUnvVW-5Ux3l0DZSWRj9_YSY";

const getUrl = () => import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const getKey = () => import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;

interface UserInfo {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  banned: boolean;
  role: string;
}

const callManageUsers = async (body: Record<string, any>) => {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  const url = `${getUrl()}/functions/v1/manage-users`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": getKey(),
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

const AdminUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [passwordDialog, setPasswordDialog] = useState<UserInfo | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const { data: users, isLoading } = useQuery<UserInfo[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await callManageUsers({ action: "list" });
      return res.users;
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async ({ user_id, password }: { user_id: string; password: string }) => {
      return callManageUsers({ action: "change_password", user_id, password });
    },
    onSuccess: () => {
      toast({ title: "Password changed successfully" });
      setPasswordDialog(null);
      setNewPassword("");
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ user_id, ban }: { user_id: string; ban: boolean }) => {
      return callManageUsers({ action: ban ? "ban" : "unban", user_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "User status updated" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const formatDate = (d: string | null) => {
    if (!d) return "Never";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Users className="h-7 w-7 text-primary" />
        <h1 className="font-serif text-3xl font-bold text-foreground">Users</h1>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading users...</p>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sign In</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.banned ? "destructive" : "outline"} className={!user.banned ? "border-green-500 text-green-700" : ""}>
                      {user.banned ? "Inactive" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{formatDate(user.last_sign_in_at)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{formatDate(user.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setPasswordDialog(user); setNewPassword(""); }}
                      >
                        <KeyRound className="h-3.5 w-3.5 mr-1" /> Password
                      </Button>
                      <Button
                        variant={user.banned ? "default" : "destructive"}
                        size="sm"
                        onClick={() => toggleStatusMutation.mutate({ user_id: user.id, ban: !user.banned })}
                        disabled={toggleStatusMutation.isPending}
                      >
                        {user.banned ? (
                          <><Shield className="h-3.5 w-3.5 mr-1" /> Activate</>
                        ) : (
                          <><ShieldOff className="h-3.5 w-3.5 mr-1" /> Deactivate</>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!passwordDialog} onOpenChange={(open) => !open && setPasswordDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Change password for <span className="font-medium text-foreground">{passwordDialog?.email}</span>
          </p>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (min 6 chars)"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordDialog(null)}>Cancel</Button>
            <Button
              onClick={() => passwordDialog && changePasswordMutation.mutate({ user_id: passwordDialog.id, password: newPassword })}
              disabled={newPassword.length < 6 || changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending ? "Saving..." : "Update Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
