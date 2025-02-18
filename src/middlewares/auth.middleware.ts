/* eslint-disable no-magic-numbers */
import { IAuthRequest } from "@models";
import { NotFoundError } from "@models";
//import { TokenUtils } from "utils/token.util";
import { Device, UserRole } from "core/enum-types";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "repositories/user.repository";

const _userRepo = new UserRepository("auth.users");

export const isAuthorized = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization;
            if (!token || token == undefined || token === "") {
                throw new NotFoundError('no_token_attached');
            }

            const bearer: string[] = token.split(' ');
            if(bearer[0] != process.env.TOKEN_TYPE) {
                throw new Error('not_authroized_token');
            }

            //const user = await TokenUtils.verifyToken(token,false);
            // req.user = await AuthMiddleware._authUtil.getUserDetail(user.id);
            // req.user = user;
            next();
        }
        throw new NotFoundError('Not a authorized user');
        
    } catch (error: any) {
      return res.status(StatusCodes.FORBIDDEN).json({error: error.message});
    }
}

export const allowedRole = (allowedRole: UserRole[]) => {
    const isAllowed = (role: UserRole) => allowedRole.includes(role);
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const user = await _userRepo.getUser("",req.user.id);
            if(user && isAllowed(user.role)) {
                next();
            } else {
                return res.status(StatusCodes.FORBIDDEN).json({error: 'Access Denied'});
            }
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({error: 'Access Denied'});
        }
         
    }
}

export const allowedDevice = (device: Device) => {

}