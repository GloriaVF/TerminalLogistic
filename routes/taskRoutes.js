import express from 'express';
import { getTask, updateTaskStatus, showAddTaskForm, showUpdateTaskForm, addTask, updateTask, deleteTask } from '../controller/taskController.js';

const router = express.Router();

router.get('/', getTask);
router.get('/new', showAddTaskForm);
router.get('/:id', showUpdateTaskForm);
router.post('/', addTask);
router.put('/:id', updateTask); 
router.delete('/:id', deleteTask); 
router.put('/:id', updateTaskStatus); 

export default router;
