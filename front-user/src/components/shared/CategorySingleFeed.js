'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import axios from '../../libs/axios'
import clsx from 'clsx'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

// article.content에서 첫 번째 이미지를 추출하는 함수
function extractFirstImage(content) {
  const firstImageMatch = content.match(/<img[^>]*src="(.*?)"[^>]*\/?>/)

  const representativeImage = firstImageMatch
    ? firstImageMatch[1].startsWith('/uploads/article')
      ? `http://localhost:5001${firstImageMatch[1]}`
      : firstImageMatch[1]
    : '/images/default-image.png';

  return representativeImage;
}

// 단일 기사를 렌더링하는 컴포넌트
function Article({ article, isLast }) {
  const imageUrl = extractFirstImage(article.content);

  return (
    <article className="md:grid md:grid-cols-4 md:gap-8" key={article.id}>
      <div className="md:col-span-1">
        <Link
          href={`/articles/${article.id}`}
          className="group aspect-h-9 aspect-w-16 relative z-10 block overflow-hidden rounded-2xl bg-gray-50 md:aspect-h-1 md:aspect-w-1"
        >
          <Image
            className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 1280px) 11rem, (min-width: 1024px) 16vw, (min-width: 768px) 9rem, (min-width: 640px) 30rem, calc(100vw - 2rem)"
          />
        </Link>
      </div>

      <div className="relative mt-6 flex flex-col flex-wrap md:col-span-3 md:mt-0">
        <div
          className={clsx(
            'box-border flex w-full flex-1 flex-col justify-between px-6 md:px-0',
            {
              'mb-8 border-b-2 border-gray-100 pb-8': !isLast,
            },
          )}
        >
          <div>
            <Link
              href={`/category/${article.subcategory}`}
              className="relative text-tiny font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              {article.subcategory}
            </Link>

            <h3 className="mt-2.5 text-xl font-medium leading-tight text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline sm:text-2xl lg:text-xl xl:text-2xl">
              <Link href={`/articles/${article.id}`}>
                <span className="absolute inset-0" aria-hidden="true" />
                {article.title}
              </Link>
            </h3>

            <p className="mt-3.5 block text-base leading-relaxed text-gray-500">
              {`${article.content
                .replace(/<[^>]+>/g, '')
                .replace(/&[^;]+;/g, ' ')
                .slice(0, 150)}...`}{' '}
            </p>
          </div>

          <footer className="mt-5 flex items-center sm:mt-7">
            <Link
              href={`/writers/${article.writer[0]?.writer_id}`}
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
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}

// 페이지네이션 컴포넌트 정의
function Pagination({ currentPage, articlesPerPage, totalArticles, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-between" style={{ paddingTop: "100px" }}>
      <div className="flex w-0 flex-1">
        {currentPage > 1 && (
          <Link
            href="#"
            onClick={() => paginate(currentPage - 1)}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
          >
            <ChevronLeftIcon className="mr-2.5 h-5 w-5 text-gray-400" />
            Previous
          </Link>
        )}
      </div>

      <div className="hidden space-x-2.5 md:flex">
        {pageNumbers.map((number) => (
          <Link
            key={number}
            href="#"
            onClick={() => paginate(number)}
            className={clsx(
              'inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700',
              { 'bg-red-600 text-white': currentPage === number }
            )}
          >
            {number}
          </Link>
        ))}
      </div>

      <div className="flex w-0 flex-1 justify-end">
        {currentPage < pageNumbers.length && (
          <Link
            href="#"
            onClick={() => paginate(currentPage + 1)}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
          >
            Next
            <ChevronRightIcon className="ml-2.5 h-5 w-5 text-gray-400" />
          </Link>
        )}
      </div>
    </nav>
  );
}

// 최신 기사를 가져와서 표시하는 컴포넌트
export default function CategorySingleFeed({ categoryOrSubcategory }) {
  const [articles, setArticles] = useState([]); // 기사를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [articlesPerPage] = useState(7); // 페이지당 표시할 기사 수

  console.log('categoryOrSubcategory: ',categoryOrSubcategory);
  console.log('currentPage: ', currentPage);
  console.log('articlesPerPage: ', articlesPerPage);

  useEffect(() => {
    async function fetchArticles() {
      try {
        let response;

        // 단독 카테고리일 경우
        if (['Column', 'Photo'].includes(categoryOrSubcategory)) {
          response = await axios.get(`/article/category/${categoryOrSubcategory}`);
        } 
        // 서브카테고리일 경우
        else if (['Society', 'Global', 'Feature', 'Culture', 'Experience', 'People'].includes(categoryOrSubcategory)) {
          response = await axios.get(`/article/subcategory/${categoryOrSubcategory}`);
        }

        //카테고리가 Campus인 경우
        else if (['Campus'].includes(categoryOrSubcategory)){
        response = await axios.get(`/article/category/campus%20news`); 
        }

        const data = response.data;
        setArticles(data); // 가져온 기사를 상태에 저장
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles(); // 데이터 가져오기 함수 호출
  }, [categoryOrSubcategory]);

  // 현재 페이지에 표시할 기사 계산
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="col-span-2">
      <div className="mx-auto max-w-xl px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-none lg:px-0">
        {/* Articles */}
        <div className="mt-8 grid gap-6 md:grid-cols-1">
          {currentArticles.map((article, index) => (
            <Article
              key={`category-single-article-${index}`}
              article={article}
              isLast={index === currentArticles.length - 1}
            />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          articlesPerPage={articlesPerPage}
          totalArticles={articles.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
