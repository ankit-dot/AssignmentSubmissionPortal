import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import Assignment from '../models/Assignment';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password, role: 'user' });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error();
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
    res.send({ token });
  } catch (error) {
    res.status(401).send({ error: 'Login failed' });
  }
};

export const uploadAssignment = async (req: AuthRequest, res: Response) => {
  try {
    const { task, adminId } = req.body;
    const assignment = new Assignment({
      userId: req.user?._id,
      task,
      admin: adminId,
    });
    await assignment.save();
    res.status(201).send({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Assignment upload failed' });
  }
};

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: 'admin' }, 'username');
    res.send(admins);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch admins' });
  }
};

