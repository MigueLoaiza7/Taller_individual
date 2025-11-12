import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  getTasksByUser,
  updateTask,
  deleteTask
} from '../controllers/taskscontroller.js';

const router = Router();

// Rutas para tareas
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.get('/user/:userId', getTasksByUser);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;