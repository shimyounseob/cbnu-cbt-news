import Link from 'next/link'
import Image from 'next/image'
import socialLinks from '@/config/social.js'
import { SocialButton } from '@/components/social/SocialButton'

import logo from '/public/images/the_chungbuk_times.png'

const links = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About us',
    link: '/about',
  },
  {
    label: 'Contact us',
    link: '/contact',
  },
  {
    label: 'Privacy policy',
    link: '/privacy',
  },
  {
    label: 'Terms & Conditions',
    link: '/privacy',
  },
]

export default function Footer() {
  return (
    <footer className="bg-white py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
        {/* Logo & Social Links */}
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="block h-10">
              <Image src={logo} alt="CBNU" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex items-center justify-center sm:mt-0">
            <div className="flex items-center space-x-3 sm:ml-4">
              {socialLinks.map((item) => (
                <SocialButton
                  key={item.name}
                  href={item.href}
                  name={item.name}
                  containerClassName="sm:w-12 sm:h-12"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links Container */}
        <div className="mt-10 border-t border-t-gray-300/70 pt-10 md:flex md:items-center md:justify-between">
          {/* Footer Links */}
          <nav
            className="-mx-5 -my-2 flex flex-wrap items-center justify-center md:justify-start"
            aria-label="Footer"
          >
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className="px-5 py-2 text-base text-gray-500 transition duration-300 ease-in-out hover:text-red-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Copyright Text */}
          <p className="ml-0 mt-8 flex shrink-0 items-center justify-center text-base text-gray-400 md:ml-6 md:mt-0">
            © {new Date().getFullYear()} CBNU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
