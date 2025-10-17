"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  provider: string;
  isAdmin: boolean;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin");
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user?.isAdmin) {
      fetch("/api/list-users")
        .then((r) => r.json())
        .then((json) => setUsers(json.users || []))
        .catch((fetchError) => console.error("Failed to fetch users:", fetchError))
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (status === "loading") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Registered Users</h1>
          {loading ? (
            <div className="text-gray-400">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No users found</div>
              <p className="text-sm text-gray-500">Users will appear here when they sign in to the application.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div key={user._id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-600 transition-colors">
                  <div className="flex items-center gap-4">
                    {user.photoURL && (
                      <Image
                        src={user.photoURL}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.provider === 'github' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                        }`}>
                          {user.provider === 'github' ? 'GitHub' : 'Google'}
                        </span>
                        {user.isAdmin && (
                          <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
