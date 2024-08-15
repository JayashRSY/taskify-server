"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const columnController_1 = require("../controllers/columnController");
const verifyToken_1 = require("../middlewares/verifyToken");
router.post('/createColumn', verifyToken_1.verifyToken, columnController_1.createColumn);
router.get('/getAllColumns', verifyToken_1.verifyToken, columnController_1.getColumns);
router.get('/getColumn/:id', verifyToken_1.verifyToken, columnController_1.getColumn);
router.put('/updateColumn/:id', verifyToken_1.verifyToken, columnController_1.updateColumn);
router.delete('/deleteColumn/:id', verifyToken_1.verifyToken, columnController_1.deleteColumn);
exports.default = router;
//# sourceMappingURL=columnRoute.js.map