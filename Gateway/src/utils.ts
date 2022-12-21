"use strict";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import axios, { AxiosError } from "axios";
import circularJSON from "circular-json";
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
    // @ts-ignore
    const response = await axios[req.method.toLocaleLowerCase()](
      `${url}${req.path}`,
    );
    console.log(res.statusCode);

    const json = circularJSON.stringify(response);
    return res.send(json).status(res.statusCode);
  } catch (error) {
    console.log(error);
    const json = circularJSON.stringify(error);

    return res.send(json).status(res.statusCode);
  } finally {
    next();
  }
};
