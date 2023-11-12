const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
});

db.connect(() => {
    mainMenu();
});

function mainMenu() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "selection",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role"]
    })
    .then(answer => {
        if (answer.selection === "View All Departments") {
            viewDepartments();
        } else if (answer.selection === "View All Roles") {
            viewRoles();
        } else if (answer.selection === "View All Employees") {
            viewEmployees();
        } else if (answer.selection === "Add A Department") {
            addDepartment();
        } else if (answer.selection === "Add A Role") {
            addRole();
        } else if (answer.selection === "Add An Employee") {
            addEmployee();
        } else if (answer.selection === "Update An Employee Role") {
            updateEmployeeRole();
        }
    });
}

function viewDepartments() {
    console.log("Viewing departments. Not implemented yet.");
    mainMenu();
}

function viewRoles() {
    console.log("Viewing roles. Not implemented yet.");
    mainMenu();
}

function viewEmployees() {
    const query = `
        SELECT employee.id, employee.first_name, employee.last_name, title, name as department, salary, 
        CONCAT(bosses.first_name, ' ', bosses.last_name) as manager 
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS bosses ON employee.manager_id = bosses.id;`;

    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching employees:", err);
        } else {
            printTable(data);
        }
        mainMenu();
    });
}


function addDepartment() {
    console.log("Adding a department. Not implemented yet.");
    mainMenu();
}

function addRole() {
    console.log("Adding a role. Not implemented yet.");
    mainMenu();
}

function addEmployee() {
    db.query("SELECT id as value, title as name from role ", (err, roleData) => {
        db.query("SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee WHERE manager_id is null", (err, ManagerData) => {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the first name?",
                    name: "first_name",
                },
                {
                    type: "input",
                    message: "What is the last name?",
                    name: "last_name",
                },
                {
                    type: "list",
                    message: "Choose the following title:",
                    name: "role_id",
                    choices: roleData
                },
                {
                    type: "list",
                    message: "Choose the following title:",
                    name: "manager_id",
                    choices: ManagerData
                },
            ]).then(answer => {
                db.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], err => {
                    if (err) {
                        console.error("Error adding employee:", err);
                    } else {
                        console.log("Employee added successfully.");
                        viewEmployees();  // Call viewEmployees after adding an employee
                    }
                    mainMenu();
                });
            });
        });
    });
}

function updateEmployeeRole() {
    console.log("Updating employee role. Not implemented yet.");
    mainMenu();
}
