import express, { Router } from "express";
import client from "prom-client";

export const metrics = Router();
export const restResponseTimeHistogram = new client.Histogram({
  name: "gateway_metrics",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

metrics.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  return res.send(await client.register.metrics());
});
