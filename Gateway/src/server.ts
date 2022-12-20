import express from "express";
import cors from "cors";
import { metricsMiddleware } from "./metrics";
import { createProxyMiddleware } from "http-proxy-middleware";
import proxy from "express-http-proxy";
const app = express();
import "./elastic";
import { RequestId } from "./utils";
app.use(RequestId);
app.use(cors({ origin: "*" }));
app.use(express.json());
metricsMiddleware(app);
app.use(
  "/js-rest-api",
  createProxyMiddleware({
    target: "http://localhost:5000/",
    changeOrigin: true,
  }),
);
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "https://api-development.netfield.io/",
//     changeOrigin: true,
//   }),
// );
app.use(
  "/api",
  proxy("/https://www.github.com", {
    https: true,
  }),
);
app.use(
  "/google",
  createProxyMiddleware({
    target: "https://www.google.com/",
    changeOrigin: true,
  }),
);

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

app.listen(4000, () => console.log("server running on port 4000"));
