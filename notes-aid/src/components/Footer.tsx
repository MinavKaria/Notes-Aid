import { Rocket, Github, Users } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-gray-200 dark:border-border transition-colors duration-200 bg-white dark:bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between flex-col md:flex-row items-center space-y-4 md:space-y-0 gap-3 ">
          <div className="flex ">
            Contribute on{" "}
            <Link
              href="https://github.com/MinavKaria/Notes-Aid"
              target="_blank"
              className="text-icons underline hover:text-iconsHover"
            >
              <Github className="w-6 h-6 mx-1" />
            </Link>
          </div>
          <div>
            <Link href="/contributors" className="flex gap-2">
              <Users />
              <div className="text-icons hover:text-iconsHover underline">
                Our Contributors
              </div>
            </Link>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <Rocket className="w-4 h-4 mx-1 text-indigo-500 dark:text-icons animate-bounce" />{" "}
            Engineered by
            <Link
              href="https://github.com/MinavKaria"
              target="_blank"
              className=" text-icons underline hover:text-iconsHover"
            >
              Minav
            </Link>
            ,
            <Link
              href="https://github.com/veddsavla"
              target="_blank"
              className=" text-icons underline hover:text-iconsHover"
            >
              Vedansh
            </Link>
            &
            <Link
              href="https://github.com/aarushsaboo"
              target="_blank"
              className=" text-icons underline hover:text-iconsHover"
            >
              Aarush
            </Link>
            {/* <Link href={`/contributors`} className=" text-blue-400 underline hover:text-blue-700">
              Our Contributors
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
