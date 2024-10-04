# Grow Sphere

## Gardening Tips & Advice Platform 🌱

A full-stack web application designed for gardening enthusiasts to share, discover, and engage with gardening knowledge. This platform allows users to post gardening tips, upvote content, comment, follow other users, and explore premium content through integrated payment systems. With a focus on community-driven content and social interaction, this platform enhances the gardening experience with insightful tips, seasonal guides, and multimedia support.

## Table of Contents

- [Features](#features)
- [Core Technologies](#core-technologies)
- [Installation](#installation)
- [Future Enhancements](#future-enhancements)

---

## Features

1. **User Authentication**

   - Secure JWT-based login, registration, and profile management.
   - Password recovery and update options.

2. **User Profile**

   - Update profile picture and personal information.
   - Follow/unfollow users.
   - My Profile section to manage personal posts and followers.
   - Profile verification upon receiving an upvote, accessible with payment (via Aamarpay).
   - Verified users have access to premium content and receive a profile badge.

3. **Post Creation & Sharing**

   - Attach images to posts.
   - Categorization of posts (Vegetables, Flowers, Landscaping, etc.).
   - Edit and delete posts.
   - Premium post access for verified users.

4. **Social Interaction**

   - Upvote and downvote system for posts.
   - Commenting.
   - Follow users.

5. **Payment Integration**

   - Access to premium content through Aamarpay payment gateways.

6. **Dynamic News Feed**

   - Infinite scroll for browsing recent posts.
   - Filtering and sorting by category and popularity.

7. **Admin Dashboard**

   - Manage users, posts, and payments.
   - View user and content statistics.

8. **PDF Generation**

   - Users can generate PDFs of gardening tips for offline use.

9. **Favourites**
   - Save favorite posts for easy access in a personal "Favourites" section.

---

## Core Technologies

- **Frontend:**
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/) (for type safety and development efficiency)
  - Tailwind CSS
  - ShadCn UI
- **Backend:**

  - [Express.js](https://expressjs.com/) (Backend framework)
  - [Node.js](https://nodejs.org/en/) (Runtime environment)
  - [MongoDB](https://www.mongodb.com/) (Database for storing user data and posts)

- **Other Tools:**
  - [Aamarpay](https://aamarpay.com/) or [Stripe](https://stripe.com/) (Payment gateways)
  - JWT (for user authentication)
  - Cloudinary (for image uploads)

---

## Installation

### 1. Clone the repository:

````bash
git clone https://github.com/salmanabdullahfahim/growSphere-client.git
cd growSphere-client

### 2. Install dependencies:

```bash
npm install
````

### 3. Create a `.env` file in the root directory and set the following environment variables:

```bash


NEXT_PUBLIC_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=

NEXT_PUBLIC_API_URL=

```

### 4. Start the development server:

```bash
npm run dev
```

## Future Enhancements

- Push Notifications: Notify users about new posts, comments, and follows in real time.
- AI-based Plant Suggestions: Add a feature that uses AI to suggest plants based on users' preferences and geographical locations.
