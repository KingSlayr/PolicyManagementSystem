import mongoose, { Document, Schema } from "mongoose";

interface IPolicyVerification extends Document {
  policy_id: mongoose.Types.ObjectId;
  verifier_id: mongoose.Types.ObjectId;
  verification_date?: Date;
  is_verified: boolean;
}

const PolicyVerificationSchema: Schema = new Schema(
  {
    policy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true,
    },
    verifier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    verification_date: {
      type: Date,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PolicyVerification = mongoose.model<IPolicyVerification>(
  "PolicyVerification",
  PolicyVerificationSchema
);

export default PolicyVerification;
