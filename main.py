from fastapi import FastAPI
from pydantic import BaseModel
import spacy

# Carrega o modelo do spaCy para reconhecimento de entidades nomeadas (NER)
nlp = spacy.load("en_core_web_sm")

# Inicializa o FastAPI
app = FastAPI()



# Modelo para receber dados JSON
class PromptData(BaseModel):
    prompt: str
    token_count: int

# Função que calcula a complexidade
def calculate_complexity(prompt, token_count):
    complexity_score = 0

    # 1. Número de tokens (já obtido da API da OpenAI)
    if token_count > 20:
        print("muito token")
        complexity_score += 1  # Penalizar prompts muito longos

    # 2. Termos ou tópicos complexos
    complex_terms = ["calcule", "derivar", "resolver", "analisar", "explicar", "teoria", "algoritmo", "pi", "matemática"]
    if any(term in prompt.lower() for term in complex_terms):
        print("termo compleso")
        complexity_score += 3  # Aumenta a pontuação se houver termos complexos

    # 3. Estrutura gramatical
    doc = nlp(prompt)
    complex_phrases = sum(1 for sent in doc.sents if len(list(sent.subtree)) > 10)  # Frases com muitas dependências
    complexity_score += complex_phrases

    # 4. Reconhecimento de entidades nomeadas (NER)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    important_entities = ["PERSON", "ORG", "GPE", "WORK_OF_ART", "LAW", "EVENT"]
    for entity in entities:
        if entity[1] in important_entities:
            print("entidade nomeada")
            complexity_score += 2  # Aumenta a pontuação para tópicos mais avançados (pessoas, organizações, teorias)

    # 5. Penalização para prompts curtos mas complexos
    if token_count < 10 and complexity_score > 3:
        print("prompt curto mas compleso")
        complexity_score += 1  # Um prompt curto, mas com alta complexidade, também tem um aumento leve

    return complexity_score

# Endpoint para calcular a complexidade
@app.post("/calculate_complexity")
def get_complexity(data: PromptData):
    complexity_score = calculate_complexity(data.prompt, data.token_count)
    return {"complexity_score": complexity_score}

