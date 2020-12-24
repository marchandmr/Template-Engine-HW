const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = []
const managerInfo = () =>
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'manager',
                message: 'What is your Managers name?'
            },
            {
                type: 'input',
                name: 'managerID',
                message: "what is the managers ID #?"
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'what is the managers Email?'
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is the managers office number?'
            }
        ])
        .then((data) => {
            const manager = new Manager(data.manager, data.managerID, data.managerEmail, data.officeNumber)
            employees.push(manager);
            addEmployee();
        })

function addEmployee() {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'type',
                message: ' add an employee?',
                choices: [
                    'engineer',
                    'intern',
                    'manager',
                    'All Done!'
                ]
            }])
        .then((data) => {
            if (data.type === 'intern') {
                internInfo()
            }
            else if (data.type === 'engineer') {
                engineerInfo();
            }
            else if (data.type === 'manager') {
                managerInfo();
            }
            else if (data.type === 'All Done!') {
                fs.writeFileSync(outputPath, render(employees), "utf-8");
                console.log(employees);
            }


        })
}

const internInfo = () =>
    inquirer.prompt(
        [

            {
                type: 'input',
                name: 'intern',
                message: 'What is your interns name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'employee ID #?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'add the interns email address'
            },
            {
                type: 'input',
                name: 'school',
                message: 'add interns school'
            }
        ])
        .then((data) => {
            const intern = new Intern(data.intern, data.id, data.email, data.school)
            employees.push(intern);
            addEmployee();

        })

const engineerInfo = () =>
    inquirer.prompt(
        [

            {
                type: 'input',
                name: 'engineer',
                message: 'What is your engineers name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'employee ID #?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'add the interns email address'
            },
            {
                type: 'input',
                name: 'github',
                message: 'add the engineers github page'
            }
        ])
        .then((data) => {
            const engineer = new Engineer(data.engineer, data.id, data.email, data.github)
            employees.push(engineer);
            addEmployee();
        }
        )

managerInfo();


