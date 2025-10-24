import Todo from "../models/todo.js";

export async function getAllTodos(req, res) {
    try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    }
    catch (e) {
        res.status(500).json({error: 'Internal Server Error'});
        console.error("ERROR at getAllTodos:",e)
    }
}

export async function createTodo(req, res) {
    try {
        const {title} = req.body;

        if(!title || !title.length) {
            return res.status(400).json({error: 'Title must not be empty'});
        }

        const todo = await Todo.create(req.body)
        res.status(201).json(todo)
    }
    catch (e) {
        console.log("Error at createTodo:",e);
        res.status(500).json({error: 'Internal server error: failed to create todo task'});
    }
}

export async function findById(req, res) {
    try{
        const todo = await Todo.findByPk(req.params.id)
        if(!todo)
            return res.status(404).json({message: 'Task not Found'});
        res.status(200).json(todo)
    }
    catch (e) {
        console.log("Error at findById:",e);
        res.status(500).json({error: 'Internal server error: failed to find task with ID '+ req.params.id});
    }
}

export async function updateById(req, res) {
    try{
        const count = await Todo.update(
            req.body,
            {where: {id: req.params.id}}
        )
        if(!count)
            return res.status(404).json({message: 'Task not Found'});
        const task = await Todo.findByPk(req.params.id)
        res.status(200).json(task)
    }
    catch (e) {
        console.log("Error at updateById:",e);
        res.status(500).json({error: 'Internal server error: failed to update task with ID '+ req.params.id});
    }
}

export async function deleteById(req, res) {
    try {
        const deletedCount = await Todo.destroy({
            where: { id: req.params.id },
        });
        if (deletedCount === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(204).send(); // No content
    } catch (err) {
        console.error("Error deleting todo:", err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}