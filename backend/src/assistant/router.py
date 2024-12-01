from fastapi import APIRouter

from src.assistant.schemas import UserQuestion

router = APIRouter(tags=["Assistant"])

import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain import hub
from langchain_community.document_loaders import UnstructuredExcelLoader
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.chat_models import GigaChat


# Load LLM and other components
llm = GigaChat(credentials=os.getenv("API"), scope=os.getenv("SCOPE"), verify_ssl_certs=False)

# Load documents from Excel file
loader = SQLDatabaseLoader("./database.sql", mode="elements")
docs = loader.load()

# Split documents into manageable chunks
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(docs)

# Create embeddings and vector store
embedding_function = SentenceTransformerEmbeddings(model_name="sergeyzh/rubert-tiny-turbo")
db = Chroma.from_documents(docs, embedding_function)
retriever = db.as_retriever()
prompt = hub.pull("gigachat/rag-prompt")


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
)


@router.post("/ask", response_model=str)
async def ask_question(user_question: UserQuestion):
    if not user_question.question:
        raise HTTPException(status_code=400, detail="Question must be provided.")

    answer = rag_chain.invoke(user_question.question)
    return answer
