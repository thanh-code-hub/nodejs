import Todo from "../models/todo.js";
import AppError from "../utils/AppError.js";

export async function getAllTodos(req, res, next) {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
}

export async function createTodo(req, res) {
        const {title} = req.body;

        if(!title || !title.length) {
            throw new AppError('Title must not be empty', 400);
        }

        const todo = await Todo.create(req.body)
        res.status(201).json(todo)
}

export async function findById(req, res) {
    const todo = await Todo.findByPk(req.params.id)
    if(!todo)
        throw new AppError(`No task found with ID ${req.params.id}`, 404);
    res.status(200).json(todo)
}

export async function updateById(req, res) {
        const count = await Todo.update(
            req.body,
            {where: {id: req.params.id}}
        )
        if(!count)
           throw new AppError(`No task found with ID ${req.params.id}`, 404);

        const task = await Todo.findByPk(req.params.id)
        res.status(200).json(task)
}

export async function deleteById(req, res) {
        const deletedCount = await Todo.destroy({
            where: { id: req.params.id },
        });
        if (deletedCount === 0) {
            throw new AppError(`No task found with ID ${req.params.id}`, 404);
        }
        res.status(204).send(); // No content
}