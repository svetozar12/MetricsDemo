import { Application, Request, Response } from "express";
import responseTime from "response-time";
import { restResponseTimeHistogram } from "./metrics";

export const metricsMiddleware = (app: Application) => {
  app.use((req, res, next) => {
    console.log(req.path, req.method, res.statusCode);
    next();
  });
  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.path,
          status_code: res.statusCode,
        },
        time * 1000,
      );
    }),
  );
};
