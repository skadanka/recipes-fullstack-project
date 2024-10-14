🍽️ Recipe Explorer App
Explore, save, and enjoy delicious recipes from around the world!


Welcome to Recipe Explorer, your personal recipe discovery platform! This app helps you find new recipes, view your recently explored recipes, and offers a fun, intuitive experience for all food lovers. Bon Appétit!

📋 Table of Contents
Features
Tech Stack
Getting Started
Environment Variables
API Endpoints
Deployment
License
✨ Features
🔍 Random Recipe Discovery: Browse new recipes every time you visit.
👤 Personalized Recent Recipes: View your recently visited recipes when logged in.
🌐 Fully Responsive Design: Enjoy the app on any device.
🔒 User Authentication: Log in to personalize your recipe experience.
⚡ API-Driven: Backend serves dynamic recipes through API calls.
🛠️ Tech Stack
Frontend:
Vue.js with Vue Router: A modern JavaScript framework for building interactive user interfaces.
SCSS: For styling with flexible and maintainable CSS.
BootstrapVue: For responsive and mobile-friendly components.
Backend:
Node.js & Express.js: A fast, minimalist server-side framework for API handling.
MongoDB: A NoSQL database for storing user information and recipes.
Axios: For making API requests to the backend.
Deployment:
Frontend: Hosted on Netlify.
Backend: Hosted on Heroku.
🚀 Getting Started
Prerequisites
To run this project locally, ensure you have the following installed:

Node.js (version 14.x or higher)
npm or yarn
MongoDB (local or cloud, like MongoDB Atlas)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/YOUR_USERNAME/recipe-explorer.git
cd recipe-explorer
Install dependencies for both frontend and backend:

bash
Copy code
# For frontend
cd client
npm install

# For backend
cd ../server
npm install
Run the app locally:

Backend: Start the server with:
bash
Copy code
npm run dev
Frontend: Start the client with:
bash
Copy code
cd client
npm run serve
Visit the app at http://localhost:8080 for the frontend and http://localhost:5000 for the backend API.

⚙️ Environment Variables
You'll need to create an .env file in the server directory to configure your environment variables.

bash
Copy code
# .env file for the backend

PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
📡 API Endpoints
Recipe Endpoints:
GET /recipes/random: Fetch random recipes from the server.
GET /users/recent-recipes: Fetch recently viewed recipes for the logged-in user.
Authentication:
POST /auth/login: Log in to the app.
POST /auth/register: Register a new user.
🌍 Deployment
Deploying the Backend (Heroku):
Install the Heroku CLI: Heroku CLI Installation Guide
Log in to Heroku:
bash
Copy code
heroku login
Create a new Heroku app:
bash
Copy code
heroku create
Push your backend code to Heroku:
bash
Copy code
git push heroku main
Set environment variables:
bash
Copy code
heroku config:set MONGODB_URI=your-mongodb-uri JWT_SECRET=your-jwt-secret
Deploying the Frontend (Netlify):
Create a Netlify account: Netlify
Link your GitHub repository to Netlify.
Set the build command (npm run build) and the publish directory (dist).
Deploy your frontend.
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

👩‍🍳 Author
Your Name - GitHub
Enjoy exploring new recipes and happy coding! 🍜