import express from 'express';
import { 
    createAnimal, 
    getAllAnimals, 
    getAnimalById, 
    updateAnimal, 
    deleteAnimal 
} from '../controllers/animal.controller.js';

const router = express.Router();

router.post('/', createAnimal);

router.get('/', getAllAnimals);

router.get('/:id', getAnimalById);

router.put('/:id', updateAnimal);

router.delete('/:id', deleteAnimal);

export default router;