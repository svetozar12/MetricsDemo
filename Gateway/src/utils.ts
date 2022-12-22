"use strict";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import axios, { isAxiosError } from "axios";
// import { Request } from "express";

export const RequestId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = uuidv4();
  req.id = id;
  next();
};

export const forwardRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
  url: string,
) => {
  try {
    const targetUrl = `${url}${req.path}`;

    // causing some problems (it will still be there but we wont send it to the service)
    delete req.headers["content-length"];
    const response = await axios({
      url: targetUrl,
      method: req.method.toLocaleLowerCase(),
      data: { ...req.body },
      headers: req.headers,
    });
    req.resSuccess = response;
    return res
      .status(response.status)
      .header(response.headers)
      .send(response.data);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      req.resFailure = error;
      return res
        .status(error.response.status)
        .header(error.response.headers)
        .send(error.response.data);
    }
  } finally {
    next();
  }
};
