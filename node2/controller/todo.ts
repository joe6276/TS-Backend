import   { RequestHandler}  from "express";

import mssql from 'mssql'
import config from '../config/config'


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
         return res .json({error:err.message});
        
    }

}
export const getTodo:RequestHandler= async(req,res)=>{
        try {
            let pool= await mssql.connect(config)
            const todos= await pool.request().execute('getTodo')
            return res.json(todos.recordset)
        } catch (error:any) {
            return res .json({error:error.message});
            
            
        }
}

export const getSpecificTodo:RequestHandler<{id:string}>= async(req,res)=>{
    try {
        let pool= await mssql.connect(config)
        const todos= await pool.request().execute('getTodo')
        let allTodos=todos.recordset as {id:string,title:string,description:string}[]
        const todoid= req.params.id
        const todoindex= allTodos.findIndex(x => x.id===todoid)
        if(todoindex<0){
            throw new Error('Id Does Not Exist')
        }
         return res.status(201).json(allTodos[todoindex])
    } catch (error:any) {
        return res .json({error:error.message});
        
        
    }
}

export const updateTodo:RequestHandler<{id:string}>= async(req,res,_)=>{
    const{id, title, description} = req.body as {id:string, title:string, description :string}
    try {
        let pool= await mssql.connect(config)
        await pool.request()
        .input('id',mssql.VarChar(50),id)
        .input('title',mssql.VarChar(500),title.toUpperCase())
        .input('description',mssql.VarChar(500),description.toLowerCase())
        .execute('updateTodo')

         return res.status(201).json({message:'Todo Updated Successfully'})
    } catch (error:any) {
        return res .json({error:error.message});
        
    }

}

export const deleteTodo:RequestHandler<{id:string}>= async(req,res,next)=>{
try {
    const todid =req.params.id
    let pool= await mssql.connect(config)
    await pool.request()
    .input('id',mssql.VarChar(50),todid)
    .execute('deleteTodo')

    res.status(201).json({message:'Todo Deleted Successfully'})
} catch (error:any) {
    return res .json({error:error.message});
    
}

}