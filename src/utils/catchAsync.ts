import { Request, Response, NextFunction } from "express";

type ControllerResponse = {
  statusCode?: number;
  message?: string;
  data?: any;
};

const catchAsync =
  (fn: (req: Request) => Promise<ControllerResponse>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        statusCode = 200,
        message = "SUCCESS",
        data = {},
      } = await fn(req);
      res.status(statusCode).json({ message, data });
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;
