import { Rocket, Github, Users } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="w-full bg-base-300 border-t border-base-content/10 text-base-content py-8 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span>Contribute on</span>
            <Link
              href="https://github.com/MinavKaria/Notes-Aid"
              target="_blank"
              className="hover:text-primary"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>

          <Link
            href="/contributors"
            className="flex items-center gap-2 hover:text-primary"
          >
            <Users className="w-5 h-5 " />
            <span className="underline">Our Contributors</span>
          </Link>

          <div className="flex items-center gap-1 text-sm">
            <Rocket className="w-4 h-4  animate-bounce" />
            <span>Engineered by</span>
            <Link
              href="https://github.com/MinavKaria"
              target="_blank"
              className="underline hover:text-primary"
            >
              Minav
            </Link>
            ,
            <Link
              href="https://github.com/veddsavla"
              target="_blank"
              className="underline hover:text-primary"
            >
              Vedansh
            </Link>
            &amp;
            <Link
              href="https://github.com/yashankkothari"
              target="_blank"
              className="underline hover:text-primary"
            >
              Yashank
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
