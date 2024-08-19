import Link from 'next/link'
import Image from 'next/image'

import wired from '/public/images/about/partners/wired.svg'
import dailyNews from '/public/images/about/partners/daily-news.svg'
import buzzfeed from '/public/images/about/partners/buzzfeed.svg'
import time from '/public/images/about/partners/time.svg'
import entrepreneur from '/public/images/about/partners/entrepreneur.svg'
import quartz from '/public/images/about/partners/quartz.svg'

const partners = [
  {
    name: 'Wired',
    href: '#0',
    logo: wired,
  },
  {
    name: 'Daily News',
    href: '#0',
    logo: dailyNews,
  },
  {
    name: 'Buzzfeed',
    href: '#0',
    logo: buzzfeed,
  },
  {
    name: 'Time',
    href: '#0',
    logo: time,
  },
  {
    name: 'Entrepreneur',
    href: '#0',
    logo: entrepreneur,
  },
  {
    name: 'Quartz',
    href: '#0',
    logo: quartz,
  },
]

export default function Partners() {
  return (
    <section className="py-12 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-xl px-4 sm:max-w-3xl sm:px-6 md:px-8 lg:max-w-screen-xl">
        {/* Section Header */}
        <h3 className="relative border-b border-gray-200 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
          Our Syndication Partners
        </h3>

        {/* Logos */}
        <div className="mx-auto mt-8 max-w-screen-xl lg:mt-12">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {partners.map((partner) => (
              <Link
                key={partner.name}
                href={partner.href}
                className="overflow-hidden"
              >
                <div className="group flex h-36 w-full items-center justify-center rounded-3xl bg-gray-50 transition duration-300 ease-in-out hover:bg-gray-100">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    className="h-6 w-auto opacity-70 transition duration-300 ease-in-out group-hover:opacity-95 sm:h-8"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
