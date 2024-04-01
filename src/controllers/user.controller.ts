import express, { Request, Response, Router } from "express";
import { User } from "../db/model/user.model";
import bcrypt from "bcrypt";
import JwtToken from "../utils/jwt";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validation/user.validation";

export const userRouter = Router();

userRouter.post(
  "/register-user",
  async (request: Request, response: Response) => {
    try {
      const { name, username, email, age, password } = request.body;

      const { error } = registerUserSchema.validate(request.body);

      if (error) {
        return response.status(400).json({
          message: "Validation error",
          details: error.details[0].message,
        });
      }

      const check_user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (check_user) {
        return response.status(400).json({
          message: `User with email: ${email} already exists`,
        });
      }

      const hashed_password = await bcrypt.hash(password, 10);

      const user_data = await User.create({
        name,
        username,
        email,
        age,
        password: hashed_password,
      });

      return response
        .status(201)
        .json({ message: "User successfully created", data: user_data });
    } catch (error: any) {
      return response
        .status(500)
        .json({ code: 500, success: false, message: error.message });
    }
  }
);

userRouter.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const { error } = loginUserSchema.validate(request.body);

    if (error) {
      return response.status(400).json({
        message: "Validation error",
        details: error.details[0].message,
      });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return response.status(400).json({
        message: `User with email: ${email} does not exist`,
      });
    }

    const check_password = bcrypt.compare(password, user.password);

    if (!check_password) {
      throw new Error("Please input a correct password");
    }

    const jwtToken = new JwtToken(process.env.JWT_SECRET);
    const token = jwtToken.generateToken(user.id);

    response.set("jwt-secret", token);

    return response.status(201).json({ message: "User successfully loggedIn" });
  } catch (error: any) {
    return response
      .status(500)
      .json({ code: 500, success: false, message: error.message });
  }
});

userRouter.post("/logout", async (request: Request, response: Response) => {
  try {
    response.clearCookie("jwt-token");

    return response
      .status(200)
      .json({ message: "User successfully logged out " });
  } catch (error) {
    return response
      .status(500)
      .json({ code: 500, success: false, message: "Internal server error" });
  }
});

userRouter.get(
  "/get-all-users",
  isAuthenticated,
  async (request: Request, response: Response) => {
    try {
      const users = await User.findAll();

      return response
        .status(201)
        .json({ message: "Users fetched successfully", data: users });
    } catch (error: any) {
      return response
        .status(500)
        .json({ code: 500, success: false, message: error.message });
    }
  }
);
