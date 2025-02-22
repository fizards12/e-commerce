import { Errors } from '../enum/errors';

export class ErrorGenerator {
    message?: string | null;
    status: number;
    type?: string | null;
    error?: unknown | null;
    constructor(errType?: string | null,dataType?: string | null,error?: unknown,key?: string) {
        this.message = "SomeThing went wrong!";
        this.type = errType;
        this.status = 500;
        this.generateError(errType,dataType,key);
        this.error = error || null
    }

    generateError(errType?: string | null, dataType?: string | null,key?:string) {
        switch (errType) {
            case Errors.ALREADY_EXISTS:
                this.message = `${dataType} already exists.`;
                this.status = 409;
                break;
            case Errors.ALREADY_LOGGED_IN:
                this.message = `User is already logged in.`;
                this.status = 400;
                break;
            case Errors.NOT_FOUND:
                this.message = `${dataType} not found.`;
                this.status = 404;
                break;
            case Errors.INVALID_CREDENTIALS:
                this.message = `Invalid credentials provided.`;
                this.status = 401;
                break;
            case Errors.ERROR_CREATING:
                this.message = `Error creating ${dataType}.`;
                this.status = 500;
                break;
            case Errors.ERROR_FETCHING_DETAILS:
                this.message = `Error fetching ${dataType} details.`;
                this.status = 500;
                break;
            case Errors.ERROR_UPDATING:
                this.message = `Error updating ${dataType}.`;
                this.status = 500;
                break;
            case Errors.ERROR_DELETING:
                this.message = `Error deleting ${dataType}.`;
                this.status = 500;
                break;
            case Errors.ERROR_FETCHING_COUNT:
                this.message = `Error fetching ${dataType} count.`;
                this.status = 500;
                break;
            case Errors.ERROR_FETCHING:
                this.message = `Error fetching ${dataType}.`;
                this.status = 500;
                break;
            case Errors.INVALID_ID:
                this.message = `Invalid ${dataType} ID.`;
                this.status = 400;
                break;
            case Errors.DUPLICATE_KEYS:
                
                this.message = `${key} Duplicate in ${dataType}.`;
                this.status = 400;
                break;
            case Errors.INVALID_TOKEN:
                this.message = `Invalid token provided.`;
                this.status = 401;
                break;
            case Errors.INVALID_PAYLOAD:
                this.message = `Invalid token payload.`;
                this.status = 401;
                break;
            case Errors.FORBIDDEN:
                this.message = `Access Denied.`;
                this.status = 403;
                break;
            default:
                this.message = `An unknown error occurred.`;
                this.status = 500;
                break;
        }
    }
}