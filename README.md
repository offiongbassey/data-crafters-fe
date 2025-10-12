# EduAI: Empowering Teachers for Nigeria’s New Curriculum 

EduAI is an **AI-powered teaching assistant** designed to support educators in adapting to Nigeria’s **new skill-based curriculum**. The platform leverages **artificial intelligence** to generate structured lessons, assessments, and skill-based learning paths — while also providing a **voice assistant** to enhance teacher productivity and classroom engagement.

---
## 🎥 Demo Video

[![EduAI Demo](https://img.youtube.com/vi/DhYVuvVn6n8/0.jpg)](https://www.youtube.com/watch?v=DhYVuvVn6n8)

*Click the image above to watch the demo video on YouTube*

**Direct Link:** https://www.youtube.com/watch?v=DhYVuvVn6n8
---

## Backend/Data Engineering Repo
https://github.com/Olayemi-Awofe/EduAi
---

## Test Link
https://eduai-rosy.vercel.app/


## Features

###  Teaching & Learning Support
- **AI Lesson Generation** – Automatically generate lesson plans aligned with Nigeria’s 2025 curriculum.  
- **Assessment Creation** – Build tests and quizzes with timers and grading.  
- **Skill Learning Paths** – Structured content with embedded tests for continuous improvement.  
- **Voice Assistant** – Helps teachers interact with EduAI hands-free, get teaching support, and manage lessons easily.

### Authentication
- Secure login and signup flow for teachers.  
- JWT-based authentication integrated with the backend.

### Dashboard
- Personalized teacher dashboard showing skills, lessons, and progress.  
- Track learning goals, curriculum coverage, and assessment history.

---

## Project Objectives

EduAI was developed to:
1. **Enhance teacher readiness** for the new Nigerian curriculum.  
2. **Simplify content creation** using AI-powered lesson and assessment generation.  
3. **Empower teachers digitally**, especially in low-connectivity areas.  
4. **Bridge knowledge gaps** through continuous, personalized upskilling.

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router)  
- **State Management:** Zustand + React Query  
- **Styling:** TailwindCSS + Shadcn/UI  
- **AI Integration:** Google Gemini API  
- **Backend (API):** Node.js / FastAPI (depending on deployment)  
- **Deployment:** Vercel  

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root and add:

```bash
GEMINI_API_KEY=
NEXT_PUBLIC_BACKEND_ENDPOINT=
```


## Note:

The GEMINI_API_KEY is required for all AI-powered features (lesson and skill generation).

The NEXT_PUBLIC_BACKEND_ENDPOINT should point to your running backend API (e.g. Render, Vercel, or localhost).
---

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```


Then, start the development server:

```bash
npm run dev
```




## Folder Structure
```bash
app/
  ├── (auth)/            # Login & Signup pages
  ├── (dashboard)/       # Main teacher dashboard
  ├── lessons/            # Lesson generation pages
  ├── skills/             # Skill-based learning features
  ├── voice/             # AI Voice Assistant
  └── components/        # UI components (buttons, cards, modals)
```

## Deliverables
✅ Validated Understanding of Teacher Needs

Evidence-based analysis of teacher challenges.

Inclusion of teacher personas, school profiles, and contextual data.
---

## AI-Assisted Teaching Blueprint

- Conceptual design showing how AI interprets inputs and generates teaching aids.

- Working Prototype of Teacher Copilot

- Functional AI assistant to help with lesson planning and assessment generation.

- Teacher Dashboard & Learning Pathway

Track teacher progress, suggest upskilling recommendations, and provide actionable insights.
---

## Impact & Scalability Vision

Plan for national and regional scaling.

Integration with existing EdTech platforms like uLesson, Google Classroom, and Eneza Education.

Offline and low-data functionality for rural schools.
---

## Vision & Impact

EduAI aligns with Nigeria’s educational transformation goals by:

Supporting teachers through AI-powered lesson planning.

Improving classroom delivery and learning outcomes.

Promoting digital literacy and inclusion across urban and rural schools.

Empowering educators for the 21st-century digital economy.
---

## Future Enhancements

Offline & low-data mode for rural connectivity.

Integration with WhatsApp and SMS for accessibility.

Multilingual support for Nigerian local languages.

Collaboration tools for peer mentoring and classroom sharing.

Real-time student analytics and adaptive feedback.
---

## Learn More

To learn more about Next.js, visit:

Next.js Documentation

Next.js Learn

Deployment powered by Vercel
---

## License

This project is licensed under the MIT License — you are free to use, modify, and distribute with attribution.
