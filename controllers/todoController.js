import Todo from "../models/todo.js";

export async function getAllTodos(req, res) {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
}

export async function createTodo(req, res) {
    const todo = await Todo.create(req.body)
    if(todo)
        res.status(200).json(todo)
    else
        res.status(500).send('Internal server error');
}

export async function findById(req, res) {
    const todo = await Todo.findByPk(req.params.id)
    if(todo)
        res.status(200).json(todo)
    else
        res.status(404).send('Not Found');
}

export async function updateById(req, res) {
    await Todo.update(
        req.body,
        {where: {id: req.params.id}}
    )
    return res.status(200).json()
}

export async function deleteById(req, res) {
    await Todo.destroy({where: {id: req.params.id}})
    return res.status(200).json()
}