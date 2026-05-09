# 📬 Abhradeep Biswas — Portfolio Backend

A lightweight, secure **Node.js + Express** backend that powers the contact form of [abhradeep.com](https://abhradeep.com). It validates submissions, verifies reCAPTCHA v3, and sends transactional emails via **Nodemailer** (SMTP / Gmail).

---

## ✨ Features

- 📧 **Dual email flow** — one email to the portfolio owner, one auto-reply to the sender
- 🛡️ **reCAPTCHA v3** — bot protection on the contact endpoint
- 🔒 **Helmet** — sets secure HTTP headers
- 🚦 **Rate limiting** — 10 requests per IP per 15 min on `/api/v1/contact`
- 🌐 **CORS** — configurable allowed origins via env
- 🐳 **Docker ready** — includes a production-ready `Dockerfile`
- ❤️ **Health check endpoint** — `GET /health`

---

## 🗂️ Project Structure

```
src/
├── config/
│   └── rateLimit.config.js     # Smart IP-based rate limiter (proxy-aware)
├── controllers/
│   └── contact.controller.js   # Email logic + reCAPTCHA verification
├── routers/
│   └── contact.route.js        # POST /api/v1/contact
├── utility/
│   ├── ApiError.js             # Structured error class
│   ├── ApiResponse.js          # Consistent response wrapper
│   └── requestHandeller.js     # Async error handler
├── app.js                      # Express app setup (middleware, routes)
└── server.js                   # Entry point — starts HTTP server
```

---

## 🌐 API Reference

### Health Check

```
GET /health
```

**Response:**
```json
{ "status": "ok", "uptime": "123.45s" }
```

---

### Send Contact Email

```
POST /api/v1/contact
Content-Type: application/json
```

**Request Body:**

```json
{
  "name":           "John Doe",
  "email":          "john@example.com",
  "message":        "Hey Abhradeep, great portfolio!",
  "recaptchaToken": "<reCAPTCHA v3 token>"
}
```

**Success Response — `200 OK`:**
```json
{ "statusCode": 200, "data": null, "message": "Message sent successfully!" }
```

**Error Responses:**

| Status | Reason                              |
|--------|-------------------------------------|
| 400    | Missing / invalid fields            |
| 400    | reCAPTCHA token missing             |
| 403    | reCAPTCHA score too low             |
| 429    | Rate limit exceeded                 |
| 500    | SMTP / server misconfiguration      |

---

## 🛠️ Tech Stack

| Layer         | Technology              |
|---------------|-------------------------|
| Runtime       | Node.js 22 (ESM)        |
| Framework     | Express 5               |
| Email         | Nodemailer              |
| Bot Guard     | Google reCAPTCHA v3     |
| Security      | Helmet, express-rate-limit |
| CORS          | cors                    |
| Config        | dotenv                  |
| Dev Server    | nodemon                 |
| Container     | Docker (node:22-alpine) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm >= 10.9.3

### Installation

```bash
# Clone
git clone https://github.com/ABHRADEEP800/My_Portfolio_Backend
cd My_Portfolio_Backend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_SERVER_PORT=4000

# CORS — comma-separated list of allowed origins
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password
SMTP_FORM_EMAIL=your_gmail@gmail.com

# Where to deliver contact messages
OWNER_EMAIL=your_personal@email.com

# Google reCAPTCHA v3 secret
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
```

> 💡 For Gmail, generate an **App Password** under Google Account → Security → 2-Step Verification → App Passwords.

### Development

```bash
npm run dev
```

Starts with `nodemon` and hot-reloads on file changes. Runs on `http://localhost:4000`.

### Production

```bash
npm start
```

---

## 🐳 Docker

```bash
# Build image
docker build -t portfolio-backend .

# Run container
docker run -p 4000:4000 --env-file .env portfolio-backend
```

---

## 🔗 Frontend

The frontend that consumes this API:

👉 See the portfolio frontend repo (React + Vite + Tailwind CSS)

---

## 👤 Author

**Abhradeep Biswas**  
GitHub: [@ABHRADEEP800](https://github.com/ABHRADEEP800)

---

> Built with ❤️ by Abhradeep
