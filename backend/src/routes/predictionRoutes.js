const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');

router.use(bodyParser.json());

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
    if (err) throw err;
    const result = JSON.parse(results[0]);
    res.json({
      predictedDisease: result.predictedDisease,
      nextSteps: result.nextSteps
    });
  });
});

module.exports = router;
