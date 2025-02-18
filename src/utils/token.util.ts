import { IPayload, IUser } from "@models";
import { Device } from "core/enum-types";
import { Jwt, JwtPayload, SignOptions, VerifyOptions, sign, verify } from "jsonwebtoken";

export class TokenUtils {
    public generateToken = (payload: IPayload, expireIn: string = '30d',): string => {
        const signOptions: SignOptions = {
            issuer: process.env.ISSUER as string,
            expiresIn: expireIn,
            jwtid: process.env.JWT_ID as string,
          };

          const secret = process.env.JWT_ACCESS_SECRET as string;
          const token = sign(payload, secret, signOptions);
          return `Bearer ${token}`;
    }

    public static async verifyToken (token: string, ignoreExpiration: boolean = false): Promise<JwtPayload | Jwt | string> {
        const verifyOptions: VerifyOptions = {
            issuer: process.env.ISSUER as string,
            jwtid: process.env.JWT_ID as string,
            ignoreExpiration: ignoreExpiration
        };
        const secret = process.env.JWT_ACCESS_SECRET as string;
        const tokenUser = await verify(token, secret, verifyOptions);
        return tokenUser;
    }

    public generatePayload(data: IUser, device: Device): IPayload {
        const payload: IPayload = {
            device: device,
            email: data.email,
            phone: data.phone,
            role: data.role,
            userId: data.id
        };
        return payload;
    }
}