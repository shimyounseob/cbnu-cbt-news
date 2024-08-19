import Link from 'next/link'
import Image from 'next/image'
import adPortrait from '/public/images/ads/fashion-ad-portrait.png'
import adLandscape from '/public/images/ads/fashion-ad-landscape.png'

export default function SidebarAd() {
  return (
    <div>
      {/* Portrait Ad */}
      <Link
        href="#"
        className="relative hidden w-full rounded-2xl bg-gray-50 lg:aspect-h-16 lg:aspect-w-9 lg:block"
      >
        <Image
          className="hidden h-full w-full rounded-2xl object-cover lg:block"
          src={adPortrait}
          alt="Fashion ad portrait"
          fill
          sizes="(min-width: 1024px) 33vw, 0"
        />
      </Link>

      {/* Landscape Ad */}
      <Link
        href="#"
        className="relative w-full rounded-2xl bg-gray-50 lg:hidden"
      >
        <Image
          className="h-auto w-full rounded-2xl"
          src={adLandscape}
          alt="Fashion landscape ad"
          width={960}
          height={540}
          sizes="(min-width: 1024px) 0, (min-width: 768px) 42rem, (min-width: 640px) 30rem, calc(100vw - 2rem)"
        />
      </Link>
    </div>
  )
}
