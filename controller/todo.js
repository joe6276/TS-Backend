"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getSpecificTodo = exports.getTodo = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
// DRY CODING
// export const createTodo=( req:Request,res:Response,next:NextFunction)=>{
// }
const Todos = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    Todos.push(newTodo);
    res.status(201).json({ message: 'Created todo',
        todo: newTodo
    });
};
exports.createTodo = createTodo;
const getTodo = (req, res, next) => {
    res.json({ todos: Todos });
};
exports.getTodo = getTodo;
const getSpecificTodo = (req, res, next) => {
    const todoid = req.params.id;
    const todoIndex = Todos.findIndex(x => x.id === todoid);
    if (todoIndex < 0) {
        throw new Error('Could not Find Todo');
    }
    res.json(Todos[todoIndex]);
};
exports.getSpecificTodo = getSpecificTodo;
const updateTodo = (req, res, next) => {
    const todoid = req.params.id;
    const { text } = req.body;
    const todoIndex = Todos.findIndex(x => x.id === todoid);
    if (todoIndex < 0) {
        throw new Error('Could not Find Todo');
    }
    Todos[todoIndex] = new todo_1.Todo(Todos[todoIndex].id, text);
    res.status(201).json({
        message: " Todo Updated Successfully ",
        todos: Todos[todoIndex]
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todid = req.params.id;
    const todoIndex = Todos.findIndex(x => x.id === todid);
    if (todoIndex < 0) {
        throw new Error('Could not Find Todo');
    }
    Todos.splice(todoIndex, 1);
    res.status(201).json({ message: 'Todo Deleted Successfully' });
};
exports.deleteTodo = deleteTodo;
