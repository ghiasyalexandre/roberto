"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;

  return getSystemPrefersDark() ? "dark" : "light";
}

export default function MainNav() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openAboutMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setAboutOpen(true);
  };

  const closeAboutMenuWithDelay = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 150);
  };

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setAboutOpen(false);
  };

  return (
    <nav
      aria-label="Main Navigation"
      // className="sticky top-0 z-50 w-full bg-black shadow-neonDarkSlim transition-transform duration-300 ease-in-out dark:shadow-neonLight"
    >
      {/* <div className="px-4 py-4">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/" draggable={false} aria-label="Go Home">
              <Image
                draggable={false}
                aria-label="Rob Reality Logo"
                className="ml-2 mr-4 h-16 w-auto transition-transform duration-300 ease-in-out hover:scale-110"
                src="/images/RRtrans1k.webp"
                alt="Rob Reality Logo"
                width={160}
                height={64}
                priority
              />
            </Link>

            <div className="flex md:hidden">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                type="button"
                className="text-gray-500 focus:outline-none hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`inset-x-0 z-20 flex-1 w-full px-4 py-4 transition-all duration-500 ease-in-out md:relative md:top-0 md:mt-0 md:flex md:w-auto md:translate-x-0 md:items-center md:justify-between md:bg-transparent md:p-0 md:opacity-100 ${
              menuOpen
                ? "translate-x-0 opacity-100 pb-2"
                : "absolute -translate-x-full opacity-0 md:static"
            }`}
          >
            <div className="my-2 flex flex-col capitalize text-gray-300 dark:text-gray-300 md:-mx-4 md:flex-row md:items-center md:px-4">
              <Link
                href="/"
                draggable={false}
                onClick={closeAllMenus}
                aria-label="Navigate to the home page"
                className="relative transition-colors duration-300 hover:text-white md:mx-4 md:mt-0 after:absolute after:left-1/2 after:-bottom-0.5 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 md:hover:after:w-full"
              >
                Home
              </Link>

              <Link
                href="/contact"
                draggable={false}
                onClick={closeAllMenus}
                aria-label="Contact Us"
                className="relative transition-colors duration-300 hover:text-white md:mx-4 md:mt-0 after:absolute after:left-1/2 after:-bottom-0.5 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 md:hover:after:w-full"
              >
                Contact
              </Link>
              
              <div
                onMouseEnter={openAboutMenu}
                onMouseLeave={closeAboutMenuWithDelay}
                className="relative md:mx-4"
              >
                <div
                  type="button"
                  onClick={() => setAboutOpen((prev) => !prev)}
                  aria-label="Open About Us menu"
                  aria-expanded={aboutOpen}
                  className="group relative flex items-center gap-2 bg-transparent p-0 text-gray-300 outline-none transition-colors duration-300 hover:text-white focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  <span className="relative after:absolute after:left-1/2 after:-bottom-0.5 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 md:group-hover:after:w-full">
                    About Us
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${
                      aboutOpen ? "-rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {aboutOpen && (
                  <div className="z-50 mt-2 mb-2 min-w-45 overflow-hidden rounded-md border border-neutral-700 bg-neutral-50 shadow-lg dark:bg-neutral-900 dark:hover:text-white md:absolute md:left-0 md:top-full md:mt-2">
                    <Link
                      href="/history"
                      draggable={false}
                      aria-label="About our company"
                      onClick={closeAllMenus}
                      className="block px-4 py-3 text-black transition-colors duration-200 hover:bg-neutral-800 hover:text-white dark:text-neutral-300"
                    >
                      Our History
                    </Link>

                    <Link
                      href="/certifications"
                      draggable={false}
                      aria-label="Quality and certifications"
                      onClick={closeAllMenus}
                      className="block px-4 py-3 text-black transition-colors duration-200 hover:bg-neutral-800 hover:text-white dark:text-neutral-300"
                    >
                      Quality and Certifications
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/faq"
                draggable={false}
                onClick={closeAllMenus}
                aria-label="Frequently Asked Questions"
                className="relative transition-colors duration-300 hover:text-white md:mx-4 md:mt-0 after:absolute after:left-1/2 after:-bottom-0.5 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 md:hover:after:w-full"
              >
                FAQ
              </Link>
              
            </div>
          </div>


        </div>
      </div> */}
      <div className="fixed right-2 top-3 bottom-auto z-50 flex">
        <div className="flex justify-end transition-all duration-300 ease-in-out">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light or Dark Mode"
            className="mx-1 rounded-full border border-black bg-white/80 p-2 text-neutral-400 transition-all duration-300 ease-in-out hover:border-white hover:bg-neutral-800 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-black dark:border-white lg:mx-2"
          >
            {!mounted ? null : theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
