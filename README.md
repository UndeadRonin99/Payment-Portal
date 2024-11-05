# Payment Portal
## Link to submission repo
[Click here](https://github.com/VCSTDN2024/apds7311-poe-techtitans-apds.git)

## Overview
The **Payment Portal** is a secure web application designed for managing user payments and verifications. This project allows users to register, log in, make payments, and verify them through a simple and user-friendly interface. The application is built with a **React** frontend and an **Express.js** backend, using **MongoDB** for database management.

## Features
- **User Registration**: Register new users with role-based access (`customer` or `employee`).
- **User Login**: Secure login with hashed passwords and JWT authentication.
- **Payments**: Allows users to make payments.
- **Payment Verification**: Employees can verify pending payments.

## Technologies Used
### Frontend
- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For client-side routing.

### Backend
- **Node.js & Express**: For creating the RESTful API.
- **MongoDB**: For data persistence.
- **JWT (JSON Web Token)**: For authentication.
- **Bcrypt.js**: For hashing passwords.
- **Joi**: For input validation.

### DevOps
- **CircleCI**: For continuous integration.

## Project Structure
### Frontend (`/src`)
- `components/`: Contains all React components like `LoginComponent`, `RegisterComponent`, `PaymentComponent`, etc.
- `App.js`: Main component handling the app routing.

### Backend (`/backend`)
- `models/`: Contains Mongoose models (e.g., `User.js`).
- `controllers/`: Handles the main business logic for each route.
- `routes/`: Defines API endpoints for authentication and payment operations.
- `middleware/`: Middleware like `authMiddleware.js` to protect routes.

## Installation and Setup
To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/UndeadRonin99/Payment-Portal.git
   cd Payment-Portal
   ```

2. **Install Dependencies**
   - **Backend**
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the `backend` folder with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Run the Application**
   - **Backend**
     ```bash
     cd backend
     npm start
     ```
   - **Frontend**
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the Application**
   - Navigate to `http://localhost:3000` in your browser to access the frontend.

## Usage
### Registration and Login
- Users can register by providing their full name, ID number, account number, password, and role (customer or employee).
- After registering, users can log in with their account number and password.

### Payments and Verification
- **Customers** can make payments.
- **Employees** can view and verify pending payments.

## Testing
- **Unit Tests**: The project includes unit tests for the backend using **Jest**.
  - Run the tests using:
    ```bash
    npm test
    ```

## Security Measures
- **Password Hashing**: Passwords are hashed using **bcrypt** before being saved to the database.
- **JWT Authentication**: Protects routes by ensuring only authorized users can access them.
- **Input Validation**: **Joi** is used to validate user inputs and prevent NoSQL injection.

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact
If you have any questions or suggestions, feel free to reach out:
- **GitHub**: [UndeadRonin99](https://github.com/UndeadRonin99)

