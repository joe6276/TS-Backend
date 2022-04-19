"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todo_1 = require("../controller/todo");
// const express= require('express')
// const router=express.Router()
router.post('/', todo_1.createTodo);
router.get('/', todo_1.getTodo);
router.get('/:id', todo_1.getSpecificTodo);
router.patch('/:id', todo_1.updateTodo);
router.delete('/:id', todo_1.deleteTodo);
exports.default = router;
