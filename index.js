const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Health check route
app.get("/", (req, res) => {
  res.send("WhatsApp API server is running");
});

// Send welcome template
app.get("/send-welcome", async (req, res) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "919831215334",
          type: "template",
          template: {
            name: "welcome_gd_fashion",
            language: { code: "en" }
          }
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
