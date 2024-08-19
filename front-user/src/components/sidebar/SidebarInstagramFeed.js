import Image from 'next/image'
import Link from 'next/link'

import { getInstagramFeed } from '@/libs/getInstagramFeed'
import { Instagram } from '@/components/social/SocialIcons'

function InstagramImage({ image }) {
  return (
    <div className="group relative z-0 w-full translate-y-0 transform cursor-pointer overflow-hidden rounded-2xl bg-gray-100 pt-full shadow-sm transition duration-300 ease-in-out hover:-translate-y-1">
      <Link
        href={image.href}
        className="absolute inset-0 z-10 h-full w-full rounded-2xl shadow-md"
      />
      <Image
        src={image.image}
        alt="Instagram image"
        fill
        className="h-full w-full object-cover object-center"
        sizes="(min-width: 1280px) 6rem, (min-width: 1024px) 11vw, (min-width: 768px) 12.33rem, (min-width: 640px) 9rem, 33vw"
      />
      <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br opacity-0 transition duration-300 ease-in-out group-hover:opacity-90">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <Instagram className="h-4 w-4 text-gray-600" />
        </div>
      </div>
    </div>
  )
}

export default function SidebarSocialLinks() {
  const feed = getInstagramFeed()

  return (
    <div className="w-full rounded-2xl bg-gray-50 p-5 sm:p-8">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        Instagram
      </h3>
      <div className="pt-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-4">
          {feed.map((image, index) => (
            <InstagramImage key={`instagram-feed-${index}`} image={image} />
          ))}
        </div>
      </div>
    </div>
  )
}
