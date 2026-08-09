#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { Command } from "commander";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIR = path.join(__dirname, "templates");
const TARGET_DIR = process.cwd();

const program = new Command();

program
  .name("xpress-backend")
  .description("CLI tool to scaffold Express.js projects with MongoDB, auth, Docker, and more")
  .version("1.1.0")
  .option("-n, --name <name>", "Project name", "express-api")
  .option("-t, --template <type>", "Project template (rest, graphql, microservice)", "rest")
  .option("-d, --database <type>", "Database (mongodb, postgresql, mysql)", "mongodb")
  .option("--ts", "Use TypeScript", false)
  .option("--auth", "Add JWT authentication scaffolding", false)
  .option("--docker", "Add Docker support", false)
  .option("--git", "Initialize a git repository", false)
  .option("-y, --yes", "Use defaults, skip all prompts", false)
  .parse(process.argv);

const options = program.opts();

const QUESTIONS = [
  {
    type: "input",
    name: "projectName",
    message: "Enter the project name:",
    default: options.name || "express-api",
  },
  {
    type: "list",
    name: "template",
    message: "Select a project template:",
    choices: [
      { name: "REST API — Express with Mongoose, routes, controllers, models", value: "rest" },
      { name: "GraphQL — Apollo Server with Mongoose", value: "graphql" },
      { name: "Microservice — Lightweight service with Docker support", value: "microservice" },
    ],
    default: options.template || "rest",
    when: () => !options.yes,
  },
  {
    type: "list",
    name: "database",
    message: "Select a database:",
    choices: [
      { name: "MongoDB — Document database with Mongoose ODM", value: "mongodb" },
      { name: "PostgreSQL — Relational database with Sequelize ORM", value: "postgresql" },
      { name: "MySQL — Relational database with Sequelize ORM", value: "mysql" },
    ],
    default: "mongodb",
    when: () => !options.yes,
  },
  {
    type: "confirm",
    name: "useTs",
    message: "Use TypeScript?",
    default: false,
    when: () => !options.yes,
  },
  {
    type: "confirm",
    name: "useAuth",
    message: "Add JWT authentication scaffolding?",
    default: false,
    when: () => !options.yes,
  },
  {
    type: "confirm",
    name: "useDocker",
    message: "Add Docker support (Dockerfile + docker-compose.yml)?",
    default: false,
    when: () => !options.yes,
  },
  {
    type: "confirm",
    name: "useGit",
    message: "Initialize a git repository?",
    default: false,
    when: () => !options.yes,
  },
];

async function getAnswers() {
  if (options.yes) {
    return {
      projectName: options.name,
      template: options.template || "rest",
      database: options.database || "mongodb",
      useTs: options.ts || false,
      useAuth: options.auth || false,
      useDocker: options.docker || false,
      useGit: options.git || false,
    };
  }
  return inquirer.prompt(QUESTIONS);
}

function sanitizeName(name) {
  const sanitized = name.replace(/[^a-zA-Z0-9_-]/g, "");
  return sanitized === name ? sanitized : null;
}

function getTemplateSource(templateType) {
  const templatePath = path.join(TEMPLATE_DIR, templateType);
  return fs.pathExistsSync(templatePath) ? templatePath : TEMPLATE_DIR;
}

function renameJsToTs(projectPath) {
  const jsFiles = [
    "app.js",
    "server.js",
    "health.js",
  ];
  const dirs = ["config", "controllers", "middlewares", "models", "routes", "schemas"];

  for (const file of jsFiles) {
    const jsPath = path.join(projectPath, file);
    const tsPath = path.join(projectPath, file.replace(".js", ".ts"));
    if (fs.existsSync(jsPath)) {
      fs.renameSync(jsPath, tsPath);
    }
  }

  for (const dir of dirs) {
    const srcDir = path.join(projectPath, dir);
    if (fs.existsSync(srcDir)) {
      const files = fs.readdirSync(srcDir);
      for (const file of files) {
        if (file.endsWith(".js")) {
          fs.renameSync(
            path.join(srcDir, file),
            path.join(srcDir, file.replace(".js", ".ts"))
          );
        }
      }
    }
  }

  // Also rename files in tests/
  const testsDir = path.join(projectPath, "tests");
  if (fs.existsSync(testsDir)) {
    const files = fs.readdirSync(testsDir);
    for (const file of files) {
      if (file.endsWith(".js")) {
        fs.renameSync(
          path.join(testsDir, file),
          path.join(testsDir, file.replace(".js", ".ts"))
        );
      }
    }
  }
}

