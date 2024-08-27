import json
import logging
import requests
from channels.generic.websocket import AsyncWebsocketConsumer
from .langchatbot import get_response  # LLM과 통신하는 함수 가져오기

# 로그 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.google_id = self.scope['url_route']['kwargs']['googleId']  # googleId 가져오기
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        # googleId와 room_name을 결합하여 고유한 room_group_name 생성
        self.room_group_name = f'chat_{self.google_id}_{self.room_name}'

        # 그룹에 가입
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # 그룹에서 탈퇴
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # 로그 출력 - 받은 원시 데이터
        logging.info(f"Received raw text_data: {text_data}")
        
        # JSON 파싱
        text_data_json = json.loads(text_data)
        logging.info(f"Parsed JSON data: {text_data_json}")
        
        # 메시지 추출
        user_message = text_data_json.get('message')
        logging.info(f"Extracted message: {user_message}")
        
        # LLM에게 메시지를 보내고 응답 받기
        llm_response = get_response(user_message)
        logging.info(f"LLM response: {llm_response}")

        # 사용자 메시지와 LLM 응답을 저장
        user_id = self.google_id  # 또는 user의 _id 가져오기 로직
        message_data = {
            "chatRoom": self.room_name,
            "sender": user_id,
            "message": user_message
        }

        llm_message_data = {
            "chatRoom": self.room_name,
            "sender": "GPT",  # LLM의 응답은 시스템으로 처리
            "message": llm_response
        }

        # 사용자 메시지 저장
        save_user_response = requests.post("http://localhost:5001/messages", json=message_data)
        logging.info(f"User message save response: {save_user_response.status_code}, {save_user_response.text}")

        # LLM 응답 메시지 저장
        save_llm_response = requests.post("http://localhost:5001/messages", json=llm_message_data)
        logging.info(f"LLM message save response: {save_llm_response.status_code}, {save_llm_response.text}")

        # 그룹에 메시지를 보내기 (LLM의 응답을)
        logging.info(f"Sending LLM response to group {self.room_group_name}")
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': llm_response  # LLM 응답을 메시지로 보냄
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # WebSocket에 메시지를 보내기
        await self.send(text_data=json.dumps({
            'message': message
        }))
