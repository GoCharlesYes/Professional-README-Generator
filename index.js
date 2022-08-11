// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
{
    type: 'input',
    name: 'title',
    message: 'Enter title of project.',
    validate: titleInput => {
        if (titleInput) {
            return true;
        } else {
            console.log('Please enter the title of your project!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'githubUser',
    message: 'What is your GitHub Username?',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Enter your GitHub username!');
            return false;
        }
    }
},
{ 
    // CURRENT EDIT HERE
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Enter your email address!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'what',
    message: 'What is your project name and description',
    validate: whatInput => {
        if (whatInput) {
            return true;
        } else {
            console.log('Please enter your project name and description!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'why',
    message: 'Why did you choose to create this project?',
    validate: whyInput => {
        if (whyInput) {
            return true;
        } else {
            console.log('Please enter an explanation for the creation of this project');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'how',
    message: 'How will this be used by others?',
    validate: howInput => {
        if (howInput) {
            return true;
        } else {
            console.log('Please enter answer!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'installation',
    message: 'Enter step-by-step installation instructions for this project.',
    validate: installInput => {
        if (installInput) {
            return true;
        } else {
            console.log('Please enter installation instructions!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'usage',
    message: 'Provide instructions and examples for the use of this project.',
    validate: usageInput => {
        if (usageInput) {
            return true;
        } else {
            console.log('Please enter instructions!');
            return false;
        }
    }
},
{
    type: 'list',
    name: 'license',
    message: 'Which license will be used for this project?',
    choices: ['agpl', 'apache', 'mit', 'no license']
},
{
    type: 'confirm',
    name: 'confirmContributers',
    message: 'Would you like to allow other developers to contribute?',
    default: true
},
{
    type: 'input',
    name: 'contribute',
    message: 'Please provide contribution guidelines.',
    when: ({ confirmContributers }) => {
        if (confirmContributers) {
            return true;
        } else {
            return false;
        }
    },
    validate: contributerInput => {
        if (contributerInput) {
            return true;
        } else {
            console.log('Please enter contribution guidelines!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'test',
    message: 'Provide instructions on how to test application.',
    validate: testInput => {
        if (testInput) {
            return true;
        } else {
            console.log('Please enter application test instructions!');
            return false;
        }
    }
}
];


// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/new-README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'New README created!'
            });
        });
    });
};

const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
};

// TODO: Create a function to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
});