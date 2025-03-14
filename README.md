# Gym Guru

## Overview

**Gym Guru** is an app designed to help new gym goers discover and improve their exercise knowledge and form. The app allows users to log their workouts, track their progress, and build personalized workout plans. With a focus on education, Gym Guru provides a seamless experience for users to learn about exercises and enhance their fitness routines.

Built with **Next.js**, **MongoDB**, **TypeScript**, and **Tailwind CSS**, and powered by **Passport.js** for Google OAuth authentication, Gym Guru helps users stay motivated while ensuring their fitness journey is effective and engaging.

## Features

- **User Authentication**: Secure Google OAuth login and registration.
- **Personalized Workout Plans**: Users can create and manage workout days (e.g., "Day 1", "Upper Body") and add exercises to those days.
- **Exercise Library**: New gym goers can access a collection of exercises, track their form, and improve their technique.
- **JWT Authentication**: JWT tokens are used for secure user authentication and session management.
- **Responsive UI**: Built with **Tailwind CSS** for a sleek and responsive design, ensuring the app looks great on all devices.
- **Unit Testing**: **Jest** is used for unit testing to ensure the app's reliability and functionality.

## Tech Stack

- **Frontend**:
  - Next.js (React framework)
  - Redux for state management
  - Axios for API requests
  - TypeScript for type safety
  - Tailwind CSS for styling
- **Backend**:
  - Node.js with Express.js
  - Passport.js for Google OAuth authentication
  - JWT for secure token handling
  - MongoDB for data storage
- **Testing**:
  - Jest for unit testing

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/gym-guru.git
cd gym-guru

```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory and configure your environment variables:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
BASE_URL=http://localhost:3000
TOKEN_SECRET=your-secret-key
MONGO_URI=your-mongo-db-uri
```

### 4. Run the App

```bash
npm run dev
```

The app will be running at http://localhost:3000.

Usage
Sign Up / Log In: Use Google OAuth to authenticate and access the app.
Create a Workout Plan: Create workout days (e.g., "Day 1", "Upper Body") and add exercises to those days.
View and Edit Exercises: Add exercises to your workout plan and delete any you no longer need.
Manage Saved Exercises: Users can save exercises for quick access later.
API Endpoints
POST /auth/google
Initiates Google OAuth login.

GET /auth/current-user
Fetches the current logged-in user's information.

POST /workout-plans
Adds a new workout day to the user's workout plan.

GET /workout-plans
Fetches the user's workout plan.

DELETE /workout-plans/:id
Deletes a workout day from the user's workout plan.

Contributing
Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Make your changes and commit them: git commit -am 'Add new feature'.
Push to the branch: git push origin feature/your-feature.
Open a pull request.

License
This project is licensed under the MIT License.
