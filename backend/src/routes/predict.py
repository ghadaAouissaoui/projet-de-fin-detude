import sys
import json
import pandas as pd
import pickle

# Charger le modèle
with open('src/cattle/model.pkl', 'rb') as f:
    model = pickle.load(f)

# Charger le LabelEncoder
with open('src/cattle/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Vérifier si des arguments sont passés
if len(sys.argv) > 1:
    try:
        # Lire les données JSON depuis le premier argument
        symptoms_data = json.loads(sys.argv[1])
        
        # Créer un DataFrame à partir des données
        new_example_df = pd.DataFrame([symptoms_data])
        
        # Faire la prédiction pour le nouvel exemple
        predictions = model.predict(new_example_df)
        
        # Décoder les prédictions en utilisant le LabelEncoder inverse
        decoded_predictions = label_encoder.inverse_transform(predictions)
        
        # Simuler les prochaines étapes basées sur la maladie prédite
        # next_steps = ["Step 1", "Step 2", "Step 3"]  # Vous pouvez adapter cette liste selon vos besoins
        
        # Retourner les prédictions
        result = {
            "predictedDisease": decoded_predictions[0],
            # "nextSteps": next_steps
        }
        
        print(json.dumps(result))
        
    except json.JSONDecodeError as e:
        print(f"Erreur de décodage JSON : {str(e)}", file=sys.stderr)
        sys.exit(1)
    
else:
    print("Aucun argument passé au script.", file=sys.stderr)
    sys.exit(1)
