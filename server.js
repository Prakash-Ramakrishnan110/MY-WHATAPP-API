const express = require("express");
const cors = require("cors");
const { create } = require("@open-wa/wa-automate");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
let waClient = null;

/* ================================
   START WHATSAPP CLIENT
================================ */
create({
  sessionId: "whatsapp-api",
  multiDevice: true,
  headless: true,
  authTimeout: 0,
  qrTimeout: 0,
  restartOnCrash: true,
})
  .then((client) => {
    waClient = client;
    console.log("✅ WhatsApp Connected and Ready");
  })
  .catch((err) => {
    console.error("❌ WhatsApp Init Error:", err);
  });

/* ================================
   HEALTH CHECK
================================ */
app.get("/", (req, res) => {
  res.json({
    status: "WhatsApp API running",
    whatsapp: waClient ? "connected" : "connecting",
  });
});

/* ================================
   SEND MESSAGE API
================================ */
app.post("/send", async (req, res) => {
  try {
    if (!waClient) {
      return res.status(503).json({
        error: "WhatsApp not ready yet. Please try again.",
      });
    }

    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        error: "to & message required",
      });
    }

    const chatId = to.includes("@c.us") ? to : `${to}@c.us`;

    await waClient.sendText(chatId, message);

    return res.json({
      status: "Message command sent",
      to: chatId,
    });
  } catch (err) {
    console.error("❌ Send Error:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

/* ================================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
