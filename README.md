# Unit 12 MySQL Homework: Employee Tracker

## Description

This is a Node CLI applicaiton that allows a user to interact with information about employees stored in a database. Options are given to view existing data, add new data, and has limited functionality to update data in the daabase.

## User Story

As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business

GIVEN a command line interface with a connection to an employee tracking database.
WHEN I choose to View All Departments, Job Role or Employees
THEN I am present with a lits of the appropriate information laid out in a table
WHEN I choose to add a department, a Job Role or an Employee
THEN I am prompted with questions about the new entry
WHEN I enter the new information
THEN the information I added is stored in the database
WHEN I choose to update an employee
THEN the informaiton I provide will overwite the existing data in the database when I enter it

## Acceptance Criteria

DONE - Followed the provided database schema

DONE - Allows the user to View and Add Departments, Roles and Employees. Also allows the user to update an existing employee's information.
  
DONE - Use MySQL database to store the information

DONE - Use Inquirer to ask the questions

DONE - Use Console.table to present the infromation in a table format