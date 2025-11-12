import prisma from "../prismaClient.js";
// Create Animal
export const createAnimal = async (req, res) => {
    const { nombre, especie, edad } = req.body;
    const newAnimal = await prisma.animal.create({
        data: {
            nombre,
            especie,
            edad
        }
    });
    res.status(201).json(newAnimal);
};

export const getAllAnimals = async (req, res) => {
    const animals = await prisma.animal.findMany({
        include: {
            registros: true
        }
    });
    res.status(200).json(animals);
};

export const getAnimalById = async (req, res) => {
    const { id } = req.params;
    const animal = await prisma.animal.findUnique({
        where: { id: parseInt(id) },
        include: {
            registros: true
        }
    });
    
    if (!animal) {
        return res.status(404).json({ error: "Animal no encontrado" });
    }
    
    res.status(200).json(animal);
};

export const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { nombre, especie, edad } = req.body;
    const updatedAnimal = await prisma.animal.update({
        where: { id: parseInt(id) },
        data: { nombre, especie, edad }
    });
    res.status(200).json(updatedAnimal);
};

export const deleteAnimal = async (req, res) => {
    const { id } = req.params;
    await prisma.animal.delete({
        where: { id: parseInt(id) }
    });
    res.status(204).send();
};