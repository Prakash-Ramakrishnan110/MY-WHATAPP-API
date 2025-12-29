const express = require("express");
const cors = require("cors");
const { create } = require("@open-wa/wa-automate");

const app = express();
app.use(cors());
app.use(express.json());

let client;

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "WhatsApp API running",
    whatsapp: client ? "connected" : "connecting"
  });
});

// Send message API
app.post("/send", async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "to & message required" });
    }

    const chatId = to.includes("@c.us") ? to : `${to}@c.us`;

    await client.sendText(chatId, message);

    res.json({
      success: true,
      to: chatId,
      message
    });

  } catch (err) {
    console.error("SEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// START WHATSAPP
(async () => {
  try {
    client = await create({
      sessionId: "render-session",
      headless: true,
      qrTimeout: 0,
      authTimeout: 0,
      restartOnCrash: true,
      disableSpins: true,
      useChrome: true,
      browserArgs: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote"
      ]
    });

    console.log("✅ WhatsApp Connected and Ready");

    client.onMessage(async (msg) => {
      console.log("📩 Incoming:", msg.from, msg.body);
    });

  } catch (err) {
    console.error("❌ WhatsApp launch failed:", err);
  }
})();
