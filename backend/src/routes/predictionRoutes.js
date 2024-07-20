const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');

// Utilisation de express.json() pour parser les requêtes JSON
router.use(express.json());

router.post('/', (req, res) => {
  const symptomsData = req.body;

  // Convertir les données en format requis par le modèle Python
  let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: './src/routes',
    args: [JSON.stringify(symptomsData)]
  };

  PythonShell.run('predict.py', options, function (err, results) {
    if (err) {
      console.error('Erreur lors de l\'exécution du script Python :', err);
      return res.status(500).json({ error: 'Erreur lors de la prédiction' });
    }

    try {
      const result = JSON.parse(results[0]);
      res.json({
        predictedDisease: result.predictedDisease,
        // nextSteps: result.nextSteps
      });
    } catch (parseErr) {
      console.error('Erreur lors du parsing du résultat JSON :', parseErr);
      res.status(500).json({ error: 'Erreur lors de la lecture du résultat de la prédiction' });
    }
  });
});

module.exports = router;
