const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');


router.post('/', (req, res) => {
  const symptomsData = req.body;

  // Convertir les données en format requis par le modèle Python
  let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'path/to/your/python/script',
    args: [JSON.stringify(symptomsData)]
  };

  PythonShell.run('predict.py', options, function (err, results) {
    if (err) throw err;
    res.json({
      predictedDisease: results[0].predictedDisease,
      nextSteps: results[0].nextSteps
    });
  });
});




module.exports = router;
