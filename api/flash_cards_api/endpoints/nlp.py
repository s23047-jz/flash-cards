from pydantic import BaseModel
from transformers import ElectraTokenizer, ElectraModel
import torch
import time

from fastapi import (
    APIRouter,
    status,
)

router = APIRouter(prefix="/nlp", tags=["nlp_model"])

class SimilarityRequest(BaseModel):
    sentence: str
    use_gpu: bool


def calculate_semantic_similarity(sentence: str, use_gpu: bool = False):
    tokenizer = ElectraTokenizer.from_pretrained('google/electra-small-discriminator')
    model = ElectraModel.from_pretrained('google/electra-small-discriminator')
    sentence_list = [
        "show me previous flashcard",
        "show me prior flashcard",
        "show me next flashcard",
        "show me follow flashcard",
        "please spin flashcard",
        "please rotate flashcard",
        "read the text of flashcard",
        "show me next card and read the text",
        "show me follow card and read the text",
        "show me previous card and read the text",
        "show me prior card and read the text"
    ]


    device = torch.device("cuda" if use_gpu and torch.cuda.is_available() else "cpu")
    model.to(device)


    sentence_tokens = tokenizer(sentence, return_tensors='pt').to(device)


    start_time = time.time()
    with torch.no_grad():
        sentence_outputs = model(**sentence_tokens)


    sentence_embedding = sentence_outputs.last_hidden_state.mean(dim=1).squeeze()


    compare_tokens = tokenizer(sentence_list, return_tensors='pt', padding=True, truncation=True).to(device)


    with torch.no_grad():
        compare_outputs = model(**compare_tokens)


    compare_embeddings = compare_outputs.last_hidden_state.mean(dim=1)


    similarities = []
    for i, compare_embedding in enumerate(compare_embeddings):
        similarity = torch.nn.functional.cosine_similarity(sentence_embedding, compare_embedding, dim=0)
        similarities.append((sentence_list[i], similarity.item()))

    end_time = time.time()
    print(end_time - start_time)
    return similarities

@router.post("/calculate_similarity", status_code=status.HTTP_200_OK)
async def calculate_semantic_similarity(similarity_request: SimilarityRequest):
    similarities = calculate_semantic_similarity(
        similarity_request.sentence,
    )
    return similarities

