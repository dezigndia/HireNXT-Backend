import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (err: Error, req: Request, res: Response) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: err.message });
}