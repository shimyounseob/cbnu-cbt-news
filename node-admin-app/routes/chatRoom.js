const express = require('express');
const ChatRoom = require('../models/chatRoom');
const User = require('../models/user'); // 사용자 모델 불러오기

const router = express.Router();

// 채팅방 생성
router.post('/:googleId', async (req, res) => {
    try {
        const { roomName } = req.body; // 요청에서 받은 roomName 사용하기
        const googleId = req.params.googleId; // URL에서 사용자 googleId 가져오기

        if (!roomName || !googleId) {
            return res.status(400).json({ message: 'roomName and googleId are required.' }); // 필수 항목 체크하기
        }

        const user = await User.findOne({ googleId }); // 사용자 찾기
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // 사용자를 찾지 못한 경우 처리하기
        }

        const chatRoom = new ChatRoom({ roomName, user: user._id }); // 새로운 채팅방 생성하기
        await chatRoom.save(); // 채팅방 저장하기
        res.status(201).json(chatRoom); // 생성된 채팅방 반환하기
    } catch (err) {
        res.status(400).json({ message: err.message }); // 에러 발생 시 처리하기
    }
});

// 특정 채팅방 가져오기
router.get('/:googleId', async (req, res) => {
    try {
        const googleId = req.params.googleId.toString(); // googleId를 문자열로 처리하기
        const user = await User.findOne({ googleId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // 사용자를 찾지 못한 경우 처리하기
        }

        const chatRooms = await ChatRoom.find({ user: user._id }); // 사용자 ID로 채팅방 찾기
        res.json(chatRooms); // 채팅방 정보 반환하기
    } catch (err) {
        res.status(500).json({ message: err.message }); // 서버 에러 처리하기
    }
});

// 채팅방 수정
router.put('/:id', async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findByIdAndUpdate(req.params.id, { roomName: req.body.roomName }, { new: true }); // 채팅방 이름 수정하기
        if (!chatRoom) return res.status(404).json({ message: 'Chat room not found' }); // 채팅방을 찾지 못한 경우 처리하기
        res.json(chatRoom); // 수정된 채팅방 정보 반환하기
    } catch (err) {
        res.status(500).json({ message: err.message }); // 서버 에러 처리하기
    }
});

// 채팅방 삭제
router.delete('/:id', async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findByIdAndDelete(req.params.id); // 채팅방 삭제하기
        if (!chatRoom) return res.status(404).json({ message: 'Chat room not found' }); // 채팅방을 찾지 못한 경우 처리하기
        res.json({ message: 'Chat room deleted' }); // 삭제 완료 메시지 반환하기
    } catch (err) {
        res.status(500).json({ message: err.message }); // 서버 에러 처리하기
    }
});

module.exports = router;
