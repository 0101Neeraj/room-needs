# 🏠 Room Needs – Full Stack Room Management System

A full-stack web application to manage shared room expenses, groceries, rent alerts, and members – built with Angular, PHP, and MySQL.

---

## 🔧 Features

- 🧾 Add & View Groceries
- 👥 Member Management
- 💰 Rent Split Functionality
- 🔐 Login & Register via Room Number
- 📦 Backend APIs using PHP
- 💻 Data stored in MySQL (phpMyAdmin)
- 🛡️ JWT-based Authentication

---

## 🛠️ Tech Stack

| Layer     | Tech       |
|-----------|------------|
| Frontend  | Angular 17 |
| Backend   | PHP (8.x)  |
| Database  | MySQL (via XAMPP/phpMyAdmin) |
| Auth      | JWT (PHP Implementation)     |

---

## 📁 Folder Structure

room-needs/
├── frontend/ # Angular App
│ ├── src/
│ └── ...
├── backend/ # PHP scripts (APIs)
│ ├── db.php
│ ├── login.php
│ ├── register.php
│ ├── groceries/
│ ├── rent/
│ └── members/
└── room_app.sql # MySQL Database Export

markdown
Copy
Edit

---

## 🚀 Getting Started

### 🔹 Backend (PHP + MySQL)

1. Place your `backend/` folder inside `htdocs/` in XAMPP.
2. Start **Apache** and **MySQL** using XAMPP.
3. Import `room_app.sql` into phpMyAdmin to create the database.
4. Ensure `db.php` has correct database connection:

```php
$host = "localhost";
$user = "root";
$password = "";
$database = "room_app";
🔹 Frontend (Angular)
bash
Copy
Edit
cd frontend
npm install
ng serve --open
Angular will run on http://localhost:4200 and communicate with your PHP backend (e.g., http://localhost/backend/login.php)

🔌 Key API Endpoints
Method	Endpoint	Description
POST	/backend/login.php	Room Login
POST	/backend/register.php	Room Registration
POST	/backend/groceries/add.php	Add Grocery Item
POST	/backend/groceries/fetch.php	Fetch Groceries
POST	/backend/members/get.php	Get Room Members

📌 Enhancements to Consider
✅ Mark rent/grocery as "Paid"

📅 Monthly auto rent split

📤 Export data to CSV or PDF

📲 Mobile responsive UI

📨 Notifications or email alerts

📊 Analytics for expense trends

🧑 Author
Kotagiri Neeraj
Frontend Developer
📧 neerajkotagiri8@gmail.com
🔗 


