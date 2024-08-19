import Link from 'next/link'
import { getTags } from '@/libs/getTags'

function Tag({ tag }) {
  const tagPath = `/tags/${tag.replace(/ /g, '-').toLowerCase()}`

  return (
    <li>
      <Link href={tagPath}>
        <span className="m-1 inline-flex items-center rounded-full border border-gray-300/70 bg-transparent px-4 py-1 text-sm font-medium text-gray-800 transition duration-300 ease-in-out hover:text-red-700 sm:px-4 sm:py-1.5">
          {tag}
        </span>
      </Link>
    </li>
  )
}

export default function SidebarTags() {
  const tags = getTags().slice(0, 10)

  return (
    <div className="w-full rounded-2xl bg-gray-50 p-5 sm:p-8">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        Popular tags
      </h3>

      {/* Tags */}
      <div className="pt-5">
        <ul className="-m-1 flex flex-wrap justify-start">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </ul>
      </div>
    </div>
  )
}
