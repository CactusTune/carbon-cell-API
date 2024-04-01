import jwt from "jsonwebtoken";

class JwtToken {
  private readonly secretKey: any;

  constructor(secretKey: any) {
    this.secretKey = secretKey;
  }

  generateToken(user_id: any): string {
    const token = jwt.sign({ user_id }, this.secretKey, { expiresIn: "1d" });
    return token;
  }

  verifyToken(token: string): string | object {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

export default JwtToken;
