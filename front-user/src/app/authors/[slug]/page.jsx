import { allAuthors, allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import AuthorHeader from '@/components/headers/AuthorHeader'
import SingleColFeed from '@/components/shared/SingleColFeed'
import SidebarArticles from '@/components/sidebar/SidebarArticles'
import SidebarSocialLinks from '@/components/sidebar/SidebarSocialLinks'
import SidebarAd from '@/components/sidebar/SidebarAd'
import SidebarAuthorBio from '@/components/sidebar/SidebarAuthorBio'
import Pagination from '@/components/shared/Pagination'
import Newsletter from '@/components/shared/Newsletter'

export const generateStaticParams = async () =>
  allAuthors.map((author) => ({ slug: author.slug }))

export async function generateMetadata({ params }) {
  const author = allAuthors.find((author) => author.slug === params.slug)
  return {
    title: `Showing articles by ${author.name}`,
  }
}

export default async function AuthorPage({ params }) {
  const author = await allAuthors.find((author) => author.slug === params.slug)
  const articles = await allArticles
    .filter((article) => article.author.slug === author.slug)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const popularArticles = Array.from(articles).sort((a, b) => b.views - a.views)

  return (
    <>
      <AuthorHeader author={author} />

      {/* Feed with Sidebar */}
      <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="col-span-2">
            {/* Articles */}
            <div className="mb-6 border-b-2 border-gray-100 pb-8 sm:mb-10 sm:pb-10">
              <SingleColFeed articles={articles.slice(0, 7)} />
            </div>

            <Pagination />
          </div>

          {/* Sidebar */}
          <div className="mt-12 w-full space-y-8 sm:mt-16 lg:col-span-1 lg:mt-0">
            <SidebarAuthorBio author={author} />
            <SidebarArticles
              articles={popularArticles.slice(0, 4)}
              heading="Most read articles"
            />
            <SidebarSocialLinks />
            <SidebarAd />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}

export const dynamicParams = false
