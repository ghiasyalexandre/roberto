"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "theme";

function getInitialIsDark(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "dark";
}

export default function Footer() {
  const pathname = usePathname();
  const showFooter = pathname !== "/customizer";

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getInitialIsDark());

    const root = document.documentElement;

    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="bg-white pt-2 dark:bg-transparent lg:pt-2">
      <div>
        <div className="flex flex-col items-center text-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Go to top of page"
            title="Scroll to top"
            className="relative inline-block bg-transparent!  border-0! ring-0! focus:border-0! focus-visible:border-0!"
          >
            <Image
              className="max-h-24 sm:max-h-28 w-auto transition-transform duration-500 ease-in-out hover:scale-110"
              src={
                isDark ? "/images/RRtrans1k.webp" : "/images/RRtransB1k.webp"
              }
              alt="Rob Reality Florida Logo"
              draggable={false}
              width={300}
              height={168}
              priority={false}
              style={{ width: "auto", height: "auto" }}
            />
          </button>
        </div>

        <hr className="mt-2 border-neutral-700 dark:border-neutral-700" />

        <div className="xs:px-3 flex flex-col-reverse items-center bg-black px-2 py-2 pb-4 shadow-neonDarkSlim sm:flex-row sm:justify-between sm:px-4">
          <p className="mt-2 text-sm text-neutral-500">
            Copyright © 2026 Homes by Roberto - All Rights Reserved.
          </p>

          <div className="mt-1 flex pt-1 sm:mt-0">
            {/* <Link
              href="/terms"
              className="mr-2 text-sm text-neutral-500 transition-colors duration-300 hover:text-neutral-500 dark:hover:text-neutral-300"
              aria-label="Terms and Conditions"
              draggable={false}
            >
              Terms and Conditions
            </Link> */}

            <Link
              href="/contact"
              className="mx-2 text-sm text-neutral-500 transition-colors duration-300 hover:text-neutral-500 dark:hover:text-neutral-300"
              aria-label="Contact Us"
              draggable={false}
            >
              License
            </Link>

            {/*
            <Link
              href="/privacy"
              className="mx-2 text-sm text-neutral-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Privacy Policy"
              draggable={false}
            >
              Privacy
            </Link>
            */}

            <Link
              href="/faq"
              className="mx-2 text-sm text-neutral-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Frequently Asked Questions"
              draggable={false}
            >
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
