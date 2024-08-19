const express = require('express');
const router = express.Router();
const db = require('../models');

// 최신 발간호의 Campus-Main 기사 가져오기
router.get('/latest-cover-story', async (req, res) => {
    try {
        const latestCoverStory = await db.Article.findAll({
            where: { subcategory: 'Campus Main' },
            include: [{
                model: db.Writer,
                as: 'writer',
                attributes: ['english_name', 'photo'],
                through: {
                    where: { role: 'main' } // main 역할을 가진 기자만 포함
                }
            }],
            order: [['publication_issue', 'DESC']], // 가장 최신 발간호의 기사 가져옴
            limit: 2
        });

        if (!latestCoverStory) {
            return res.status(404).json({ error: 'No articles found' });
        }

        res.json(latestCoverStory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 최신 발간호의 특정 카테고리 기사 가져오기
router.get('/latest-recent-stories', async (req, res) => {
    try {
        const categoriesToInclude = ['Campus News', 'Society', 'Global', 'Feature', 'Culture', 'People', 'Experience'];

        const recentArticles = await db.Article.findAll({
            where: {
                subcategory: categoriesToInclude
            },
            include: [{
                model: db.Writer,
                as: 'writer',
                attributes: ['english_name', 'photo'],
                through: {
                    where: { role: 'main' } // main 역할을 가진 기자만 포함
                }
            }],
            order: [['publication_issue', 'DESC']], // 가장 최신 발간호의 기사 가져옴
            limit: 18
        });

        if (recentArticles.length === 0) {
            return res.status(404).json({ error: 'No articles found' });
        }

        res.json(recentArticles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// 특정 id에 해당하는 기사 다음 기사 미리보기를 가져오기
router.get('/next-article', async (req, res) => {
    const { id, subcategory } = req.query;
    const articleId = parseInt(id, 10); // ID를 정수로 변환
    console.log( "id, category: ", id,subcategory) ; 

    try {
        const articlesInSameCategory = await db.Article.findAll({
            where: {
                subcategory: subcategory, // 카테고리 필터
                id: { [db.Sequelize.Op.ne]: articleId } // 현재 ID와 다른 기사 필터
            },
            limit: 1, // 하나의 기사를 선택
            order: db.Sequelize.literal('RAND()') // 무작위 선택
        });

        if (articlesInSameCategory.length === 0) {
            return res.status(404).json({ error: 'No articles found' });
        }

        res.json(articlesInSameCategory[0]); // 첫 번째 기사 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 세부 카테고리가 'Column', 'Photo', 'Cartoon'인 기사들 가져오기 (사이드 바에 사용)
router.get('/latest-column-photo', async (req, res) => {
    try {
        const specialCategories = ['Column', 'Photo', 'Cartoon']; // 대상 세부 카테고리

        const specialArticles = await db.Article.findAll({
            where: {
                subcategory: specialCategories // 세부 카테고리 필터링
            },
            include: [{
                model: db.Writer,
                as: 'writer',
                attributes: ['english_name', 'photo'], // 기자의 이름과 사진 포함
                through: {
                    where: { role: 'main' } // main 역할을 가진 기자만 포함
                }
            }],
            order: [['publication_issue', 'DESC']], // 최신 발간 순으로 정렬
            limit: 4 // 최대 4개의 기사만 가져옴
        });

        if (specialArticles.length === 0) {
            return res.status(404).json({ error: 'No articles found' });
        }

        res.json(specialArticles); // 가져온 기사들을 응답으로 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// 최신 3개 발간호에서 조회수가 가장 많은 6개의 기사 가져오기
router.get('/most-read-articles', async (req, res) => {
    try {
        // 최신 3개의 발간호 가져오기
        const latestIssues = await db.Article.findAll({
            attributes: ['publication_issue'],
            group: ['publication_issue'],
            order: [['publication_issue', 'DESC']],
            limit: 3
        });

        if (latestIssues.length === 0) {
            return res.status(404).json({ error: 'No issues found' });
        }

        // 최신 3개의 발간호 중에서 조회수가 가장 많은 6개의 기사 가져오기
        const mostReadArticles = await db.Article.findAll({
            where: {
                publication_issue: latestIssues.map(issue => issue.publication_issue) // 최신 발간호 필터링
            },
            include: [{
                model: db.Writer,
                as: 'writer',
                attributes: ['english_name', 'photo'], // 기자의 이름과 사진 포함
                through: {
                    where: { role: 'main' } // main 역할을 가진 기자만 포함
                }
            }],
            order: [['view_count', 'DESC']], // 조회수 기준 내림차순 정렬
            limit: 6 // 최대 6개의 기사만 가져옴
        });

        if (mostReadArticles.length === 0) {
            return res.status(404).json({ error: 'No articles found' });
        }

        res.json(mostReadArticles); // 가져온 기사들을 응답으로 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 특정 id에 해당하는 기사 가져오기
router.get('/:id', async (req, res) => {
    try {
        const article = await db.Article.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.Writer,
                as: 'writer', 
                attributes: ['english_name', 'photo','email'], 
                through: {
                    model: db.Articlewriter, 
                    attributes: ['role']
                }
            }]
        });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
