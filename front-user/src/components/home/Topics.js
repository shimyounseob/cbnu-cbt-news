import Link from 'next/link'
import Image from 'next/image'
import { allCategories } from 'contentlayer/generated'

function Topic({ category }) {
  return (
    <div className="group relative z-0 h-40 translate-y-0 transform cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md transition duration-300 ease-in-out hover:-translate-y-1">
      <Link
        href={category.url}
        className="absolute inset-0 z-10 h-full w-full rounded-2xl shadow-md"
      ></Link>

      {/* Image */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="h-full w-full object-cover object-center"
        sizes="(min-width: 1536px) 14.1rem, (min-width: 1024px) 16.67vw, (min-width: 768px) 13.75rem, (min-width: 640px) 33vw, calc(50vw - 1.5rem)"
      />

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 w-full pb-6">
        <div className="flex w-full justify-center">
          <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-sm font-medium text-gray-800 backdrop-blur-lg">
            {category.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Topics() {
  return (
    <section className="w-full bg-gray-50 pb-14 pt-12 sm:py-20 lg:pt-24" style={{ paddingBottom: '0px' }}>
      <div className="mx-auto max-w-xl px-4 sm:max-w-3xl sm:px-6 md:px-8 lg:max-w-screen-2xl">
        {/* Section Header */}
        <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
          Trending News
        </h3>

        {/* Topics */}
        {/* <div className="relative mt-8 sm:mt-9">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6 lg:gap-4 xl:gap-6">
            {allCategories.map((category, index) => (
              <Topic key={index} category={category} />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}

