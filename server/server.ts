import express, { Express, Request, Response, NextFunction } from "express";
import routes from "./routes/index";
import router from "./routes/routes";

import cookieParser from "cookie-parser";
import cors from "cors";

const port: number = 3001;

process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err);
});

const app: Express = express();

app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.json({
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
