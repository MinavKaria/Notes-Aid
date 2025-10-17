"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Layout from "@/components/Layout"
import Link from "next/link"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "You don't have admin access. Only authorized administrators can sign in."
      case "Configuration":
        return "There is a configuration problem with the authentication system."
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "OAuthAccountNotLinked":
        return "There was a problem with GitHub authentication."
      default:
        return "An unexpected authentication error occurred."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400">Authentication Error</h2>
          <p className="mt-2 text-gray-400">
            {getErrorMessage(error)}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link 
            href="/auth/signin"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-red-400">Loading...</h2>
              <p className="mt-2 text-gray-400">
                Please wait while we load the error details.
              </p>
            </div>
          </div>
        </div>
      }>
        <AuthErrorContent />
      </Suspense>
    </Layout>
  )
}