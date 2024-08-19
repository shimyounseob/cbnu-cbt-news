import { allCategories, allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import TopicHeader from '@/components/headers/TopicHeader'
import SingleColFeed from '@/components/shared/SingleColFeed'
import SidebarArticles from '@/components/sidebar/SidebarArticles'
import SidebarSocialLinks from '@/components/sidebar/SidebarSocialLinks'
import SidebarAd from '@/components/sidebar/SidebarAd'
import BannerArticle from '@/components/shared/BannerArticle'
import Pagination from '@/components/shared/Pagination'
import Newsletter from '@/components/shared/Newsletter'

export const generateStaticParams = async () =>
  allCategories.map((category) => ({ slug: category.slug }))

export async function generateMetadata({ params }) {
  const category = allCategories.find(
    (category) => category.slug === params.slug,
  )
  return {
    title: `Showing articles in ${category.name}`,
  }
}

export default async function CategoryPage({ params }) {
  const category = await allCategories.find(
    (category) => category.slug === params.slug,
  )
  const articles = await allArticles
    .filter((article) => article.category.slug === category.slug)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const popularArticles = Array.from(articles).sort((a, b) => b.views - a.views)
  return (
    <>
      <TopicHeader item={category} type="category" />

      {/* Feed with Sidebar */}
      <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="col-span-2">
            <SingleColFeed articles={articles.slice(0, 6)} />
          </div>

          {/* Sidebar */}
          <div className="mt-12 w-full space-y-8 sm:mt-16 lg:col-span-1 lg:mt-0">
            <SidebarArticles
              articles={popularArticles.slice(0, 4)}
              heading={`Most read in ${category.name}`}
            />
            <SidebarSocialLinks />
            <SidebarAd />
          </div>
        </div>
      </section>

      {articles.length >= 8 && (
        <>
          <BannerArticle article={articles[6]} />

          <section className="relative mx-auto max-w-xl px-5 py-12 sm:py-16 md:max-w-3xl lg:max-w-4xl lg:px-8 lg:py-24">
            {/* Articles */}
            <div className="mb-6 border-b-2 border-gray-100 pb-8 sm:mb-10 sm:pb-10">
              <SingleColFeed articles={articles.slice(7, 13)} />
            </div>

            <Pagination />
          </section>
        </>
      )}

      <Newsletter />
    </>
  )
}

export const dynamicParams = false
