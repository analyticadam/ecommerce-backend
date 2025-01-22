# 🛒 Thrifted E-Commerce Application - Backend

## Project Overview

This is the **backend** of an e-commerce application designed to support an online reselling business. It provides APIs to manage products, user authentication, shopping cart functionality, and other backend processes.

---

## ✨ Key Features

- 🔒 **User Authentication**: Secure authentication system using JSON Web Tokens (JWT).
- 🛍️ **Product Management**: Create, Read, Update, and Delete (CRUD) operations for products.
- 🛒 **Shopping Cart Functionality**: Add, update quantities, and remove items from the cart.
- 🔄 **Cart Reset**: Option to delete and clear the cart upon user logout.
- 💾 **Database**: Uses MongoDB to store user data, products, and cart details.
- 🚀 **Future Enhancements**:
  - Integration with the eBay API to display and sync products from an external store.
  - Improved password security mechanism with adjustments to hashing and salt rounds.
  - Additional order processing and payment functionalities.

---

## 🛠️ Running the Backend Application

1. **Install Dependencies**:  
   Run `npm install` to install all required packages.

2. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Start the Server**:  
   Use `npm start` to run the application in production mode or `npm run dev` for development mode (with hot reload).

   The backend server will run at:  
   [`http://localhost:5000`](http://localhost:5000)

---

## 📌 API Endpoints

### User Authentication

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Authenticate and log in a user.

### Product Management

- **GET /api/products**: Fetch all products.
- **POST /api/products**: Add a new product.
- **PUT /api/products/:id**: Update an existing product.
- **DELETE /api/products/:id**: Delete a product.

### Shopping Cart

- **POST /api/cart**: Add an item to the cart.
- **PUT /api/cart/:id**: Update the quantity of an item in the cart.
- **DELETE /api/cart/:id**: Remove an item from the cart.
- **DELETE /api/cart**: Clear the entire cart.

---

## 📌 Notes

- **Current Limitations**:
  - Integration with third-party APIs, like eBay, is not implemented yet.
  - Password hashing uses salt rounds, but there is a minor bug causing an issue during user authentication. This will be fixed in future updates.

---

## 🤝 Credits

- **Developer**: Adam Farley

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🚧 Future Enhancements

- 🌐 Integrate eBay API to sync external products.
- 💳 Add support for payment processing and order management.
- 🔧 Optimize password security and authentication workflows.

---

### 📷 Screenshot Examples _(Placeholder for Images)_

_(Provide screenshots in this section once available.)_

---
