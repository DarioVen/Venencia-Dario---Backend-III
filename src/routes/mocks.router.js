import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import Users from '../dao/Users.dao.js';
import Pets from '../dao/Pets.dao.js';

const router = Router();
const usersDao = new Users();
const petsDao = new Pets();

router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers();
    res.json({ status: "success", payload: users });
});

router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        // Generar y guardar usuarios
        const mockUsers = generateMockUsers(users);
        const savedUsers = [];
        for (const user of mockUsers) {
            const savedUser = await usersDao.save(user);
            savedUsers.push(savedUser);
        }

        // Generar y guardar mascotas
        const mockPets = generateMockPets(pets);
        const savedPets = [];
        for (const pet of mockPets) {
            const savedPet = await petsDao.save(pet);
            savedPets.push(savedPet);
        }

        res.json({
            status: "success",
            message: "Datos generados exitosamente",
            payload: {
                users: savedUsers,
                pets: savedPets
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        });
    }
});

export default router;