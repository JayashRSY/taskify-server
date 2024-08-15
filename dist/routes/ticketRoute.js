"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ticketController_1 = require("../controllers/ticketController");
const verifyToken_1 = require("../middlewares/verifyToken");
router.post('/createTicket', verifyToken_1.verifyToken, ticketController_1.createTicket);
router.get('/getTickets', verifyToken_1.verifyToken, ticketController_1.getTickets);
router.get('/getTicket/:id', verifyToken_1.verifyToken, ticketController_1.getTicket);
router.put('/updateTicket/:id', verifyToken_1.verifyToken, ticketController_1.updateTicket);
router.delete('/deleteTicket/:id', verifyToken_1.verifyToken, ticketController_1.deleteTicket);
exports.default = router;
//# sourceMappingURL=ticketRoute.js.map