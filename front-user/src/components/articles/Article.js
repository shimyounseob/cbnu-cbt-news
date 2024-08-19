import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { format, parseISO } from 'date-fns'
import parse from 'html-react-parser'
import { SocialButton } from '@/components/social/SocialButton'
import { Share } from './Share'

// 본문에서 로컬 이미지를 처리하기 위한 함수 추가
function processLocalImages(content) {
  return content.replace(/src="(\/uploads\/article\/[^"]+)"/g, (match, p1) => {
    return `src="http://localhost:5001${p1}"`;
  });
}

export default function Article({ article }) {
  
  console.log("Article: ", article);

  // 본문에서 첫 번째 이미지를 추출함
  const firstImageMatch = article.content.match(/<img[^>]*src="(.*?)"[^>]*\/?>/)

  // 본문에서 첫 번째 이미지 태그의 src 속성을 추출한 결과가 있는지 확인함
  // 만약 firstImageMatch가 존재하면 첫 번째 이미지 태그가 있는 것이므로 이를 사용하여 대표 이미지를 설정함
  // 추출된 이미지 src가 '/uploads/article'로 시작하는지 확인함
  // '/uploads/article'로 시작하면 로컬 서버에서 제공하는 이미지로 간주하여
  // http://localhost:5001 경로와 결합하여 완전한 URL을 생성함
  // 그렇지 않으면 외부 이미지로 간주하여 추출된 src 값을 그대로 사용함
  // 만약 firstImageMatch가 존재하지 않으면 (본문에 이미지가 없으면)
  // 디폴트 이미지 경로('/path/to/default/image.jpg')를 대표 이미지로 사용함
  const representativeImage = firstImageMatch
    ? firstImageMatch[1].startsWith('/uploads/article')
      ? `http://localhost:5001${firstImageMatch[1]}`
      : firstImageMatch[1]
    : '/images/default-image.png'

  // 작성자의 사진 경로를 수정하여 로컬 이미지 경로를 올바르게 설정함
  const mainWriterPhoto = `http://localhost:5001/uploads/writer/${article.writer[0].photo}`

  // 첫 번째 이미지를 제거한 본문을 만듦
  const contentWithoutFirstImage = firstImageMatch
    ? article.content.replace(firstImageMatch[0], '')
    : article.content

  // 본문 내 로컬 이미지 경로를 처리
  const processedContent = processLocalImages(contentWithoutFirstImage);

  return (
    <article className="bg-gray-50 pb-12 sm:pb-16 lg:pb-24">
      <header>
        {/* 기사 헤더에 사용할 대표 이미지를 설정함 */}
        <div className="aspect-h-2 aspect-w-3 w-full bg-gray-100 sm:aspect-h-1">
          <Image
            className="object-cover object-center"
            // 설정한 대표 이미지를 표시함
            src={representativeImage}
            alt={article.title}
            fill
            sizes="100vw"
          />
        </div>

        <div className="px-5 lg:px-0">
          <div className="mx-auto mb-8 max-w-prose border-b border-gray-300/70 pb-8 pt-10 text-lg sm:pt-16">
            {/* 카테고리를 링크로 표시함 */}
            <Link
              href={`/category/${article.category
                .replace(/ /g, '-')
                .toLowerCase()}`}
              className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              {/* 카테고리 이름을 표시함 */}
              {article.subcategory}
            </Link>
            {/* 기사 제목을 표시함 */}
            <h2 className="mt-3.5 text-4xl font-medium tracking-normal text-gray-900 decoration-red-300 decoration-3 transition duration-300 ease-in-out group-hover:underline sm:mt-5 sm:text-5xl sm:leading-tight md:tracking-tight lg:text-6xl">
              {article.title}
            </h2>
            <div>
              {/* 발행 이슈가 있으면 표시함 */}
              <p className="mt-4 text-base leading-loose text-gray-600">
                {article.publication_issue
                  ? `Issue ${article.publication_issue}`
                  : ''}
              </p>
            </div>

            <div className="mt-6 flex items-center sm:mt-8">
              {/* 기사 작성자 목록을 표시하되, 사진은 메인 기자의 것만 표시함 */}
              <div className="relative h-8 w-8 rounded-xl bg-gray-100 sm:h-9 sm:w-9">
                <Image
                  className="rounded-xl object-cover object-center"
                  src={mainWriterPhoto}
                  alt={article.writer[0].english_name}
                  fill
                  sizes="(min-width: 640px) 2.25rem, 2rem"
                />
                <span
                  className="absolute inset-0 rounded-xl shadow-inner"
                  aria-hidden="true"
                />
              </div>

              <div className="ml-4 flex items-center text-sm lg:text-[15px]">
                <span className="hidden text-gray-500 sm:inline-block">
                  By&nbsp;
                </span>
                {article.writer.map((writer, index) => (
                  // 작성자 이름을 표시하고, 마지막이 아니면 쉼표를 추가함
                  <Link
                    key={index}
                    href="#"
                    className="font-medium text-gray-700 hover:underline"
                  >
                    {writer.english_name}
                    {index < article.writer.length - 1 && ', '}
                  </Link>
                ))}
                <CalendarIcon className="ml-4 h-[18px] w-[18px] text-gray-400" />
                <time
                  className="ml-1 text-gray-500"
                  dateTime={article.created_at}
                >
                  {/* 작성일을 포맷하여 표시함 */}
                  {format(parseISO(article.created_at), 'MMMM dd, yyyy')}
                </time>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-5 lg:px-0">
        {console.log(processedContent)}
        {/* 본문 내용을 표시함 */}
        <div className="prose mx-auto sm:prose-lg first-letter:text-4xl first-letter:font-bold first-letter:tracking-[.15em] prose-a:transition prose-a:duration-300 prose-a:ease-in-out hover:prose-a:text-red-700 prose-img:rounded-xl">
          {parse(processedContent)}
        </div>

        <footer className="mx-auto mt-12 max-w-prose divide-y divide-gray-300/70 text-lg sm:mt-14">
          <Share />

          <div className="py-8 sm:py-10">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-shrink-0">
                  <div className="relative h-20 w-20 rounded-2xl bg-gray-100 sm:h-24 sm:w-24">
                    <Image
                      className="rounded-2xl object-cover object-center"
                      // 메인 기자의 사진을 표시함
                      src={mainWriterPhoto}
                      alt={article.writer[0].english_name}
                      fill
                      sizes="(min-width: 640px) 6rem, 5rem"
                    />
                    <span
                      className="absolute inset-0 rounded-2xl shadow-inner"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="mt-5 text-left sm:ml-6 sm:mt-0">
                  <div className="flex items-center justify-between">
                    <div className="'flex flex-col">
                      <p className="text-xs uppercase tracking-widest text-red-600">
                        {/* 메인 기자의 역할을 표시함 */}
                        {article.writer[0].article_writers.role}
                      </p>
                      <h1 className="mt-1 text-xl font-medium tracking-normal text-gray-900 md:tracking-tight lg:leading-tight">
                        {/* 메인 기자의 이름을 표시함 */}
                        {article.writer[0].english_name}
                      </h1>
                      <p className="mt-2.5 text-base leading-loose text-gray-500">
                        {/* 메인 기자의 이메일 주소를 표시함 */}
                        {article.writer[0].email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 서브 기자의 정보가 있는 경우 추가로 표시 */}
            {article.writer.slice(1).map((writer, index) => (
              <div className="pt-8 sm:pt-10" key={index}>
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0">
                      <div className="relative h-20 w-20 rounded-2xl bg-gray-100 sm:h-24 sm:w-24">
                        <Image
                          className="rounded-2xl object-cover object-center"
                          src={`http://localhost:5001/uploads/writer/${writer.photo}`}
                          alt={writer.english_name}
                          fill
                          sizes="(min-width: 640px) 6rem, 5rem"
                        />
                        <span
                          className="absolute inset-0 rounded-2xl shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="mt-5 text-left sm:ml-6 sm:mt-0">
                      <div className="flex items-center justify-between">
                        <div className="'flex flex-col">
                          <p className="text-xs uppercase tracking-widest text-red-600">
                            {writer.article_writers.role}
                          </p>
                          <h1 className="mt-1 text-xl font-medium tracking-normal text-gray-900 md:tracking-tight lg:leading-tight">
                            {writer.english_name}
                          </h1>
                          <p className="mt-2.5 text-base leading-loose text-gray-500">
                            {/* 서브 기자의 이메일 주소를 표시함 */}
                            {writer.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </article>
  )
}
