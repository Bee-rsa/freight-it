import express, {Request, Response} from "express";
import Operator from "../models/operator";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyTokens from "../middleware/operatorAuth";

const router = express.Router();

router.get("/me", verifyTokens, async (req: Request, res: Response) => {
  const operatorId = req.operatorId;

  try {
    const operator = await Operator.findById(operatorId).select("-password");
    if (!operator) {
      return res.status(400).json({ message: "Operator not found" });
    }
    res.json(operator);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post(
  "/registers",
  [
  check("companyName", "Company Name is required").isString(),
  check("cellNumber", "Cell Number is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({ 
    min:6
  }),
], 
async (req: Request, res: Response)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
        let operator = await Operator.findOne({
          email: req.body.email,
        });

if (operator) {
    return res.status(400).json({ message: "Operator already exists" });
  }

  operator = new Operator(req.body);
  await operator.save();

  const tokens = jwt.sign(
    { userId: operator.id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
);

res.cookie("auth_tokens", tokens, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  })
  return res.status(200).send({message: "Operator registered OK"});
} catch (error){
    console.log(error);
    res.status(500).send({message: "Something went wrong"});
}
});

export default router;