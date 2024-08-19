export default function SimpleHeader({ headline, text }) {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-xl px-5 sm:px-8 md:max-w-2xl lg:max-w-screen-xl">
        {/* Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl font-medium tracking-normal text-gray-900 md:tracking-tight lg:text-5xl lg:leading-tight">
            {headline}
          </h1>
          <p className="mt-3 text-lg text-gray-500">{text}</p>
        </div>
      </div>
    </section>
  )
}
