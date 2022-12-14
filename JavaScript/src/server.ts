import express, { Request, Response } from "express";
import cors from "cors";
import route from "./routes";
import "./metrics";
import responseTime from "response-time";
import { restResponseTimeHistogram } from "./metrics";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000,
      );
    }
  }),
);
app.use("/", route);

app.listen(5000, () => console.log("server running on port 5000"));
