# 🚀 Express.js REST API (MVC Basic Layer)

A scalable and production-ready Express.js REST API boilerplate inspired by Laravel architecture.

This project follows a clean MVC pattern with Repository, Service, Middleware, Validation, Queue, Caching, and Authentication layers, making it suitable for both small and enterprise-level applications.

---

## ✨ Features

- Express.js 5
- MVC Architecture
- Repository Pattern
- Service Layer
- JWT Authentication
- Zod Validation
- MongoDB (Mongoose)
- Redis Cache (ioredis)
- BullMQ Queue
- Email Queue Worker
- Mailtrap Integration
- File Upload (Multer)
- Image Optimization (Sharp)
- Puppeteer PDF Generation
- Excel Export
- PDF Export
- Rate Limiting
- Slow Down Protection
- Cron Jobs
- Environment Configuration
- Modular Folder Structure
- Docker Support

---

# 📁 Project Structure

```
.
├── app
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── validations
│   ├── workers
│   ├── queues
│   ├── helpers
│   ├── utils
│   └── views
│
├── public
│   └── uploads
│
├── tests
│
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

# 🛠 Tech Stack

| Technology | Version |
|------------|----------|
| Node.js | 22+ |
| Express | 5 |
| MongoDB | 8 |
| Mongoose | 8 |
| Redis | 7 |
| BullMQ | Latest |
| ioredis | Latest |
| JWT | Latest |
| Zod | Latest |
| Multer | Latest |
| Sharp | Latest |
| Puppeteer | Latest |
| Nodemailer | Latest |

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/anwar7736/ExpressJS-REST-API-Basic-Layer.git
```

Move into project

```bash
cd ExpressJS-REST-API-Basic-Layer
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env
```

Update your environment variables.

---

# ▶️ Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Run Email Queue Worker

```bash
npm run queue
```

---

# 🐳 Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up
```

Detached Mode

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

---

# ⚙ Environment Variables

```
PORT=3000

APP_NAME=Express API

MONGO_URI=mongodb://localhost:27017/express_api

REDIS_URL=redis://127.0.0.1:6379

JWT_SECRET=your_secret_key

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_username
MAIL_PASS=your_password
MAIL_FROM=no-reply@example.com
```

---

# 🔐 Authentication

This project uses JSON Web Token (JWT).

Example

```
Authorization: Bearer YOUR_TOKEN
```

---

# 📦 Queue

BullMQ is used for background jobs.

Example:

- Email Sending
- Notifications
- Report Generation
- Long-running Tasks

Run Worker

```bash
npm run queue
```

---

# ⚡ Redis Cache

Redis is used for

- API Response Cache
- Session Storage (optional)
- Queue Backend
- Rate Limiting
- Performance Optimization

---

# 📤 File Upload

Supported formats

- JPEG
- PNG
- WEBP

Maximum Size

```
2 MB
```

Uploaded images are automatically optimized using **Sharp**.

---

# 📄 PDF Generation

Uses

- Puppeteer
- PDFKit

Suitable for

- Invoice
- Reports
- Certificates

---

# 📊 Excel Export

Powered by

```
ExcelJS
```

---

# 📧 Email

Uses

- Nodemailer
- Mailtrap (Development)

Queue based email sending using BullMQ Worker.

---

# 🧪 Validation

Request validation is handled by **Zod**.

Supports

- Body
- Query
- Params
- File Metadata

---

# 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Rate Limiting
- Slow Down Protection
- Input Validation
- Secure File Upload
- Environment Variables

---

# 📚 API Response Format

Success

```json
{
    "success": true,
    "message": "Request successful",
    "data": {}
}
```

Validation Error

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {}
}
```

Server Error

```json
{
    "success": false,
    "message": "Internal Server Error"
}
```

---

# 🧪 Running Tests

```bash
npm test
```

---

# 📌 Future Improvements

- Swagger Documentation
- OpenAPI Support
- Refresh Token Authentication
- Role & Permission
- Multi Tenant Support
- Socket.IO
- WebRTC
- Event Driven Architecture
- Microservices Ready
- Kubernetes Deployment
- CI/CD Pipeline
- AWS S3 Upload
- Cloudflare R2 Storage
- Docker Multi-stage Build
- GitHub Actions

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new branch

```
feature/new-feature
```

3. Commit changes

4. Push to your branch

5. Create a Pull Request

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Md Anwar Hossain**

Backend Software Engineer

GitHub

https://github.com/anwar7736

---

⭐ If you found this project useful, don't forget to give it a star.