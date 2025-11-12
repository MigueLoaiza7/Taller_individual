import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  getTasksByUser,
  updateTask,
  deleteTask
} from '../controllers/tasks.controller.js';

const router = Router();

// Rutas para tareas
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.get('/tasks/user/:userId', getTasksByUser);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;