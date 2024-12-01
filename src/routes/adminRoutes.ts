import express from 'express';
import { register, login, getAssignments, acceptAssignment, rejectAssignment } from '../controllers/adminController';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', adminAuth, getAssignments);
router.post('/assignments/:id/accept', adminAuth, acceptAssignment);
router.post('/assignments/:id/reject', adminAuth, rejectAssignment);

export default router;

