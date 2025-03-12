import { Types } from "mongoose"
import { AuthenticatedRequest } from "../middlewares/auth"

export interface RequestWithData<T,K=Types.ObjectId> extends AuthenticatedRequest<K> {
    body: {
        data: T
    }
}