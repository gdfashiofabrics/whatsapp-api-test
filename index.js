const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ ROOT HEALTH CHECK
app.get("/", (req, res) => {
  res.send("WhatsApp API server is running");
});

// ✅ SEND TEST MESSAGE
app.get("/send-test", async (req, res) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "919330815334",   // 👈 your number, country code included
          type: "text",
          text: {
            body: "Hello 👋 This is your first WhatsApp API test message."
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

