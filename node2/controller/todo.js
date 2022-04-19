"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodo = exports.createTodo = void 0;
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
        console.log(err.message);
    }
};
exports.createTodo = createTodo;
const getTodo = async (req, res) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const todos = await pool.request().execute('getTodo');
        return res.json(todos.recordset[0]);
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.getTodo = getTodo;
// export const getSpecificTodo:RequestHandler<{id:string}>=(req,res,next)=>{
//     const todoid=req.params.id
//     const todoIndex=Todos.findIndex(x => x.id === todoid);
//     if(todoIndex<0){
//         throw new Error('Could not Find Todo')
//     }
//     res.json(Todos[todoIndex])
// }
// export const updateTodo:RequestHandler<{id:string}>=(req,res,next)=>{
//     const todoid =req.params.id
//     const {text}= req.body as {text:string}
//     const todoIndex=Todos.findIndex(x => x.id === todoid);
//     if(todoIndex<0){
//         throw new Error('Could not Find Todo')
//     }
//     Todos[todoIndex]= new Todo(Todos[todoIndex].id,text)
//     res.status(201).json({
//         message:" Todo Updated Successfully ",
//         todos:Todos[todoIndex]
//     })
// }
// export const deleteTodo:RequestHandler<{id:string}>=(req,res,next)=>{
// const todid =req.params.id
// const todoIndex=Todos.findIndex(x => x.id === todid);
// if(todoIndex<0){
//     throw new Error('Could not Find Todo')
// }
// Todos.splice(todoIndex,1)
// res.status(201).json({message:'Todo Deleted Successfully'})
// }
