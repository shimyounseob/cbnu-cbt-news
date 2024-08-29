import os
import logging  
from dotenv import load_dotenv
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document

# .env 파일에서 환경 변수 로드
load_dotenv()

# 로깅 설정
logging.basicConfig(level=logging.INFO)

# OpenAI API 키 설정
openai_api_key = os.getenv('OPENAI_API_KEY')

# 문서를 청크로 분할하는 함수
def split_articles(contents):
    """
    텍스트를 청크로 분할합니다.
    """
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    
    documents = []
    for content in contents:
        content_chunks = splitter.split_text(content)
        for chunk in content_chunks:
            documents.append(Document(page_content=chunk))
    return documents

# 사용자 입력에 대한 응답 생성
def get_response(user_input):
    """
    사용자 입력에 대한 응답을 생성합니다.
    """
    logging.info("Generating response for user input")
    
    # 저장된 벡터 스토어 로드
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    vector_store = FAISS.load_local("langchain/vectorstore", embeddings, allow_dangerous_deserialization=True)
    retriever = vector_store.as_retriever()
    
    # 사용자 입력과 관련된 문서 검색
    results = retriever.get_relevant_documents(user_input)
    
    # 검색된 문서의 내용을 청크로 분할
    if results:
        contents = [doc.page_content for doc in results]
        documents = split_articles(contents)
        context = " ".join([doc.page_content for doc in documents])
    else:
        context = "No relevant information found."
    
    # LLM 초기화 및 프롬프트 설정
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, openai_api_key=openai_api_key)
    prompt = hub.pull("teddynote/rag-prompt-korean")

    # 프롬프트에 컨텍스트와 질문을 전달하여 응답 생성
    rag_chain = (
        {"context": RunnablePassthrough(), "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    
    # 응답 생성 및 반환
    response = rag_chain.invoke({"context": context, "question": user_input})
    return response
