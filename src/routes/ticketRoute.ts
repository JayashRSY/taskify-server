import express from 'express';
const router = express.Router();
import {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
} from '../controllers/ticketController';
import { verifyToken } from '../middlewares/verifyToken';

router.post('/createTicket', verifyToken, createTicket);
router.get('/getTickets', verifyToken, getTickets);
router.get('/getTicket/:id', verifyToken, getTicket);
router.put('/updateTicket/:id', verifyToken, updateTicket);
router.delete('/deleteTicket/:id', verifyToken, deleteTicket);

export default router;