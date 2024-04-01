import { Request, Response, NextFunction } from "express";
import JwtToken from "../utils/jwt";
import { JWT_SECRET } from "../constants/env.constants";

interface UserRequest extends Request {
  is_auth?: boolean;
  id?: string;
  first_name?: string;
}

export async function isAuthenticated(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  const auth_header = req.headers.authorization;

  console.log(auth_header);

  if (!auth_header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = auth_header.split(" ")[1];

  if (!token || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let decoded_token: any;

  try {
    const jwtToken = new JwtToken(JWT_SECRET);
    decoded_token = jwtToken.verifyToken(token);
    console.log(decoded_token);
  } catch (err) {
    console.log(err, "Try catch");
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!decoded_token || !decoded_token.user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.is_auth = true;
  req.id = decoded_token.user_id;
  next();
}
