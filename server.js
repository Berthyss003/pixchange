const express = require('express');
const cors = require('cors');
const path = require('path'); // Permet de gérer les fichiers
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Permet de lire les fichiers de ton projet (CSS, images, etc.)
app.use(express.static(path.join(__dirname)));

const piApiKey = process.env.PI_API_KEY;

// MODIFICATION : L'adresse principale affiche maintenant ton fichier index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route de test pour la clé
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
