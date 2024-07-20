from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle

# Charger le modèle et le label encoder
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Définir le modèle de données pour l'entrée de l'API
class Symptoms(BaseModel):
    anorexia: int
    abdominal_pain: int
    anaemia: int
    abortions: int
    acetone: int
    aggression: int
    arthrogyposis: int
    ankylosis: int
    anxiety: int
    bellowing: int
    blood_loss: int
    blood_poisoning: int
    blisters: int
    colic: int
    Condemnation_of_livers: int
    conjunctivae: int
    coughing: int
    depression: int
    discomfort: int
    dyspnea: int
    dysentery: int
    diarrhoea: int
    dehydration: int
    drooling: int
    dull: int
    decreased_fertility: int
    diffculty_breath: int
    emaciation: int
    encephalitis: int
    fever: int
    facial_paralysis: int
    frothing_of_mouth: int
    frothing: int
    gaseous_stomach: int
    highly_diarrhoea: int
    high_pulse_rate: int
    high_temp: int
    high_proportion: int
    hyperaemia: int
    hydrocephalus: int
    isolation_from_herd: int
    infertility: int
    intermittent_fever: int
    jaundice: int
    ketosis: int
    loss_of_appetite: int
    lameness: int
    lack_of_coordination: int
    lethargy: int
    lacrimation: int
    milk_flakes: int
    milk_watery: int
    milk_clots: int
    mild_diarrhoea: int
    moaning: int
    mucosal_lesions: int
    milk_fever: int
    nausea: int
    nasel_discharges: int
    oedema: int
    pain: int
    painful_tongue: int
    pneumonia: int
    photo_sensitization: int
    quivering_lips: int
    reduction_milk_vields: int
    rapid_breathing: int
    rumenstasis: int
    reduced_rumination: int
    reduced_fertility: int
    reduced_fat: int
    reduces_feed_intake: int
    raised_breathing: int
    stomach_pain: int
    salivation: int
    stillbirths: int
    shallow_breathing: int
    swollen_pharyngeal: int
    swelling: int
    saliva: int
    swollen_tongue: int
    tachycardia: int
    torticollis: int
    udder_swelling: int
    udder_heat: int
    udder_hardeness: int
    udder_redness: int
    udder_pain: int
    unwillingness_to_move: int
    ulcers: int
    vomiting: int
    weight_loss: int
    weakness: int

@app.post("/predict")
async def predict_disease(symptoms: Symptoms):
    try:
        # Convert Symptoms object to DataFrame
        symptoms_df = pd.DataFrame([symptoms.dict()])

        # Assurer que les colonnes du DataFrame correspondent aux noms de caractéristiques utilisés lors de l'entraînement du modèle
        columns = model.feature_names_in_
        for col in columns:
            if col not in symptoms_df.columns:
                symptoms_df[col] = 0
        symptoms_df = symptoms_df[columns]

        # Prédiction
        prediction = model.predict(symptoms_df)
        decoded_prediction = label_encoder.inverse_transform(prediction)
        return {"predicted_disease": decoded_prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)
