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
	database: "employee_trackerdb",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
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

				"EXIT",
			],
		})
		.then(function (answer) {
			// based on their answer, activate the appropriate function
			if (answer.actionSelection === "Add a Department") {
				addDepartment();
			} else if (answer.actionSelection === "Add a Job Role") {
				addJobRole();
			} else if (answer.actionSelection === "Add an Employee") {
				addEmployee();
			} else if (answer.actionSelection === "View All Departments") {
				viewDepartments();
			} else if (answer.actionSelection === "View All Job Roles") {
				viewJobRoles();
			} else if (answer.actionSelection === "View All Employees") {
				viewAllEmployees();
			} else if (answer.actionSelection === "Update an Employee Role") {
				updateEmployeeRole();
			} else {
				// if one of the selections was not chosen, the program closes
				connection.end();
			}
		});
}

// generic lookup function that can be re-used
function lookup(tableName, columnName, condition) {
	return new Promise(function (resolve, reject) {
		// if a condition is passed in, it will handle it with the condition

		if (condition) {
			connection.query(
				`SELECT ${columnName} FROM ${tableName} ${condition}`,
				function (err, data) {
					resolve(data);
				}
			);
		}
		// if a condition isn't passed in, it will handle the lookup without a condition
		else {
			connection.query(`SELECT ${columnName} FROM ${tableName}`, function (
				err,
				data
			) {
				if (err) throw err;
				console.log(data);
				resolve(data);
			});
		}
	});
}

// function to handle adding a new department
function addDepartment() {
	inquirer
		.prompt({
			name: "dept",
			type: "input",
			message: "What is the name of the department you'd like to add?",
		})
		.then((answer) => {
			// based on their answer, either call the bid or the post functions
			connection.query(
				`INSERT INTO department (dept_name) VALUES ("${answer.dept}")`,
				(err, result) => {
					if (err) throw err;
					console.log("New Department Added!");
					viewDepartments();
				}
			);
		});
}

// function to handle adding a new job role
function addJobRole() {
	lookup("department", "dept_name").then((department) => {
		const newDepartment = department.map((dept) => {
			return dept.dept_name;
		});
		inquirer
			.prompt([
				{
					type: "input",
					message: "What is the job title?",
					name: "title",
				},
				{
					type: "input",
					message: "What is the salary for the position?",
					name: "salary",
				},
				{
					type: "list",
					message: "Which department is this role in?",
					name: "department",
					choices: newDepartment,
				},
			])
			.then((answer) => {
				lookup(
					"department",
					"id",
					`WHERE dept_name = "${answer.department}"`
				).then((data) => {
					connection.query(
						`INSERT INTO role (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${data[0].id}")`,
						function (err, result) {
							if (err) throw err;
							console.log("Role Added!");
							selectAction();
						}
					);
				});
			});
	});
}

// function to handle adding a new employee
function addEmployee() {
	lookup("role", "title").then((jobRole) => {
		const jobRoleChoices = jobRole.map((job) => {
			return job.title;
		});

		lookup("employee", "first_name, last_name, id").then((names) => {
			const managerChoices = names.map((name) => {
				let fullName = `${name.first_name} ${name.last_name}`;
				// fullName = fullName.concat(" ", lastName);
				return fullName;
			});
			managerChoices.push("None");
			console.log(managerChoices);

			inquirer
				.prompt([
					{
						type: "input",
						message: "What is the Employee's first name?",
						name: "first",
					},
					{
						type: "input",
						message: "What is the Employee's last name?",
						name: "last",
					},
					{
						type: "list",
						message: "What is the employee's role?",
						name: "jobRole",
						choices: jobRoleChoices,
					},
					{
						type: "list",
						message: "Who will manage this employee?",
						name: "manager",
						choices: managerChoices,
					},
				])
				.then((answer) => {
					console.log(answer);
					connection.query(
						`SELECT * FROM employee WHERE concat(first_name, " ", last_name)="${answer.manager}"`,
						// `SELECT * FROM employee WHERE concat(first_name, " ", last_name)="${answer.first} ${answer.last}"`,
						(error, managerdata) => {
							console.log(managerdata);
							connection.query(
								"SELECT * FROM role WHERE title= ? ",
								answer.jobRole,
								(err, data) => {
									var statement = connection.query(
										`INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES ("${answer.first}", "${answer.last}", "${data[0].id}","${data[0].department_id}","${managerdata[0].id}")`,
										function (err, result) {
											if (err) throw err;
											console.log("Role Added!");
											selectAction();
										}
									);
								}
							);
						}
					);
				});
		});
	});
}

// function to view all the departments
function viewDepartments() {
	connection.query("SELECT * FROM department", function (err, res) {
		if (err) throw err;
		console.table(res);
		selectAction();
	});
}

// function to view all the job roles
function viewJobRoles() {
	connection.query("SELECT * FROM role", function (err, res) {
		if (err) throw err;
		console.table(res);
		selectAction();
	});
}

// function to view all the employees
function viewAllEmployees() {
	connection.query("SELECT * FROM employee", function (err, res) {
		if (err) throw err;
		console.table(res);
		selectAction();
	});
}

// function to update an employee's job role
function updateEmployeeRole() {}

