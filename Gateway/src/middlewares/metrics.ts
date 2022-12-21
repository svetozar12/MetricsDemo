import { NextFunction, Request, Response } from "express";
import { client, Index } from "./elastic";
// const requestData: IRequestData = {
//   targetOrganisationId: this.getTargetOrganisationId(req),
//   startTime: request.info.received,
//   endTime: request.info.completed,
//   duration: request.info.completed - request.info.received,
//   credentials: request.auth.credentials || {},
//   params: req.params || {},
//   query: request.query || {},
//   requestPayload: request.payload || {},
//   responsePayload: _payload._data ? JSON.parse(_payload._data) : {},
//   requestHeadersSize,
//   responseBodySize: _payload._data ? _payload._data.length : 0,
//   responseHeadersSize: res._header.length,
//   resource: request.route.settings.notes ? request.route.settings.notes[0] : null,
//   action: request.route.settings.notes ? request.route.settings.notes[1] : null,
// };
export const saveMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("ciganior", req);
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
    const reqObject = {
      requestId: req.id,
      targetOrganisationId: null,
      startTime: null,
      endTime: null,
      duration: null,
      method: req.method,
      url: req.path,
      statusCode: res.statusCode,
      // credentials would be gotten from auth service
      credentials: null,
      params: req.params,
      query: req.query,
      requestPayload: req.body ? req.body : {},
      requestHeadersSize,
      requestBodySize:
        parseInt(req.headers["content-length"] as string, 10) || 0,
      responseBodySize: null,
      responseHeadersSize: null,
      host: req.hostname,
      resource: null,
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
