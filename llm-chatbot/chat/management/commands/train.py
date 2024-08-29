import os
import mysql.connector  
import logging  
from dotenv import load_dotenv  # dotenv 패키지 가져오기
from langchain.text_splitter import RecursiveCharacterTextSplitter  # 텍스트 분할기 가져오기
from langchain_community.embeddings import OpenAIEmbeddings  # OpenAI 임베딩 가져오기
from langchain_community.vectorstores import FAISS  # FAISS 벡터스토어 가져오기
from langchain.schema import Document  # Document 클래스 가져오기
from langchain_openai import ChatOpenAI  # OpenAI 챗봇 가져오기
from langchain_core.prompts import PromptTemplate  # 프롬프트 템플릿 가져오기
from langchain_core.runnables import RunnablePassthrough  # 실행 가능한 패스스루 가져오기
from langchain_core.output_parsers import StrOutputParser  # 출력 파서 가져오기
from langchain import hub  # LangChain 허브 가져오기
from django.core.management.base import BaseCommand  # Django BaseCommand 가져오기

# .env 파일에서 환경 변수 로드
load_dotenv()

# 로깅 설정
logging.basicConfig(level=logging.INFO)  

# OpenAI API 키 설정
openai_api_key = os.getenv('OPENAI_API_KEY')

# MySQL 데이터베이스에서 기사 내용을 로드
def load_articles_from_db():
    connection = mysql.connector.connect(
        host='localhost', 
        user='root',  
        password='0000', 
        database='cbnu_times' 
    )
    
    cursor = connection.cursor() 
    cursor.execute("SELECT publication_issue, title, content FROM article")  
    articles = cursor.fetchall()  
    cursor.close()  
    connection.close()  
    
    return [
        {
            "publication_issue": article[0], 
            "title": article[1], 
            "content": article[2]
        } 
        for article in articles
    ]

# 텍스트를 청크로 분할
def split_articles(contents):
    logging.info("Splitting articles into chunks")  
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100) 

    documents = [] 
    for content in contents:
        content_chunks = splitter.split_text(content["content"])  # 기사 내용을 청크로 분할함
        for chunk in content_chunks:
            # Document 객체로 변환
            documents.append(Document(
                page_content=chunk,
                metadata={"publication_issue": content["publication_issue"], "title": content["title"]}
            ))
    logging.info("Finished splitting articles")  
    return documents 

# 문서를 임베딩하고 벡터 스토어에 저장
def embed_and_store(documents):
    logging.info("Embedding and storing documents")  
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)  # 환경 변수에서 키 사용
    vector_store = FAISS.from_documents(documents, embeddings)  
    vector_store.save_local("langchain/vectorstore")  # 벡터 스토어를 로컬에 저장함
    logging.info("Finished embedding and storing documents") 
    return vector_store

# 트레이닝
def train_chatbot():
    logging.info("Training chatbot")  
    articles = load_articles_from_db()

    for article in articles:
        logging.info(f"Training on article: {article['title']}")

    documents = split_articles(articles)  
    vector_store = embed_and_store(documents)
    return vector_store

# # 사용자 입력에 대한 응답 생성
# def get_response(user_input):
#     """
#     사용자 입력에 대한 응답을 생성합니다.
#     """
#     logging.info("Generating response for user input")
#     embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
#     vector_store = FAISS.load_local("langchain/vectorstore", embeddings, allow_dangerous_deserialization=True)  # 저장된 벡터스토어 로드
#     retriever = vector_store.as_retriever()
#     results = retriever.get_relevant_documents(user_input)
#     context = results[0].page_content if results else "No relevant information found."
    
#     # LLM 초기화 및 프롬프트 설정
#     llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, openai_api_key=openai_api_key)
#     prompt = hub.pull("teddynote/rag-prompt-korean")

#     # 프롬프트에 컨텍스트와 질문을 전달하여 응답 생성
#     rag_chain = (
#         {"context": RunnablePassthrough(), "question": RunnablePassthrough()}
#         | prompt
#         | llm
#         | StrOutputParser()
#     )
    
#     response = rag_chain.invoke({"context": context, "question": user_input})
#     logging.info(f"Generated response: {response}")
#     return response

# # 스트리밍 출력을 위한 헬퍼 클래스
# class StreamChain:
#     """
#     스트리밍 출력을 위한 헬퍼 클래스입니다.
#     """
#     def __init__(self, chain):
#         self.chain = chain

#     def stream(self, query):
#         response = self.chain.stream(query)
#         complete_response = ""
#         for token in response:
#             print(token, end="", flush=True)
#             complete_response += token
#         return complete_response

# # Django 명령어를 정의하는 클래스
# class Command(BaseCommand):
#     help = "Train the chatbot using articles from the database and provide responses."

#     def handle(self, *args, **options):
#         # 벡터 스토어 학습
#         vector_store = train_chatbot()

#         # 예시 질문에 대한 응답 생성
#         example_question = "summarize news article The Biggest Israeli Protest Over Judicial Overhaul."
#         response = get_response(example_question)
#         print(response)
