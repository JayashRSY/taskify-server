"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const boardController_1 = require("../controllers/boardController");
const verifyToken_1 = require("../middlewares/verifyToken");
router.post('/createBoard', verifyToken_1.verifyToken, boardController_1.createBoard);
router.get('/getAllBoards', verifyToken_1.verifyToken, boardController_1.getBoards);
router.get('/getBoard/:id', verifyToken_1.verifyToken, boardController_1.getBoard);
router.put('/updateBoard/:id', verifyToken_1.verifyToken, boardController_1.updateBoard);
router.delete('/deleteBoard/:id', verifyToken_1.verifyToken, boardController_1.deleteBoard);
exports.default = router;
//# sourceMappingURL=boardRoute.js.map