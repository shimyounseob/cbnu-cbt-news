const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    roomName: { type: String, required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 채팅방을 특정 사용자와 연결하기
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
