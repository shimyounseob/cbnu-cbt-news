'use client' // 이 파일이 클라이언트 컴포넌트임을 나타냄

import Link from 'next/link' // 페이지 간 링크 이동을 처리하기 위해 Next.js의 Link 컴포넌트를 사용함
import Image from 'next/image' // 최적화된 이미지 로딩을 위해 Next.js의 Image 컴포넌트를 사용함
import clsx from 'clsx' // 조건부로 여러 CSS 클래스를 결합하기 위해 clsx 라이브러리를 사용함
import { useEffect, useState } from 'react' // React의 useEffect와 useState 훅을 사용함
import { format, parseISO } from 'date-fns' // 날짜 형식을 처리하기 위해 date-fns 라이브러리에서 format과 parseISO 함수를 사용함
import axios from '../../libs/axios' // API 요청을 처리하기 위해 커스텀 axios 인스턴스를 사용함
import parse from 'html-react-parser' // HTML을 파싱하여 React 컴포넌트로 변환하기 위해 html-react-parser를 사용함

// article.content에서 첫 번째 이미지를 추출하는 함수임
function extractFirstImage(content) {
  // 본문에서 첫 번째 이미지를 추출함
  const firstImageMatch = content.match(/<img[^>]*src="(.*?)"[^>]*\/?>/)

  // 본문에서 첫 번째 이미지 태그의 src 속성을 추출한 결과가 있는지 확인함
  // 만약 firstImageMatch가 존재하면 첫 번째 이미지 태그가 있는 것이므로 이를 사용하여 대표 이미지를 설정함
  // 추출된 이미지 src가 '/uploads/article'로 시작하는지 확인함
  // '/uploads/article'로 시작하면 로컬 서버에서 제공하는 이미지로 간주하여
  // http://localhost:5001 경로와 결합하여 완전한 URL을 생성함
  // 그렇지 않으면 외부 이미지로 간주하여 추출된 src 값을 그대로 사용함
  // 만약 firstImageMatch가 존재하지 않으면 (본문에 이미지가 없으면)
  // 디폴트 이미지 경로('/images/default-image.png')를 대표 이미지로 사용함
  const representativeImage = firstImageMatch
    ? firstImageMatch[1].startsWith('/uploads/article')
      ? `http://localhost:5001${firstImageMatch[1]}`
      : firstImageMatch[1]
    : '/images/default-image.png';

  return representativeImage; // 대표 이미지 URL 반환
}

