# 💼 WIT Income & Expense Tracker

A full-stack web application for managing **Users**, **Income**, and **Expenses**, built with:

- **Backend**: Node.js, Express, Firebase Firestore  
- **Frontend**: React (Create React App)
- **Hosting**: Backend on **Render**, Frontend on **Vercel**

## 🔗 Live Links

- **Frontend**: [https://wit-income-expense.vercel.app](https://wit-income-expense.vercel.app)
- **Backend API**: [https://wit-income-expense.onrender.com](https://wit-income-expense.onrender.com)
  - Users: [https://wit-income-expense.onrender.com/users](https://wit-income-expense.onrender.com/users)
  - Expenses: [https://wit-income-expense.onrender.com/expenses](https://wit-income-expense.onrender.com/expenses)
  - Income: [https://wit-income-expense.onrender.com/income](https://wit-income-expense.onrender.com/income)  
- **GitHub Repo**: [https://github.com/hyejiniya/WIT-Income-Expense](https://github.com/hyejiniya/WIT-Income-Expense)

## 📁 Project Structure

```
WIT-Income-Expense/
├── backend/
│   ├── config/
│   │   └── firebaseConfig.js
│   ├── controllers/
│   │   ├── expensesController.js
│   │   ├── incomeController.js
│   │   └── usersController.js
│   ├── routes/
│   │   ├── expenses.js
│   │   ├── income.js
│   │   └── users.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Users.js
│   │   │   ├── Income.js
│   │   │   └── Expenses.js
│   │   ├── styles/
│   │   └── App.js
├── images/
└── README.md
```

## 🚀 Features

- Add, update, delete, and view:
  - 🔹 **Users** (ID, name, username, email, phone, address)
  - 🔹 **Expenses** (categorized: savings, insurance, utilities, etc.)  
  - 🔹 **Income** (wages, secondary income, interest, support payment, others)
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

### 🔹 Expenses

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/expenses`           | Get all expenses by ID       |
| POST   | `/expenses`           | Add new expense              |
| PUT    | `/expenses/:id`       | Update expense by ID         |
| DELETE | `/expenses/:id`       | Delete expense by ID         |

### 🔹 Income

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET    | `/income`            | Get all income records by ID |
| POST   | `/income`            | Add new income               |
| PUT    | `/income/:id`        | Update income by ID          |
| DELETE | `/income/:id`        | Delete income by ID          |

## ⚙️ Getting Started Locally

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
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

## 👤 User Management (Frontend Walkthrough)

### 🧩 User Features

The User section supports the following features:

- ➕ Add User  
- ✏️ Update User  
- 🗑️ Delete User  
- 📋 View All Users  

---

### 🖥️ Full User Management Interface  
The interface allows adding, updating, and deleting users based on a unique ID.

![User Management Interface](./images/user_management.png)

---

### ➕ Add User

#### 1️⃣ Fill in New User Details  
Fill in all required fields to register a new user.  
![Add User Input](./images/add_user.png)

#### 2️⃣ Successful Submission  
Clicking “Submit” displays a success message.  
![User Added Successfully](./images/add_user_submit.png)

#### 3️⃣ Error: Duplicate ID  
If an existing ID is used, an error message appears.  
![Duplicate ID Error](./images/add_user_error.png)

---

### 🛠️ Update User

#### 1️⃣ Load User and Modify Fields  
Enter an existing ID, update any fields(name, username, email, and city are mandatory), and click "update" button.  
![Update User Input](./images/update_user.png)

#### 2️⃣ Successful Update  
A confirmation message appears upon success.  
![Update User Success](./images/update_user_submit.png)

#### 3️⃣ Error: ID Not Found  
If the ID does not exist, an error is shown.  
![Non-existent ID Error](./images/update_user_error.png)

---

### ❌ Delete User

#### 1️⃣ Enter ID to Delete  
Type in the ID and click “Delete.”  
![Delete User Input](./images/delete_user.png)

#### 2️⃣ Successful Deletion  
A message confirms the deletion.  
![User Deleted Successfully](./images/delete_user_submit.png)

#### 3️⃣ Error: ID Not Found  
If the ID doesn’t exist, an error appears.  
![Non-existent ID Error](./images/delete_user_error.png)

---

### 📋 View All Users

On page load or refresh, all users are listed with name (email) and phone number.  
![All Users Displayed](./images/all_users.png)

---

## 🖥️ Expenses Management Interface
The interface enables adding, updating, and deleting categorized expenses for each user based on a valid user ID.
![Expenses Management Interface](./images/expenses_management.png)

### ➕ Add Expenses

#### 1️⃣ Enter Valid User ID & Fill in Expense Fields  
Only existing user IDs are allowed.  
![Add Expenses](./images/expenses_add.png)

#### 2️⃣ Successful Submission  
Clicking “Submit” displays a success message.  
![Expenses Submitted](./images/expenses_add_submit.png)

---

### 🛠️ Update Expenses

#### 1️⃣ Load Existing Data by ID  
Click **“Load to Update”** to auto-fill the form with the existing expenses data.
Note: After loading the data, the “Submit” button will be replaced by “Update.”
![Load Expenses to Update](./images/expenses_update_load.png)

#### 2️⃣ Fill in Updated Data  
Modify any necessary fields as needed.  
![Fill in Updated Data](./images/expenses_update.png)

#### 3️⃣ Successful Submission  
Clicking "Update" displays a success message.   
![Expenses Updated Successfully](./images/expenses_update_submit.png)

---

### ❌ Delete Expenses

#### 1️⃣ Enter ID to Delete  
Enter a valid user ID and click “Delete.”  
![Delete Expenses Input](./images/expenses_delete.png)

#### 2️⃣ Successful Deletion  
A message confirms the deletion.  
![Expenses Deleted](./images/expenses_delete_submit.png)

---

### ⚠️ Error: Invalid or Non-existent ID

- Invalid ID on add:  
  ![Add Error - Invalid ID](./images/expenses_add_error_noID.png)

- No matching record on update:  
  ![Update Error - No Record Found](./images/expenses_update_error_noID.png)

- No matching record on delete:  
  ![Delete Error - No Record Found](./images/expenses_delete_error_noID.png)

---

## 🖥️ Full Income Management Interface
The interface enables adding, updating, and deleting income records for each user based on a valid user ID.
![Income Management Interface](./images/income_management.png)


### ➕ Add Income

#### 1️⃣ Enter Valid User ID & Fill in Income Fields 
Only existing user IDs are allowed.  
![Add Income](./images/income_add.png)

#### 2️⃣ Successful Submission  
Clicking “Submit” shows a success message.  
![Income Submitted](./images/income_add_submit.png)

---

### 🛠️ Update Income

#### 1️⃣ Load Existing Data by ID  
Click **“Load to Update”** to auto-fill the form with the existing income data.  
Note: After loading the data, the “Submit” button will be replaced by “Update.”
![Load Income to Update](./images/income_update_load.png)

#### 2️⃣ Fill in Updated Data  
Modify any necessary fields as needed.  
![Fill in Updated Data](./images/income_update.png)

#### 3️⃣ Submit Updated Data  
Click **“Update”** to submit the changes. A success message will confirm the update.  
![Income Updated Successfully](./images/income_update_submit.png)

---

### ❌ Delete Income

#### 1️⃣ Enter ID to Delete  
Enter a valid user ID and click “Delete.”  
![Delete Income Input](./images/income_delete.png)

#### 2️⃣ Successful Deletion  
A message confirms the deletion.  
![Income Deleted](./images/income_delete_submit.png)

---

### ⚠️ Error: Invalid or Non-existent ID

- Invalid ID on add:  
  ![Add Error - Invalid ID](./images/income_add_error_noID.png)

- No matching record on update:  
  ![Update Error - No Record Found](./images/income_update_error_noID.png)

- No matching record on delete:  
  ![Delete Error - No Record Found](./images/income_delete_error_noID.png)
