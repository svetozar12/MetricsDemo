"use strict";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import axios, { AxiosError } from "axios";
// import { Request } from "express";

// const getTargetOrganisationId = (
//   req: Request<any, any, any, any, Record<string, any>>,
// ): number => {
//   const { request, _payload } = req.response as IGenericObject;
//   const regExp: RegExp = /^(\/.+)(\/organisations\/)(\d+)$/;

//   const resource: string = request.route.settings.notes
//     ? request.route.settings.notes[0]
//     : null;
//   const isDeleteOrganisationReq: boolean =
//     req.method === "delete" && req.path.match(regExp) ? true : false;
//   const targetOrganisationId: number = isDeleteOrganisationReq
//     ? req.pre.organisation.parentId
//     : request.pre.targetOrganisation?.[resource];

//   const orgId: number =
//     targetOrganisationId ||
//     request.params?.organisationId ||
//     request.query?.organisationId ||
//     request.payload?.organisationId ||
//     (_payload._data ? JSON.parse(_payload._data) : {}).organisationId ||
//     request.auth?.credentials?.oId;

//   return orgId;
// };
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

    return res
      .status(response.status)
      .header(response.headers)
      .send(response.data);
  } catch (error: any) {
    return res
      .status(error.response.status)
      .header(error.response.headers)
      .send(error.response.data);
  } finally {
    next();
  }
};
