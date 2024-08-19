import Link from 'next/link'

export default function NextArticle({ article }) {

  // article 객체가 제대로 전달되었는지 확인
  console.log("Received article:", article);

  // 본문에서 첫 번째 이미지를 추출하여 대표 이미지로 설정
  const firstImageMatch = article.content.match(/<img[^>]*src="(.*?)"[^>]*\/?>/);
  console.log("firstImageMatch:", firstImageMatch);
  

  // 첫 번째 이미지가 있으면 그 이미지를 사용하고, 없으면 디폴트 이미지를 사용함
  const representativeImage = firstImageMatch
    ? firstImageMatch[1].startsWith('/uploads/article')
      ? `http://localhost:5001${firstImageMatch[1]}` // 로컬 서버 이미지
      : firstImageMatch[1] // 외부 이미지
    : '/images/default-image.png'; // 디폴트 이미지

  return (
    <section
      className="relative h-96 w-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${representativeImage})` }}
    >
      <div className="absolute inset-0 bg-gray-900/50" />

      {/* Content */}
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center">
          <span className="relative text-sm font-medium uppercase tracking-widest text-red-100">
            Next article
          </span>
          <h2 className="mt-3 text-center text-3xl font-medium tracking-normal text-white sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
            {article.title}
          </h2>
        </div>
      </div>

      <Link href={`/articles/${article.id}`} className="absolute inset-0"></Link>
    </section>
  );
}
