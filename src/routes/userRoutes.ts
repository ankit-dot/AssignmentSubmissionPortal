import express from 'express';
import { register, login, uploadAssignment, getAdmins } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', auth, uploadAssignment);
router.get('/admins', auth, getAdmins);

export default router;

