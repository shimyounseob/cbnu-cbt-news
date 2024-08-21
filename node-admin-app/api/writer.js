const express = require('express');
const router = express.Router();
const db = require('../models');

// 아이디 값을 통해 특정 기자의 정보를 가져오기
router.get('/:id', async (req, res) => {
    const { id } = req.params;  

    try {
        // 데이터베이스에서 해당 기자의 정보를 가져오기
        const writer = await db.Writer.findOne({
            where: { id: id },  // 수정된 id 변수 사용
            attributes: ['english_name', 'photo', 'email', 'department', 'position', 'id'], // 필요한 기자 정보 필드만 포함
        });

        if (!writer) {
            return res.status(404).json({ error: 'Writer not found' });
        }

        res.json(writer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
