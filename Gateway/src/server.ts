import express, { Request, Response } from "express";
import cors from "cors";
import * as proxy from "http-proxy-middleware";
import { setupLogging } from "./logging";
import { setupProxies } from "./proxy";
import { ROUTES } from "./constants/routes";
const app = express();

app.use(cors());
app.use(express.json());
setupLogging(app);
const http = require("http");
// or use import http from 'http';

/* your app config here */

app.post("/api/BLABLA", (oreq, ores) => {
  const options = {
    host: "www.google.com",
    port: 80,
    path: "/api/BLABLA",
    method: "POST",
    headers: oreq.headers,
  };

  const creq = http
    .request(options, (pres: any) => {
      // set encoding
      pres.setEncoding("utf8");

      // set http status code based on proxied response
      ores.writeHead(pres.statusCode);

      // wait for data
      pres.on("data", (chunk: any) => {
        ores.write(chunk);
      });

      pres.on("close", () => {
        // closed, let's end client request as well
        ores.end();
      });

      pres.on("end", () => {
        // finished, let's finish client request as well
        ores.end();
      });
    })
    .on("error", (e: any) => {
      // we got an error
      console.log(e.message);
      try {
        // attempt to set error message and http status
        ores.writeHead(500);
        ores.write(e.message);
      } catch (e) {
        // ignore
      }
      ores.end();
    });

  creq.end();
});

app.listen(4000, () => console.log("server running on port 4000"));
