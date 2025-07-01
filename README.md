# 📘 Pustak Sahay

**Pustak Sahay** is a web-based platform aimed at facilitating the exchange of academic books and incentivizing students for their achievements by verifying academic certificates and issuing rewards.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 📤 **Upload Books** for others to use
- 📄 **Upload Certificates** for reward consideration
- 🧑‍💼 **Admin Dashboard** to review and manage uploads
- 🎁 **Reward System** (coupon-based incentives)
- 🔍 **Category & Filter Based Book Search**
- 🛒 **Cart Functionality** for selecting books
- 🧾 **Order Management**

---

## 🖼️ Project Preview
### Home Screen
<img width="470" alt="Home Screen - Pustak Sahay" src="https://github.com/user-attachments/assets/ab8d2427-18aa-4bb8-82cb-4c0a53c3cd74" />

### Cart Page
<img width="470" alt="Cart Page - Pustak Sahay" src="https://github.com/user-attachments/assets/ebd56c5d-4ef0-4881-876e-281ea7e454cb" />

### Product Page
<img width="470" alt="Product Page - Pustak Sahay" src="https://github.com/user-attachments/assets/4d3551fd-a486-4dec-be16-815028e61e2a" />

### User Dashboard
<img width="470" alt="User Dashboard - Pustak Sahay" src="https://github.com/user-attachments/assets/38cfcbaf-3065-4c3b-8d8c-e8446e4eec3a" />

---

## 🏗️ Tech Stack

### 💻 Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Redux Toolkit

### 🌐 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file uploads)
- JWT (authentication)

---

## 📦 Folder Structure
```
/frontend
└── public/
└── src/
   └── components/
   └── hooks/
   └── pages/
   └── redux/
   └── App.jsx
└── index.html

/backend
└── controllers/
└── middlewares/
└── models/
└── routes/
└── utils/
└── index.js
```
---

## 📄 Schemas

### 🧑 User Schema
```js
{
  name, email, password, isStudent,
  educationLevel, stream, cartItems, orders, rewards
}
```
### 📚 Book Schema

```js
{
  title, author, category, condition,
  originalPrice, sellingPrice, binding,
  uploadedBy, approvedBy, status
}
```

### 📜 Certificate Schema

```js
{
  name, certificateName, issuedBy,
  certificateFile, uploadedBy, isVerified
}
```

### 🎖 Reward Schema

```js
{
  name, isPercentage, value, terms,
  minimumPrice, usageLimit, durationInMonths, expiresAt
}
```

---

## 🗺️ System Flow

* Users → Upload Books & Certificates
* Admins → Review Uploads & Approve Rewards
* System → Issues rewards and stores data in DB
* Database → Maintains users, books, rewards, certificates

---

## ⚙️ How to Run Locally

### 🔧 Prerequisites

* Node.js
* MongoDB
* npm or yarn

### ▶️ Installation

```bash
git clone https://github.com/itsantu/pustak-sahay.git
cd pustak-sahay
```

### 📁 For Backend:

```bash
cd backend
npm install
npm start
```

### 💻 For Frontend:

```bash
cd frontend
npm install
npm run dev
```

---

## ✍️ Future Scope

* 📱 Launching Mobile App Version
* 💳 Payment Gateway Integration
* 📦 Delivery System for Physical Book Exchange
* 📊 User Analytics Dashboard
* 🔔 Notification System

---

## 📚 References

* [React Documentation](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [JWT](https://jwt.io/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Multer](https://github.com/expressjs/multer)

---

## 👨‍💻 Developed By

### Group ID: BCA22C008

* **Antu Mallick** (BWU/BCA/22/132) - **Group Leader**
* **Swaraj Halder** (BWU/BCA/22/129)
* **Debjyoti Mondal** (BWU/BCA/22/131)
* **Samiran Chanak** (BWU/BCA/22/138)
* **Raul Naskar** (BWU/BCA/22/140)
* **Priyankar Mondal** (BWU/BCA/22/141)

---
