const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios'); // Ajouté pour communiquer avec l'API Pi
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const piApiKey = process.env.PI_API_KEY;

// Page principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 1. ROUTE D'APPROBATION DU PAIEMENT (Demande de la blockchain)
app.post('/approve-payment', async (req, res) => {
  const { paymentId } = req.body;
  
  try {
    // On dit à l'API Pi qu'on approuve le paiement
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { Authorization: `Key ${piApiKey}` } }
    );
    res.json({ status: "success", data: response.data });
  } catch (error) {
    console.error("Erreur approbation:", error.response ? error.response.data : error.message);
    res.status(500).json({ status: "error", message: "Impossible d'approuver le paiement." });
  }
});

// 2. ROUTE DE COMPLÉTION DU PAIEMENT (Une fois le paiement soumis à la blockchain)
app.post('/complete-payment', async (req, res) => {
  const { paymentId, txid } = req.body;
  
  try {
    // On valide définitivement la transaction avec son identifiant (txid)
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid: txid },
      { headers: { Authorization: `Key ${piApiKey}` } }
    );
    res.json({ status: "success", data: response.data });
  } catch (error) {
    console.error("Erreur complétion:", error.response ? error.response.data : error.message);
    res.status(500).json({ status: "error", message: "Impossible de compléter le paiement." });
  }
});

// Route de test
app.get('/check-config', (req, res) => {
  if (piApiKey) {
    res.json({ status: "success", message: "La clé Pi API est bien configurée en arrière-plan." });
  } else {
    res.json({ status: "error", message: "Clé PI_API_KEY manquante." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

