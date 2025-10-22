const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize, Model, DataTypes, where} = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());


// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define model
const Todo = sequelize.define('Todo',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

// Sync models with database
sequelize.sync();

app.get('/', (req, res) => {
    res.json({'message': 'working'});
})

app.get('/todo', async (req, res) => {
    const todos = await Todo.findAll()
    return res.json({'tasks': todos})
})

app.post('/todo', async (req,res) => {
    const task = await Todo.create(req.body)
    return res.json(task);
})

app.get('/todo/:id', async (req, res) => {
    const task = await Todo.findOne({where: {id: req.params.id}})
    return res.json(task)
})

app.put('/todo/:id', async (req,res) => {
    await Todo.update(
        req.body,
        {where: {id: req.params.id}}
    )
    const task = await Todo.findOne({where: {id: req.params.id}})
    return res.json(task)
})

app.delete('/todo/:id', async (req, res) => {
    await Todo.destroy({where: {id: req.params.id}})
    return res.json({'message': 'deleted'})
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})