import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, "src");
const TARGET_DIR = process.cwd();

const QUESTIONS = [
    {
        type: "input",
        name: "projectName",
        message: "Enter the project name:",
        default: "express-api",
    },
];

async function createProject() {
    console.log(chalk.blue("🚀 Welcome to Node Express CLI Generator!"));

    const answers = await inquirer.prompt(QUESTIONS);
    const projectPath = path.join(TARGET_DIR, answers.projectName);

    if (fs.existsSync(projectPath)) {
        console.log(chalk.red("❌ Project already exists. Choose a different name."));
        return;
    }

    const spinner = ora({
        text: chalk.yellow(`📂 Creating project: ${answers.projectName}...`),
        color: 'cyan',
    }).start();

    try {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Copy template files
        fs.copySync(SRC_DIR, projectPath);

        // Replace placeholders in package.json
        const packageJsonPath = path.join(projectPath, "package.json");
        const packageJson = fs.readJsonSync(packageJsonPath);
        packageJson.name = answers.projectName;
        fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

        spinner.succeed(chalk.green("✅ Project created successfully!"));

        console.log(chalk.blue(`📌 Navigate to your project: cd ${answers.projectName}`));
        console.log(chalk.blue("💡 Run 'npm install' or 'yarn install' to install dependencies."));
        console.log(chalk.blue("💡 Run 'npm dev' or 'yarn dev' to start the development server."));

        console.log(chalk.magentaBright("\n🎉 Happy Coding!\n"));
    } catch (error) {
        spinner.fail(chalk.red("❌ Error creating project!"));
        console.error(error);
    }
}

createProject();
