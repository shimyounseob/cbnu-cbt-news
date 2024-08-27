"use client";

import Image from 'next/image'
import paperAirplane from '/public/images/paper-airplane.png'

export default function Newsletter() {
  return (
    <section className="bg-gray-50 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="relative h-auto w-24 animate-orbit">
            <Image
              src={paperAirplane}
              alt="Newsletter"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

          <h2 className="mt-6 text-3xl font-medium tracking-normal text-gray-900 sm:mt-8 sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
            The Chungbuk Times is actively seeking to recruit new reporters
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            We share the most relevant news in CBNU Campus Social issue and Culture.
            Please submit your application using the form below.
          </p>

          <button
            type="button"
            className='mt-8 inline-flex h-11 items-center bg-[#b42258] px-6 py-2 text-tiny uppercase tracking-widest text-white rounded-3xl outline-none transition duration-300 ease-in-out hover:bg-[#d9296a] focus:outline-none sm:font-medium'
            onClick={() => window.location.href='https://docs.google.com/forms/d/e/1FAIpQLScCzhVHAUkdd4v-5KrDULZTKqPczbADowP7psE3ksqE0uGxLg/viewform'}
          >
            Apply
          </button>

          {/* <p className="mt-4 text-center text-sm text-gray-500">
            Your privacy is important to us. We promise not to send you spam!
          </p> */}
        </div>
      </div>
    </section>
  )
}