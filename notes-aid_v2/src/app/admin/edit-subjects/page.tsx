"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import Link from "next/link"

interface Subject {
  name: string
  collection?: string
}

export default function EditSubjectsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin")
    } else {
      loadSubjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status, router])

  const loadSubjects = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/subject')
      const data = await response.json()
      
      if (response.ok) {
        // Transform collection names into subject objects
        let subjectList = (data.subjects || []).map((collectionName: string) => ({
          name: collectionName.replace(/_/g, ' ').replace(/\b\w/g, (s: string) => s.toUpperCase()),
          collection: collectionName
        }))
        
        // Filter subjects based on user permissions
        if (!session?.user?.isSuperAdmin && session?.user?.allowedSubjects) {
          const allowedSubjects = session.user.allowedSubjects
          subjectList = subjectList.filter((subject: Subject) => 
            allowedSubjects.includes(subject.collection || '')
          )
        }
        
        setSubjects(subjectList)
      } else {
        console.error("Failed to load subjects:", data.error)
      }
    } catch (error) {
      console.error("Error loading subjects:", error)
    } finally {
      setLoading(false)
    }
  }

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
    return null
  }

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
            <div>
              <h1 className="text-3xl font-semibold text-white">Edit Subjects</h1>
              <p className="text-gray-400 text-sm">
                Select a subject to edit its modules, topics, and content
              </p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-zinc-700 rounded-md hover:border-zinc-600 transition-colors"
            >
              Back to Admin
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg animate-pulse">
                  <div className="h-6 w-1/3 bg-zinc-800 rounded"></div>
                  <div className="h-4 w-2/3 bg-zinc-800 rounded mt-2"></div>
                </div>
              ))}
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-base">No subjects found</p>
              <Link
                href="/admin/add-subject"
                className="inline-block mt-4 bg-white text-black px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Add Your First Subject
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Link
                  key={subject.collection}
                  href={`/admin/edit-subjects/${subject.collection}`}
                  className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-2 text-gray-100 group-hover:text-white transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">
                        Collection: {subject.collection}
                      </p>
                    </div>
                    <div className="ml-4">
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
                    <span className="text-xs text-gray-400">Click to edit</span>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}