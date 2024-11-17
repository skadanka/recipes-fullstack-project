Here’s the updated **README** with an explanation about the backend wrapping the Spoonacular API:

---

# 🍽️ **Recipe Explorer App**

> **Discover, explore, and enjoy recipes from around the world!**

Welcome to **Recipe Explorer**, the ultimate platform for food lovers to find, save, and explore delicious recipes! Whether you're a home cook or a culinary adventurer, this app is for you. Bon appétit! 🍜

---

## ✨ **Features**

- 🔍 **Discover Random Recipes**: Get inspired by a new recipe every visit.
- 🧾 **Browse Recipes**: Explore and view detailed recipe instructions.
- 💾 **Save Your Favorites**: Keep track of your top picks (when authenticated).
- 🌐 **Responsive Design**: Fully optimized for any device.
- 🚀 **API-Driven Experience**: Dynamic data powered by Spoonacular API.

⚠️ **Note**: Some functionalities like Login and Register are currently non-functional due to CORS issues.

---

## 🛠️ **Tech Stack**

### **Frontend**
- 🖼️ **Vue.js**: Modern framework for building user interfaces.
- 🎨 **SCSS**: Styled with maintainable and flexible CSS.
- 📱 **BootstrapVue**: Responsive, mobile-friendly components.

### **Backend**
- ⚙️ **Node.js** & **Express.js**: Fast, lightweight server-side API framework.
- 🗄️ **SQL Database**: Stores user data and recipes.
- 📡 **Axios**: Handles seamless API calls to Spoonacular.

---

## 🌐 **Backend Wrapping the Spoonacular API**

The backend serves as a middleware layer between the **frontend** and the **Spoonacular API**, ensuring smooth interaction and a secure way to manage API requests.

### Key Responsibilities:
1. **Request Handling**: Routes such as `/recipes` and `/recipes/{id}` fetch data from Spoonacular, format it, and return it to the frontend.
2. **Rate-Limiting Protection**: The backend protects the Spoonacular API from overuse by managing request rates.
3. **Custom Business Logic**: Adds custom functionality like recipe filtering, saving user-specific data, and providing localized error handling.
4. **Environment Variable Management**: Securely manages the Spoonacular API key using `.env` files.

---

## 🌍 **Deployment**

### **Frontend**
- Hosted on **Vercel** for seamless delivery and modern web performance.
- **Current Link**: [Recipe Explorer Frontend](https://recipes-fullstack-project-eqqhj020x-skadankas-projects.vercel.app/#/) *(Replace with the actual link once live).*

### **Backend**
- Powered by **Render**, ensuring reliable API access.
- **Backend Link**: [Recipe Explorer API](https://recipes-fullstack-project.onrender.com) *(Replace with the actual link once live).*

---

## 📡 **API Endpoints**

### **Recipe Endpoints**
- `GET /recipes` → Fetch a list of all recipes (via Spoonacular).
- `GET /recipes/{id}` → Retrieve details of a specific recipe.
- `POST /recipes` → Add a new recipe to the local database.

### **User Endpoints**
- `POST /user` → Register a new user.
- `GET /user/{id}` → Get user details.
- `DELETE /user/{id}` → Delete a user.

---

## 👩‍🍳 **Author**
- **Eden Abuhatzeira** – [GitHub](https://github.com/skadanka)

---

🌟 **Happy Cooking and Exploring!** 🌟 