'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment, forwardRef, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import axios from '../../libs/axios'

// 모달 컴포넌트 추가
import Modal from '../ui/modal'

// 로고 이미지를 가져오기
import logo from '/public/images/the_chungbuk_times.png'
import logoIcon from '/public/images/cbnu_logo_edit.png'

// 네비게이션 메뉴 항목 정의
const menu = [
  {
    name: 'Campus',
    href: '/tags/campus',
  },
  {
    name: 'News',
    subMenu: [
      { name: 'Society', href: '/tags/society' },
      { name: 'Global', href: '/tags/global' },
      { name: 'Feature', href: '/tags/feature' },
    ],
  },
  {
    name: 'Culture',
    subMenu: [
      { name: 'Culture', href: '/tags/culture' },
      { name: 'Experience', href: '/tags/experience' },
      { name: 'People', href: '/tags/people' },
    ],
  },
  {
    name: 'Column',
    href: '/tags/column',
  },
  {
    name: 'Photo',
    href: '/tags/photo',
  },
  {
    name: 'Chatbot',
    href: '/chatbot', // 기본 링크
  },
]

// 로고 렌더링 컴포넌트
function Logo() {
  return (
    <div className="flex shrink-0 items-center">
      <Link href="/" className="h-9 lg:hidden">
        <Image
          src={logoIcon}
          alt="CBNU Icon"
          style={{ height: '40px', width: 'auto' }}
        />
      </Link>
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

// 드롭다운 메뉴 컴포넌트
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

// 데스크탑 네비게이션 컴포넌트
function DesktopNavigation({ isLoggedIn, openLoginModal }) {
  const [googleId, setGoogleId] = useState(null)

  useEffect(() => {
    // 로컬 스토리지에서 googleId 가져오기
    const storedGoogleId = localStorage.getItem('googleId')
    setGoogleId(storedGoogleId)
  }, [])

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
          <DesktopNavItem
            key={`desktop-link-${index}`}
            link={link}
            googleId={googleId} // googleId를 DesktopNavItem에 전달
            isLoggedIn={isLoggedIn}
            openLoginModal={openLoginModal}
          />
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

// 모바일 메뉴 컴포넌트
function MobileMenu({ isLoggedIn, onLoginStatusChange, openLoginModal }) {
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
                      isLoggedIn={isLoggedIn}
                      openLoginModal={openLoginModal}
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

// 검색창 컴포넌트
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

// 로그인 버튼 컴포넌트
function LoginButton({ isMobile = false, isLoggedIn, onLoginStatusChange }) {
  const handleLoginClick = () => {
    window.location.href = 'http://localhost:5001/auth/google' // 구글 OAuth 로그인 시작
  }

  // 로그아웃 요청
  const handleLogoutClick = async () => {
    try {
      // 로그아웃 요청을 보내고 상태를 업데이트
      await axios.post(
        'http://localhost:5001/auth/logout',
        {},
        {
          withCredentials: true, // 쿠키를 포함한 요청 전송
        },
      )
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('googleId')
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

// 메뉴 아이템 컴포넌트
const MenuNavItem = forwardRef(
  (
    {
      link,
      className = 'px-4 py-3',
      activeTextColorClassName = 'text-gray-800',
      close,
      googleId, // googleId를 MenuNavItem에 전달
      isLoggedIn,
      openLoginModal, // 모달 열기 함수 전달
    },
    ref,
  ) => {
    let isActive = usePathname() === link.href
    let href = link.href

    // 'Chatbot' 링크 처리
    const handleChatbotClick = (e) => {
      if (!isLoggedIn && link.name === 'Chatbot') {
        e.preventDefault() // 로그인이 안 된 경우, 기본 링크 이동 방지
        openLoginModal() // 모달 창 열기
      }
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={clsx(
          'block rounded-lg font-medium',
          className,
          isActive
            ? 'bg-gray-50 text-red-700'
            : `${activeTextColorClassName} transition duration-300 ease-in-out hover:bg-gray-50 hover:text-red-700`,
        )}
        onClick={(e) => {
          handleChatbotClick(e) // Chatbot 버튼 클릭 처리
          close && close() // 메뉴 닫기 (모바일용)
        }}
      >
        {link.name}
      </Link>
    )
  },
)

MenuNavItem.displayName = 'MenuNavItem'

// 데스크탑 네비게이션 항목 컴포넌트
function DesktopNavItem({ link, googleId, isLoggedIn, openLoginModal }) {
  let isActive = usePathname() === link.href
  let href = link.href
  if (link.name === 'Chatbot' && googleId) {
    href = `/chatbot/${googleId}` // 'Chatbot' 링크에 googleId 추가
  }

  // 'Chatbot' 클릭 시 처리
  const handleChatbotClick = (e) => {
    if (!isLoggedIn && link.name === 'Chatbot') {
      e.preventDefault() // 로그인이 안 된 경우, 기본 링크 이동 방지
      openLoginModal() // 모달 창 열기
    }
  }

  return (
    <Link
      href={href}
      className={clsx(
        'px-3 py-1 text-md font-medium',
        isActive
          ? 'text-red-700'
          : 'text-gray-800 transition duration-300 ease-in-out hover:text-red-700',
      )}
      onClick={handleChatbotClick} // Chatbot 클릭 처리
    >
      {link.name}
    </Link>
  )
}

// 최종적으로 네비게이션 바를 렌더링
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get('accessToken')
    const refreshToken = urlParams.get('refreshToken')
    const googleId = urlParams.get('googleId')

    if (accessToken && refreshToken && googleId) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('googleId', googleId)

      // URL에서 토큰을 제거하여 깨끗한 URL 유지
      window.history.replaceState({}, document.title, '/')
    }

    checkAuthStatus() // 페이지 로드 시 로그인 상태 확인
  }, [])

  const checkAuthStatus = async () => {
    const accessToken = localStorage.getItem('accessToken')

    try {
      const response = await axios.get('http://localhost:5001/auth/status', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 Authorization 헤더에 포함
        },
        withCredentials: true, // 쿠키를 포함한 요청 전송
      })
      setIsLoggedIn(response.data.loggedIn || false) // 로그인 상태 업데이트
    } catch (error) {
      console.error('Failed to check authentication status:', error)
      setIsLoggedIn(false) // 오류 발생 시 로그인 상태를 false로 설정
    }
  }

  const openLoginModal = () => {
    setIsModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Disclosure as="header" className="relative">
      {({ open }) => (
        <>
          <div className="relative z-10 border-b border-gray-300/60">
            <nav className="mx-auto flex h-20 max-w-7xl items-center bg-white px-4 sm:px-6 lg:border-0 lg:px-8">
              <div className="flex w-full items-center justify-between">
                <Logo />
                <DesktopNavigation isLoggedIn={isLoggedIn} openLoginModal={openLoginModal} />
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
            openLoginModal={openLoginModal}
          />
          {/* 로그인 모달 */}
          <Modal isOpen={isModalOpen} closeModal={closeLoginModal} title="Login Required">
            <p className="text-gray-700">You need to log in to access this feature.</p>
            <div className="mt-4">
              <button
                onClick={() => window.location.href = 'http://localhost:5001/auth/google'}
                className="w-full rounded-full bg-[#b92555] px-4 py-2 text-white transition hover:bg-[#9b2049]"
              >
                Proceed to Login
              </button>
            </div>
          </Modal>
        </>
      )}
    </Disclosure>
  )
}
