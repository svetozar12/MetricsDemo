import express from "express";
import cors from "cors";
import { metricsMiddleware } from "./logging";
import proxy from "express-http-proxy";
import { metrics } from "./metrics";
const app = express();

metricsMiddleware(app);
app.use("/js-rest-api", proxy("http://localhost:5000/"));

app.use(cors());
app.use(express.json());
app.use("/", metrics);
app.listen(4000, () => console.log("server running on port 4000"));
