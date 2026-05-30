import mongoose, { Schema, model, models } from 'mongoose';

export interface ITransaction {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  email: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  couponCode?: string;
  couponDiscount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: String,
    razorpaySignature: String,
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    couponCode: String,
    couponDiscount: Number,
  },
  { timestamps: true }
);

export const Transaction = models.Transaction || model<ITransaction>('Transaction', TransactionSchema);
