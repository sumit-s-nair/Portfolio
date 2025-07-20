"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/auth");
    }
  }, [user, loading, router]);

  // Prevent rendering until auth state is resolved
  if (loading || !user) {
    return null;
  }

  // Authorized user
  return <>{children}</>;
}
