# 💼 WIT Income & Expense Tracker

A full-stack web application for managing **Users**, **Income**, and **Expenses**, built with:

- **Backend**: Node.js, Express, Firebase Firestore  
- **Frontend**: React (Create React App)
- **Hosting**: Backend on **Render**, Frontend on **Vercel**

## 🔗 Live Links

- **Frontend**: [https://wit-income-expense.vercel.app](https://wit-income-expense.vercel.app)
- **Backend API**: [https://wit-income-expense.onrender.com](https://wit-income-expense.onrender.com)
  - Users: [https://wit-income-expense.onrender.com/users](https://wit-income-expense.onrender.com/users)
  - Income: [https://wit-income-expense.onrender.com/income](https://wit-income-expense.onrender.com/income)
  - Expenses: [https://wit-income-expense.onrender.com/expenses](https://wit-income-expense.onrender.com/expenses)
- **GitHub Repo**: [https://github.com/hyejiniya/WIT-Income-Expense](https://github.com/hyejiniya/WIT-Income-Expense)

## 📁 Project Structure

```
WIT-Income-Expense/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── firebaseConfig.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Users.js
│   │   │   ├── Income.js
│   │   │   └── Expenses.js
│   │   └── App.js
│   └── .env
└── README.md
```

## 🚀 Features

- Add, update, delete, and view:
  - 🔹 **Users** (ID, name, username, email, phone, address)
  - 🔹 **Income** (wages, secondary income, interest, support payment, others)
  - 🔹 **Expenses** (categorized: savings, insurance, utilities, etc.)
- Validation, form reset, and success/error messages
- Firebase Firestore integration
- Fully deployed frontend/backend

## 📌 API Overview

### 📍 Base URL

```
https://wit-income-expense.onrender.com/
```

### 🔹 Users

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| GET    | `/users`            | Get all users                |
| POST   | `/users`            | Add a new user               |
| PUT    | `/users/:id`        | Update user by ID            |
| DELETE | `/users/:id`        | Delete user by ID            |

### 🔹 Income

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET    | `/income`            | Get all income records by ID |
| POST   | `/income`            | Add new income               |
| PUT    | `/income/:id`        | Update income by ID          |
| DELETE | `/income/:id`        | Delete income by ID          |

### 🔹 Expenses

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/expenses`           | Get all expenses by ID       |
| POST   | `/expenses`           | Add new expense              |
| PUT    | `/expenses/:id`       | Update expense by ID         |
| DELETE | `/expenses/:id`       | Delete expense by ID         |

## ⚙️ Getting Started Locally

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

Run the server:

```bash
node server.js
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```
REACT_APP_API_URL=https://wit-income-expense.onrender.com
```

Run the React app:

```bash
npm start
```

## 📦 Dependencies

### Backend
- express
- cors
- firebase-admin
- dotenv
- nodemon (dev)

### Frontend
- react
- react-dom
- react-scripts

## ❗ Error Handling

All API routes implement robust error handling for common failure cases:

- ✅ **Missing Fields**  
  Returns a `400 Bad Request` with clear error messages when required fields are missing from POST/PUT requests.

- ✅ **Invalid IDs**  
  If the requested ID does not exist (for update or delete), a `404 Not Found` response is returned.

- ✅ **Database Errors**  
  Errors from Firebase (e.g., permission issues or connectivity problems) return a `500 Internal Server Error` with a descriptive message.

- ✅ **Consistent Error Format**  
  All error responses follow this format:
  ```json
  {
    "error": "Descriptive message here"
  }
  ```

- ✅ **Frontend Feedback**  
  In the React frontend, user-friendly error messages are shown beneath the form using conditional rendering.

## 🧪 Sample Data

### User
```json
{
  "id": "user01",
  "name": "Jane Doe",
  "username": "user01",
  "email": "jane@example.com",
  "phone": "123-456-7890",
  "address": {
      "street": "123 Main St",
      "suite": "Suite 100",
      "city": "Calgary",
      "zipcode": "T3D3I2"
    }
}
```

### Income
```json
{
  "id": "user01",
  "wages": 4000,
  "secondaryIncome": 500,
  "interest": 50,
  "supportPayment": 0,
  "others": 100
}
```

### Expenses
```json
{
  "id": "user01",
  "Savings": {
    "rrsp": 200,
    "investmentSavings": 150,
    "longTermSavings": 100,
    "bonds": 0,
    "others": 50
  },
  "PaymentObligations": {
    "creditCard": 300,
    "loan": 250,
    "vehicleLease": 0,
    "lineOfCredit": 100
  },
  "Insurance": {
    "lifeInsurance": 80,
    "healthInsurance": 50,
    "others": 20
  },
  "Housing": {
    "rent": 1200,
    "rentInsurance": 30,
    "storageAndParking": 50,
    "utilities": 200,
    "maintenance": 60
  },
  "Utilities": {
    "phone": 50,
    "internet": 60,
    "water": 40,
    "heat": 70,
    "electricity": 90,
    "cable": 50,
    "others": 0
  },
  "Personal": {
    "transportation": 150,
    "clothing": 100,
    "giftsFamily": 80,
    "personalGrooming": 60,
    "diningOut": 120,
    "hobbies": 90,
    "others": 40
  }
}
```
