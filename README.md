
# 🍽️ Recipe Explorer App

> **Explore, save, and enjoy delicious recipes from around the world!**

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_STATUS_ID/deploy-status)](https://app.netlify.com/sites/recipe-explorer/deploys)
[![Heroku](https://heroku-badge.herokuapp.com/?app=recipe-explorer)](https://recipe-explorer.herokuapp.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Welcome to **Recipe Explorer**, your personal recipe discovery platform! This app helps you find new recipes, view your recently explored recipes, and offers a fun, intuitive experience for all food lovers. Bon Appétit!

---

## 📋 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Deployment](#deployment)
7. [License](#license)

---

## ✨ Features

- 🔍 **Random Recipe Discovery**: Browse new recipes every time you visit.
- 👤 **Personalized Recent Recipes**: View your recently visited recipes when logged in.
- 🌐 **Fully Responsive Design**: Enjoy the app on any device.
- 🔒 **User Authentication**: Log in to personalize your recipe experience.
- ⚡ **API-Driven**: Backend serves dynamic recipes through API calls.

---

## 🛠️ Tech Stack

### **Frontend:**
- **Vue.js** with **Vue Router**: A modern JavaScript framework for building interactive user interfaces.
- **SCSS**: For styling with flexible and maintainable CSS.
- **BootstrapVue**: For responsive and mobile-friendly components.

### **Backend:**
- **Node.js** & **Express.js**: A fast, minimalist server-side framework for API handling.
- **SQL**: A SQL database for storing user information and recipes.
- **Axios**: For making API requests to the backend.

### **Deployment:**
- **Frontend**: Hosted on **Netlify**.
- **Backend**: Hosted on **Heroku**.

---

## 🚀 Getting Started

### Prerequisites

To run this project locally, ensure you have the following installed:
- **Node.js** (version 14.x or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone skadanka/recipes-fullstack-project
   cd recipe-explorer
   ```

2. **Install dependencies for both frontend and backend:**
   ```bash
   # For frontend
   cd client
   npm install
   
   # For backend
   cd ../server
   npm install
   ```

3. **Run the app locally:**
   - **Backend**: Start the server with:
     ```bash
     npm run dev
     ```
   - **Frontend**: Start the client with:
     ```bash
     cd client
     npm run serve
     ```

4. Visit the app at `http://localhost:8080` for the frontend and `http://localhost:5000` for the backend API.

---

## ⚙️ Environment Variables

You'll need to create an `.env` file in the **server** directory to configure your environment variables.

```bash
# .env file for the backend
PORT=5000
```

---

## 📡 API Endpoints

### Recipe Endpoints:
GET /recipes

Description: Obtain information about recipes from the CookingSite Database.
POST /recipes

Description: Creates a new recipe in the database.
GET /recipes/{id}

Description: Obtain detailed information about a specific recipe.
GET /recipes/{id}/instructions

Description: Retrieve the full instructions for a given recipe, including steps and required ingredients and equipment.
POST /user

Description: Create a new user with attributes such as username, password, and email.
GET /user/{id}

Description: Obtain information about a specific user.
DELETE /user/{id}

Description: Delete the user with the specified ID.

---

## 🌍 Deployment


---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👩‍🍳 Author

- Eden Abuhatzeira - [GitHub](https://github.com/skadanka)
  
---

Enjoy exploring new recipes and happy coding! 🍜
