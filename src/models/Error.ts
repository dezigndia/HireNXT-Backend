import { StatusCodes } from "http-status-codes";

export class BaseError extends Error {
    statusCode: number;
    constructor(public message: string = 'An error occurred', statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = 'Not Found') {
        super(message, StatusCodes.NOT_FOUND);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string = 'Bad Request') {
        super(message, StatusCodes.BAD_REQUEST);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class AlreadyExistError extends BaseError {
    constructor(message: string = 'Email already exist') {
        super(message, StatusCodes.CONFLICT);
        Object.setPrototypeOf(this, AlreadyExistError.prototype);
    }
}

export class RequiredError extends BaseError {
    constructor(message: string = 'Required') {
        super(message, StatusCodes.BAD_REQUEST);
        Object.setPrototypeOf(this, RequiredError.prototype);
    }
}

