import express from 'express';
const router = express.Router();
import {
    createColumn,
    getColumns,
    getColumn,
    deleteColumn,
    updateColumn
} from '../controllers/columnController';
import { verifyToken } from '../middlewares/verifyToken';

router.post('/createColumn', verifyToken, createColumn);
router.get('/getAllColumns', verifyToken, getColumns);
router.get('/getColumn/:id', verifyToken, getColumn);
router.put('/updateColumn/:id', verifyToken, updateColumn);
router.delete('/deleteColumn/:id', verifyToken, deleteColumn);

export default router;