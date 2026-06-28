const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser ton site frontend à interagir avec le serveur
app.use(cors());
app.use(express.json());

// Récupération de ta clé sécurisée stockée sur Render
const piApiKey = process.env.PI_API_KEY;

// Une route simple pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Le serveur PiXchange est en ligne et sécurisé !');
});

// Route test pour vérifier si la clé est bien détectée (sans l'afficher en entier)
app.get('/check-config', (req, res) => {
  if (piApiKey) {
    res.json({ status: "success", message: "La clé Pi API est bien configurée en arrière-plan." });
  } else {
    res.json({ status: "error", message: "Attention, la clé PI_API_KEY est manquante." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
