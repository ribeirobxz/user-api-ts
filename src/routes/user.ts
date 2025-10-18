import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controller/user';

const router = Router();

router.post('/', (req, res) => createUser(req, res));
router.patch('/:id', (req, res) => updateUser(req, res));
router.get('/', (req, res) => getAllUsers(req, res));
router.get('/:id', (req, res) => getUserById(req, res));
router.delete('/:id', (req, res) => deleteUser(req, res));

export default router;