# 🌱 MindSprout - AI-Powered Learning Companion

> **Assignment Submission for House of EdTech**
> *Scale your self-study with structured paths and generative AI.*

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-cyan?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-teal?style=flat-square&logo=prisma)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=flat-square&logo=clerk)

## 🚀 Project Overview

**MindSprout** addresses the chaos of self-guided learning. We live in an era of infinite content but zero structure. Learners drown in open tabs, bookmarked tutorials, and disconnected videos, making it hard to track progress or retain knowledge.

MindSprout allows users to curate **Learning Paths**—structured collections of resources (videos, articles, docs)—and leverages **Google's Gemini AI** to actively help them learn. It turns passive consumption into active mastery through automated summaries, generated quizzes, and flashcards.

## ✨ Key Features

### 1. 🗺️ Custom Learning Paths
Create dedicated tracks for any topic (e.g., "System Design", "Rust for Beginners").
- **Organize**: Group scattered links into a cohesive curriculum.
- **Track**: Monitor your progress through each resource.
- **Public/Private**: Share your paths with the community or keep them personal.

### 2. 🧠 Universal AI Summarizer
Drop a link to a YouTube video, blog post, or documentation page.
- **Intelligent Scraping**: Extracts core content while ignoring clutter.
- **Gemini 1.5 Flash**: Generates concise, study-focused notes (Key Concepts, Actionable Takeaways).
- **Time Saver**: Understand the "gist" before committing to a 2-hour video.

### 3. 📝 Generative Quizzes
Test your knowledge instantly. The AI analyzes *all* resources in your path to generate a unique quiz.
- **Dynamic Questions**: 10-question Multiple Choice Quizzes generated on the fly.
- **Context Aware**: Questions are directly based on *your* specific learning materials.
- **Assessment**: Instant feedback and score tracking.

### 4. 🔍 Explore & Community
Discover what others are learning.
-Browse public learning paths created by other users.
- Clone paths to your own library to start learning immediately.

---

## 🛠️ Tech Stack

Built with a focus on performance, type safety, and modern UX.

### Core
-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)

### Backend & Data
-   **Database:** PostgreSQL
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Authentication:** [Clerk](https://clerk.com/)
-   **Server Actions:** Fully server-side data mutations.

### AI & Utilities
-   **AI Engine:** [Vercel AI SDK](https://sdk.vercel.ai/docs) + Google Gemini 1.5 Flash
-   **Scraping:** `cheerio`
-   **UI Components:** Radix UI primitives
-   **Visuals:** `canvas-confetti`, `lucide-react`, `sonner` (toasts)

---

## 🏃‍♂️ Getting Started

Follow these steps to set up MindSprout locally.

### Prerequisites
-   Node.js 18+ installed
-   PostgreSQL database (local or hosted via Supabase/Neon)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/mind-sprout.git
    cd mind-sprout
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add the following keys:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/mindsprout?schema=public"
    
    # Auth (Clerk)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
    CLERK_SECRET_KEY="sk_test_..."
    
    # AI (Gemini)
    GEMINI_API_KEY="AIza..."
    ```

4.  **Initialize Database**
    Push the Prisma schema to your database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```
mind-sprout/
├── app/                  # Next.js App Router pages & API routes
│   ├── dashboard/        # User dashboard & path management
│   ├── explore/          # Community paths page
│   └── api/              # Backend API endpoints
├── components/           # Reusable React components
│   ├── ui/               # Radix UI + Tailwind primitives
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions
│   ├── ai-actions.ts     # Gemini AI prompt logic
│   ├── db.ts             # Prisma client instance
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🚧 Challenges & Optimizations

-   **Challenge:** LLM Context Limits with multiple long articles.
    -   *Optimization:* Implemented intelligent text truncation and focused scraping (removing nav/footers) to maximize relevant tokens for Gemini.
-   **Challenge:** Latency in AI generation.
    -   *Optimization:* Chose **Gemini 1.5 Flash** for the best balance of speed and reasoning capability. Added granular loading states to the UI to keep users engaged.

---

*Built with ❤️ by Rajashekhar*
