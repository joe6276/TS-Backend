import   { RequestHandler}  from "express";
import { Todo } from "../models/todo";
import mssql from 'mssql'
import config from '../config/config'
import { json } from "body-parser";

export const createTodo:RequestHandler= async( req,res)=>{
    const{id,title,description}= req.body as{id:string,title:string,description:string}
    try {
        let pool= await mssql.connect(config)
        await pool.request()
        .input('id',mssql.VarChar(50),id)
        .input('title',mssql.VarChar(500),title)
        .input('description',mssql.VarChar(500),description)
        .execute('insertData')
        
        return res.status(201).json({message:'User Todo Added Successfully'})
    } catch(err:any){
        console.log(err.message);
        
    }

}
export const getTodo:RequestHandler= async(req,res)=>{
        try {
            let pool= await mssql.connect(config)
            const todos= await pool.request().execute('getTodo')
            return res.json(todos.recordset[0])
        } catch (error:any) {
            console.log(error.message);
            
            
        }
}

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