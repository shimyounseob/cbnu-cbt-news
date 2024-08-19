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

function BannerArticle({ article }) {
  if (!article) return <p>Loading...</p>; // 데이터가 아직 로드되지 않았을 때 로딩 메시지 표시

  const imageUrl = extractFirstImage(article.content); // 기사 본문에서 첫 번째 이미지를 추출

  return (
    <section className="relative mb-52 w-full lg:mb-40">
      <Link href={`/articles/${article.id}`}>
        <div className="aspect-h-2 aspect-w-5 bg-gray-50">
          <Image
            className="object-cover object-center"
            src={imageUrl}
            alt={article.title}
            fill
            sizes="100vw"
          />
        </div>
      </Link>

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-3xl translate-y-4/5 px-4 sm:translate-y-3/4 sm:px-6 lg:translate-y-1/2">
        <div className="flex items-center justify-center rounded-2xl bg-white/90 px-5 py-8 shadow-md backdrop-blur-md sm:p-10 sm:shadow-lg md:p-12 lg:p-14 ">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/category/${article.subcategory}`}
              className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              {article.subcategory}
            </Link>
            <Link href={`/articles/${article.id}`} className="group mt-3 block">
              <h2 className="text-2xl font-medium tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out group-hover:underline sm:text-3xl sm:decoration-3 md:tracking-tight lg:text-4xl lg:leading-tight">
                {article.title}
              </h2>
            </Link>

            <footer className="mt-5 flex items-center justify-between sm:mt-7">
              <div className="flex items-center justify-center">
                <Link
                  href={`/writers/${article.writer[0]?.id}`}
                  className="relative mr-3 h-7 w-7 rounded-lg bg-gray-50 lg:h-8 lg:w-8"
                >
                  <Image
                    className="h-full w-full rounded-xl object-cover object-center transition duration-300 ease-in-out"
                    src={`http://localhost:5001/uploads/writer/${article.writer[0].photo}`}
                    alt={article.writer[0].english_name}
                    fill
                    sizes="1.5rem"
                  />
                </Link>

                <div className="flex items-center text-sm lg:text-[15px]">
                  <span className="hidden text-gray-500 sm:inline-block">
                    By&nbsp;
                  </span>
                  <Link
                    href={`/writers/${article.writer[0]?.id}`}
                    className="font-medium text-gray-700 hover:underline"
                  >
                    {article.writer[0].english_name}
                  </Link>

                  <CalendarIcon className="ml-2.5 h-[18px] w-[18px] text-gray-400" />
                  <time dateTime={article.created_at} className="ml-1 text-gray-500">
                    {format(parseISO(article.created_at), 'LLL d, yyyy')}
                  </time>
                  {/* <span className="hidden items-center sm:flex">
                    <ClockIcon className="ml-2.5 h-[18px] w-[18px] text-gray-400" />
                    <span className="ml-1 text-gray-500">
                      {article.time_to_read_in_minutes} 
                    </span>
                  </span> */}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}

// useState와 useEffect 훅을 하단으로 이동
export default function BannerArticleWrapper() {
  const [secondLatestArticle, setSecondLatestArticle] = useState(null); // 두 번째 최신 메인 기사를 저장할 상태 선언

  useEffect(() => {
    async function fetchSecondLatestArticle() {
      try {
        const response = await axios.get('/article/latest-cover-story'); // 최신 Cover Stories를 가져오기 위한 API 요청
        const data = response.data;
        console.log('data:', data);

        setSecondLatestArticle(data[1]); // 두 번째 기사를 상태에 저장
      } catch (error) {
        console.error('Error fetching the second latest article:', error);
      }
    }

    fetchSecondLatestArticle(); // 데이터 가져오기 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // BannerArticle 컴포넌트를 렌더링할 때 article prop으로 두 번째 최신 기사를 전달
  return <BannerArticle article={secondLatestArticle} />;
}