import express, { Request, Response } from "express";
import cors from "cors";
import { setupLogging } from "./logging";
import proxy from "express-http-proxy";
import responseTime from "response-time";
import { restResponseTimeHistogram } from "./metrics";
import { metrics } from "./metrics";
const app = express();

app.use(cors());
app.use(express.json());
setupLogging(app);
app.use("/", metrics);
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
app.use("/js-rest-api", proxy("http://localhost:5000/"));
app.listen(4000, () => console.log("server running on port 4000"));
