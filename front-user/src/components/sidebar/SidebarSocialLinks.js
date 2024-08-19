import Link from 'next/link'
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'

import socialLinks from '@/config/social.js'
import { SocialButton } from '@/components/social/SocialButton'

function SocialLink({ socialLink, index }) {
  return (
    <>
      <Link
        href={socialLink.href}
        className="group flex w-full items-center justify-between"
      >
        <div className="flex items-center">
          <div>
            <SocialButton
              name={socialLink.name}
              containerClassName="w-9 h-9"
              iconClassName="w-3.5 h-3.5"
            />
          </div>
          <div className="relative col-span-3 flex flex-col flex-wrap">
            <div className="box-border flex w-full flex-1 flex-col justify-between px-6 md:px-0">
              <div className="relative z-10 ml-3 text-base font-medium capitalize text-gray-700 transition-colors duration-300 ease-in-out group-hover:text-red-600">
                {socialLink.name}
              </div>
            </div>
          </div>
        </div>
        <div>
          <ArrowSmallRightIcon className="mx-2 h-5 w-5 text-red-400 transition duration-300 ease-in-out group-hover:translate-x-1.5 group-hover:text-red-600" />
        </div>
      </Link>

      {socialLinks.length != index && (
        <hr className="my-2.5 ml-13 w-full border-t border-dashed border-gray-300/70" />
      )}
    </>
  )
}

export default function SidebarSocialLinks() {
  return (
    <div className="w-full rounded-2xl bg-gray-50 p-5 sm:p-8">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        Follow us
      </h3>

      {/* Links */}
      <div className="pt-5">
        <div className="overflow-hidden">
          {socialLinks.map((socialLink, index) => (
            <SocialLink
              key={`sidebar-social-${socialLink.name}`}
              socialLink={socialLink}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
