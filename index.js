var inquirer = require('inquirer');
inquirer
    .prompt([
        {
            type: "input",
            message: "GitHub username:",
            name: "username"
        },
        {
            type: "input",
            message: "What is your favorite color?",
            name: "color"
        },

    ])
    .then(answers => {
        console.log(answers);
    });
