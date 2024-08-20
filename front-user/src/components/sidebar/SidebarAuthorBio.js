'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { EnvelopeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

function WriterBio({ writer }) {
  return (
    <div className="w-full rounded-2xl bg-gray-50 p-5 sm:p-8">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        About the writer
      </h3>
      <div className="pt-6">
        <div className="text-base leading-loose text-gray-700">
          <div className="flex items-center">
            <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-500" /> {/* 이메일 아이콘 */}
            <p>{writer.email}</p> {/* 이메일 표시 */}
          </div>
          <div className="flex items-center mt-2">
            <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-500" /> {/* 학과 아이콘 */}
            <p>Dept of. {writer.department}</p> {/* 학과 표시 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SidebarWriterBio({ writerId }) {
  const [writer, setWriter] = useState(null) // 기자 정보를 저장할 상태

  useEffect(() => {
    async function fetchWriterInfo() {
      try {
        const response = await axios.get(`http://localhost:5001/api/writer/${writerId}`);
        const writerInfo = response.data;
        setWriter(writerInfo); // 가져온 기자 정보를 상태에 저장
      } catch (error) {
        console.error('Error fetching writer information:', error);
      }
    }

    fetchWriterInfo();
  }, [writerId]);

  if (!writer) {
    return <p>Loading...</p>; // 데이터가 로드되기 전 로딩 메시지 표시
  }

  return <WriterBio writer={writer} />;
}
