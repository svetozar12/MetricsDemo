import express from "express";
import cors from "cors";
import { metricsMiddleware } from "./metrics";
import http from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import httpProxy from "http-proxy";
const app = express();
import "./elastic";
import { RequestId } from "./utils";
app.use(RequestId);
// app.use(cors({ origin: "*" }));
// app.use(express.json());
metricsMiddleware(app);

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
});

var server = http.createServer(function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
    target: "https://api-development.netfield.io/",
  });
});

console.log("listening on port 5050");
server.listen(5050);

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

// app.listen(4000, () => console.log("server running on port 4000"));
