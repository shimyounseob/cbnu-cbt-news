import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

export default function SidebarSocialLinks() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex w-0 flex-1">
        {/* Previous Button */}
        <Link
          href="#"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
        >
          <ChevronLeftIcon className="mr-2.5 h-5 w-5 text-gray-400" />
          Previous
        </Link>
      </div>

      {/* Pages */}
      <div className="hidden space-x-2.5 md:flex">
        <Link
          href="#"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
        >
          1
        </Link>

        {/* Current: "bg-red-500 text-white", Default: "text-gray-500 transition duration-300 ease-in-out bg-gray-50 hover:bg-gray-100 hover:text-gray-700" */}
        <Link
          href="#"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-sm font-medium text-white"
          aria-current="page"
        >
          2
        </Link>
        <Link
          href="#"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
        >
          3
        </Link>
        <Link
          href="#"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
        >
          4
        </Link>

        <span className="inline-flex h-12 w-12 items-center justify-center text-base font-medium text-gray-500">
          ...
        </span>

        <Link
          href="#"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
        >
          10
        </Link>
      </div>

      {/* Next Button */}
      <div className="flex w-0 flex-1 justify-end">
        <Link
          href="#"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
        >
          Next
          <ChevronRightIcon className="ml-2.5 h-5 w-5 text-gray-400" />
        </Link>
      </div>
    </nav>
  )
}
