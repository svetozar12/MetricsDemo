import { NextFunction, Request, Response } from "express";
import { client, Index } from "./elastic";

export const saveMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqObject = {
      requestId: req.id,
      method: req.method,
      url: req.url,
      host: req.hostname,
      statusCode: res.statusCode,
      userAgent: req.headers["user-agent"] || null,
    };

    await client.update({
      doc_as_upsert: true,
      id: req.id,
      index: Index,
      doc: reqObject,
    });
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
};
