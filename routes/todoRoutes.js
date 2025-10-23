import express from 'express';
import {createTodo, deleteById, findById, getAllTodos, updateById} from "../controllers/todoController.js";

const router = express.Router();

router.get('/', getAllTodos)

router.post('/', createTodo)

router.get('/:id', findById)

router.put('/:id', updateById)

router.delete('/:id', deleteById)

export default router