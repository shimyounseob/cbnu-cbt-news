import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { compareDesc, format, parseISO } from 'date-fns'
import { allArticles } from 'contentlayer/generated'

export default function RecentArticles() {
  const recentArticles = allArticles
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 4)

  return (
    <div className="mt-12 sm:mt-16 lg:ml-12 lg:mt-0 lg:w-1/2 xl:ml-16 xl:w-3/5">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        Recent stories
      </h3>
      <div className="grid lg:gap-x-6 xl:grid-cols-2">
        {recentArticles.map((article, index) => (
          <article
            key={article.slug}
            className={clsx('py-8 sm:flex lg:items-center lg:py-6 xl:py-8', {
              'border-t border-gray-300/70 xl:border-t-0': index > 0,
            })}
          >
            {/* Image */}
            <Link
              href={article.url}
              className="order-2 w-full sm:w-2/5 lg:order-1 lg:w-24 xl:w-1/3"
            >
              <div className="group aspect-h-9 aspect-w-16 relative overflow-hidden rounded-2xl bg-gray-100 lg:aspect-h-1 lg:aspect-w-1">
                <Image
                  className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1536px) 8.5rem, (min-width: 1280px) 20vw, (min-width: 1280px) 6rem, (min-width: 640px) 14rem, calc(100vw - 2rem)"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="order-1 mt-5 w-full px-2 sm:mr-4 sm:mt-0 sm:max-w-sm sm:px-0 lg:order-2 lg:ml-4 lg:mr-0 lg:flex-1">
              <Link
                href={article.category.url}
                className="text-xs font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600 lg:hidden 2xl:block"
              >
                {article.category.name}
              </Link>

              <Link href={article.url}>
                <h3 className="mt-2 text-lg font-medium tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline lg:text-md xl:text-lg xl:leading-normal">
                  {article.title}
                </h3>
              </Link>

              {/* Author */}
              <div className="mt-4 flex items-center justify-between lg:mt-3">
                {/* Author meta */}
                <div className="flex items-center justify-center">
                  <Link
                    href={article.author.url}
                    className="relative mr-3 h-6 w-6 rounded-lg bg-gray-100 lg:hidden"
                  >
                    <Image
                      className="flex-shrink-0 rounded-lg object-cover object-center"
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      sizes="100vw"
                    />
                  </Link>

                  <div className="text-sm text-gray-500">
                    <span>By </span>
                    <Link
                      href={article.author.url}
                      className="font-medium text-gray-700 hover:underline"
                    >
                      {article.author.name}
                    </Link>
                    <span className="lg:hidden">
                      <span className="mx-1">·</span>
                      <time dateTime={article.date}>
                        {format(parseISO(article.date), 'LLL d, yyyy')}
                      </time>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
