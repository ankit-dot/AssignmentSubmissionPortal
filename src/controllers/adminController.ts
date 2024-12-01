import { Response } from 'express';
import User from '../models/User';
import Assignment from '../models/Assignment';
import { AuthRequest } from '../middleware/auth';
import jwt from 'jsonwebtoken';
export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = new User({ username, password, role: 'admin' });
    await admin.save();
    res.status(201).send({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Admin registration failed' });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ username, role: 'admin' });
    if (!admin || !(await admin.comparePassword(password))) {
      throw new Error();
    }
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET as string);
    res.send({ token });
  } catch (error) {
    res.status(401).send({ error: 'Admin login failed' });
  }
};

export const getAssignments = async (req: AuthRequest, res: Response) => {
  try {
    const assignments = await Assignment.find({ admin: req.user?._id })
      .populate('userId', 'username')
      .select('userId task status createdAt');
    res.send(assignments);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch assignments' });
  }
};

export const acceptAssignment = async (req: AuthRequest, res: Response) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user?._id },
      { status: 'accepted' },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }
    res.send({ message: 'Assignment accepted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to accept assignment' });
  }
};

export const rejectAssignment = async (req: AuthRequest, res: Response) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user?._id },
      { status: 'rejected' },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }
    res.send({ message: 'Assignment rejected successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to reject assignment' });
  }
};

