import Image from 'next/image'
import { SocialButton } from '@/components/social/SocialButton'

export default function AuthorHeader({ author }) {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-xl px-6 sm:px-12 md:max-w-3xl lg:max-w-screen-xl lg:px-8">
        {/* Container */}
        <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
          {/* Author Info */}
          <div className="flex flex-col items-center md:flex-row">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="relative h-24 w-24 rounded-xl bg-gray-100">
                <Image
                  className="rounded-2xl object-cover object-center"
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="6rem"
                />
                <span
                  className="absolute inset-0 rounded-xl shadow-inner"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="mt-6 text-center md:ml-5 md:mt-0 md:text-left">
              <p className="text-xs uppercase tracking-widest text-red-700">
                {author.role}
              </p>
              <h1 className="mt-1.5 text-3xl font-medium tracking-normal text-gray-900 sm:text-4xl md:tracking-tight lg:leading-tight">
                {author.name}
              </h1>
            </div>
          </div>

          {/* Author Social Links */}
          <div className="mt-6 md:mt-0">
            {/* Links */}
            <ul className="flex items-center space-x-3">
              {author.social_links.map((socialLink) => (
                <li key={socialLink.name}>
                  <SocialButton
                    href={socialLink.url}
                    name={socialLink.name}
                    containerClassName="sm:w-12 sm:h-12"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
