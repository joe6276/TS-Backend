"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getSpecificTodo = exports.getTodo = exports.createTodo = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const createTodo = async (req, res) => {
    const { id, title, description } = req.body;
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        await pool.request()
            .input('id', mssql_1.default.VarChar(50), id)
            .input('title', mssql_1.default.VarChar(500), title)
            .input('description', mssql_1.default.VarChar(500), description)
            .execute('insertData');
        return res.status(201).json({ message: 'User Todo Added Successfully' });
    }
    catch (err) {
        return res.json({ error: err.message });
    }
};
exports.createTodo = createTodo;
const getTodo = async (req, res) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const todos = await pool.request().execute('getTodo');
        return res.json(todos.recordset);
    }
    catch (error) {
        return res.json({ error: error.message });
    }
};
exports.getTodo = getTodo;
const getSpecificTodo = async (req, res) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const todos = await pool.request().execute('getTodo');
        let allTodos = todos.recordset;
        const todoid = req.params.id;
        const todoindex = allTodos.findIndex(x => x.id === todoid);
        if (todoindex < 0) {
            throw new Error('Id Does Not Exist');
        }
        return res.status(201).json(allTodos[todoindex]);
    }
    catch (error) {
        return res.json({ error: error.message });
    }
};
exports.getSpecificTodo = getSpecificTodo;
const updateTodo = async (req, res, _) => {
    const { id, title, description } = req.body;
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        await pool.request()
            .input('id', mssql_1.default.VarChar(50), id)
            .input('title', mssql_1.default.VarChar(500), title.toUpperCase())
            .input('description', mssql_1.default.VarChar(500), description.toLowerCase())
            .execute('updateTodo');
        return res.status(201).json({ message: 'Todo Updated Successfully' });
    }
    catch (error) {
        return res.json({ error: error.message });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res, next) => {
    try {
        const todid = req.params.id;
        let pool = await mssql_1.default.connect(config_1.default);
        await pool.request()
            .input('id', mssql_1.default.VarChar(50), todid)
            .execute('deleteTodo');
        res.status(201).json({ message: 'Todo Deleted Successfully' });
    }
    catch (error) {
        return res.json({ error: error.message });
    }
};
exports.deleteTodo = deleteTodo;
