import { MdxContent } from '@/components/mdx/MdxContent'

export default function SidebarAuthorBio({ author }) {
  return (
    <div className="w-full rounded-2xl bg-gray-50 p-5 sm:p-8">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        About the author
      </h3>
      <div className="pt-6">
        <div className="text-base leading-loose text-gray-700">
          <MdxContent code={author.body.code} />
        </div>
      </div>
    </div>
  )
}
