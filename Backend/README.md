# Resume Generator - Backend

This folder contains the Express + Mongoose backend for the Resume Generator.

Environment variables (create a `.env` at Backend/.env):

- MONGO_URI - MongoDB connection string (e.g. mongodb://localhost:27017/resume-generator)
- OPENAI_API_KEY - OpenAI API key for resume generation
- PORT - optional, defaults to 5000

Install & run

```powershell
cd Backend
npm install
npm run dev   # or npm start
```

API endpoints (basic):

- GET /health
- POST /api/auth/register  { name, email }
- POST /api/resume         Accepts a profile JSON (name, email, summary, experience[], education[], skills[])
- GET  /api/resume         list resumes
- GET  /api/resume/:id     get resume by id

Notes

- This backend expects Node >= 18 and a valid OpenAI key.
- The OpenAI helper uses the official `openai` npm package.
