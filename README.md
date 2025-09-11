# 🚀 Node Express CLI Generator  

A powerful and efficient CLI tool for generating a structured Express.js API with built-in MongoDB support, middleware, and environment configuration. Simplify your development workflow and kickstart your next Express project in seconds! 🎯  

## ✅ Features  

- 🏗️ **Express.js Setup** with modular folder structure  
- 🗂️ **MongoDB Integration** using Mongoose  
- 🌍 **Environment Variables Support** with `.env`  
- 📝 **Middleware for logging** (Morgan & custom logger)  
- 🏛️ **Separation of Concerns** (Routes, Controllers, Models, Config)  
- 🔄 **Nodemon for Auto-Restart** during development  

---

## 📦 Packages  

### 📌 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "mongoose": "^7.5.1",
  "morgan": "^1.10.0"
}
```

### 🛠 Dev Dependencies

```json
{
  "nodemon": "^3.0.1"
}
```

## 🚀 Installation & Usage  

You can use this CLI tool in two ways:

### ⚡ One-Time Run (Recommended)  

Run directly without installing globally:  

```bash
npx xpress-backend
```
### 🌍 Global Installation
Install the CLI tool globally:  

```bash
npm install -g xpress-backend
```

Then, create a new project by running:  

```bash
xpress-backend
```



## 📂 Project Structure

```
📦 node-express-cli-generator
 ┣ 📂 config
 ┃ ┗ 📜 database.js
 ┣ 📂 controllers
 ┃ ┗ 📜 userController.js
 ┣ 📂 middlewares
 ┃ ┗ 📜 logger.js
 ┣ 📂 models
 ┃ ┗ 📜 userModel.js
 ┣ 📂 routes
 ┃ ┗ 📜 userRoutes.js
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 app.js
 ┣ 📜 index.js
 ┣ 📜 package-lock.json
 ┗ 📜 package.json
```

## 🚀 Getting Started

### ⚡ Prerequisites

- Node.js
- npm (included with Node.js)

### 🔥 Installation

1. Clone the repository

```bash
git clone https://github.com/Bijay-Shre-stha/node-server.git
```

2. Navigate to the project directory

```bash
cd node-server
```

3. Install dependencies

```bash
npm install || yarn install
```

4. Start the development server

```bash
npm run start || yarn start
```

## 🛠️ Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

💡 Want to contribute? Follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Bijay Shrestha - [bijayshrestha0817@gmail.com](mailto:bijayshrestha0817@gmail.com)

🚀 Happy Coding! 🎉
