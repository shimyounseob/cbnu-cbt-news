import Link from 'next/link'
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'

const locations = [
  {
    name: 'London',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque iste dolor.',
    icon: function LondonIcon({ className }) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={32}
          width={32}
          viewBox="0 0 32 32"
          className={className}
        >
          <g
            strokeLinecap="square"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
            strokeLinejoin="miter"
            className="nc-icon-wrapper"
            strokeMiterlimit={10}
          >
            <polyline
              data-cap="butt"
              points="11,6 7,2 7,2 3,6 "
              strokeLinecap="butt"
            />{' '}
            <line x1={18} y1={21} x2={18} y2={31} />{' '}
            <line x1={25} y1={21} x2={25} y2={31} />{' '}
            <rect x={2} y={18} width={10} height={13} />{' '}
            <polyline points="12,23 31,23 31,31 12,31 " />{' '}
            <rect x={1} y={6} width={12} height={12} />{' '}
            <circle cx={7} cy={12} r={3} />{' '}
            <line x1={31} y1={23} x2={31} y2={21} />{' '}
            <line x1={1} y1={6} x2={1} y2={4} />{' '}
            <line x1={13} y1={6} x2={13} y2={4} />{' '}
            <line x1={7} y1={27} x2={7} y2={22} />
          </g>
        </svg>
      )
    },
  },
  {
    name: 'New York',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque iste dolor.',
    icon: function NewYorkIcon({ className }) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={32}
          width={32}
          viewBox="0 0 32 32"
          className={className}
        >
          <g
            strokeLinecap="square"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
            strokeLinejoin="miter"
            className="nc-icon-wrapper"
            strokeMiterlimit={10}
          >
            <polyline points=" 9,31 4,31 4,13 9,13 " />{' '}
            <polyline points=" 23,31 28,31 28,13 23,13 " />{' '}
            <line x1={14} y1={12} x2={18} y2={12} />{' '}
            <line x1={14} y1={16} x2={18} y2={16} />{' '}
            <line x1={14} y1={20} x2={18} y2={20} />{' '}
            <line x1={14} y1={24} x2={18} y2={24} />{' '}
            <line x1={16} y1={31} x2={16} y2={28} />{' '}
            <line x1={16} y1={3} x2={16} y2={1} />{' '}
            <path
              data-cap="butt"
              d="M20,8.3V7c0-1.1-0.4-2.1-1.2-2.8 C18.1,3.4,17.1,3,16,3c-2.2,0-4,1.8-4,4v1.3"
              strokeLinecap="butt"
            />{' '}
            <path d="M16,7L16,7 c-3.9,0-7,3.1-7,7v17h14V14C23,10.1,19.9,7,16,7z" />
          </g>
        </svg>
      )
    },
  },
  {
    name: 'San Francisco',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque iste dolor.',
    icon: function SanFranciscoIcon({ className }) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={32}
          width={32}
          viewBox="0 0 32 32"
          className={className}
        >
          <g
            strokeLinecap="square"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
            strokeLinejoin="miter"
            className="nc-icon-wrapper"
            strokeMiterlimit={10}
          >
            <path
              data-cap="butt"
              d="M1.5,27c0,2.2,1.8,4,4,4 C7,31,8.3,30.1,9,28.9c0.7,1.2,2,2.1,3.5,2.1c1.5,0,2.8-0.9,3.5-2.1c0.7,1.2,2,2.1,3.5,2.1c1.5,0,2.8-0.9,3.5-2.1 c0.7,1.2,2,2.1,3.5,2.1c2.2,0,4-1.8,4-4"
              strokeLinecap="butt"
              stroke="currentColor"
            />
            {'{'}" "{'}'}
            <line
              data-cap="butt"
              x1={16}
              y1={21}
              x2={16}
              y2={13}
              strokeLinecap="butt"
            />
            {'{'}" "{'}'}
            <line
              data-cap="butt"
              x1={11}
              y1={21}
              x2={11}
              y2={12}
              strokeLinecap="butt"
            />
            {'{'}" "{'}'}
            <line
              data-cap="butt"
              x1={21}
              y1={21}
              x2={21}
              y2={12}
              strokeLinecap="butt"
            />
            {'{'}" "{'}'}
            <polyline points="5,23 5,1 1,1 1,23 " />
            {'{'}" "{'}'}
            <polyline points="31,23 31,1 27,1 27,23 " />
            {'{'}" "{'}'}
            <line x1={5} y1={21} x2={27} y2={21} />
            {'{'}" "{'}'}
            <path d="M5,2c0,6.1,4.9,11,11,11 c6.1,0,11-4.9,11-11" />
          </g>
        </svg>
      )
    },
  },
]

export default function Careers() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-xl gap-12 px-5 sm:max-w-3xl sm:px-6 md:px-8 lg:max-w-screen-xl lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div>
          <h2 className="max-w-lg text-3xl font-medium tracking-normal text-gray-900 sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
            Join the best team in journalism
          </h2>
          <div className="mx-auto mt-6 text-lg leading-8 text-gray-500">
            <p>
              Quam venenatis gravida et urna molestie leo adipiscing dolore leo
              euismod quam. Aenean porta curabitur convallis pellentesque velit
              platea at neque phasellus. Aliquet pellentesque senectus velit
              magna ultrices iaculis justo habitasse vitae neque ornare nullam
              leo.
            </p>
            <Link
              href="#0"
              className="group mt-4 inline-flex items-center text-red-600 no-underline transition duration-300 ease-in-out hover:text-red-700 sm:mt-5"
            >
              Join our team
              <ArrowSmallRightIcon className="ml-2 h-5 w-5 transition duration-300 ease-in-out group-hover:translate-x-1.5 group-hover:text-red-700" />
            </Link>
          </div>
        </div>

        {/* Locations */}
        <div className="flex flex-col justify-center">
          <ul className="space-y-12 lg:space-y-14">
            {locations.map((location) => (
              <li key={location.name} className="flex">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-600 sm:h-16 sm:w-16">
                  <location.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <div className="ml-3.5 w-full sm:ml-6">
                  <p className="text-lg font-medium leading-6 text-gray-900">
                    {location.name}
                  </p>
                  <p className="mt-2 text-base text-gray-500">
                    {location.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
