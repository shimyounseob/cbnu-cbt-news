from django.urls import path
from .views import langchain_response

urlpatterns = [
    path('langchain/', langchain_response, name='langchain_response'),  # LangChain 응답 엔드포인트 설정
]