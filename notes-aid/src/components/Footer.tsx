import {Rocket,Github,Users } from "lucide-react";
import Link from "next/link";

const Footer = () => {


  return (
    <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex justify-between flex-col md:flex-row items-center space-y-4 md:space-y-0 gap-3 ">
          <div className="flex ">
            Contribute on{" "} 
            <Link href="https://github.com/MinavKaria/Notes-Aid" target="_blank" className="text-blue-400 underline hover:text-blue-700">
              <Github className="w-6 h-6 mx-1 text-blue-400 dark:text-blue-400" />
            </Link>

          </div>
          <div>
            <Link href="/contributors" className="flex gap-2" >
              <Users/>
              <div className="text-blue-400 hover:text-blue-800 underline">
              Our Contributors
              </div>
            </Link>
          </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <Rocket className="w-4 h-4 mx-1 text-indigo-500 dark:text-cyan-400 animate-bounce" /> {" "} Engineered by 
           
          
            <Link href="https://github.com/MinavKaria" target="_blank" className=" text-blue-400 underline hover:text-blue-700">
              Minav
            </Link>
            , 
            <Link href="https://github.com/veddsavla" target="_blank" className=" text-blue-400 underline hover:text-blue-700">
              Vedansh
            </Link>
            & 
            <Link href="https://github.com/aarushsaboo" target="_blank" className=" text-blue-400 underline hover:text-blue-700">
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
