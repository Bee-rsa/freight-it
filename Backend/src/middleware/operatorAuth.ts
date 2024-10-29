import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      operatorId: string;
    }
  }
}

const verifyTokens = (req: Request, res: Response, next: NextFunction) => {
  const tokens = req.cookies["auth_tokens"];
  if (!tokens) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(tokens, process.env.JWT_SECRET_KEY as string);
    req.operatorId = (decoded as JwtPayload).operatorId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyTokens;