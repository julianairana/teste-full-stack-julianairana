import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AppError } from '../error';

export const ensureTokenIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    let token = request.headers.authorization

    if(!token){
        throw new AppError("Missing bearer token", 401)
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if(error){
            throw new AppError(error.message, 401)
        }

        request.user = {
            id: decoded.sub,
        }

        return next()
    })

};