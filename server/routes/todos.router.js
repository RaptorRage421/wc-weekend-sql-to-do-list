const todoRouter = require('express').Router();
const pool = require('../modules/pool');


todoRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos" ORDER BY "isComplete" ASC, "id" ASC;`

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.error('Error getting todos', err)
            res.sendStatus(500)
        })
})

// POST
todoRouter.post('/', (req, res) => {
    let newTodo = req.body
    console.log("new Todo", newTodo)
    let todoArray = [newTodo.text, newTodo.isComplete, newTodo.isUrgent]
    // console.log('Adding todo', todoArray)

    let queryText = `

    INSERT INTO "todos" ("text","isComplete", "isUrgent")

    VALUES ($1,$2,$3);
    `
    pool.query(queryText, todoArray)
        .then((result) => {
            // console.log(todoArray)
            res.sendStatus(201)
        })
        .catch((err) => {
            console.error('Error adding todo', err)
            res.sendStatus(500)
        })
})

// PUT
todoRouter.put('/complete/:id', (req, res) => {
    let todoId = req.params.id
    let todo = req.body
    // console.log("req.body", req.body)
    // console.log("is ready?" , isComplete)
    // console.log("todo id", todoId)
    let date = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric',hour: "numeric",
    minute: "numeric",
    second: "numeric" };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    
    let queryText = ''

    if (todo.isComplete === true) {
        queryText = `
        UPDATE "todos" SET "isComplete"=true, "completedAt"=$2
        WHERE "id"=$1;
        `;
    }
    else if (todo.isComplete === false) {
        queryText = `
        UPDATE "todos" SET "isComplete"=false
        WHERE "id"=$1;
        `;
    }
    else {
        res.sendStatus(500)
        console.error('Trouble marking as complete')
    }

    pool.query(queryText, [todoId,todo.completedAt])
        .then(() => {
            console.log("To Do #",todoId,"Completed at", formattedDate)
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err)
            res.send(500)
        })
})



// DELETE

todoRouter.delete('/:id', (req, res) => {
    let date = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric',hour: "numeric",
    minute: "numeric",
    second: "numeric" };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log("req params", req.params)
   
    let todoId = req.params.id
    let queryText = `
    DELETE FROM "todos" WHERE "id"=$1;
    `
    pool.query(queryText, [todoId])
        .then(() => {
            console.log(`To Do #${todoId} deleted at ${formattedDate}`)
            res.sendStatus(200)
        })
        .catch((err) => {
            console.error(`Error making query ${queryText}`, err)
            res.sendStatus(500)
        })
})

module.exports = todoRouter;



// module.exports = router;
