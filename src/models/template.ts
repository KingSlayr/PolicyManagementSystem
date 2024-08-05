import mongoose, { Document, Schema } from "mongoose";

interface ITemplate extends Document {
  content: string;
}

const TemplateSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
