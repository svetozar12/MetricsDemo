import express from "express";
import cors from "cors";
import { forwardRequest, RequestId } from "./utils";
import { saveMetrics } from "./middlewares/metrics";
import "./middlewares/elastic";
import { AxiosError, AxiosResponse } from "axios";

const forwardOptions = [
  {
    proxyPath: "/netfield-api",
    target: "http://localhost:5005",
  },
  {
    proxyPath: "/api1",
    target: "http://localhost:5000",
  },
  {
    proxyPath: "/api2",
    target: "http://localhost:5001",
  },
];

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(RequestId);
app.use(function (req, res, next) {
  req.start = Date.now();
  next();
});
forwardOptions.forEach(({ proxyPath, target }) => {
  console.log(`Proxy created at ${proxyPath} for > ${target}`);
  app.use(proxyPath, (req, res, next) => {
    forwardRequest(req, res, next, target);
  });
  app.use((req, res, next) => {
    req.end = Date.now();
    req.duration = Date.now() - req.start;
    next();
  });
  app.use(saveMetrics);
});

declare global {
  namespace Express {
    interface Request {
      id: string;
      start: number;
      end: number;
      duration: number;
      resSuccess: AxiosResponse<any, any>;
      resFailure: AxiosError<any, any>;
    }
  }
}

app.listen(4000, () =>
  console.log("server is listening on http://localhost:4000"),
);
