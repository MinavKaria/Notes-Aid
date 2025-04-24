import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const ThemeSwitcher = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset"
  ];
  

  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
      >
         <div className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1">
                <div className="bg-base-content size-1 rounded-full"></div>{" "}
                <div className="bg-primary size-1 rounded-full"></div>{" "}
                <div className="bg-secondary size-1 rounded-full"></div>{" "}
                <div className="bg-accent size-1 rounded-full"></div>
          </div>
        {/* <span className="ml-2 text-sm font-medium hidden sm:inline">
          {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
        </span> */}
      </div>

      <div
        tabIndex={0}
        className={`dropdown-content  rounded-box z-50 mt-4 w-48 shadow-lg max-h-80 overflow-y-auto overflow-x-hidden bg-base-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700`}
      >
        {themes.map((theme) => (
          <div key={theme} className="w-full " >
            <button onClick={() => changeTheme(theme)}>
              <div className="flex w-48 items-center py-2 px-1 pl-3 hover:text-base gap-4">
              <div className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1" data-theme={theme}>
                <div className="bg-base-content size-1 rounded-full"></div>{" "}
                <div className="bg-primary size-1 rounded-full"></div>{" "}
                <div className="bg-secondary size-1 rounded-full"></div>{" "}
                <div className="bg-accent size-1 rounded-full"></div>
              </div>
                <span data-theme={currentTheme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                {currentTheme === theme && <Check className="w-5 h-5" />}
              </div>
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
