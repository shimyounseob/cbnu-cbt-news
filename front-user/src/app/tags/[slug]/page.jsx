import { allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import clsx from 'clsx'

import TopicHeader from '@/components/headers/TopicHeader'
import SingleColFeed from '@/components/shared/SingleColFeed'
import SidebarArticles from '@/components/sidebar/SidebarArticles'
import SidebarSocialLinks from '@/components/sidebar/SidebarSocialLinks'
import SidebarAd from '@/components/sidebar/SidebarAd'
import Pagination from '@/components/shared/Pagination'
import Newsletter from '@/components/shared/Newsletter'
import { getTags } from '@/libs/getTags'

export const generateStaticParams = async () =>
  getTags().map((tag) => ({ slug: tag.replace(/ /g, '-').toLowerCase() }))

export async function generateMetadata({ params }) {
  // Replace dashes with spaces and capitalize each word
  const tag = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
  return {
    title: `Showing articles in ${tag}`,
  }
}

export default async function TagPage({ params }) {
  const tag = getTags().find(
    (tag) => tag.replace(/ /g, '-').toLowerCase() === params.slug,
  )
  const articles = await allArticles
    .filter((article) => article.tags.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const popularArticles = Array.from(articles).sort((a, b) => b.views - a.views)

  return (
    <>
      <TopicHeader item={tag} type="tag" />

      {/* Feed with Sidebar */}
      <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="col-span-2">
            {/* Articles */}
            <div
              className={clsx({
                'mb-6 border-b-2 border-gray-100 pb-8 sm:mb-10 sm:pb-10':
                  articles.length > 7,
              })}
            >
              <SingleColFeed articles={articles.slice(0, 7)} />
            </div>

            {articles.length > 7 && <Pagination />}
          </div>

          {/* Sidebar */}
          <div className="mt-12 w-full space-y-8 sm:mt-16 lg:col-span-1 lg:mt-0">
            <SidebarSocialLinks />
            <SidebarArticles
              articles={popularArticles.slice(0, 4)}
              heading="Most read articles"
            />
            <SidebarAd />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}

export const dynamicParams = false
