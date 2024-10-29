import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { OperatorType } from "../shared/types";


const operatorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    cellNumber: { type: String, required: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
});

operatorSchema.pre("save", async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next();
  });

const Operator = mongoose.model<OperatorType>("Operator", operatorSchema);

export default Operator