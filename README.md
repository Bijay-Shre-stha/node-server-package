# 🚀 xpress-backend

A powerful CLI tool for scaffolding Express.js projects with MongoDB, authentication, Docker, TypeScript, testing, and more. Generate production-ready API structures in seconds!

## ✅ Features

- 🏗️ **Template Selection** — REST API, GraphQL, or Microservice
- 🗂️ **MongoDB Integration** using Mongoose
- 🔐 **JWT Authentication** scaffolding (register, login, protected routes)
- 🌍 **Environment Variables** with `.env`
- 🛡️ **Security Middleware** — Helmet, rate limiting, CORS
- 📝 **Request Validation** with express-validator
- 🧹 **Centralized Error Handler** middleware
- 📝 **Logging** (Morgan & custom logger)
- 🏛️ **Separation of Concerns** (Routes, Controllers, Models, Config, Middlewares)
- 🔄 **Nodemon** for auto-restart during development
- 🐳 **Docker Support** — Dockerfile + docker-compose with MongoDB
- 📘 **TypeScript** support option
- 🧪 **Testing** — Jest + Supertest with sample tests
- 📏 **Code Quality** — ESLint + Prettier configs
- 🔄 **CI/CD** — GitHub Actions workflow template
- 🏥 **Health Check** endpoint (`/health`)
- ⚡ **Non-Interactive Mode** for CI/CD and automation

---

## 📦 Packages

### 📌 Dependencies

```json
{
  "express": "^4.21.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "mongoose": "^8.10.1",
  "morgan": "^1.10.0",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.4.0",
  "express-validator": "^7.0.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2"
}
```

### 🛠 Dev Dependencies

```json
{
  "nodemon": "^3.1.9",
  "jest": "^29.7.0",
  "supertest": "^7.0.0",
  "eslint": "^9.9.0",
  "prettier": "^3.3.0"
}
```

---

## 🚀 Installation & Usage

### ⚡ One-Time Run (Recommended)

```bash
npx xpress-backend
```

### 🌍 Global Installation

```bash
npm install -g xpress-backend
xpress-backend
```

### ⚡ Non-Interactive Mode (Flags)

Skip prompts and generate a project with specific features:

```bash
# Basic REST API
npx xpress-backend --name my-api --yes

# With TypeScript
npx xpress-backend --name my-api --ts --yes

# With authentication
npx xpress-backend --name my-api --auth --yes

# With Docker support
npx xpress-backend --name my-api --docker --yes

# GraphQL template
npx xpress-backend --name my-graphql --template graphql --yes

# Microservice template
npx xpress-backend --name my-service --template microservice --yes

# Combine features
npx xpress-backend --name my-full-api --ts --auth --docker --yes

# Initialize git repo after generation
npx xpress-backend --name my-api --git --yes
```

### Available Flags

| Flag | Description | Default |
|------|-------------|---------|
| `-n, --name <name>` | Project name | `express-api` |
| `-t, --template <type>` | Template type: `rest`, `graphql`, `microservice` | `rest` |
| `--ts` | Add TypeScript support | `false` |
| `--auth` | Add JWT authentication scaffolding | `false` |
| `--docker` | Add Docker support | `false` |
| `--git` | Initialize git repository | `false` |
| `-y, --yes` | Use defaults, skip all prompts | `false` |

---

## 📂 Project Structure (REST Template)

```
📦 my-api
 ┣ 📂 config
 ┃ ┗ 📜 database.js
 ┣ 📂 controllers
 ┃ ┣ 📜 userController.js
 ┃ ┗ 📜 authController.js        ← with --auth
 ┣ 📂 middlewares
 ┃ ┣ 📜 logger.js
 ┃ ┣ 📜 errorHandler.js           ← new
 ┃ ┗ 📜 auth.js                   ← with --auth
 ┣ 📂 models
 ┃ ┗ 📜 userModel.js
 ┣ 📂 routes
 ┃ ┣ 📜 userRoutes.js
 ┃ ┗ 📜 authRoutes.js             ← with --auth
 ┣ 📂 tests
 ┃ ┣ 📜 user.test.js
 ┃ ┗ 📜 app.test.js
 ┣ 📂 .github/workflows
 ┃ ┗ 📜 ci.yml
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 .dockerignore               ← with --docker
 ┣ 📜 .eslintrc.json              ← new
 ┣ 📜 .prettierrc                 ← new
 ┣ 📜 Dockerfile                  ← with --docker
 ┣ 📜 docker-compose.yml          ← with --docker
 ┣ 📜 tsconfig.json               ← with --ts
 ┣ 📜 jest.config.js              ← new
 ┣ 📜 health.js                   ← new
 ┣ 📜 app.js
 ┣ 📜 server.js
 ┣ 📜 package.json
 ┗ 📜 package-lock.json
```

---

## 🚀 Getting Started

### ⚡ Prerequisites

- Node.js (v18+)
- npm (included with Node.js)
- MongoDB (local or Atlas)

### 🔥 Quick Start

1. Generate a new project

```bash
npx xpress-backend --name my-api --yes
```

2. Navigate to the project directory

```bash
cd my-api
```

3. Install dependencies

```bash
npm install
```

4. Set up your `.env` file

```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

## 🚀 Auto-Release

This project uses GitHub Actions to automatically publish to npm and create a git tag when a version bump is pushed to `main`.

### How it works

1. Bump the version in `package.json` and commit to `main`
2. The workflow detects the change, publishes the new version to npm, and creates a `v<version>` tag automatically

### Setup

Add your npm token as a GitHub secret:

1. Go to **Settings → Secrets and variables → Actions** in the repository
2. Click **New repository secret**
3. Set **Name** to `NPM_TOKEN`
4. Set **Value** to your npm access token (generate at [npm tokens](https://www.npmjs.com/settings/tokens))

### Manual publish

```bash
npm publish --access public
```

## 🛠️ Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

💡 Want to contribute? Follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Bijay Shrestha - [bijayshrestha0817@gmail.com](mailto:bijayshrestha0817@gmail.com)

🚀 Happy Coding! 🎉
