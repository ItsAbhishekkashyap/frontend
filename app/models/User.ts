import { Schema, Document, model, models, Types } from "mongoose";

// Payment Status Types
type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"
  | "cancelled";

// Payment Reference Interface
export interface IPaymentReference {
  _id: Types.ObjectId;
  razorpayId: string;
  subscriptionId?: string;
  amount: number; // in paise (1 INR = 100 paise)
  currency: string;
  status: PaymentStatus;
  invoiceId: string;
  planId?: string; // for subscriptions
  createdAt: Date;
  refundedAmount?: number;
  refundStatus?: string;
  refundDate?: Date;
  cancelDate?: Date;
}

// User Interface
export interface IUser extends Document {
  email: string;
  password?: string;
  createdAt: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  premium: boolean;
  premiumSince?: Date;
  name?: string;
  picture?: string;
  provider: "credentials" | "google";
  customDomains?: {
    domain: string;
    isVerified: boolean;
    cnameTarget?: string;
  }[];

  
  rootDomains?: { domain: string; verified: boolean }[];



  payments: IPaymentReference[];
  billing?: {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  };
  getActiveSubscription: () => IPaymentReference | null;
}

// Payment Sub-Schema
const PaymentReferenceSchema = new Schema<IPaymentReference>(
  {
    razorpayId: { type: String, required: true },
    subscriptionId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded", "cancelled"], // ✅ 'cancelled' included
      default: "pending",
    },
    invoiceId: { type: String, required: true },
    planId: { type: String },
    createdAt: { type: Date, default: Date.now },
    refundedAmount: { type: Number, default: 0 },
  },
  { _id: true }
);

// User Schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format",
      },
    },
    password: { type: String, select: false },
    resetToken: { type: String, select: false },
    resetTokenExpiry: { type: Date, select: false },
    createdAt: { type: Date, default: Date.now },
    premium: { type: Boolean, default: false },
    premiumSince: Date,
    name: { type: String },
    picture: { type: String },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    customDomains: [
      {
        domain: { type: String, required: true, trim: true, lowercase: true },
        isVerified: { type: Boolean, default: false },
        cnameTarget: { type: String, default: "cname.branqly.xyz" },
      },
    ],

    
    rootDomains: [
  {
    domain: { type: String, required: true },
    verified: { type: Boolean, default: false }
  }
]
,

    payments: [PaymentReferenceSchema],
    billing: {
      name: { type: String },
      address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String, default: "India" },
      },
    },
  },
  {
    collection: "users",
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.resetToken;
        delete ret.resetTokenExpiry;
        return ret;
      },
    },
  }
);

// Indexes
UserSchema.index({ premium: 1 });
UserSchema.index({ "payments.status": 1 });
UserSchema.index({ "payments.razorpayId": 1 });

// Virtual for last payment
UserSchema.virtual("lastPayment").get(function () {
  if (this.payments && this.payments.length > 0) {
    return this.payments[this.payments.length - 1];
  }
  return undefined;
});

// Method to get active subscription
UserSchema.methods.getActiveSubscription = function () {
  if (!this.premium) return null;
  return (
    this.payments
      .filter((p: IPaymentReference) => p.status === "completed" && p.planId)
      .sort(
        (a: IPaymentReference, b: IPaymentReference) =>
          b.createdAt.getTime() - a.createdAt.getTime()
      )[0] || null
  );
};

// Auto-update premium status based on payments
UserSchema.pre("save", function (next) {
  const user = this as IUser;

  if (user.isModified("payments") || user.isNew) {
    // Check if there is at least 1 active (non-cancelled, non-refunded, non-failed) subscription
    const hasActivePayment = user.payments.some(
      (p) =>
        p.status === "completed" &&
        (!p.planId ||
          (p.planId &&
            !user.payments.some(
              (r) =>
                ["refunded", "cancelled", "failed"].includes(r.status) &&
                r.razorpayId === p.razorpayId
            )))
    );

    user.premium = hasActivePayment;

    if (hasActivePayment && !user.premiumSince) {
      user.premiumSince = new Date();
    }

    if (!hasActivePayment) {
      user.premiumSince = undefined; // reset premiumSince if no active plan
    }
  }
  next();
});

export const User = models.User || model<IUser>("User", UserSchema);
