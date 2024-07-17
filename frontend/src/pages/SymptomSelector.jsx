import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

const symptomsList = [
  'anorexia', 'abdominal_pain', 'anaemia', 'abortions', 'acetone', 'aggression', 'arthrogyposis', 'ankylosis',
  'anxiety', 'bellowing', 'blood_loss', 'blood_poisoning', 'blisters', 'colic', 'Condemnation_of_livers', 
  'conjunctivae', 'coughing', 'depression', 'discomfort', 'dyspnea', 'dysentery', 'diarrhoea', 'dehydration', 
  'drooling', 'dull', 'decreased_fertility', 'diffculty_breath', 'emaciation', 'encephalitis', 'fever', 
  'facial_paralysis', 'frothing_of_mouth', 'frothing', 'gaseous_stomach', 'highly_diarrhoea', 'high_pulse_rate', 
  'high_temp', 'high_proportion', 'hyperaemia', 'hydrocephalus', 'isolation_from_herd', 'infertility', 
  'intermittent_fever', 'jaundice', 'ketosis', 'loss_of_appetite', 'lameness', 'lack_of-coordination', 'lethargy', 
  'lacrimation', 'milk_flakes', 'milk_watery', 'milk_clots', 'mild_diarrhoea', 'moaning', 'mucosal_lesions', 
  'milk_fever', 'nausea', 'nasel_discharges', 'oedema', 'pain', 'painful_tongue', 'pneumonia', 
  'photo_sensitization', 'quivering_lips', 'reduction_milk_vields', 'rapid_breathing', 'rumenstasis', 
  'reduced_rumination', 'reduced_fertility', 'reduced_fat', 'reduces_feed_intake', 'raised_breathing', 
  'stomach_pain', 'salivation', 'stillbirths', 'shallow_breathing', 'swollen_pharyngeal', 'swelling', 'saliva', 
  'swollen_tongue', 'tachycardia', 'torticollis', 'udder_swelling', 'udder_heat', 'udder_hardeness', 'udder_redness', 
  'udder_pain', 'unwillingness_to_move', 'ulcers', 'vomiting', 'weight_loss', 'weakness'
];

export default function SymptomSelector() {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    symptoms: symptomsList.reduce((acc, symptom) => {
      acc[symptom] = false;
      return acc;
    }, {}),
    predictedDisease: "",
    nextSteps: [],
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      symptoms: {
        ...prevData.symptoms,
        [name]: checked,
      },
    }));
  };

  const handlePredict = async () => {
    // Faire une requête au serveur pour la prédiction
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.symptoms),
    });
    
    const result = await response.json();

    setFormData((prevData) => ({
      ...prevData,
      predictedDisease: result.predictedDisease,
      nextSteps: result.nextSteps,
    }));
    setConfirmDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSavePrediction = () => {
    setConfirmDialogOpen(false);
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background ">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center">
            <Typography variant="h3" component="h1" className="font-bold">
              Animal Disease Predictor
            </Typography>
            <Typography variant="body1" className="mt-3">
              Identify potential animal diseases based on selected symptoms.
            </Typography>
          </div>
          <Card>
            <CardContent className="space-y-6">
              <div>
                <Typography variant="h5" component="h2" className="font-semibold">
                  Select Symptoms
                </Typography>
                <Grid container spacing={2} className="mt-4">
                  {symptomsList.map((symptom) => (
                    <Grid item xs={6} sm={4} md={3} key={symptom}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.symptoms[symptom]}
                            onChange={handleCheckboxChange}
                            name={symptom}
                          />
                        }
                        label={symptom.replace('_', ' ')}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePredict}
                >
                  Predict
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={confirmDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Disease Prediction</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Predicted Disease: {formData.predictedDisease}</Typography>
          <Typography variant="body1" className="mt-2">
            {formData.predictedDisease} is a highly contagious disease that affects animals. Proper hygiene and disinfection are crucial to prevent the spread of the disease to other animals.
          </Typography>
          <Typography variant="h6" className="mt-4">Recommended Next Steps</Typography>
          <ul>
            {formData.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleSavePrediction} color="primary">
            Save Prediction
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
