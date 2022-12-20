import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/netfield-api", proxy("https://api-development.netfield.io"));
app.use("/api", proxy("http://localhost:5000"));
app.use("/doc", proxy("https://restfulapi.net/"));
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}
app.listen(3000);
// metricsMiddleware(app);
