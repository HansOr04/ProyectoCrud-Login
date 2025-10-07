import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any,
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    ...data, 
  });
};

export const errorResponse = (
  res: Response,
  error: string,
  statusCode: number = 400
): void => {
  res.status(statusCode).json({
    success: false,
    error,
  });
};