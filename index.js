import { log } from 'console';
import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());
let teadata = [];
let nextId = 1;

// Adding tea data
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teadata.push(newTea);
    res.status(201).send(newTea);
});

// Getting tea data
app.get('/teas', (req, res) => {
    res.status(200).send(teadata);
});

// Finding data by id
app.get('/teas/:id', (req, res) => {
    const tea = teadata.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Cannot find the item");
    }
    return res.send(tea);
});

// Updating data
app.put('/teas/:id', (req, res) => {
    const tea = teadata.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Cannot find the item");
    }
    tea.name = req.body.name;
    tea.price = req.body.price;
    res.send(tea);
});

// Deleting data
app.delete('/teas/:id', (req, res) => {
    const teaIndex = teadata.findIndex(t => t.id === parseInt(req.params.id));
    if (teaIndex === -1) {
        return res.status(404).send("Cannot find the item");
    }
    const deletedTea = teadata.splice(teaIndex, 1);
    res.send(deletedTea);
});

// Listening
app.listen(port, () => {
    console.log(`Server listening at ${port}.....`);
});
