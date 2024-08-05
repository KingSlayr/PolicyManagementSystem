import mongoose, { Schema, Document } from "mongoose";

interface ICompany extends Document {
  name: string;
}

const companySchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Company = mongoose.model<ICompany>("Company", companySchema);
export default Company;
