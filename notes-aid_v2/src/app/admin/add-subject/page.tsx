"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Layout from "@/components/Layout"

export default function AddSubjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    color: "blue",
    collectionName: ""
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user?.isAdmin) {
      router.push("/auth/signin")
    }
  }, [session, status, router])

  // Auto-generate collection name from subject name
  useEffect(() => {
    if (formData.name) {
      const collectionName = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .trim()
      setFormData(prev => ({ ...prev, collectionName }))
    }
  }, [formData.name])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.collectionName.trim()) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          color: formData.color,
          collectionName: formData.collectionName.trim()
        }),
      })

      const result = await response.json()
      
      if (response.ok) {
        alert("Subject created successfully!")
        setFormData({ name: "", color: "blue", collectionName: "" })
      } else {
        alert(`Failed to create subject: ${result.error}`)
      }
    } catch (error) {
      console.error("Error creating subject:", error)
      alert("Failed to create subject. Please try again.")
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

  const colorOptions = [
    { value: "blue", label: "Blue", bg: "bg-blue-600" },
    { value: "green", label: "Green", bg: "bg-green-600" },
    { value: "red", label: "Red", bg: "bg-red-600" },
    { value: "purple", label: "Purple", bg: "bg-purple-600" },
    { value: "yellow", label: "Yellow", bg: "bg-yellow-600" },
    { value: "indigo", label: "Indigo", bg: "bg-indigo-600" },
    { value: "pink", label: "Pink", bg: "bg-pink-600" },
    { value: "gray", label: "Gray", bg: "bg-gray-600" },
  ]

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12 bg-black">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 pb-6 border-b border-zinc-800">
            <h1 className="text-3xl font-semibold text-white">Add New Subject</h1>
            <p className="text-gray-400 text-sm">
              Create a new subject collection in the database
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                Subject Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-gray-100 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                placeholder="e.g., Relational Database Management Systems"
                required
              />
            </div>

            <div>
              <label htmlFor="collection" className="block text-sm font-medium mb-2 text-gray-200">
                Collection Name *
              </label>
              <input
                type="text"
                id="collection"
                value={formData.collectionName}
                onChange={(e) => setFormData(prev => ({ ...prev, collectionName: e.target.value }))}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-gray-100 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                placeholder="Auto-generated from subject name"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be the MongoDB collection name (lowercase, underscores for spaces)
              </p>
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium mb-2 text-gray-200">
                Color Theme
              </label>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map((color) => (
                  <label
                    key={color.value}
                    className={`flex items-center p-3 rounded-md cursor-pointer border ${
                      formData.color === color.value 
                        ? 'border-white bg-zinc-800' 
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color.value}
                      checked={formData.color === color.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full ${color.bg} mr-2`}></div>
                    <span className="text-sm text-gray-200">{color.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm ${
                  loading
                    ? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {loading ? "Creating..." : "Create Subject"}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-6 py-2.5 border border-zinc-700 text-gray-300 rounded-md text-sm hover:border-zinc-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}