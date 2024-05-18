const todoRouter = require('express').Router();
const pool = require('../modules/pool');


todoRouter.get('/', (req, res)=>{
    let queryText = `SELECT * FROM "todos" ORDER BY "id";`

    pool.query(queryText)
        .then((result)=>{
            res.send(result.rows)
        })
        .catch((err)=>{
            console.error('Error getting todos', err)
            res.sendStatus(500)
        })
})

// POST
todoRouter.post('/', (req, res)=>{
    let newTodo = req.body
    let todoArray = [newTodo.text, newTodo.isComplete]
    // console.log('Adding todo', todoArray)

    let queryText = `

    INSERT INTO "todo" ("text", "isComplete")

    VALUES ($1, $2);
    `
    pool.query(queryText, todoArray)
        .then((result)=>{
            res.sendStatus(201)
        })
        .catch((err)=>{
            console.error('Error adding todo', err)
            res.sendStatus(500)
        })
})

// PUT
// todoRouter.put('/ready/:id', (req, res)=>{
//     let todoId = req.params.id
//     let isReady = req.body.ready_for_transfer
//     // console.log("req.body", req.body)
// // console.log("is ready?" , isReady)
// // console.log("todo id", todoId)
//     let queryText = ''

//     if (isReady === true){
//         queryText = `
//         UPDATE "todo" SET "ready_for_transfer"=true
//         WHERE "id"=$1;
//         `;
//     } 
//     else if(isReady === false){
//         queryText = `
//         UPDATE "todo" SET "ready_for_transfer"=false
//         WHERE "id"=$1;
//         `;
//     }    
//     else {
//         res.sendStatus(500)
//         console.error('Trouble marking as ready')
//     }

//     pool.query(queryText, [todoId])
//         .then(()=>{
//             res.sendStatus(204)
//         })
//         .catch((err)=>{
//             console.log(`Error making query ${queryText}`, err)
//             res.send(500)
//         })
// })

// todoRouter.put('/name/:id', (req, res)=>{
//     let todoId = req.params.id
//     let incName = req.body.name
//     console.log("req.body", req.body)
// console.log("name." , incName)
// console.log("todo id", todoId)
//     let queryText = ''

    
//         queryText = `
//         UPDATE "todo" SET "name"=$2
//         WHERE "id"=$1;
//         `;
    
    
//     pool.query(queryText, [todoId,incName])
//         .then(()=>{
//             res.sendStatus(204)
//         })
//         .catch((err)=>{
//             console.log(`Error making query ${queryText}`, err)
//             res.send(500)
//         })
// })

// todoRouter.put('/age/:id', (req, res)=>{
//     let todoId = req.params.id
//     let incAge = req.body.age
//     console.log("req.body", req.body)
// console.log("age." , incAge)
// console.log("todo id", todoId)
//     let queryText = ''

    
//         queryText = `
//         UPDATE "todo" SET "age"=$2
//         WHERE "id"=$1;
//         `;
    
    
//     pool.query(queryText, [todoId,incAge])
//         .then(()=>{
//             res.sendStatus(204)
//         })
//         .catch((err)=>{
//             console.log(`Error making query ${queryText}`, err)
//             res.send(500)
//         })
// })

// todoRouter.put('/color/:id', (req,res) => {
//         let todoId = req.params.id
//         let incColor = req.body.favorite_color
//         let queryText = ''
//         queryText = `
//         UPDATE "todo" SET "favorite_color" = $2
//         WHERE "id"=$1;`
// pool.query(queryText, [todoId, incColor])
// .then(()=>{
//     res.sendStatus(204)
// })
// .catch((err)=>{
//     console.log(`Error making query ${queryText}`, err)
//     res.send(500)
// })
// })

// todoRouter.put('/notes/:id', (req, res)=>{
//     let todoId = req.params.id
//     let incNotes = req.body.notes
//     console.log("req.body", req.body)
// console.log("notes." , incNotes)
// console.log("todo id", todoId)
//     let queryText = ''

    
//         queryText = `
//         UPDATE "todo" SET "notes"=$2
//         WHERE "id"=$1;
//         `;
    
    
//     pool.query(queryText, [todoId,incNotes])
//         .then(()=>{
//             res.sendStatus(204)
//         })
//         .catch((err)=>{
//             console.log(`Error making query ${queryText}`, err)
//             res.send(500)
//         })
// })

// // DELETE

todoRouter.delete('/:id', (req,res)=>{
    console.log("req params", req.params)

    let todoId = req.params.id
    let queryText = `
    DELETE FROM "todo" WHERE "id"=$1;
    `
    pool.query(queryText, [todoId])
        .then(()=>{
            res.sendStatus(200)
        })
        .catch((err)=>{
            console.error(`Error making query ${queryText}`, err)
            res.sendStatus(500)
        })
})

module.exports = todoRouter;



// module.exports = router;
