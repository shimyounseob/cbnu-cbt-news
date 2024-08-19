import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

export default function TopicHeader({ item, type }) {
  return (
    <section className="bg-gray-50 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-12 md:max-w-3xl lg:max-w-screen-xl lg:px-8">
        <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
          <div
            className={clsx('flex flex-col items-center', {
              'order-2 mt-8 md:order-1 md:mt-0 md:flex-row':
                type === 'category',
            })}
          >
            {type === 'category' && (
              <div className="flex-shrink-0">
                <div className="relative h-[100px] w-[100px] rounded-2xl bg-gray-100">
                  <Image
                    className="rounded-2xl object-cover object-center"
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="6.25rem"
                  />
                  <span
                    className="absolute inset-0 rounded-2xl shadow-inner"
                    aria-hidden="true"
                  />
                </div>
              </div>
            )}
            <div
              className={clsx('text-center md:text-left', {
                'mt-6 md:ml-5 md:mt-0': type === 'category',
              })}
            >
              <p className="text-xs uppercase tracking-widest text-red-700">
                Recent in
              </p>
              <h1 className="mt-1.5 text-3xl font-medium tracking-normal text-gray-900 sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
                {type === 'category' ? item.name : item}
              </h1>
            </div>
          </div>

          <div
            className={clsx(
              'order-1',
              type === 'category' ? 'md:order-2' : 'hidden md:block',
            )}
          >
            <nav
              aria-label="breadcrumb"
              className="flex items-center space-x-1.5 text-[15px] sm:space-x-4"
            >
              <span>
                <Link
                  href="/"
                  className="group flex items-center leading-[1.125rem] text-gray-500 no-underline transition duration-300 ease-in-out hover:text-gray-900 hover:no-underline"
                >
                  <HomeIcon className="mr-2 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-gray-400 transition duration-300 ease-in-out group-hover:text-gray-500" />
                  Banter
                </Link>
              </span>

              <span className="text-gray-400">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              </span>
              <span className="text-red-700">
                {type === 'category' ? item.name : item}
              </span>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
