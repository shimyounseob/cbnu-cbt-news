'use client' // 이 파일이 클라이언트 컴포넌트임을 나타냄

import Link from 'next/link' // 페이지 간 링크 이동을 처리하기 위해 Next.js의 Link 컴포넌트를 사용함
import Image from 'next/image' // 최적화된 이미지 로딩을 위해 Next.js의 Image 컴포넌트를 사용함
import { useEffect, useState } from 'react' // React의 useEffect와 useState 훅을 사용함
import { format, parseISO } from 'date-fns' // 날짜 형식을 처리하기 위해 date-fns 라이브러리에서 format과 parseISO 함수를 사용함
import axios from '../../libs/axios' // API 요청을 처리하기 위해 커스텀 axios 인스턴스를 사용함

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

function Article({ article }) {
  const imageUrl = extractFirstImage(article.content); // 기사 본문에서 첫 번째 이미지를 추출
  
  return (
    <article className="group relative flex flex-col flex-wrap rounded-2xl transition duration-300 ease-in-out hover:shadow-xl">
      {/* Image */}
      <div className="aspect-h-1 aspect-w-2 relative z-10 w-full overflow-hidden rounded-t-2xl bg-gray-50">
        <Link href={`/articles/${article.id}`}>
          <Image
            className="absolute inset-0 h-full w-full rounded-t-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={imageUrl} // 추출된 이미지를 사용
            alt={article.title}
            fill
            sizes="(min-width: 1280px) 24.25rem, (min-width: 1024px) 33vw, (min-width: 768px) 21.25rem, (min-width: 640px) 33rem, calc(100vw - 2rem)"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="box-border flex w-full flex-1 flex-col justify-between rounded-b-2xl border-b-2 border-l-2 border-r-2 border-gray-100 bg-white p-6 transition duration-300 ease-in-out group-hover:border-transparent xl:p-7">
        <div>
          <Link
            href={`/category/${article.subcategory}`}
            className="relative z-10 text-tiny font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
          >
            {article.subcategory}
          </Link>

          <h3 className="mt-3 text-xl font-medium leading-tight text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline sm:text-2xl lg:text-xl xl:text-2xl">
            <Link href={`/articles/${article.id}`}>
              <span className="absolute inset-0" aria-hidden="true" />
              {article.title}
            </Link>
          </h3>

          <p className="mt-4 block text-base leading-relaxed text-gray-500">
            {`${article.content
              .replace(/<[^>]+>/g, '') // HTML 태그 제거
              .replace(/&[^;]+;/g, ' ') // HTML 엔티티 제거 (예: &nbsp;, &amp;)
              .slice(0, 100)}...`}{' '}
            {/* 텍스트의 첫 150자만 표시 */}
          </p>
        </div>

        {/* Author */}
        <div className="mt-5 flex items-center sm:mt-6">
          <Link
            href={`/writers/${article.writer[0]?.id}`}
            className="relative h-10 w-10 rounded-xl bg-gray-50"
          >
            <Image
              className="h-full w-full rounded-xl object-cover object-center transition duration-300 ease-in-out"
              src={`http://localhost:5001/uploads/writer/${article.writer[0].photo}`}
              alt={article.writer[0].english_name}
              fill
              sizes="1.5rem"
            />
          </Link>

          <div className="ml-3">
            <Link
              href={`/writers/${article.writer[0]?.id}`}
              className="relative text-sm font-medium text-gray-700 hover:underline"
            >
              {article.writer[0].english_name}
            </Link>

            <p className="text-sm text-gray-500">
              <time dateTime={article.created_at}>
                {format(parseISO(article.created_at), 'LLL d, yyyy')}
              </time>
              {/* <span className="mx-0.5">·</span>
              <span>{article.time_to_read_in_minutes} min read</span> */}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function TwoColFeed() {
  const [articles, setArticles] = useState([]) // 기사를 저장할 상태를 선언함

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('/article/latest-recent-stories') // 최신 12개 기사를 가져오기 위한 API 요청을 보냄
        const data = response.data // 응답 데이터를 변수에 저장함
        console.log('data:', data)

        setArticles(data.slice(6, 12)) // 뒤 6개 기사를 사용하여 상태에 저장함
      } catch (error) {
        console.error('Error fetching articles:', error) // 요청 중 에러가 발생하면 콘솔에 출력함
      }
    }

    fetchArticles() // fetchArticles 함수를 호출하여 데이터 가져오기
  }, []) // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

  return (
    <div className="col-span-2">
      <div className="mx-auto max-w-xl px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-none lg:px-0">
        {/* Advertisement Banner
        <Link
          href="#0"
          className="relative block w-full rounded-2xl bg-gray-50"
        >
          <Image
            className="h-auto w-full rounded-2xl object-cover"
            src="/images/ads/banner.jpeg"
            alt="Banner Ad"
            width={960}
            height={240}
            sizes="(min-width: 1280px) 50rem, (min-width: 1024px) 66vw, (min-width: 768px) 44rem, (min-width: 640px) 33rem, calc(100vw - 2rem)"
          />
        </Link> */}

        {/* Articles */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <Article key={`two-col-article-${index}`} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
