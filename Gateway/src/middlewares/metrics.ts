import { NextFunction, Request, Response } from "express";
import { client, Index } from "./elastic";

export const saveMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let requestHeadersSize = 0;
    requestHeadersSize += `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`
      .length;
    if (req.rawHeaders instanceof Array) {
      for (let i = 0; i < req.rawHeaders.length; i += 2) {
        requestHeadersSize += `${req.rawHeaders[i]}: ${
          req.rawHeaders[i + 1]
        }\r\n`.length;
      }
      requestHeadersSize += "\r\n".length;
    }
    const responseHeadersSize = req.response
      ? req.response.headers["content-length"]
      : 0;

    const reqObject = {
      requestId: req.id,
      // targetOrganisationId would be gotten from auth service
      targetOrganisationId: null,
      startTime: req.start,
      endTime: req.end,
      duration: req.duration,
      method: req.method,
      url: req.path,
      statusCode: res.statusCode,
      // credentials would be gotten from auth service
      credentials: null,
      params: req.params || {},
      query: req.query || {},
      requestPayload: req.body || {},
      responsePayload: !!req.response ? req.response.data : {},
      requestBodySize:
        parseInt(req.headers["content-length"] as string, 10) || 0,
      requestHeadersSize,
      responseBodySize: !!req.response ? req.response.data.length : 0,
      responseHeadersSize: responseHeadersSize || 0,
      host: req.hostname,
      // these metrics are happi specific
      resource: null,
      // these metrics are happi specific
      action: null,
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
