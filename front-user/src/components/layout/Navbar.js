'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment, forwardRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import clsx from 'clsx' // 여러 클래스를 조건부로 결합다.
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid' // 아이콘
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 로고 이미지를 가져오기
import logo from '/public/images/the_chungbuk_times.png'
import logoIcon from '/public/images/cbnu_logo_edit.png'

// 네비게이션 메뉴
const menu = [
  {
    name: 'Campus', // 단독 메뉴 항목
    href: '/tags/campus', // 해당 항목에 대한 링크
  },
  {
    name: 'News', // 메뉴 항목 이름
    subMenu: [
      // 드롭다운 메뉴 항목
      { name: 'Society', href: '/tags/society' },
      { name: 'Global', href: '/tags/global' },
      { name: 'Feature', href: '/tags/feature' },
    ],
  },
  {
    name: 'Culture', // 메뉴 항목 이름
    subMenu: [
      // 드롭다운 메뉴 항목
      { name: 'Culture', href: '/tags/culture' },
      { name: 'Experience', href: '/tags/experience' },
      { name: 'People', href: '/tags/people' },
    ],
  },
  {
    name: 'Column', // 메뉴 항목 이름
    href: '/tags/column', // 해당 항목에 대한 링크
  },
  {
    name: 'Photo', // 메뉴 항목 이름
    href: '/tags/photo', // 해당 항목에 대한 링크
  },
  {
    name: 'Chatbot', // 메뉴 항목 이름
    href: '/chatbot', // 해당 항목에 대한 링크
  },
]

// 로고 렌더링
function Logo() {
  return (
    <div className="flex shrink-0 items-center">
      {/* 모바일 화면에서는 작은 로고 아이콘을 보여줍니다. */}
      <Link href="/" className="h-9 lg:hidden">
        <Image
          src={logoIcon}
          alt="CBNU Icon"
          style={{ height: '40px', width: 'auto' }}
        />
      </Link>
      {/* 데스크탑 화면에서는 큰 로고를 보여줍니다. */}
      <Link href="/" className="hidden h-9 lg:block">
        <Image
          src={logo}
          alt="the chungbuk times logo"
          width={500}
          height={50}
          style={{ height: '40px', width: 'auto' }}
        />
      </Link>
    </div>
  )
}

// 드롭다운 메뉴
function Dropdown({ name, subMenu }) {
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
            <span>{name}</span>
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
              {subMenu.map((subLink, i) => (
                <Menu.Item key={`desktop-dropdown-link-${i}`}>
                  {({ close }) => (
                    <MenuNavItem
                      link={subLink}
                      close={close}
                      className="px-5 py-3.5"
                    />
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

// 데스크탑 네비게이션
function DesktopNavigation() {
  return (
    <div className="ml-6 hidden items-center justify-between text-xl md:flex md:space-x-0.5 md:text-base lg:space-x-2">
      {menu.map((link, index) =>
        link.subMenu ? (
          <Dropdown
            key={`desktop-link-${index}`}
            name={link.name}
            subMenu={link.subMenu}
          />
        ) : (
          <DesktopNavItem key={`desktop-link-${index}`} link={link} />
        ),
      )}
    </div>
  )
}

// 햄버거 메뉴 버튼 (모바일에서 사용)
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

// 모바일 메뉴
function MobileMenu({ isLoggedIn, onLoginStatusChange }) {
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
            {/* 로그인 버튼을 메뉴 맨 위에 추가 */}
            <LoginButton
              isMobile
              isLoggedIn={isLoggedIn}
              onLoginStatusChange={onLoginStatusChange}
            />

            <div className="space-y-1 px-2 pb-3 pt-2">
              {menu.map((link, index) => {
                if (link.subMenu) {
                  return link.subMenu.map((subLink, subIndex) => (
                    <MenuNavItem
                      link={subLink}
                      key={`mobile-submenu-link-${subIndex}`}
                      close={close}
                    />
                  ))
                } else {
                  return (
                    <MenuNavItem
                      link={link}
                      key={`mobile-menu-link-${index}`}
                      close={close}
                    />
                  )
                }
              })}
            </div>
          </nav>
        )}
      </Disclosure.Panel>
    </Transition>
  )
}
// 검색창을 렌더링
function Search() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="relative ml-6 h-10 w-full max-w-xxs rounded-3xl">
      <form
        className="group rounded-3xl transition duration-300 ease-in-out"
        onSubmit={handleSearch}
      >
        <div className="absolute inset-y-0 left-3 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="h-10 w-full rounded-3xl border border-gray-200 bg-white px-10 py-3 text-sm leading-5 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  )
}

// 로그인 버튼
function LoginButton({ isMobile = false, isLoggedIn, onLoginStatusChange }) {
  const handleLoginClick = () => {
    window.location.href = 'http://localhost:5001/auth/google'
  }

  const handleLogoutClick = async () => {
    try {
      await fetch('http://localhost:5001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      onLoginStatusChange(false) // 로그아웃 상태로 변경
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div
      className={isMobile ? 'mt-4 pl-4' : ''}
      style={isMobile ? { paddingLeft: '20px' } : {}}
    >
      {isLoggedIn ? (
        <button
          onClick={handleLogoutClick}
          className="flex items-center justify-center rounded-full bg-[#b92555] px-4 py-1 text-white transition hover:bg-[#9b2049]"
          style={isMobile ? { fontSize: '0.875rem' } : { fontSize: '0.75rem' }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLoginClick}
          className="flex items-center justify-center rounded-full bg-[#b92555] px-4 py-1 text-white transition hover:bg-[#9b2049]"
          style={isMobile ? { fontSize: '0.875rem' } : { fontSize: '0.75rem' }}
        >
          Login
        </button>
      )}
    </div>
  )
}

// 메뉴 아이템
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

MenuNavItem.displayName = 'MenuNavItem'

// 데스크탑에서 네비게이션 항목
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

// 최종적으로 네비게이션 바를 렌더링
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuthStatus = async () => {
    try {
      console.log('Checking auth status...')
      const response = await fetch('http://localhost:5001/auth/status', {
        credentials: 'include',
      })
      const data = await response.json()
      console.log('Auth status:', data) // 콘솔에 로그인 상태를 출력
      setIsLoggedIn(data.loggedIn || false) // 수정된 부분: loggedIn 필드를 사용
    } catch (error) {
      console.error('Failed to check authentication status:', error)
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    checkAuthStatus() // 페이지 로드 시 로그인 상태 확인
  }, [])

  return (
    <Disclosure as="header" className="relative">
      {({ open }) => (
        <>
          <div className="relative z-10 border-b border-gray-300/60">
            <nav className="mx-auto flex h-20 max-w-7xl items-center bg-white px-4 sm:px-6 lg:border-0 lg:px-8">
              <div className="flex w-full items-center justify-between">
                <Logo />
                <DesktopNavigation />
                <Search />
                <div className="hidden md:flex">
                  <LoginButton
                    isLoggedIn={isLoggedIn}
                    onLoginStatusChange={setIsLoggedIn}
                  />
                </div>
                <HamburgerButton open={open} />
              </div>
            </nav>
          </div>
          <MobileMenu
            isLoggedIn={isLoggedIn}
            onLoginStatusChange={setIsLoggedIn}
          />
        </>
      )}
    </Disclosure>
  )
}
