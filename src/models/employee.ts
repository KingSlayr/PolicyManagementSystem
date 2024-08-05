import mongoose, { Document, Schema } from "mongoose";

interface IEmployee extends Document {
  name: string;
  company_id: mongoose.Types.ObjectId;
  is_verifier?: boolean;
  _id: string;
  policies: mongoose.Types.ObjectId[];
}

const EmployeeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  is_verifier: {
    type: Boolean,
    default: false,
  },
  policies: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Policy" }],
    default: [],
  },
});

const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
