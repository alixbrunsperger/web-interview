const express = require('express')
const cors = require('cors')
const fs = require('fs');
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001
const dataFile = __dirname + '/data/todo-lists.json';

function readData() {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFile, 'utf8', (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        })
    });
}

app.get('/todo-lists', async (req, res) => {
    const data = await readData().then(data => data);
    const jsonData = JSON.parse(data);
    res.send(jsonData);
})

app.put('/todo-list/:id', async (req, res) => {
    const todoId = req.params.id;
    const data = await readData().then(data => data);
    const jsonData = JSON.parse(data);

    if (!todoId || !jsonData[todoId]) {
        res.status(404)
        res.send("Id not found")
    } else {
        const obj = {
            ...jsonData,
            [todoId]: { ...req.body },
        }
        fs.writeFile(dataFile, JSON.stringify(obj), 'utf8', () => {
            res.status(200)
            res.send({ "status": "ok" })
        });
    }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
