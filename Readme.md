# AI Parser Service

An AI-powered document parsing service built using Node.js, Express.js, Ollama, and Qwen 2.5 7B. The service is designed to extract structured JSON data from insurance policies, PDFs, and other documents.

---

## Tech Stack

- Node.js
- Express.js
- ES6 Modules
- Ollama
- Qwen 2.5 7B
- Nginx
- PM2
- Axios
- Express Rate Limit
- CORS

---

## Architecture

```text
Client
   │
   ▼
Nginx
   │
   ▼
Node.js API
   │
   ▼
Ollama
   │
   ▼
Qwen 2.5 7B
```

---

## Features

- MVC Architecture
- ES6 Syntax
- API Key Authentication
- Rate Limiting
- Ollama Integration
- Streaming Chat Support
- JSON Extraction
- Nginx Reverse Proxy
- PM2 Process Management
- HTTPS Support

---

# Server Requirements

Recommended:

| Resource | Minimum |
|-----------|-----------|
| CPU | 8 vCPU |
| RAM | 16 GB |
| Storage | 50 GB SSD |
| OS | Ubuntu 22.04+ |

Current Setup:

```text
8 vCPU
32 GB RAM
Ubuntu
```

---

# Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

sudo apt install nodejs -y
```

Verify:

```bash
node -v
npm -v
```

---

# Install Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Verify:

```bash
ollama --version
```

---

# Download Model

```bash
ollama pull qwen2.5:7b
```

Verify:

```bash
ollama list
```

Expected:

```text
qwen2.5:7b
```

---

# Clone Project

```bash
git clone <repository-url>

cd ai-service
```

Install Dependencies:

```bash
npm install
```

---

# Environment Variables

Create `.env`

```env
PORT=5000

API_KEY=your-secret-key

LLAMA_API_ENDPOINT=http://127.0.0.1:11434/api/generate
```

---

# Project Structure

```text
src/
│
├── config/
│   └── env.js
│
├── controllers/
│   └── ai.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── rateLimit.middleware.js
│
├── routes/
│   └── ai.routes.js
│
├── services/
│   └── ollama.service.js
│
├── app.js
│
└── server.js
```

---

# Run Application

Development:

```bash
npm run dev
```

Production:

```bash
node server.js
```

---

# PM2 Setup

Install PM2:

```bash
npm install -g pm2
```

Start Application:

```bash
pm2 start server.js --name ai-parser
```

Check Status:

```bash
pm2 list
```

View Logs:

```bash
pm2 logs ai-parser
```

Save Configuration:

```bash
pm2 save
```

Enable Auto Start:

```bash
pm2 startup
```

---

# Nginx Setup

Create configuration:

```bash
sudo nano /etc/nginx/sites-available/test.safekaro.com
```

Add:

```nginx
server {
    listen 80;

    server_name test.safekaro.com;

    location / {
        proxy_pass http://127.0.0.1:5000;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable Site:

```bash
sudo ln -s \
/etc/nginx/sites-available/test.safekaro.com \
/etc/nginx/sites-enabled/
```

Test Configuration:

```bash
sudo nginx -t
```

Reload:

```bash
sudo systemctl reload nginx
```

---

# SSL Configuration

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Generate SSL:

```bash
sudo certbot --nginx -d test.safekaro.com
```

Verify:

```text
https://test.safekaro.com
```

---

# Firewall Configuration

Allow:

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
```

Verify:

```bash
sudo ufw status
```

Do NOT expose:

```text
5000
11434
```

Keep Ollama private.

---

# API Endpoints

Base URL:

```text
https://test.safekaro.com/api/v1/ai
```

---

## Health Check

### Request

```http
GET /
```

### Response

```json
{
  "status": "running"
}
```

---

## Extract Policy Data

### Request

```http
POST /api/v1/ai/extract
```

Headers:

```http
Content-Type: application/json
x-api-key: YOUR_SECRET_KEY
```

Body:

```json
{
  "text": "Policy Number ABC123 Premium 12000"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "policy_number": "ABC123",
    "premium": 12000
  }
}
```

---

## Chat Endpoint

### Request

```http
POST /api/v1/ai/chat
```

Headers:

```http
Content-Type: application/json
x-api-key: YOUR_SECRET_KEY
```

Body:

```json
{
  "prompt": "Explain motor insurance"
}
```

Response:

```json
{
  "response": "Motor insurance is..."
}
```

---

# Example Service

```js
import axios from "axios";

export const extractData = async (text) => {
  const response = await axios.post(
    "http://127.0.0.1:11434/api/generate",
    {
      model: "qwen2.5:7b",
      prompt: text,
      stream: false,
      keep_alive: "24h",
    }
  );

  return response.data;
};
```

---

# Streaming Chat Example

```js
import axios from "axios";

export const chat = async (prompt) => {
  const response = await axios.post(
    "http://127.0.0.1:11434/api/chat",
    {
      model: "qwen2.5:7b",
      stream: true,
      keep_alive: "24h",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      responseType: "stream",
    }
  );

  return response.data;
};
```

---

# Ollama Commands

List Installed Models:

```bash
ollama list
```

List Running Models:

```bash
ollama ps
```

Model Information:

```bash
ollama show qwen2.5:7b
```

Direct Test:

```bash
curl http://127.0.0.1:11434/api/generate \
-d '{
"model":"qwen2.5:7b",
"prompt":"hello",
"stream":false
}'
```

---

# Qwen 2.5 7B Specifications

| Metric | Value |
|----------|----------|
| Parameters | 7 Billion |
| Download Size | ~4.7 GB |
| RAM Usage | ~5-6 GB |
| Context Window | 128K Tokens |
| Quantization | Q4_K_M |
| Typical Speed (CPU) | ~5 Tokens/Sec |

### Parameter

Number of learned weights inside the model.

Higher parameters generally provide:

- Better reasoning
- Better extraction
- Better accuracy

But require:

- More RAM
- More CPU

---

### Context Window

Maximum amount of text the model can process in one request.

```text
128K Tokens
≈ 90,000 Words
≈ 250-350 PDF Pages
```

---

### Quantization

Compression technique used to reduce model size.

```text
Original Model
      ↓
Quantized Model
      ↓
Smaller Size
Lower RAM Usage
Faster Inference
```

Current model:

```text
Q4_K_M
```

---

# Security

Implemented:

- API Key Authentication
- HTTPS
- Rate Limiting
- Input Validation
- Private Ollama Instance
- Nginx Reverse Proxy

Recommended Future Enhancements:

- JWT Authentication
- User Accounts
- Request Logging
- Usage Tracking
- Billing System
- Multi-Tenant Support

---

# Performance Notes

Cold Start:

```text
15-20 Seconds
```

Warm Requests:

```text
2-6 Seconds
```

Recommended:

```js
keep_alive: "24h"
```

to keep the model loaded in memory.

---

# Roadmap

### Phase 1

- PDF Upload API
- PDF Text Extraction

### Phase 2

- Insurance Policy Extraction
- Motor Policy Parsing
- Health Policy Parsing

### Phase 3

- Page Indexing
- Tree Structure Generation

### Phase 4

- RAG System
- Vector Database Integration

### Phase 5

- SaaS Platform
- User Management
- Billing & Usage Tracking

---

# License

Private Project

Safekaro AI Parser Service