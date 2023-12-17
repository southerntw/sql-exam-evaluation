import { Request, Response } from "express";
import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].userId;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign(
          { userId, name, email },
          process.env.ACCESS_TOKEN_SECRET!,
          {
            expiresIn: "15s",
          },
        );
        res.json({ accessToken });
      },
    );
  } catch (error) {
    console.log(error);
  }
};
