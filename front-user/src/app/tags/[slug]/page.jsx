import { allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import clsx from 'clsx'

import TopicHeader from '@/components/headers/TopicHeader'
import SingleColFeed from '@/components/shared/SingleColFeed'
import CategorySingleFeed from '@/components/shared/CategorySingleFeed'
import SidebarArticles from '@/components/sidebar/SidebarArticles'
import SidebarMostread from '@/components/sidebar/SidebarMostread'
import SidebarSocialLinks from '@/components/sidebar/SidebarSocialLinks'
import SidebarAd from '@/components/sidebar/SidebarAd'
import Pagination from '@/components/shared/Pagination'
import Newsletter from '@/components/shared/Newsletter'
import { getTags } from '@/libs/getTags'

// 슬러그를 동적 경로로 사용하기 위한 Static Params 설정
export const generateStaticParams = async () =>
  getTags().map((tag) => ({ slug: tag.replace(/ /g, '-').toLowerCase() }))

// 메타데이터 설정
export async function generateMetadata({ params }) {
  const tag = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
  return {
    title: `Showing articles in ${tag}`,
  }
}

// TagPage 컴포넌트
export default function TagPage({ params }) {
  const categoryOrSubcategory = params.slug.charAt(0).toUpperCase() + params.slug.slice(1); // 슬러그를 categoryOrSubcategory로 설정
  console.log("categoryOrSubcategory: ", categoryOrSubcategory);

  return (
    <>
      <TopicHeader item={categoryOrSubcategory} type="tag" />

      {/* Feed with Sidebar */}
      <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24"style={{ padding: "0px" }}>
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="col-span-2">
            {/* 슬러그를 categoryOrSubcategory로 전달 */}
            <div>
              <CategorySingleFeed categoryOrSubcategory={categoryOrSubcategory} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 w-full space-y-8 sm:mt-16 lg:col-span-1 lg:mt-0">
            <SidebarSocialLinks />
            <SidebarMostread heading="Most read" />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}

// 정해진 파라미터로만 출력 가능 (아닌 경우 404 Not Found)
// export const dynamicParams = false 
