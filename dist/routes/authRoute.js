"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const loginLimiter_1 = __importDefault(require("../middlewares/loginLimiter"));
const authController_1 = require("../controllers/authController");
router.post('/signup', authController_1.signup);
router.post('/signin', loginLimiter_1.default, authController_1.signin);
router.post('/google', authController_1.google);
router.post('/signout', authController_1.signout);
router.get('/refresh', authController_1.refresh);
exports.default = router;
//# sourceMappingURL=authRoute.js.map