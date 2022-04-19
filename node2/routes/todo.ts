import { Router } from "express";
const router= Router();
import{createTodo, getTodo, } from '../controller/todo'
// const express= require('express')
// const router=express.Router()

router.post('/',createTodo)

router.get('/', getTodo)

router.get('/:id',)

router.patch('/:id',)


router.delete('/:id',)

export default router