const express = require('express');
const Message = require('../models/message');

const router = express.Router();

// 메시지 생성
router.post('/', async (req, res) => {
    try {
        const messageData = {
            ...req.body,
            createdAt: new Date(), // 현재 시간을 createdAt 필드에 추가하기
        };

        const message = new Message(messageData);
        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 특정 채팅방의 메시지 가져오기
router.get('/:chatRoomId', async (req, res) => {
    try {
        const messages = await Message.find({ chatRoom: req.params.chatRoomId });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
