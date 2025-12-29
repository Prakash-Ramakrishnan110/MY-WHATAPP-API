📱 MY WHATSAPP API

A custom WhatsApp API built using Open-WA, Node.js, and Express, without using the official Meta (WhatsApp Cloud) API.
This project allows you to send and receive WhatsApp messages programmatically using WhatsApp Web automation.

🚀 Features

✅ Send WhatsApp text messages via REST API

✅ Receive incoming messages (webhook-style logging)

✅ No Meta / Cloud API required

✅ Works with personal WhatsApp account

✅ Ready for cloud deployment (Render compatible)

✅ Beginner-friendly setup

🛠️ Tech Stack

Node.js (18.x)

Express.js

@open-wa/wa-automate

Puppeteer (Headless Chrome)

WhatsApp Web

📂 Project Structure
MY-WHATAPP-API/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

⚙️ Installation (Local Setup)
1️⃣ Clone the Repository
git clone https://github.com/Prakash-Ramakrishnan110/MY-WHATAPP-API.git
cd MY-WHATAPP-API

2️⃣ Install Dependencies
npm install

3️⃣ Start the Server
node server.js

📲 WhatsApp Login

On first run, a QR code will be shown in the terminal

Open WhatsApp on your phone

Go to Linked Devices → Link a Device

Scan the QR code

✅ Once scanned, WhatsApp will stay connected using a local session.

🔗 API Endpoints
🟢 Health Check

GET /

{
  "status": "WhatsApp API running",
  "whatsapp": "connected"
}

✉️ Send Message

POST /send

Request Body

{
  "to": "91XXXXXXXXXX",
  "message": "Hello 👋 This message is sent from my WhatsApp API"
}


Response

{
  "success": true,
  "to": "91XXXXXXXXXX@c.us",
  "message": "Hello 👋 This message is sent from my WhatsApp API"
}


📌 Note:

Number must include country code

Without a license, the number should be saved in contacts

☁️ Deployment (Render)

This project is Render-ready.

Recommended Settings:

Environment: Node

Node Version: 18.x

Build Command: npm install

Start Command: npm start

⚠️ Render does not show QR codes.
Login should be done locally first or via advanced pairing methods.

⚠️ Limitations (Without Open-WA License)
Feature	Status
Send to saved contacts	✅
Send to unknown numbers	❌
Number validation	❌
Bulk messaging	❌

🔓 These limits can be removed by purchasing an Open-WA license.

🔐 Security Notes

Do NOT commit:

node_modules

WhatsApp session folders

These are safely ignored via .gitignore

📌 Use Cases

WhatsApp automation

Chatbots

Business notifications

CRM integrations

n8n / workflow automation

SaaS experiments

👨‍💻 Author

Prakash Ramakrishnan
India 🇮🇳

GitHub:
👉 https://github.com/Prakash-Ramakrishnan110

⚠️ Disclaimer

This project uses WhatsApp Web automation.
It is intended for educational and personal use.
Use responsibly and comply with WhatsApp’s terms of service.

⭐ Support

If you like this project:

⭐ Star the repository

🍴 Fork it

🛠️ Improve it
