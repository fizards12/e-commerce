
# E-commerce MERN Stack Application

## Introduction
This is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to browse products, add them to the cart, and make purchases.

## Features
- User authentication and authorization
- Product listing and search
- Shopping cart functionality
- Order management
- Admin dashboard for managing products and orders

## Technologies Used
- **Frontend**: React, Redux, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/e-commerce.git
    cd e-commerce
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:
    ```bash
    # In the backend directory
    npm run dev

    # In the frontend directory
    npm start
    ```

## Usage
- Visit `http://localhost:3000` to access the frontend.
- Use the admin dashboard to manage products and orders.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.
