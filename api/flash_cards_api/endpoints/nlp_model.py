import numpy as np
from pydantic import BaseModel
from flair.embeddings import TransformerDocumentEmbeddings
from flair.data import Sentence
from scipy.spatial.distance import cosine

from fastapi import (
    APIRouter,
    status,
)

router = APIRouter(prefix="/nlp", tags=["nlp_model"])

class SimilarityText(BaseModel):
    text: str


embedding = TransformerDocumentEmbeddings('bert-base-uncased')

qa_pairs = [
    {"q": "next", "a": "next"},
    {"q": "next card", "a": "next"},
    {"q": "next flashcard", "a": "next"},
    {"q": "show next card", "a": "next"},
    {"q": "show me next card", "a": "next"},
    {"q": "show next flashcard", "a": "next"},
    {"q": "show me next flashcard", "a": "next"},
    {"q": "please show me next card", "a": "next"},
    {"q": "please show me forward card", "a": "next"},
    {"q": "please show me Subsequent card", "a": "next"},
    {"q": "previous", "a": "previous"},
    {"q": "previous card", "a": "previous"},
    {"q": "previous flashcard", "a": "previous"},
    {"q": "show me previous card", "a": "previous"},
    {"q": "please show me pior card", "a": "previous"},
    {"q": "please show me former card", "a": "previous"},
    {"q": "show me previous flashcard", "a": "previous"},
    {"q": "please show me previous  card", "a": "previous"},
    {"q": "please show me preceding card", "a": "previous"},
    {"q": "turn", "a": "rotate"},
    {"q": "spin", "a": "rotate"},
    {"q": "rotate", "a": "rotate"},
    {"q": "turn card", "a": "rotate"},
    {"q": "spin card", "a": "rotate"},
    {"q": "rotate card", "a": "rotate"},
    {"q": "spin flashcard", "a": "rotate"},
    {"q": "rotate flashcard", "a": "rotate"},
    {"q": "please turn card", "a": "rotate"},
    {"q": "rotate flashcard", "a": "rotate"},
    {"q": "please rotate card", "a": "rotate"},
    {"q": "please spin card", "a": "rotate"},
    {"q": "read", "a": "read"},
    {"q": "read text", "a": "read"},
    {"q": "read the text", "a": "read"},
    {"q": "read flashcard text", "a": "read"},
    {"q": "please read flashcard text", "a": "read"},
    {"q": "control", "a": "stop"},
    {"q": "stop control", "a": "stop"},
    {"q": "stop voice control", "a": "stop"},
]


def vectorize_text(text):
    sentence = Sentence(text)
    embedding.embed(sentence)
    return sentence.embedding.cpu().detach().numpy()


for pair in qa_pairs:
    pair['q_vectorized'] = vectorize_text(pair['q'])

def get_most_similar_answer(user_question, qa_pairs):

    user_question_vectorized = vectorize_text(user_question)


    similarities = []
    for pair in qa_pairs:
        similarity = 1 - cosine(user_question_vectorized, pair['q_vectorized'])
        similarities.append(similarity)


    most_similar_index = np.argmax(similarities)
    return qa_pairs[most_similar_index]['a']


@router.post("/calculate_similarity", status_code=status.HTTP_200_OK)
async def calculate_semantic_similarity(
        text: SimilarityText
):
    try:
        answer = get_most_similar_answer(text.text, qa_pairs)
        print(text.text)
        print(answer)
        return answer
    except :
        return "not found command"





