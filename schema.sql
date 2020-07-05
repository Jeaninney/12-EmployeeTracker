DROP DATABASE IF EXISTS employee_trackerdb;
CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  department_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

USE employee_trackerdb;

INSERT into department (dept_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


INSERT into role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT into employee (first_name, last_name, role_id, department_id, manager_id)
VALUES ("John", "Doe", 1, 1),
    ("Mike", "Chan", 2, 1, 1),
    ("Ashley", "Rodriguez", 3, 2),
    ("Kevin", "Tupik", 4, 2, 3),
    ("Malia", "Brown", 5, 3),
    ("Sarah", "Lourd", 6, 4),
    ("Tom", "Allen", 7, 4, 7);