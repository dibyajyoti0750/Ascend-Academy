# 🚀 Ascend Academy

A modern, full-stack Learning Management System (LMS) built with **Next.js 16**, **TypeScript**, **MongoDB**, and **Clerk**. Ascend Academy enables educators to create and manage online courses while allowing students to purchase, enroll, and track their learning progress through a clean and responsive interface.

> **My biggest full-stack project so far and my first application built with Next.js to gain hands-on experience with the framework.**

## 🌐 Live Demo

🔗 https://ascend-academy-lms.vercel.app/

## 📂 GitHub Repository

🔗 https://github.com/dibyajyoti0750/Ascend-Academy

---

# ✨ Features

## 👨‍🎓 Student Features

- Browse available courses
- Search courses by title
- Purchase premium courses using Razorpay
- Enroll in free courses
- Watch course lectures
- Track course progress
- Responsive experience across desktop, tablet, and mobile

---

## 👨‍🏫 Educator Features

- Create new courses
- Edit existing courses
- Delete courses
- Create chapters and lessons
- Publish or unpublish courses
- Upload course thumbnails
- View educator analytics
  - Revenue
  - Total Courses
  - Total Sales
  - Total Students

> **Note:** Lecture videos are uploaded to YouTube as **Unlisted** videos, and the YouTube links are added while creating course lessons.

---

## 🔐 Authentication

Authentication is powered by **Clerk** and supports:

- Email Authentication
- Google Authentication

---

## 💳 Payments

Integrated with **Razorpay** for secure one-time course purchases.

---

## 📊 Dashboard Analytics

Educators can monitor:

- 💰 Revenue
- 📚 Total Courses
- 🛒 Total Sales
- 👨‍🎓 Total Students

---

# 👥 User Roles

The application supports multiple roles:

### Student

- Enroll in free courses
- Purchase paid courses
- Watch lectures
- Track learning progress

### Educator

- Create and manage courses
- Manage chapters and lessons
- View analytics

### Admin

- Master administrator with educator capabilities

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI

## Backend

- Next.js Server Actions
- API Routes
- Middleware

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- Clerk

## Payments

- Razorpay

## Media

- Cloudinary (Course Thumbnails)
- YouTube (Lecture Videos)

## Deployment

- Vercel

---

# ⚡ Next.js Features Used

- App Router
- Server Components
- Server Actions
- API Routes
- Middleware

---

# 📱 Responsive Design

Ascend Academy is fully responsive and optimized for:

- Desktop
- Tablet
- Mobile

---

# 📸 Screenshots

> Replace these placeholders with your actual screenshots.

## Landing Page

![Landing Page](./screenshots/landing-page.png)

---

## Student Dashboard

![Student Dashboard](./screenshots/student-dashboard.png)

---

## Educator Dashboard

![Educator Dashboard](./screenshots/educator-dashboard.png)

---

## Course Player

![Course Player](./screenshots/course-player.png)

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/dibyajyoti0750/Ascend-Academy.git
```

```bash
cd Ascend-Academy
```

## Install dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env.local` file in the root directory and add the required environment variables.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

MONGODB_URI=

ADMIN_EMAIL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

## Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 📌 Current Limitations

Currently, the platform does **not** support:

- Resume video playback from the last watched timestamp
- Course completion certificates

These features are planned for future updates.

---

# 💡 What I Learned

Ascend Academy was built primarily to gain practical experience with **Next.js** after learning the framework.

During development I learned how to work with:

- App Router architecture
- Server Actions
- Server Components
- Authentication using Clerk
- Payment integration with Razorpay
- MongoDB with Mongoose
- File uploads using Cloudinary
- Route protection using Middleware
- Building a scalable full-stack application structure

This project significantly improved my understanding of building production-style web applications with Next.js.

---

# 📄 License

This project is created for educational and portfolio purposes.

---

# 👤 Author

**Dibyajyoti Pramanick**

GitHub: https://github.com/dibyajyoti0750

LinkedIn: https://www.linkedin.com/in/dibyajyotipramanick/

---

⭐ If you found this project interesting, consider giving it a star!