async function updatePackageJson(projectPath, answers) {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = answers.projectName;

  if (answers.useTs) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      typescript: "^5.4.0",
      "ts-node": "^10.9.2",
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      "ts-jest": "^29.2.0",
    };
    packageJson.scripts = {
      ...packageJson.scripts,
      build: "tsc",
      dev: "nodemon --exec ts-node src/server.ts",
      start: "node dist/server.js",
    };
    renameJsToTs(projectPath);
  }

  // Add database-specific dependencies
  if (answers.database === "postgresql") {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      pg: "^8.11.0",
      sequelize: "^6.37.0",
    };
    // Remove mongoose if present
    delete packageJson.dependencies.mongoose;
  } else if (answers.database === "mysql") {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      mysql2: "^3.9.0",
      sequelize: "^6.37.0",
    };
    // Remove mongoose if present
    delete packageJson.dependencies.mongoose;
  } else {
    // MongoDB (default)
    packageJson.dependencies = {
      ...packageJson.dependencies,
      mongoose: "^8.10.1",
    };
    // Remove sequelize and db drivers if present
    delete packageJson.dependencies.pg;
    delete packageJson.dependencies.mysql2;
    delete packageJson.dependencies.sequelize;
  }

  if (answers.useAuth) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      bcryptjs: "^2.4.3",
      jsonwebtoken: "^9.0.2",
    };
  }

  if (answers.useDocker) {
    packageJson.scripts = {
      ...packageJson.scripts,
      docker: "docker-compose up -d",
      "docker:stop": "docker-compose down",
    };
  }

  packageJson.scripts = {
    ...packageJson.scripts,
    test: "jest",
    "test:watch": "jest --watch",
    lint: 'eslint . --ext .js,.ts',
    format: 'prettier --write .',
  };

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

async function runGitInit(projectPath) {
  try {
    execSync("git init", { cwd: projectPath, stdio: "ignore" });
    execSync("git add .", { cwd: projectPath, stdio: "ignore" });
    execSync('git commit -m "Initial commit from xpress-backend"', {
      cwd: projectPath,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

async function updateEnvFile(projectPath, databaseType) {
  const envPath = path.join(projectPath, ".env");
  if (await fs.pathExists(envPath)) {
    let envContent = await fs.readFile(envPath, "utf-8");
    // Update DB_TYPE
    envContent = envContent.replace(/^DB_TYPE=.*$/m, `DB_TYPE=${databaseType}`);
    await fs.writeFile(envPath, envContent);
  }
}

async function createProject() {
  console.log(chalk.blue("🚀 Welcome to xpress-backend CLI Generator!"));
  console.log(chalk.gray("   Scaffold your Express.js project in seconds.\n"));

  const answers = await getAnswers();
  const projectName = sanitizeName(answers.projectName);

  if (!projectName) {
    console.log(
      chalk.red(
        "❌ Invalid project name. Use only letters, numbers, hyphens, and underscores."
      )
    );
    return;
  }

  const projectPath = path.join(TARGET_DIR, projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red("❌ Project already exists. Choose a different name."));
    return;
  }

  const templateType = answers.template || "rest";
  const sourceDir = getTemplateSource(templateType);

  const spinner = ora({
    text: chalk.yellow(`📂 Creating project: ${projectName}...`),
    color: "cyan",
  }).start();

  try {
    await fs.copy(sourceDir, projectPath);
    spinner.succeed(chalk.green("✅ Project created successfully!"));

    // Update .env file with selected database type
    await updateEnvFile(projectPath, answers.database);

    await updatePackageJson(projectPath, answers);

    if (answers.useGit) {
      const gitSpinner = ora({
        text: chalk.yellow("📦 Initializing git repository..."),
        color: "cyan",
      }).start();
      const gitSuccess = await runGitInit(projectPath);
      if (gitSuccess) {
        gitSpinner.succeed(chalk.green("✅ Git repository initialized."));
      } else {
        gitSpinner.warn(chalk.yellow("⚠️  Could not initialize git repository."));
      }
    }

    console.log(chalk.blue(`\n📌 Navigate to your project: cd ${projectName}`));

    if (answers.useTs) {
      console.log(chalk.blue("💡 Run 'npm run dev' to start the development server."));
      console.log(chalk.blue("💡 Run 'npm run build' to compile TypeScript."));
    } else {
      console.log(chalk.blue("💡 Run 'npm install' or 'yarn install' to install dependencies."));
      console.log(chalk.blue("💡 Run 'npm run dev' or 'yarn dev' to start the development server."));
    }

    if (answers.useDocker) {
      console.log(chalk.blue("💡 Run 'npm run docker' to start with Docker."));
    }

    console.log(chalk.magentaBright("\n🎉 Happy Coding!\n"));
  } catch (error) {
    spinner.fail(chalk.red("❌ Error creating project!"));
    console.error(chalk.red(error.message));
  }
}

createProject();
