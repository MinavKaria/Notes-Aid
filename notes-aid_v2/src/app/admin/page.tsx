"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Layout from "@/components/Layout"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-gray-400">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!session?.user?.isAdmin) {
    return null // Will redirect
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
            <div>
              <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">
                Welcome, {session.user.name || session.user.githubUsername}!
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {session.user.isSuperAdmin && (
              <Link
                href="/admin/manage-links"
                className="bg-zinc-900 p-6 rounded-lg border border-purple-600 hover:border-purple-500 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-100 group-hover:text-white">Manage Edit Links</h3>
                  <span className="px-2 py-0.5 text-xs bg-purple-600 text-white rounded">Super Admin</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Create password-protected edit links for contributors
                </p>
              </Link>
            )}

            {session.user.isSuperAdmin && (
              <Link
                href="/admin/review-changes"
                className="bg-zinc-900 p-6 rounded-lg border border-amber-600 hover:border-amber-500 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-100 group-hover:text-white">Review Changes</h3>
                  <span className="px-2 py-0.5 text-xs bg-amber-600 text-white rounded">Super Admin</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Approve or reject contributor submissions
                </p>
              </Link>
            )}

            <Link
              href="/admin/manage-quick-links"
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors group"
            >
              <h3 className="text-lg font-medium mb-2 text-gray-100 group-hover:text-white">Manage Quick Links</h3>
              <p className="text-gray-400 text-sm">
                Create and manage quick reference links for subjects
              </p>
            </Link>

            {session.user.isSuperAdmin && (
              <Link
                href="/admin/add-subject"
                className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors group"
              >
                <h3 className="text-lg font-medium mb-2 text-gray-100 group-hover:text-white">Add New Subject</h3>
                <p className="text-gray-400 text-sm">
                  Create a new subject collection in the database
                </p>
              </Link>
            )}

            <Link
              href="/admin/edit-subjects"
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors group"
            >
              <h3 className="text-lg font-medium mb-2 text-gray-100 group-hover:text-white">Edit Subjects</h3>
              <p className="text-gray-400 text-sm">
                Edit existing subject data and structure
              </p>
            </Link>

            {session.user.isSuperAdmin && (
              <Link
                href="/curriculum"
                className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors group"
              >
                <h3 className="text-lg font-medium mb-2 text-gray-100 group-hover:text-white">Manage Curriculum</h3>
                <p className="text-gray-400 text-sm">
                  Configure curriculum and subject ordering
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}