'use client'

import Link from 'next/link' // Next.js의 Link 컴포넌트를 사용하여 페이지 간 링크를 관리합니다.
import Image from 'next/image' // 최적화된 이미지 로딩을 위해 Next.js의 Image 컴포넌트를 사용합니다.
import { usePathname } from 'next/navigation' // 현재 경로를 가져오기 위해 usePathname 훅을 사용합니다.
import { Fragment, forwardRef } from 'react' // React의 Fragment와 forwardRef를 사용합니다.
import { Disclosure, Menu, Transition } from '@headlessui/react' // Headless UI의 Disclosure, Menu, Transition을 사용하여 네비게이션 메뉴를 구현합니다.
import clsx from 'clsx' // 여러 클래스를 조건부로 결합하기 위해 clsx를 사용합니다.
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid' // 아이콘을 사용하기 위해 heroicons 라이브러리를 사용합니다.

// 로고 이미지를 가져오기 위한 경로입니다.
import logo from '/public/images/the_chungbuk_times.png'
import logoIcon from '/public/images/cbnu_logo_edit.png'

// 네비게이션 메뉴 항목을 정의합니다.
const menu = [
  {
    name: 'Campus', // 단독 메뉴 항목
    href: '/tags/campus', // 해당 항목에 대한 링크
  },
  {
    name: 'News', // 메뉴 항목 이름
    subMenu: [ // 드롭다운 메뉴 항목
      { name: 'Society', href: '/tags/society' },
      { name: 'Global', href: '/tags/global' },
      { name: 'Feature', href: '/tags/feature' },
    ],
  },
  {
    name: 'Culture', // 메뉴 항목 이름
    subMenu: [ // 드롭다운 메뉴 항목
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

// 로고를 렌더링하는 컴포넌트입니다.
function Logo() {
  return (
    <div className="flex shrink-0 items-center">
      {/* 모바일 화면에서는 작은 로고 아이콘을 보여줍니다. */}
      <Link href="/" className="h-9 lg:hidden">
        <Image 
          src={logoIcon} 
          alt="CBNU Icon" 
          style={{ height: '40px', width: 'auto' }} // 인라인 스타일로 높이와 너비를 설정합니다.
        />
      </Link>
      {/* 데스크탑 화면에서는 큰 로고를 보여줍니다. */}
      <Link href="/" className="hidden h-9 lg:block">
        <Image 
          src={logo} 
          alt="the chungbuk times logo" 
          width={500} // 로고의 너비를 설정합니다.
          height={50} // 로고의 높이를 설정합니다.
          style={{ height: '40px', width: 'auto' }} // 인라인 스타일로 높이와 너비를 설정합니다.
        />
      </Link>
    </div>
  )
}

// 드롭다운 메뉴를 렌더링하는 컴포넌트입니다.
function Dropdown({ name, subMenu }) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          {/* 드롭다운 버튼 */}
          <Menu.Button
            className={clsx(
              'group flex items-center px-3 py-1 text-md font-medium outline-none focus:outline-none',
              open
                ? 'text-red-700'
                : 'text-gray-800 transition duration-300 ease-in-out hover:text-red-700',
            )}
          >
            <span>{name}</span> {/* 드롭다운 메뉴 이름 */}
            <ChevronDownIcon
              className={clsx(
                'ml-2 h-5 w-5 transform duration-300',
                open
                  ? 'rotate-180 text-red-700' // 메뉴가 열렸을 때 아이콘을 회전시킵니다.
                  : 'text-gray-600 group-hover:text-red-700',
              )}
              aria-hidden="true"
            />
          </Menu.Button>

          {/* 드롭다운 메뉴 아이템들 */}
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

// 데스크탑 네비게이션을 렌더링하는 컴포넌트입니다.
function DesktopNavigation() {
  return (
    <div className="ml-6 hidden items-center justify-between text-xl md:flex md:space-x-0.5 md:text-base lg:space-x-2">
      {menu.map((link, index) => (
        link.subMenu ? ( // 드롭다운 메뉴가 있는 경우
          <Dropdown key={`desktop-link-${index}`} name={link.name} subMenu={link.subMenu} />
        ) : (
          <DesktopNavItem key={`desktop-link-${index}`} link={link} />
        )
      ))}
    </div>
  )
}

// 햄버거 메뉴 버튼을 렌더링하는 컴포넌트입니다. (모바일에서 사용)
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

// 모바일 메뉴를 렌더링하는 컴포넌트입니다.
function MobileMenu() {
  console.log("MobileMenu component rendered");

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
        {({ close }) => {
          console.log("Disclosure.Panel rendered");

          return (
            <nav
              className="border-b border-gray-300/60 bg-white md:hidden"
              aria-label="Global"
              id="mobile-menu"
            >
              <div className="space-y-1 px-2 pb-3 pt-2">
                {menu.map((link, index) => {
                  if (link.subMenu) {
                    // subMenu가 있는 항목을 그대로 표시
                    return link.subMenu.map((subLink, subIndex) => (
                      <MenuNavItem
                        link={subLink}
                        key={`mobile-submenu-link-${subIndex}`}
                        close={close}
                      />
                    ));
                  } else {
                    // subMenu가 없는 단일 항목에 대한 처리
                    console.log(`Rendering menu item: ${link.name}, href: ${link.href}, index: ${index}`);
                    return (
                      <MenuNavItem
                        link={link}
                        key={`mobile-menu-link-${index}`}
                        close={close}
                      />
                    );
                  }
                })}
              </div>
            </nav>
          );
        }}
      </Disclosure.Panel>
    </Transition>
  );
}

// 검색창을 렌더링하는 컴포넌트입니다.
function Search() {
  return (
    <div className="relative ml-6 h-10 w-full max-w-xxs rounded-3xl">
      <form className="group rounded-3xl transition duration-300 ease-in-out">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="h-10 w-full rounded-3xl border border-gray-200 bg-white px-10 py-3 text-sm leading-5 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
          placeholder="Search..."
        />
      </form>
    </div>
  )
}

// 메뉴 아이템을 렌더링하는 컴포넌트입니다.
const MenuNavItem = forwardRef(
  (
    {
      link, // 링크 정보
      className = 'px-4 py-3', // 기본 클래스
      activeTextColorClassName = 'text-gray-800', // 활성화된 링크의 텍스트 색상
      close, // 모바일 메뉴에서 링크 클릭 시 메뉴를 닫기 위한 함수
    },
    ref,
  ) => {
    let isActive = usePathname() === link.href // 현재 경로와 링크의 경로를 비교하여 활성 상태를 확인합니다.

    return (
      <Link
        ref={ref}
        href={link.href}
        className={clsx(
          'block rounded-lg font-medium',
          className,
          isActive
            ? 'bg-gray-50 text-red-700' // 활성화된 링크 스타일
            : `${activeTextColorClassName} transition duration-300 ease-in-out hover:bg-gray-50 hover:text-red-700`,
        )}
        onClick={close} // 모바일 메뉴에서 링크를 클릭하면 메뉴를 닫습니다.
      >
        {link.name}
      </Link>
    )
  },
)

MenuNavItem.displayName = 'MenuNavItem' // forwardRef 컴포넌트의 이름 설정

// 데스크탑에서 네비게이션 항목을 렌더링하는 컴포넌트입니다.
function DesktopNavItem({ link }) {
  let isActive = usePathname() === link.href // 현재 경로와 링크의 경로를 비교하여 활성 상태를 확인합니다.

  return (
    <Link
      href={link.href}
      className={clsx(
        'px-3 py-1 text-md font-medium',
        isActive
          ? 'text-red-700' // 활성화된 링크 스타일
          : 'text-gray-800 transition duration-300 ease-in-out hover:text-red-700',
      )}
    >
      {link.name}
    </Link>
  )
}

// 최종적으로 네비게이션 바를 렌더링하는 Navbar 컴포넌트입니다.
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

                <DesktopNavigation /> {/* 데스크탑 네비게이션 */}
                <Search /> {/* 검색창 */}

                <HamburgerButton open={open} /> {/* 모바일용 햄버거 버튼 */}
              </div>
            </nav>
          </div>

          <MobileMenu /> {/* 모바일 메뉴 */}
        </>
      )}
    </Disclosure>
  )
}