function CoverStory({ article }) {
  const firstImage = extractFirstImage(article.content) // 첫 번째 이미지를 추출함

  // 작성자의 사진 경로를 설정
  const mainWriterPhoto = `http://localhost:5001/uploads/writer/${article.writer[0]?.photo}`

  return (
    <article className="relative lg:sticky lg:top-8 lg:w-1/2">
      {/* 대표 이미지 */}
      <Link
        href={`/articles/${article.id}`}
        className="group aspect-h-9 aspect-w-16 relative block overflow-hidden rounded-2xl bg-gray-100"
      >
        <Image
          className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
          src={firstImage} // 추출된 첫 번째 이미지를 사용함
          alt={article.title} // 기사의 제목을 alt 텍스트로 사용함
          fill
          sizes="(min-width: 1536px) 44rem, (min-width: 1024px) calc(50vw - 2rem), (min-width: 640px) 39rem, calc(100vw - 2rem)"
        />
      </Link>

      {/* 기사 내용 */}
      <div className="mt-6 md:align-middle">
        <Link
          href={`/category/${article.subcategory}`}
          className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
        >
          {article.subcategory} {/* 기사의 카테고리 이름을 표시함 */}
        </Link>
        <Link href={`/articles/${article.id}`} className="group mt-3 block">
          <h2 className="text-3xl font-medium tracking-normal text-gray-900 decoration-gray-800 decoration-3 transition duration-300 ease-in-out group-hover:underline md:tracking-tight lg:text-4xl lg:leading-tight">
            {article.title} {/* 기사의 제목을 표시함 */}
          </h2>
          <div>
            <p className="mt-4 text-base leading-loose text-gray-600">
              <p className="mt-4 text-base leading-loose text-gray-600">
                {`${article.content
                  .replace(/<[^>]+>/g, '') // HTML 태그 제거
                  .replace(/&[^;]+;/g, ' ') // HTML 엔티티 제거 (예: &nbsp;, &amp;)
                  .slice(0, 250)}...`}{' '}r
                {/* 텍스트의 첫 150자만 표시 */}
              </p>
            </p>
          </div>
        </Link>

        {/* 기자 정보 */}
        <div className="mt-4 flex items-center sm:mt-8">
          <Link
            href={`/writers/${article.writer[0]?.id}`}
            className="relative h-10 w-10 rounded-xl bg-gray-100"
          >
            <Image
              className="h-full w-full rounded-xl object-cover object-center transition duration-300 ease-in-out"
              src={mainWriterPhoto} // 올바르게 설정된 작성자 사진 경로를 사용함
              alt={article.writer[0]?.english_name || 'Default Name'} // 사진의 대체 텍스트로 작성자의 이름을 표시함
              fill
              sizes="2.5rem"
            />
          </Link>

          <div className="ml-3">
            <Link
              href={`/writers/${article.writer[0]?.id}`}
              className="text-sm font-medium text-gray-800 hover:underline"
            >
              {article.writer[0]?.english_name || 'Unknown Writer'}{' '}
              {/* 기자의 영어 이름을 표시함 */}
            </Link>
            <p className="text-sm text-gray-500">
              <time dateTime={article.created_at}>
                {format(parseISO(article.created_at), 'LLL d, yyyy')}{' '}
                {/* 기사의 작성일을 표시함 */}
              </time>
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

function RecentArticle({ article, index }) {
  const firstImage = extractFirstImage(article.content) // 첫 번째 이미지를 추출함

  return (
    <article
      className={clsx('py-8 sm:flex lg:flex-col xl:flex-row xl:items-center', {
        'border-t border-gray-300/70 lg:border-t-0 xl:border-t': index > 0, // 첫 번째 기사가 아닌 경우 상단에 테두리를 추가함
      })}
    >
      {/* 기사 이미지 */}
      <Link
        href={`/articles/${article.id}`}
        className="order-2 w-full sm:w-2/5 lg:order-1 lg:w-full xl:w-2/5"
      >
        <div className="group aspect-h-9 aspect-w-16 overflow-hidden rounded-2xl bg-gray-100">
          <Image
            className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={firstImage} // content에서 첫 번째 이미지를 추출하여 사용함
            alt={article.title} // 기사의 제목을 alt 텍스트로 사용함
            fill
            sizes="(min-width: 1536px) 17.6rem, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 15rem, calc(100vw - 2rem)"
          />
        </div>
      </Link>

      {/* 기사 내용 */}
      <div className="order-1 mt-5 w-full px-2 sm:mt-0 sm:max-w-sm sm:pl-0 sm:pr-5 lg:order-2 lg:mt-4 xl:ml-5 xl:mt-0 xl:flex-1">
        <Link
          href={`/category/${article.subcategory}`}
          className="text-xs font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
        >
          {article.subcategory} {/* 기사의 카테고리 이름을 표시함 */}
        </Link>

        <Link href={`/articles/${article.id}`}>
          <h3 className="mt-2 text-xl font-medium leading-normal tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline">
            {article.title} {/* 기사의 제목을 표시함 */}
          </h3>
        </Link>

        {/* 기자 정보 */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Link
              href={`/writers/${article.writer[0]?.id}`}
              className="relative mr-3 h-6 w-6 rounded-lg bg-gray-100"
            >
              <Image
                className="h-6 w-6 flex-shrink-0 rounded-lg object-cover object-center transition duration-300 ease-in-out"
                src={`http://localhost:5001/uploads/writer/${article.writer[0]?.photo}`} // 기자의 이미지를 렌더링함
                alt={article.writer[0]?.english_name} // 기자의 영어 이름을 alt 텍스트로 사용함
                fill
                sizes="1.5rem"
              />
            </Link>

            <div className="text-sm">
              <span className="text-gray-500">By </span>
              <Link
                href={`/writers/${article.writer[0]?.id}`}
                className="font-medium text-gray-700 hover:underline"
              >
                {article.writer[0]?.english_name}{' '}
                {/* 기자의 영어 이름을 표시함 */}
              </Link>

              <span className="text-gray-500 lg:hidden xl:inline-block">
                <span className="mx-0.5">·</span>
                <time dateTime={article.created_at}>
                  {format(parseISO(article.created_at), 'LLL d, yyyy')}{' '}
                  {/* 기사의 작성일을 표시함 */}
                </time>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ArticlesAboveTheFold() {
  const [coverStory, setCoverStory] = useState(null) // 최신 Cover Story 데이터를 저장할 상태를 선언함
  const [recentArticles, setRecentArticles] = useState([]) // 최신 Recent Articles 데이터를 저장할 상태를 선언함

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보내는 함수임
    async function fetchArticles() {
      try {
        const coverRes = await axios.get('/article/latest-cover-story') // 최신 Cover Story를 가져오기 위한 API 요청을 보냄
        const coverData = coverRes.data // 응답 데이터를 변수에 저장함

        console.log('coverData:', coverData) // coverData 콘솔에 출력함

        setCoverStory(coverData[0]) // 가져온 데이터 중 첫 번째 기사를 상태에 저장함

        const recentRes = await axios.get('/article/latest-recent-stories') // 최신 Recent Stories를 가져오기 위한 API 요청을 보냄
        const recentData = recentRes.data // 응답 데이터를 변수에 저장함

        console.log('recentData:', recentData) // recentData 콘솔에 출력함

        setRecentArticles(recentData.slice(0, 6)) // 최신 6개의 기사를 상태에 저장함
      } catch (error) {
        console.error('Error fetching articles:', error) // 요청 중 에러가 발생하면 콘솔에 출력함
      }
    }

    fetchArticles() // fetchArticles 함수를 호출하여 데이터 가져오기를 시작함
  }, []) // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

  if (!coverStory) return <p>Loading...</p> // 데이터가 아직 로드되지 않았을 때 로딩 메시지를 표시함

  return (
    <section className="bg-gray-50 pt-12 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:flex lg:max-w-screen-2xl lg:items-start lg:px-8">
        <CoverStory article={coverStory} />{' '}
        {/* Cover Story 컴포넌트를 렌더링함 */}
        {/* Recent Articles */}
        <div className="mt-12 sm:mt-16 lg:ml-12 lg:mt-0 lg:w-1/2 xl:ml-16">
          <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
            Recent stories
          </h3>

          {/* Articles Container */}
          <div className="grid lg:grid-cols-2 lg:gap-x-5 xl:grid-cols-1">
            {recentArticles.map((article, index) => (
              <RecentArticle
                article={article}
                index={index}
                key={`recent-article-${index}`} // 각 기사의 고유 키 값을 설정함
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}