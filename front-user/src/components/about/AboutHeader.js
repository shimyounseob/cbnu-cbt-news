import Image from 'next/image'
import teamImage from '/public/images/about/about-header.jpeg'

export default function AboutHeader() {
  return (
    <section className="relative bg-gray-900/80 bg-cover bg-center py-16 sm:py-24 lg:py-36">
      {/* Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          className="h-full w-full object-cover"
          src={teamImage}
          alt="Banter team"
          fill
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gray-800/80 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-xl px-5 sm:px-12 md:max-w-3xl lg:max-w-screen-xl lg:px-8">
        <div className="flex w-full items-center justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest text-red-300">
              About Banter
            </p>
            <h1 className="mt-3 text-3xl font-medium tracking-normal text-white sm:mt-4 sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
              Illuminating today's stories on culture, business, and science
              through great journalism.
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
