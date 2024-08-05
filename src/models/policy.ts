import mongoose, { Schema, Document } from "mongoose";

interface IPolicy extends Document {
  company_id: mongoose.Schema.Types.ObjectId;
  template_id: mongoose.Schema.Types.ObjectId;
  is_verified: boolean;
  periodForAcknowledge: number;
  lastTimeAcknowledged: Date;
  _id: string;
}

const PolicySchema: Schema = new Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  template_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  periodForAcknowledge: {
    type: Number,
    required: true,
    default: 30,
  },
  lastTimeAcknowledged: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Policy = mongoose.model<IPolicy>("Policy", PolicySchema);

export default Policy;
