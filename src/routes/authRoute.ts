import express from 'express';
const router = express.Router();
import loginLimiter from '../middlewares/loginLimiter';
import {
    signup,
    signin,
    google,
    signout,
    refresh,
} from '../controllers/authController';

router.post('/signup', signup);
router.post('/signin', loginLimiter, signin);
router.post('/google', google);
router.post('/signout', signout);
router.get('/refresh', refresh);

export default router;