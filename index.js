const inquirer = require('inquirer');
const htmlObj = require('./GitHubProfileHtmlGenerator');
async function start(answers) {
    console.log("Calling html generator");
    const htmlContent = await htmlObj.getHTML(answers.ussername, answers.color);
    console.log("html Content:");
    console.log(htmlContent);
    var fs = require('fs'),
        convertFactory = require('electron-html-to');

    var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
    });

    conversion({ html: htmlContent }, function (err, result) {
        if (err) {
            return console.error(err);
        }

        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(fs.createWriteStream("./output/" + answers.username + '_GitHubProfile.pdf'));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
    });
}
// start();

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
        start(answers);

    });
