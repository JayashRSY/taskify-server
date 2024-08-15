import express from 'express';
const router = express.Router();
import {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
} from '../controllers/userController';
import { verifyToken } from '../middlewares/verifyToken';

router.get('/getAllUsers', verifyToken, getAllUsers);
router.get('/getUser', verifyToken, getUser);
router.put('/updateUser', verifyToken, updateUser);
router.delete('/deleteUser', verifyToken, deleteUser);

export default router;