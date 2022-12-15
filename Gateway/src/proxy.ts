import { Application } from "express";
import { ROUTES } from "./constants/routes";
import { createProxyMiddleware } from "http-proxy-middleware";

export const setupProxies = (app: Application, routes: typeof ROUTES) => {
  routes.forEach((r) => {
    app.use(r.url, createProxyMiddleware(r.proxy as any) as any);
  });
};
