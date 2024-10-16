import { Request, Response, NextFunction } from 'express';

// Global Error Handling Middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);

  // Send consistent error response
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
