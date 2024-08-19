const locations = [
  {
    streetAddress: '88 Kings Road',
    city: 'London',
    postalCode: 'WC59 3BW',
  },
  {
    streetAddress: '4303 Massachusetts Avenue',
    city: 'Washington',
    state: 'DC',
    postalCode: '20024',
  },
  {
    streetAddress: '4974 Duck Creek Road',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94108',
  },
  {
    streetAddress: '3345 Bell Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10003',
  },
]

export default function ContactLocations() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 md:max-w-2xl lg:max-w-none lg:px-0 lg:pr-48">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        Our locations
      </h3>

      {/* Container */}
      <div className="relative mt-10">
        <div className="grid gap-12 sm:grid-cols-2">
          {locations.map((location) => (
            <div key={location.city}>
              <h3 className="text-lg font-medium leading-6 text-gray-900 ">{`${
                location.state == 'DC' ? location.city + ' DC' : location.city
              }`}</h3>
              <div className="mt-2 space-y-1 text-md">
                <p className="text-gray-500">{location.streetAddress}</p>
                <p className="text-gray-500">
                  {`${location.city}, ${location.state ?? ''} ${
                    location.postalCode
                  }`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
