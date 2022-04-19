import { Router } from "express";
const router= Router();
import{createTodo, deleteTodo, getSpecificTodo, getTodo, updateTodo} from '../controller/todo'
// const express= require('express')
// const router=express.Router()

router.post('/',createTodo)

router.get('/', getTodo)

router.get('/:id',getSpecificTodo)

router.patch('/:id',updateTodo)


router.delete('/:id',deleteTodo)

export default router