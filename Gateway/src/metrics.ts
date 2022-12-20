import { Application, NextFunction, Request, Response } from "express";
import { client, Index } from "./elastic";

const saveMetrics = async (req: Request, res: Response, next: NextFunction) => {
  const reqObject = {
    requestId: req.id,
    method: req.method,
    url: req.url,
    host: req.hostname,
    statusCode: res.statusCode,
    userAgent: req.headers["user-agent"] || null,
  };
  console.log(req.route);

  await client.update({
    doc_as_upsert: true,
    id: req.id,
    index: Index,
    doc: reqObject,
  });
  next();
};

export const metricsMiddleware = (app: Application) => {
  app.use(saveMetrics, (req, res, next) => {
    console.log(req.path, req.method, res.statusCode);
    next();
  });
};
