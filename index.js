import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WhatsApp API server running");
});

app.get("/send-test", async (req, res) => {
  try {
    const phoneNumberId = process.env.PHONE_NUMBER_ID;
    const token = process.env.WHATSAPP_TOKEN;

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "919831215334",
          type: "template",
          template: {
            name: "hello_world",
            language: { code: "en_US" }
          }
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
