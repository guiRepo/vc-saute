const express = require('express');
const app = express();

app.use(express.json()); 

app.get('/home', (req, res) => {
  res.status(200).json('Welcome page');
});

app.post("/contacts", async (req, res) => {
  const { email, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json({ error: "O campo 'email' é obrigatório" });
  }

  const payload = {
    contact: {
      email,
      firstName: firstName || "",
      lastName: lastName || ""
    }
  };

  try {
    const acResponse = await fetch('https://loginsohmnia.api-us1.com/api/3/contacts', {
      method: "POST",
      headers: {
        "Api-Token": "c500d78f17c77387b9c3d8762d93a5ab3121cb736f9b133b7d18f262f5caf44a26ffd344",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await acResponse.json();
    res.status(acResponse.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar contato no ActiveCampaign" });
  }
});

module.exports = app;
