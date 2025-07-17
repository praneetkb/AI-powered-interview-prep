# 🚀 WICS Fullstack Workshop Starter (Next.js + Firebase)

View the full working demo code here!:
[Demo](https://github.com/eunsongkoh/wics-fullstack-workshop)

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[Firebase](https://firebase.google.com/)** - Backend-as-a-Service platform
- **[ShadCN](https://ui.shadcn.com/)** - Beautifully designed components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

---

## 🧰 Prerequisites

- Node.js version **18 or higher**
- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)
- A [GitHub account](https://github.com/)
- A [Vercel account](https://vercel.com/) connected to your GitHub account
- A [Firebase account](https://firebase.google.com/)
- A **Google AI API Key** from [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/eunsongkoh/wics-fullstack-workshop-starter.git
cd wics-fullstack-workshop-starter
```

### 2. Use Node.js version 18

```bash
nvm use 18
```

### 3. Install project dependencies

```bash
npm install
```

## 🔐 Environment Variables Setup

### 4. Create .env.local file

Create a file called `.env.local` in the root of your project.

Copy the contents from `.env.dev` into `.env.local` using:

```bash
cp .env.dev .env.local
```

### 5. Fill in your API keys and secrets

Open `.env.local` and replace the placeholder values with your actual keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_GEN_AI_KIT=your_google_ai_api_key
```

**Note:** The Google AI API key can be obtained at https://aistudio.google.com/app/apikey

**Important:** All environment variables must start with `NEXT_PUBLIC_` for Next.js to expose them to the frontend.

## 🔥 Firebase Setup Guide

### 6. Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/)
- Click "Add Project" and follow the instructions

### 7. Register your Web App

- In your Firebase project dashboard, click the Web icon (`</>`)
- Register your app with any name
- Copy the Firebase SDK config and add those values to your `.env.local` as shown above

### 8. Enable Google Authentication

- Navigate to Authentication > Sign-in Method
- Enable Google sign-in
- Add your email to Authorized domains if necessary

### 9. Set up Firestore Database

- In Firebase Console, go to Firestore Database
- Click Create Database
- Select Start in test mode
- Keep the default Database ID

## 🗃️ Suggested Firestore Data Structure

```
users/
└── user_id/
    ├── interviews/
    │   ├── company
    │   ├── created_at
    │   ├── job_description
    │   └── job_title
    └── resume/
        ├── experience/
        │   ├── description
        │   └── position
        ├── projects
        ├── skills
        └── other
```

## ▶️ Start Development Server

Run the app locally with:

```bash
npm run dev
```
