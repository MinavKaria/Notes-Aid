"use client"
import { signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/Layout"

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [configError, setConfigError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getSession().then(session => {
      if (session?.user?.isAdmin) {
        router.push("/admin")
      }
    })
  }, [router])

  const handleSignIn = async () => {
    setLoading(true)
    setConfigError(false)
    try {
      const result = await signIn("github", { callbackUrl: "/admin" })
      if (result?.error) {
        console.error("Sign in error:", result.error)
        if (result.error === "Configuration") {
          setConfigError(true)
        }
      }
    } catch (error) {
      console.error("Sign in failed:", error)
      setConfigError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Admin Sign In</h2>
            <p className="mt-2 text-gray-400">
              Sign in with your GitHub account to access admin features
            </p>
          </div>
          
          {configError && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                <strong>Configuration Error:</strong> GitHub OAuth is not properly configured. 
                Please set up GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in your environment variables.
              </p>
            </div>
          )}
          
          <div className="mt-8">
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in with GitHub"}
            </button>
            
          
           
          </div>
        </div>
      </div>
    </Layout>
  )
}