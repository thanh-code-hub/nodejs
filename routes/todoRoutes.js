import express from 'express';
import db from "../models/index.js";

const { Todo } = db

const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await Todo.findAll()
    return res.json({'tasks': todos})
})

router.post('/', async (req,res) => {
    const task = await Todo.create(req.body)
    return res.json(task);
})

router.get('/:id', async (req, res) => {
    const task = await Todo.findOne({where: {id: req.params.id}})
    return res.json(task)
})

router.put('/:id', async (req,res) => {
    await Todo.update(
        req.body,
        {where: {id: req.params.id}}
    )
    const task = await Todo.findOne({where: {id: req.params.id}})
    return res.json(task)
})

router.delete('/:id', async (req, res) => {
    await Todo.destroy({where: {id: req.params.id}})
    return res.json({'message': 'deleted'})
})

export default router