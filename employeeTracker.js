var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_trackerdb"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  selectAction();
});

var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_trackerdb"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  selectAction();
});

// function which prompts the user for what action they should take
function selectAction() {
  inquirer
    .prompt({
      name: "actionSelection",
      type: "list",
      message: "Would you like to do ?",
      choices: [
        "Add a Department",
        "Add a Job Role",
        "Add an Employee",
        "View All Departments", 
        "View All Job Roles",
        "View All Employees",
        "Update an Employee Role",
        // bonus
        "Update an Employee's Manager",
        "View Employees By Manager",
        "Remove Department",
        "Remove Job Role",
        "Remove Employee",
        "View utilized budget of a department", 

        "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.actionSelection === "Add a Department") {
        addDepartment();
      }
      else if(answer.actionSelection === "Add a Job Role") {
        addJobRole();
      }
      else if(answer.actionSelection === "Add an Employee") {
        addEmployee();
      }
      else if(answer.actionSelection === "View All Departments") {
        viewDepartments();
      }
      else if(answer.actionSelection === "View All Job Roles") {
        viewJobRoles();
      }
      else if(answer.actionSelection === "View All Employees") {
        viewAllEmployees();
      }
      else if(answer.actionSelection === "Update an Employee Role") {
        updateEmployeeRole();
      }
      else if(answer.actionSelection === "Update an Employee's Manager") {
        updateEmployeeManager();
      }
      else if(answer.actionSelection === "View Employees By Manager") {
        viewEmployeesByManager();
      }
      else if(answer.actionSelection === "Remove Department") {
        removeDepartment();
      }
      else if(answer.actionSelection === "Remove Job Role") {
        removeJobRole();
      }
      else if(answer.actionSelection === "Remove Employee") {
        removeEmployee();
      }
      else if(answer.actionSelection === "View utilized budget of a department") {
        viewBudgetByDepartment();
      } else{
        connection.end();
      }
    });
}

// function to handle posting new items up for auction
function addDepartment() { }
function addJobRole() { }
function addEmployee() { }
function viewDepartments() { }
function viewJobRoles() { }
function viewAllEmployees() { }
function updateEmployeeRole() { }

// bonus
function updateEmployeeManager() { }
function viewEmployeesByManager() { }
function removeDepartment() { }
function removeJobRole() { }
function removeEmployee() { }
function viewBudgetByDepartment() { }