# Assignment Submission Portal Backend

This is a backend project for an assignment submission portal built with Node.js, Express.js, and TypeScript. It uses MongoDB as the database and incorporates JWT-based authentication.

## Features

- User registration and authentication with hashed passwords.
- Role-based access control (Admin and User).
- JWT for secure authentication.
- MongoDB for data persistence.
- TypeScript for type safety and maintainable codebase.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v16 or later)
- npm (bundled with Node.js)
- TypeScript (installed globally, optional)
- MongoDB Atlas account or local MongoDB setup.

## Getting Started

### 1. Clone the Repository


git clone <repository-url> 
cd AssignmentSubmissionPortal

### 2. Install Dependencies

npm install

### 3. Set Up Environment Variables

PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.<hostname>.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=<your_jwt_secret>

Replace <username>, <password>, <hostname>, and <your_jwt_secret> with your MongoDB credentials and desired secret key.

### 4. Build the Project

npm run build



### 5. Start the Server

- **For development mode with live reload**:

  
  npm run dev

- **For development mode with live reload**:

  npm start


The server will run on the port specified in the .env file (default is 8000).


