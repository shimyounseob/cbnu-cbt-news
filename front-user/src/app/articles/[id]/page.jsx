"use client";

import { useState, useEffect } from 'react';
import axios from '@/libs/axios';
import Article from '@/components/articles/Article';
import NextArticle from '@/components/articles/NextArticle';
import Newsletter from '@/components/shared/Newsletter';

export default function ArticlePage({ params }) {
  const { id } = params;

  const [article, setArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/article/${id}`);
        const articleData = res.data;

        if (!articleData) {
          throw new Error('Article not found');
        }

        setArticle(articleData);

        // 다음 기사를 비동기적으로 가져옴
        const nextRes = await axios.get(`/article/next-article`, {
          params: {
            id: articleData.id,
            subcategory: articleData.subcategory,
          },
        });
        setNextArticle(nextRes.data);
      } catch (error) {
        console.error('Failed to fetch the article or next article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>; // 데이터를 로딩 중임을 표시
  }

  return (
    <>
      <Article article={article} />
      {/* nextArticle이 로드되었을 때만 NextArticle 컴포넌트를 렌더링 */}
      {nextArticle && <NextArticle article={nextArticle} />}
      <Newsletter />
    </>
  );
}