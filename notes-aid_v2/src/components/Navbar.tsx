"use client"
import { X, Menu } from "lucide-react"

function Navbar({
    isMenuOpen,
    setIsMenuOpen
}) {
  return (
    <>
    <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <span className="text-xl font-bold">NotesAid</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
             
              <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <button className="w-full bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar