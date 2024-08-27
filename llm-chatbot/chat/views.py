# chat/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .langchatbot import get_response  # LangChain 기반의 응답 생성 함수를 가져옵니다

@csrf_exempt
def langchain_response(request):
    """
    사용자로부터 POST 요청을 받아 LangChain 챗봇 응답을 생성합니다.
    """
    if request.method == 'POST':
        try:
            # 요청 본문에서 'prompt'를 가져옵니다
            data = json.loads(request.body)
            prompt = data.get('prompt')
            
            # LangChain 기반 응답 생성
            response = get_response(prompt)
            return JsonResponse({'response': response})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
