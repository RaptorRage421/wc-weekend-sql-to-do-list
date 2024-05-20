# Weekend Challenge: SQL ToDo List


## Description

_Duration:_ 3 Days (Weekend)

This Project is designed to utilize the knowlege we have learned to create our very own CRUD app. 

- Render data to the DOM via GET requests
- Allow user input to be added to the database via POST request and have that rendered on the DOM
- Allow the user to delete specific items via DELETE request
- Allow the user to change the status of an item via PUT request
- I have added an extra data capture of "isUrgent" to have high priority requests.
- Utilized bootstrap to design the page to look nice under multiple devices. 

## Screenshot
![Screenshot](<server/images/Screenshot 2024-05-19 at 10.18.41 PM.png>)

### Prerequisites
- [PostgreSQL](https://www.postgresql.org/download/)
- [Postico](https://eggerapps.at/postico/v1.php) (_or another way to interact with database for setup_)
- [Node.js](https://nodejs.org/en/download/package-manager/current)
- [Express](https://www.npmjs.com/package/express) (install via npm i)
- [node-postgres](https://www.npmjs.com/package/pg) (install via npm i)

## Installation

1. Create a database named `todos`
2. Use the queries within `database.sql` to create the table and fill it with starter data. 
3. Open the repo and run `npm install` in the terminal
4. Run `npm run start`
    - **Note** this project includes [nodemon](https://www.npmjs.com/package/nodemon) as a globally installed package which will run with the server start script. Since it is globally installed, it is not included as a dependency in the `package.json`. If you are not using nodemon,  you will need to change the `server` script to say `node server/server.js`
5. Visit `localhost:5001` in your browser to interact with the app

## Usage

1. Visit `localhost:5001`
2. All tasks that are in the database will be rendered into the table. 
3. To add a task you will need to enter text in the input field, if the priority is normal, simply press submit, otherwise if the task is urgent, you need to select the `urgent` drop down selection. 
    - This form will not submit unless there is data in the input field. 
4. Once you have completed a task, you can click the completed button and it will change the status. which will mark it as completed. 
5. If you want to delete a task, simply click the delete button and that task will be removed. 
    - will be looking into adding sweetAlert2 support in the future for data protection. 