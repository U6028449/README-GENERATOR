
// TODO: Include packages needed for this application
const { renderLicenseBadge, renderLicenseLink, renderLicenseSection } = require('./generateMarkdown');
const inquirer = require('inquirer');
const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project:',
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Enter the installation instructions:',
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Enter the usage information:',
      },
      {
        type: 'input',
        name: 'contributing',
        message: 'Enter the contribution guidelines:',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Enter the test instructions:',
      },
      {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your application:',
        choices: ['MIT', 'Apache 2.0', 'GPLv3', 'BSD 3-Clause', 'None'],
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
      },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("Successfully wrote to " + fileName);
      });
}


// TODO: Create a function to generate markdown for README
function generateReadme(answers) {
    return `
# ${answers.title}
${renderLicenseBadge(answers.license)}

## Description

${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
${renderLicenseLink(answers.license)}
* [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

${renderLicenseSection(answers.license)}

## Questions

If you have any questions about the repo, open an issue or contact me directly at ${answers.email}. You can find more of my work at [${answers.github}](https://github.com/${answers.github}/).
  `;
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
      // Generate the README content based on the answers
      const readmeContent = generateReadme(answers);

      // Write the content to a new README.md file
      writeToFile('../README.md', readmeContent);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function call to initialize app
init();
