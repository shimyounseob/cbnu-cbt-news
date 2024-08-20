const express = require('express');
const router = express.Router();
const db = require('../models');

// 특정 기자의 정보를 가져오는 엔드포인트
router.get('/:id', async (req, res) => {
    const { id } = req.params;  // 요청 매개변수의 이름과 일치하게 변경

    try {
        // 데이터베이스에서 해당 기자의 정보를 가져옵니다.
        const writer = await db.Writer.findOne({
            where: { id: id },  // 수정된 id 변수 사용
            attributes: ['english_name', 'photo', 'email', 'department', 'position', 'id'], // 필요한 기자 정보 필드만 포함
        });

        // 기자 정보가 없는 경우 404 에러를 반환합니다.
        if (!writer) {
            return res.status(404).json({ error: 'Writer not found' });
        }

        // 성공적으로 기자 정보를 가져온 경우, 응답으로 반환합니다.
        res.json(writer);
    } catch (error) {
        console.error(error);
        // 서버 에러가 발생한 경우 500 에러를 반환합니다.
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
