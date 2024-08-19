'use client' // 이 파일이 클라이언트 컴포넌트임을 나타냄

import Link from 'next/link' // 페이지 간 링크 이동을 처리하기 위해 Next.js의 Link 컴포넌트를 사용함
import Image from 'next/image' // 최적화된 이미지 로딩을 위해 Next.js의 Image 컴포넌트를 사용함
import { useEffect, useState } from 'react' // React의 useEffect와 useState 훅을 사용함
import { format, parseISO } from 'date-fns' // 날짜 형식을 처리하기 위해 date-fns 라이브러리에서 format과 parseISO 함수를 사용함
import axios from '../../libs/axios' // API 요청을 처리하기 위해 커스텀 axios 인스턴스를 사용함
import clsx from 'clsx'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

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

// 단일 기사를 렌더링하는 컴포넌트임
function Article({ article, isLast }) {
  const imageUrl = extractFirstImage(article.content); // content에서 첫 번째 이미지를 추출

  return (
    <article className="md:grid md:grid-cols-4 md:gap-8" key={article.id}>
      {/* Image */}
      <div className="md:col-span-1">
        <Link
          href={`/articles/${article.id}`}
          className="group aspect-h-9 aspect-w-16 relative z-10 block overflow-hidden rounded-2xl bg-gray-50 md:aspect-h-1 md:aspect-w-1"
        >
          <Image
            className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={imageUrl} // 추출된 이미지를 사용함
            alt={article.title} // 이미지의 대체 텍스트로 기사 제목을 사용함
            fill
            sizes="(min-width: 1280px) 11rem, (min-width: 1024px) 16vw, (min-width: 768px) 9rem, (min-width: 640px) 30rem, calc(100vw - 2rem)"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="relative mt-6 flex flex-col flex-wrap md:col-span-3 md:mt-0">
        <div
          className={clsx(
            'box-border flex w-full flex-1 flex-col justify-between px-6 md:px-0',
            {
              'mb-8 border-b-2 border-gray-100 pb-8': !isLast, // 마지막이 아닌 경우에만 경계선을 표시함
            },
          )}
        >
          <div>
            <Link
              href={`/category/${article.subcategory}`}
              className="relative text-tiny font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              {article.subcategory} {/* 기사 카테고리 이름을 표시함 */}
            </Link>

            <h3 className="mt-2.5 text-xl font-medium leading-tight text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline sm:text-2xl lg:text-xl xl:text-2xl">
              <Link href={`/articles/${article.id}`}>
                <span className="absolute inset-0" aria-hidden="true" />
                {article.title} {/* 기사 제목을 표시함 */}
              </Link>
            </h3>

            <p className="mt-3.5 block text-base leading-relaxed text-gray-500">
            {`${article.content
              .replace(/<[^>]+>/g, '') // HTML 태그 제거
              .replace(/&[^;]+;/g, ' ') // HTML 엔티티 제거 (예: &nbsp;, &amp;)
              .slice(0, 150)}...`}{' '}
            {/* 텍스트의 첫 150자만 표시 */}
            </p>
          </div>

          {/* Article Footer Info */}
          <footer className="mt-5 flex items-center sm:mt-7">
            {/* Author Image */}
            <Link
              href={`/writers/${article.writer[0]?.id}`}
              className="relative mr-3 h-7 w-7 rounded-lg bg-gray-50 lg:h-8 lg:w-8"
            >
              <Image
                className="flex-shrink-0 rounded-lg object-cover object-center"
                src={`http://localhost:5001/uploads/writer/${article.writer[0].photo}`}
                alt={article.writer[0].english_name}
                fill
                sizes="2rem"
              />
            </Link>

            <div className="flex items-center text-sm lg:text-[15px]">
              <span className="hidden text-gray-500 sm:inline-block">By&nbsp;</span>
              <Link
                href={`/writers/${article.writer[0]?.id}`}
                className="relative font-medium text-gray-700 hover:underline"
              >
                {article.writer[0].english_name}
              </Link>

              <CalendarIcon className="ml-2.5 h-[18px] w-[18px] text-gray-400" />
              <time dateTime={article.created_at} className="ml-1 text-gray-500">
                {format(parseISO(article.created_at), 'LLL d, yyyy')}
              </time>
              {/* <span className="hidden items-center sm:flex">
                <ClockIcon className="ml-2.5 h-[18px] w-[18px] text-gray-400" />
                <span className="ml-1 text-gray-500">{article.time_to_read_in_minutes}</span>
              </span> */}
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}


// 최신 기사를 가져와서 표시하는 컴포넌트임
export default function SingleColFeed() {
  const [articles, setArticles] = useState([]); // 기사를 저장할 상태를 선언함

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('/article/latest-recent-stories'); // 최신 12개 기사를 가져오기 위한 API 요청을 보냄
        const data = response.data; // 응답 데이터를 변수에 저장함
        console.log('data:', data);

        setArticles(data.slice(12, 18)); // 뒤 6개 기사를 사용하여 상태에 저장함
      } catch (error) {
        console.error('Error fetching articles:', error); // 요청 중 에러가 발생하면 콘솔에 출력함
      }
    }

    fetchArticles(); // fetchArticles 함수를 호출하여 데이터 가져오기
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

  return (
    <div className="col-span-2">
      <div className="mx-auto max-w-xl px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-none lg:px-0">
        {/* Articles */}
        <div className="mt-8 grid gap-6 md:grid-cols-1">
          {articles.map((article, index) => (
            <Article key={`single-col-article-${index}`} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
