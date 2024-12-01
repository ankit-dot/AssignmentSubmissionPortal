import mongoose, { Document, Schema } from 'mongoose';

export interface IAssignment extends Document {
  userId: mongoose.Types.ObjectId;
  task: string;
  admin: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const assignmentSchema = new Schema<IAssignment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAssignment>('Assignment', assignmentSchema);

