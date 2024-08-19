import Link from 'next/link'
import Image from 'next/image'
import { allAuthors } from 'contentlayer/generated'
import { SocialButton } from '@/components/social/SocialButton'

export default function Team() {
  return (
    <section className="bg-gray-50 py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-xl px-4 sm:max-w-3xl sm:px-6 md:px-8 lg:max-w-screen-xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-medium uppercase tracking-widest text-red-600">
            Our Writers
          </h2>
          <h3 className="mt-2 text-3xl font-medium tracking-normal text-gray-900 sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
            We are a passionate team that values great journalism
          </h3>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        {/* Team */}
        <div className="mx-auto mt-12 max-w-screen-xl sm:mt-16">
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {allAuthors.map((author) => (
              <li
                className="relative rounded-3xl border border-gray-300/70 bg-transparent px-6 py-10 text-center transition duration-300 ease-in-out hover:border-gray-300/30 hover:shadow-lg sm:px-10"
                key={author.name}
              >
                <div>
                  <div className="relative mx-auto h-40 w-40 rounded-full bg-gray-100 xl:h-44 xl:w-44">
                    <Image
                      className="rounded-full object-cover"
                      src={author.avatar}
                      alt={author.name}
                      fill
                      sizes="(min-width: 1280px) 11rem, 10rem"
                    />
                  </div>
                  <div className="mt-6 leading-6">
                    <h3 className="text-xl font-medium text-gray-900">
                      <Link href={author.url}>
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                        {author.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-base text-red-600">{author.role}</p>
                  </div>

                  {/* Social Links */}
                  <ul className="mt-6 flex items-center justify-center space-x-3">
                    {author.social_links.map((socialLink) => (
                      <li key={socialLink.name}>
                        <SocialButton
                          type="link"
                          href={socialLink.url}
                          name={socialLink.name}
                          iconClassName="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-600"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
