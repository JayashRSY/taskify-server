import express from 'express';
const router = express.Router();
import {
    createBoard,
    getBoards,
    getBoard,
    deleteBoard,
    updateBoard
} from '../controllers/boardController';
import { verifyToken } from '../middlewares/verifyToken';

router.post('/createBoard', verifyToken, createBoard);
router.get('/getAllBoards', verifyToken, getBoards);
router.get('/getBoard/:id', verifyToken, getBoard);
router.put('/updateBoard/:id', verifyToken, updateBoard);
router.delete('/deleteBoard/:id', verifyToken, deleteBoard);

export default router;