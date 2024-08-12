import express from 'express';
const router = express.Router();
import {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
} from '../controllers/ticket.controller.ts';
import { verifyToken } from '../middlewares/verifyToken.ts';

router.post('/createTicket', verifyToken, createTicket);
router.get('/getAllTickets', verifyToken, getTickets);
router.get('/getTicket/:id', verifyToken, getTicket);
router.put('/updateTicket/:id', verifyToken, updateTicket);
router.delete('/deleteTicket/:id', verifyToken, deleteTicket);

export default router;