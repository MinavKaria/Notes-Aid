import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import time


st.set_page_config(page_title="Chat with PDF using Gemini", layout="wide")


load_dotenv()
if "GEMINI_API_KEY" not in st.session_state:
    st.session_state.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")


with st.sidebar:
    st.title("PDF Chat Application")
    
    # API key input
    api_key_input = st.text_input("Enter Gemini API Key:", value=st.session_state.GEMINI_API_KEY, type="password")
    if api_key_input != st.session_state.GEMINI_API_KEY:
        st.session_state.GEMINI_API_KEY = api_key_input
    

    st.subheader("Upload Documents")
    pdf_docs = st.file_uploader("Upload PDF Files", accept_multiple_files=True, type=['pdf'])
    
    process_button = st.button("Process Documents")


def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text


def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks


def get_vector_store(text_chunks):
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=st.session_state.GEMINI_API_KEY)
        vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
        
        if not os.path.exists("faiss_indexes"):
            os.makedirs("faiss_indexes")
            
        session_id = st.session_state.get("session_id", int(time.time()))
        st.session_state["session_id"] = session_id
        
        index_path = f"faiss_indexes/index_{session_id}"
        vector_store.save_local(index_path)
        st.session_state["index_path"] = index_path
        
        return True
    except Exception as e:
        st.error(f"Error creating vector store: {str(e)}")
        return False

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context. If the answer is not in
    the provided context, just say "The answer is not available in the context." Don't provide incorrect information.
    
    Context:
    {context}
    
    Question:
    {question}
    
    Answer:
    """
    
    try:
        model = ChatGoogleGenerativeAI(
            model="gemini-1.5-pro",
            google_api_key=st.session_state.GEMINI_API_KEY,
            temperature=0.3,
             max_tokens=None,
            timeout=None,
            max_retries=2,
        )
        
        prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
        
        return chain
    except Exception as e:
        st.error(f"Error creating conversation chain: {str(e)}")
        return None


def process_user_question(user_question):
    try:
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=st.session_state.GEMINI_API_KEY
        )
        
        if "index_path" not in st.session_state:
            st.error("Please process documents first before asking questions.")
            return
        
        with st.spinner("Searching for relevant information..."):
          
            new_db = FAISS.load_local(
                folder_path=st.session_state["index_path"],
                embeddings=embeddings,
                allow_dangerous_deserialization=True
            )
            docs = new_db.similarity_search(user_question)
        
     
        chain = get_conversational_chain()
        if not chain:
            return
        
        with st.spinner("Generating answer..."):
            response = chain(
                {"input_documents": docs, "question": user_question},
                return_only_outputs=True
            )
        
        return response["output_text"]
    
    except Exception as e:
        st.error(f"Error processing question: {str(e)}")
        return None

st.title("Chat with PDF using Gemini AI 💬")


if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

if process_button and pdf_docs:
    if not st.session_state.GEMINI_API_KEY:
        st.sidebar.error("Please enter your Gemini API Key.")
    else:
        with st.spinner("Processing documents..."):
            genai.configure(api_key=st.session_state.GEMINI_API_KEY)
            
            raw_text = get_pdf_text(pdf_docs)
            if not raw_text:
                st.error("Could not extract text from PDFs. Please check your files.")
            else:
                text_chunks = get_text_chunks(raw_text)
                st.info(f"Split documents into {len(text_chunks)} chunks.")
                
                success = get_vector_store(text_chunks)
                if success:
                    st.success("Documents processed successfully! You can now ask questions.")
                    st.session_state.chat_history = []

st.subheader("Ask a Question")
user_question = st.text_input("Enter your question about the documents:")

if user_question:
    if not st.session_state.GEMINI_API_KEY:
        st.error("Please enter your Gemini API Key in the sidebar.")
    else:
        st.session_state.chat_history.append({"role": "user", "content": user_question})
        response = process_user_question(user_question)
        
        if response:
            st.session_state.chat_history.append({"role": "assistant", "content": response})


st.subheader("Conversation")
for message in st.session_state.chat_history:
    if message["role"] == "user":
        st.write(f"👤 **You:** {message['content']}")
    else:
        st.write(f"🤖 **Assistant:** {message['content']}")
        st.markdown("---")

if not pdf_docs:
    st.info("👈 Please upload PDF documents and process them using the sidebar.")


st.markdown("---")
st.caption("Built with Streamlit, LangChain, Google Gemini AI ")
