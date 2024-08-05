import mongoose, { Document, Schema } from "mongoose";

interface IAcknowledge extends Document {
  employee_id: mongoose.Schema.Types.ObjectId;
  policy_id: mongoose.Schema.Types.ObjectId;
  initiated_date: Date;
  expiry_date: Date;
  is_fulfilled: boolean;
  type: string; 
}

const AcknowledgeSchema: Schema = new Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  policy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policy",
    required: true,
  },
  initiated_date: {
    type: Date,
    default: Date.now,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  is_fulfilled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
});

const Acknowledge = mongoose.model<IAcknowledge>(
  "Acknowledge",
  AcknowledgeSchema
);

export default Acknowledge;
