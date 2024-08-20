'use client'

import Image from 'next/image'
import { SocialButton } from '@/components/social/SocialButton'
import { useEffect, useState } from 'react';
import axios from 'axios';


function WriterInfo({ writer }) {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24" style={{ paddingBottom: "50px" }}>
      <div className="mx-auto max-w-xl px-6 sm:px-12 md:max-w-3xl lg:max-w-screen-xl lg:px-8">
        {/* Container */}
        <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
          {/* Writer Info */}
          <div className="flex flex-col items-center md:flex-row">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="relative h-24 w-24 rounded-xl bg-gray-100">
                <Image
                  className="rounded-2xl object-cover object-center"
                  src={`http://localhost:5001/uploads/writer/${writer.photo}`}  // 기자의 사진 경로 설정
                  alt={writer.english_name}  // 기자의 이름
                  fill
                  sizes="6rem"
                />
                <span
                  className="absolute inset-0 rounded-xl shadow-inner"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="mt-6 text-center md:ml-5 md:mt-0 md:text-left">
              <p className="text-xs uppercase tracking-widest text-red-700">
                {writer.position} {/* 기자의 포지션 */}
              </p>
              <h1 className="mt-1.5 text-3xl font-medium tracking-normal text-gray-900 sm:text-4xl md:tracking-tight lg:leading-tight">
                {writer.english_name} {/* 기자의 영어 이름 */}
              </h1>
            </div>
          </div>

          {/* Writer Social Links */}
          <div className="mt-6 md:mt-0">
            {/* Links */}
            <ul className="flex items-center space-x-3">
              {/* 소셜 링크가 있는 경우, 아래 코드의 주석을 해제하여 사용 */}
              {/* {writer.social_links.map((socialLink) => (
                <li key={socialLink.name}>
                  <SocialButton
                    href={socialLink.url}
                    name={socialLink.name}
                    containerClassName="sm:w-12 sm:h-12"
                  />
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WriterHeader({ writerId }) {
  const [writer, setWriter] = useState(null); // 기자 정보를 저장할 상태
  console.log('writerId:', writerId, 'writer:', writer );

  useEffect(() => {
    async function fetchWriter() {
      try {
        console.log(`/writer/${writerId}`);
        const response = await axios.get(`http://localhost:5001/api/writer/${writerId}`); // API 요청
        console.log('response: ', response);

        const writerInfo = response.data; // 단일 객체로 받아오기
        setWriter(writerInfo); // 가져온 기자 정보를 상태에 저장
      } catch (error) {
        console.error('Error fetching writer information:', error);
      }
    }

    fetchWriter();
  }, [writerId]);

  if (!writer) {
    return <p>Loading...</p>; // 데이터가 로드되기 전 로딩 메시지 표시
  }

  return <WriterInfo writer={writer} />;
}