import ArticlesAboveTheFold from '@/components/home/ArticlesAboveTheFold'
import Topics from '@/components/home/Topics'
import TwoColFeed from '@/components/home/TwoColFeed'
import SidebarArticles from '@/components/sidebar/SidebarArticles'
import SidebarMostread from '@/components/sidebar/SidebarMostread'
import SidebarTags from '@/components/home/SidebarTags'
import SidebarSocialLinks from '@/components/sidebar/SidebarSocialLinks'
import SidebarInstagramFeed from '@/components/sidebar/SidebarInstagramFeed'
import BannerArticle from '@/components/shared/BannerArticle'
import SingleColFeed from '@/components/shared/SingleColFeed'
import SidebarAd from '@/components/sidebar/SidebarAd'
import Newsletter from '@/components/shared/Newsletter'

import { allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export const metadata = {
  description:
    'Chungbuk National University Chungbuk Times.',
}

export default function HomePage() {
  const articles = allArticles
    .filter(
      (article) => !article.featured && !article.cover_story && !article.banner,
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const popularArticles = Array.from(articles).sort((a, b) => b.views - a.views)

  return (
    <>
      <ArticlesAboveTheFold />
      <Topics />

      {/* Feed */}
      <section className="relative mx-auto max-w-screen-xl py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8">
          <TwoColFeed />

          {/* Sidebar */}
          <div className="mx-auto mt-12 w-full max-w-xl space-y-8 px-4 sm:mt-16 sm:px-6 md:max-w-3xl md:px-8 lg:col-span-1 lg:mt-0 lg:max-w-none lg:px-0">
            <SidebarMostread
              heading="Most read"
            />
            {/* <SidebarTags /> */}
            <SidebarSocialLinks />
            {/* <SidebarInstagramFeed /> */}
          </div>
        </div>
      </section>

      <BannerArticle/>

      {/* Feed 2 */}
      <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="col-span-2">
            <SingleColFeed/>
          </div>

          {/* Sidebar */}
          <div className="mt-12 w-full space-y-8 sm:mt-16 lg:col-span-1 lg:mt-0">
            {/* <SidebarAd /> */}
            <SidebarArticles
              heading="Column · Photo"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
