import express from "express";
import cors from "cors";
import { forwardRequest, RequestId } from "./utils";
import { saveMetrics } from "./metrics";

const app = express();
app.use(cors());
app.use(RequestId);
app.use(saveMetrics, (req, res, next) =>
  forwardRequest(req, res, next, "https://api-development.netfield.io"),
);
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

app.listen(3000);
