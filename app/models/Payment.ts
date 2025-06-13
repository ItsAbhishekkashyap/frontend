// models/Payment.ts
import { Schema, Document, model, models } from "mongoose";

export interface IPayment extends Document {
  userId: Schema.Types.ObjectId;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: 'created' | 'captured' | 'failed' | 'refunded';
  invoiceId: string;
  planId?: string; // For subscriptions
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  razorpayPaymentId: { type: String, required: true, unique: true },
  razorpayOrderId: { type: String, required: true },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true }, // in paise (e.g., 1000 = ₹10)
  currency: { type: String, default: 'INR' },
  status: { 
    type: String, 
    enum: ['created', 'captured', 'failed', 'refunded'],
    default: 'created'
  },
  invoiceId: { type: String, required: true },
  planId: { type: String }, // Optional for subscriptions
  createdAt: { type: Date, default: Date.now }
}, { collection: "payments" });

export const Payment = models.Payment || model<IPayment>("Payment", PaymentSchema);