const inquirer=require("inquirer");
const mysql=require("mysq12");
const {printTable}=require("console-table-printer");
const { listenerCount } = require("process");
require("dotenv").config();

const db = mysql.createConnection({
    host:"localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:3306
})

db.connect(()=>{
    mainMenu()

})

function mainMenu(){
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "Selection",
        choices: ["View All Departments","View All Roles","View All Employees","Add A Department","Add A Role","Add An Employee","Update An Employee Role"]
    })
    .then(answer=>{
        if(answer.selection==="View All Departments"){
            viewDepartments()
        }else if(answer.selection==="View All Roles"){
            viewRoles()
        }else if(answer.selection==="View All Employees"){
            viewEmployees()
        }else if(answer.selection==="Add A Department"){
            addDepartment()
        }else if(answer.selection==="Add A Role"){
            addRole()
        }else if(answer.selection==="Add An Employee"){
            addEmployee()
        }else if(answer.selection==="Update An Employee Role"){
            updateEmployeeRole()
        }
    })
}

function viewDepartments(){

}

function viewRoles(){

}

function viewEmployees(){

}

function addDepartment(){

}

function addRole(){

}

function addEmployee(){

}

function updateEmployeeRole(){
    
}