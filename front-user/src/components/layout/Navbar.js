'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment, forwardRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import logo from '/public/images/the_chungbuk_times.png'
import logoIcon from '/public/images/cbnu_logo_edit.png'

const menu = [
  {
    name: 'Technology',
    href: '/categories/technology',
  },
  {
    name: 'Startup',
    href: '/categories/startup',
  },
  {
    name: 'Science',
    href: '/categories/science',
  },
  {
    name: 'Culture',
    href: '/categories/culture',
  },
]

const pages = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Category page',
    href: '/categories/technology',
  },
  {
    name: 'Article',
    href: '/articles/apple-payment-terminals-in-fintech-push',
  },
  {
    name: 'Author page',
    href: '/authors/mark-jack',
  },
  {
    name: 'Tag page',
    href: '/tags/tips',
  },
  {
    name: 'About us',
    href: '/about',
  },
  {
    name: 'Contact us',
    href: '/contact',
  },
  {
    name: 'Privacy policy',
    href: '/privacy',
  },
  {
    name: '404 page',
    href: '/404',
  },
]

function Logo() {
  return (
    <div className="flex shrink-0 items-center">
      <Link href="/" className="h-9 lg:hidden">
        <Image 
          src={logoIcon} 
          alt="CBNU Icon" 
          style={{ height: '40px', width: 'auto' }} // 인라인 스타일로 높이와 너비 설정
        />
      </Link>
      <Link href="/" className="hidden h-9 lg:block">
        <Image 
          src={logo} 
          alt="the chungbuk times logo" 
          width={500} // 원하는 너비로 조정
          height={50} // 원하는 높이로 조정
          style={{ height: '40px', width: 'auto' }} // 인라인 스타일로 높이와 너비 설정
        />
      </Link>
    </div>
  )
}

function Dropdown() {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'group flex items-center px-3 py-1 text-md font-medium outline-none focus:outline-none',
              open
                ? 'text-red-700'
                : 'text-gray-800 transition duration-300 ease-in-out hover:text-red-700',
            )}
          >
            <span>Pages</span>
            <ChevronDownIcon
              className={clsx(
                'ml-2 h-5 w-5 transform duration-300',
                open
                  ? 'rotate-180 text-red-700'
                  : 'text-gray-600 group-hover:text-red-700',
              )}
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-20 mt-3 w-52 space-y-1 rounded-xl bg-white p-2.5 outline-none drop-shadow filter focus:outline-none">
              {pages.map((subLink, i) => {
                return (
                  <Menu.Item key={`desktop-dropdown-link-${i}`}>
                    {({ close }) => (
                      <MenuNavItem
                        link={subLink}
                        close={close}
                        className="px-5 py-3.5"
                      />
                    )}
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

function DesktopNavigation() {
  return (
    <div className="ml-6 hidden items-center justify-between text-xl md:flex md:space-x-0.5 md:text-base lg:space-x-2">
      {menu.map((link, index) => (
        <DesktopNavItem key={`desktop-link-${index}`} link={link} />
      ))}
      <Dropdown />
    </div>
  )
}

function HamburgerButton({ open }) {
  return (
    <Disclosure.Button className="group relative z-50 ml-6 flex cursor-pointer items-center justify-center rounded-full bg-gray-50 p-3 shadow-sm ring-1 ring-gray-900/5 transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none md:hidden">
      <span className="relative h-3.5 w-4">
        <span
          className={clsx(
            'absolute block h-0.5 rotate-0 transform rounded-full bg-gray-600 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-gray-900',
            open ? 'left-1/2 top-1.5 w-0' : 'left-0 top-0 w-full',
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-gray-600 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-gray-900',
            open ? 'rotate-45' : 'rotate-0',
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-gray-600 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-gray-900',
            open ? '-rotate-45' : 'rotate-0',
          )}
        />
        <span
          className={clsx(
            'absolute block h-0.5 rotate-0 transform rounded-full bg-gray-600 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-gray-900',
            open ? 'left-1/2 top-1.5 w-0' : 'left-0 top-3 w-full',
          )}
        />
      </span>
    </Disclosure.Button>
  )
}

function MobileMenu() {
  return (
    <Transition
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-95 -translate-y-full opacity-0"
      enterTo="transform scale-100 translate-y-0 opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform scale-100 translate-y-0 opacity-100"
      leaveTo="transform scale-95 -translate-y-full opacity-0"
    >
      <Disclosure.Panel>
        {({ close }) => (
          <nav
            className="border-b border-gray-300/60 bg-white md:hidden"
            aria-label="Global"
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {menu.map((link, index) => (
                <MenuNavItem
                  link={link}
                  key={`mobile-menu-link-${index}`}
                  close={close}
                />
              ))}
            </div>

            <div className="border-t border-gray-300/70 pb-3 pt-4">
              <div className="mt-2 px-6 text-xs font-medium uppercase tracking-widest text-gray-500">
                Pages
              </div>
              <div className="mt-3 space-y-1 px-2 text-[15px]">
                {pages.map((subLink, j) => (
                  <MenuNavItem
                    link={subLink}
                    key={`mobile-pages-link-${j}`}
                    className="px-4 py-2"
                    activeTextColorClassName="text-gray-600"
                    close={close}
                  />
                ))}
              </div>
            </div>
          </nav>
        )}
      </Disclosure.Panel>
    </Transition>
  )
}

function Search() {
  return (
    <div className="relative ml-6 h-10 w-full max-w-xxs rounded-3xl">
      <form className="group rounded-3xl transition duration-300 ease-in-out">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          className="h-10 w-full rounded-3xl border border-gray-200 bg-white px-10 py-3 text-sm leading-5 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
          required
          placeholder="Search..."
          autoComplete="email"
        />
      </form>
    </div>
  )
}

const MenuNavItem = forwardRef(
  (
    {
      link,
      className = 'px-4 py-3',
      activeTextColorClassName = 'text-gray-800',
      close,
    },
    ref,
  ) => {
    let isActive = usePathname() === link.href

    return (
      <Link
        ref={ref}
        href={link.href}
        className={clsx(
          'block rounded-lg font-medium',
          className,
          isActive
            ? 'bg-gray-50 text-red-700'
            : `${activeTextColorClassName} transition duration-300 ease-in-out hover:bg-gray-50 hover:text-red-700`,
        )}
        onClick={close}
      >
        {link.name}
      </Link>
    )
  },
)

function DesktopNavItem({ link }) {
  let isActive = usePathname() === link.href

  return (
    <Link
      href={link.href}
      className={clsx(
        'px-3 py-1 text-md font-medium',
        isActive
          ? 'text-red-700'
          : 'text-gray-800 transition duration-300 ease-in-out hover:text-red-700',
      )}
    >
      {link.name}
    </Link>
  )
}

export default function Navbar() {
  return (
    <Disclosure as="header" className="relative">
      {({ open }) => (
        <>
          <div className="relative z-10 border-b border-gray-300/60">
            <nav className="mx-auto flex h-20 max-w-7xl items-center bg-white px-4 sm:px-6 lg:border-0 lg:px-8">
              {/* Main navbar for large screens */}
              <div className="flex w-full items-center justify-between">
                <Logo />

                <DesktopNavigation />
                <Search />

                <HamburgerButton open={open} />
              </div>
            </nav>
          </div>

          <MobileMenu />
        </>
      )}
    </Disclosure>
  )
}

MenuNavItem.displayName = 'MenuNavItem'
