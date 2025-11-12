import { PrismaClient } from '@prisma/client';  // ✅ Importa Prisma

const prisma = new PrismaClient();              // ✅ Crea la instancia

export const createUser = async (req, res) => {
  try {
    // Obtiene los datos enviados desde Insomnia
    const { name, email } = req.body;

    // 👇 Aquí es donde va el prisma.user.create
    const user = await prisma.user.create({
      data: { name, email },
    });

    // Responde al cliente con el usuario creado
    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { tasks: true }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { tasks: true }
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, name }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};