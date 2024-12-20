# Know Your Customer (KYC) Backend

A robust and scalable backend system for managing KYC (Know Your Customer) documents, built with Node.js and Express.js. The project includes features such as user management, document submission, status updates, and admin approval processes. It also integrates with AWS S3 for secure file storage.

---

## Features

- **User Management**:

  - Register and login functionality with JWT-based authentication.
  - Role-based access control (Admin and User).

- **Document Management**:

  - Users can upload KYC documents.
  - Admins can review, approve, or reject documents with reasons.

- **AWS S3 Integration**:

  - Secure and scalable file storage for KYC documents.

- **Dynamic Dashboard**:

  - Displays statistics such as total users, documents, and their statuses (approved, rejected, pending).

- **Real-Time Updates**:

  - Documents and statuses are dynamically fetched and updated.

- **Secure API**:
  - Protects sensitive endpoints with authentication and role-based authorization.

---

## Technology Stack

- **Backend**:

  - Node.js
  - Express.js

- **Database**:

  - MongoDB

- **Storage**:

  - AWS S3 for document storage.

- **Authentication**:

  - JSON Web Tokens (JWT)

- **Linting**:
  - ESLint with `standard-with-typescript`.

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repository.git
   cd know-your-customer-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=4000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET_NAME=your_s3_bucket_name
   ```

4. **Run the Application**:

   ```bash
   npm start
   ```

5. **Run Linter**:
   Ensure code quality by running:
   ```bash
   npm run lint
   ```

---

## API Endpoints

### Authentication

- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - Login with email and password.

### User

- **GET** `/user/getAllKyc/:userId` - Get all KYC documents for a user.
- **POST** `/user/kyc` - Submit a new KYC document.

### Admin

- **PUT** `/kyc/approve/:id/:name` - Approve a KYC document.
- **PUT** `/kyc/reject/:id/:name` - Reject a KYC document with a reason.
- **GET** `/admin/stats` - Get dashboard statistics.

---

## Development

### Project Structure

```
project-root/
├── src/
│   ├── controllers/      # Route logic
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Business logic (e.g., AWS S3 integration)
│   └── utils/            # Helper functions
├── tests/                # Unit and integration tests
├── .eslint.config.mjs    # ESLint configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## Deployment

### Prerequisites

- AWS account for S3 bucket setup.
- MongoDB database (e.g., MongoDB Atlas).
- Node.js installed on the server.

### Steps

1. **Build and Run**:

   ```bash
   npm install
   npm start
   ```

2. **Environment Variables**:
   Set up `.env` variables on the server.

3. **Monitor Logs**:
   Use a process manager like `pm2` for running and monitoring the application:
   ```bash
   npm install -g pm2
   pm2 start npm --name "kyc-backend" -- start
   ```

---

## Future Enhancements

- Implement refresh tokens for better authentication.
- Add WebSocket support for real-time updates.
- Enhance error handling and logging.

---
