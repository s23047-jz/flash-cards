import os.path

import numpy as np
from pydantic import BaseModel
from flair.embeddings import TransformerDocumentEmbeddings
from flair.data import Sentence
from scipy.spatial.distance import cosine
import speech_recognition as sr
from pydub import AudioSegment

from flash_cards_api.config import AUDIO_DIR

from fastapi import (
    APIRouter,
    status,
    UploadFile,
    File,
    HTTPException
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


def convert_m4a_to_wav(file_path: str) -> str:
    audio = AudioSegment.from_file(file_path, format="m4a")
    wav_file = file_path.replace(".m4a", ".wav")
    audio.export(wav_file, format="wav")
    return wav_file


@router.post("/calculate_similarity", status_code=status.HTTP_200_OK)
async def calculate_semantic_similarity(
        text: SimilarityText
):
    try:
        answer = get_most_similar_answer(text.text, qa_pairs)
        print(text.text)
        print(answer)
        return answer
    except Exception:
        return "not found command"


@router.post("/calculate_similarity_audio/", status_code=status.HTTP_200_OK)
async def calculate_semantic_similarity_audio(
    file: UploadFile = File(...)
):
    print("TRING", file.filename)
    if not os.path.exists(AUDIO_DIR):
        os.mkdir(AUDIO_DIR)

    audio_path = os.path.join(
        AUDIO_DIR, file.filename
    )

    with open(audio_path, 'wb') as audio_file:
        audio_file.write(await file.read())

    old_audio_path = audio_path
    audio_path = convert_m4a_to_wav(audio_path)
    # os.remove(old_audio_path)
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_path) as source:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio, language='en-GB')
            command = get_most_similar_answer(text.lower(), qa_pairs)
            return {"command": command}
    except sr.UnknownValueError:
        raise HTTPException(status_code=400, detail="Could not understand the audio")
    except sr.RequestError:
        raise HTTPException(status_code=500, detail="Could not request results from the speech recognition service")
    # finally:
        # os.remove(audio_path)
