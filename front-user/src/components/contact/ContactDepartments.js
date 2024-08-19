const departments = [
  {
    title: 'Advertise',
    contactName: 'Emily Bell',
    emailAddress: 'advertise@email.com',
    phoneNumber: '+1 (800) 123-4567',
  },
  {
    title: 'Press',
    contactName: 'Jorge Moreno',
    emailAddress: 'press@email.com',
    phoneNumber: '+1 (800) 123-4567',
  },
  {
    title: 'Careers',
    contactName: 'Brandon Marshal',
    emailAddress: 'careers@email.com',
    phoneNumber: '+1 (800) 123-4567',
  },
  {
    title: 'Reuse Permissions',
    contactName: 'Crystal Anderson',
    emailAddress: 'reprint@email.com',
    phoneNumber: '+1 (800) 123-4567',
  },
  {
    title: 'Letters to the Editor',
    contactName: 'Jack Gates',
    emailAddress: 'editors@email.com',
    phoneNumber: '+1 (800) 123-4567',
  },
  {
    title: 'Pitches',
    contactName: 'Henry Cejudo',
    emailAddress: 'pitches@email.com',
    phoneNumber: '+1 (800) 123-4567',
  },
]

export default function ContactDepartments() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 md:max-w-2xl lg:max-w-none lg:px-0 lg:pr-24 xl:pr-48">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        Get in touch
      </h3>
      <div className="relative mt-10">
        {/* Contact Channels */}
        <div className="grid gap-12 sm:grid-cols-2">
          {departments.map((department) => (
            <div key={department.title}>
              <h3 className="text-lg font-medium leading-6 text-gray-900 ">
                {department.title}
              </h3>
              <div className="mt-2 space-y-1 text-md">
                <p className="text-gray-500">{department.contactName}</p>
                <a
                  href={`mailto:${department.emailAddress}`}
                  className="text-red-700 transition duration-300 ease-in-out hover:text-red-800"
                >
                  {department.emailAddress}
                </a>
                <p className="text-gray-500">{department.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>

        {/* General contact email */}
        <div className="prose mt-10 text-md text-gray-500 prose-a:text-gray-800 prose-a:transition prose-a:duration-300 prose-a:ease-in-out hover:prose-a:text-red-700 sm:mt-12">
          If your reason for contacting us does not fall in any of the above
          categories, you can email us at{' '}
          <a href="contact@email.com">contact@email.com</a>.
        </div>
      </div>
    </div>
  )
}
