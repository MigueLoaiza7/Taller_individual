import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
  try {
    const { title, description, completed, user_id } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        completed,
        userId: user_id
      }
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


// Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { user: true }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }
    });
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener tareas por usuario
export const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await prisma.task.findMany({
      where: { userId: parseInt(userId) },
      include: { user: true }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, userId } = req.body;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, userId },
      include: { user: true }
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};