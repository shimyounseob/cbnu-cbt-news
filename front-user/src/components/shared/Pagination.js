import Link from 'next/link' // Next.js의 Link 컴포넌트를 사용하여 페이지 간 이동을 처리합니다.
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid' // 페이지 네이션 화살표 아이콘을 사용하기 위해 heroicons 라이브러리를 가져옵니다.

export default function Pagination({ currentPage, articlesPerPage, totalArticles, paginate }) {
  const pageNumbers = [];

  // 전체 기사 수에 따라 페이지 수를 계산하여 pageNumbers 배열에 추가합니다.
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="flex w-0 flex-1">
        {/* 이전 페이지 버튼 */}
        {currentPage > 1 && (
          <Link
            href="#"
            onClick={() => paginate(currentPage - 1)} // 이전 페이지로 이동하는 함수 호출
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
          >
            <ChevronLeftIcon className="mr-2.5 h-5 w-5 text-gray-400" />
            Previous
          </Link>
        )}
      </div>

      {/* 페이지 번호 */}
      <div className="hidden space-x-2.5 md:flex">
        {pageNumbers.map((number) => (
          <Link
            key={number}
            href="#"
            onClick={() => paginate(number)} // 클릭된 페이지 번호로 이동하는 함수 호출
            className={clsx(
              'inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700',
              { 'bg-red-600 text-white': currentPage === number } // 현재 페이지를 강조 표시
            )}
          >
            {number}
          </Link>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}
      <div className="flex w-0 flex-1 justify-end">
        {currentPage < pageNumbers.length && (
          <Link
            href="#"
            onClick={() => paginate(currentPage + 1)} // 다음 페이지로 이동하는 함수 호출
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
          >
            Next
            <ChevronRightIcon className="ml-2.5 h-5 w-5 text-gray-400" />
          </Link>
        )}
      </div>
    </nav>
  )
}


// import Link from 'next/link'
// import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

// export default function SidebarSocialLinks() {
//   return (
//     <nav className="flex items-center justify-between">
//       <div className="flex w-0 flex-1">
//         {/* Previous Button */}
//         <Link
//           href="#"
//           className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
//         >
//           <ChevronLeftIcon   className="mr-2.5 h-5 w-5 text-gray-400" />
//           Previous
//         </Link>
//       </div>

//       {/* Pages */}
//       <div className="hidden space-x-2.5 md:flex">
//         <Link
//           href="#"
//           className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
//         >
//           1
//         </Link>

//         {/* Current: "bg-red-500 text-white", Default: "text-gray-500 transition duration-300 ease-in-out bg-gray-50 hover:bg-gray-100 hover:text-gray-700" */}
//         <Link
//           href="#"
//           className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-sm font-medium text-white"
//           aria-current="page"
//         >
//           2
//         </Link>
//         <Link
//           href="#"
//           className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
//         >
//           3
//         </Link>
//         <Link
//           href="#"
//           className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
//         >
//           4
//         </Link>

//         <span className="inline-flex h-12 w-12 items-center justify-center text-base font-medium text-gray-500">
//           ...
//         </span>

//         <Link
//           href="#"
//           className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
//         >
//           10
//         </Link>
//       </div>

//       {/* Next Button */}
//       <div className="flex w-0 flex-1 justify-end">
//         <Link
//           href="#"
//           className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
//         >
//           Next
//           <ChevronRightIcon className="ml-2.5 h-5 w-5 text-gray-400" />
//         </Link>
//       </div>
//     </nav>
//   )
// }
