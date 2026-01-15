import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  data?: unknown;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "INTERNAL_SERVER_ERROR";

  const translatedMessage =
    typeof (req as any).t === "function" ? (req as any).t(message) : message;

  const response: Record<string, unknown> = {
    code: statusCode,
    message: translatedMessage,
  };

  if (err.data !== undefined) {
    response.data = err.data;
  }

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
