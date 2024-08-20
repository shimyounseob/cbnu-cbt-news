'use client' // 이 파일이 클라이언트 컴포넌트임을 나타냄

import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react' // React의 useEffect와 useState 훅을 사용함
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


// 단일 기사를 렌더링하는 SidebarArticle 컴포넌트
function SidebarArticle({ article }) {
  const imageUrl = extractFirstImage(article.content);

  return (
    <article className="flex space-x-4 sm:space-x-6 lg:space-x-4">
      <Link
        href={`/articles/${article.id}`}
        className="group relative z-10 h-24 w-24 overflow-hidden rounded-2xl bg-gray-100 sm:h-28 sm:w-28 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
      >
        <Image
          className="h-full w-full rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
          src={imageUrl}
          alt={article.title}
          fill
          sizes="16rem"
        />
      </Link>

      <div className="w-2/3">
        <div className="flex h-full w-full flex-1 flex-col justify-center">
          <div>
            <Link
              href={`/articles/${article.id}`}
              className="text-md font-medium leading-snug tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline"
            >
              {article.title}
            </Link>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <span className="text-gray-500">By </span>
                <Link
                  href={`/writers/${article.writer[0]?.id}`}
                  className="font-medium text-gray-700 hover:underline"
                >
                  {article.writer[0].english_name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// SidebarArticles 컴포넌트 - 사이드바에 표시할 기사 목록을 렌더링함
export default function SidebarArticles({ heading }) {
  const [articles, setArticles] = useState([]); // 기사를 저장할 상태를 선언함

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('/article/latest-column-photo'); // 최신 4개의 Column, Photo, Cartoon 기사를 가져오기 위한 API 요청을 보냄
        const data = response.data;
        console.log('data:', data);

        setArticles(data); // 가져온 데이터를 상태에 저장함
      } catch (error) {
        console.error('Error fetching articles:', error); // 요청 중 에러가 발생하면 콘솔에 출력함
      }
    }

    fetchArticles(); // 데이터를 가져오는 함수를 호출함
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

  return (
    <div className="w-full rounded-2xl bg-gray-50 p-5 sm:p-8">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        {heading}
      </h3>

      {/* Articles */}
      <div className="space-y-6 pt-6 sm:space-y-5 lg:space-y-6 xl:space-y-5">
        {articles.map((article, index) => (
          <SidebarArticle key={`sidebar-article-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
}