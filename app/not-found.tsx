import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex h-[80vh] w-full bg-white dark:bg-transparent dark:bg-gradient-to-br dark:from-white/20 dark:via-transparent">
      <div className="container mx-auto flex min-h-96 items-center px-6">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="rounded-full bg-gray-600 p-3 text-sm font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-gray-800 dark:text-white md:text-5xl">
            Page not found
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for does not exist. Here are some helpful
            links:
          </p>

          <div className="mt-6 flex items-center justify-center sm:gap-x-3">
            <Link
              href="/"
              aria-label="Homepage"
              className="rounded-lg bg-black px-5 py-4 text-sm tracking-wide text-white transition-all duration-300 shrink-0 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white"
            >
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
