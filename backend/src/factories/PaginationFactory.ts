import { Model, Types } from "mongoose";

interface PaginationStrategy<T> {
    paginate(model: Model<T>, options: any): Promise<PaginationResult<T>>;
}

export type Options = {
    page?: number;
    limit?: number;
    cursor?: string;
}

interface PaginationResult<T> {
    items: T[];
    nextCursor?: string | null;
    totalPages?: number;
    currentPage?: number;
}

class OffsetPagination<T> implements PaginationStrategy<T> {
    async paginate(model: Model<T>, options: Options): Promise<PaginationResult<T>> {
        const { page, limit } = options;
        const skip = ((page || 0) - 1) * (limit || 100);
        const query = model.find().skip(skip).limit(limit || 100);
        const items = await query.exec();
        const totalItems = await model.countDocuments();
        const totalPages = Math.ceil(totalItems / (limit || 100));
        return {
            items,
            totalPages,
            currentPage: page
        };
    }
}

class CursorPagination<T> implements PaginationStrategy<T> {
    async paginate(model: Model<T>, options: Options): Promise<PaginationResult<T>> {
        const { cursor, limit } = options;
        
        const query = model.find();
        if (cursor) {
            query.gt('_id',cursor);
        }
        const items = await query.limit(limit || 0).exec();
        const nextCursor = items.length > 0 ? (items[items.length - 1]._id as Types.ObjectId).toHexString() : null;
        return {
            items,
            nextCursor
        };
    }
}

class PaginationFactory<T> {
    private strategy: PaginationStrategy<T>;

    constructor(type: string) {
        if (type === 'offset') {
            this.strategy = new OffsetPagination<T>();
        } else if (type === 'cursor') {
            this.strategy = new CursorPagination<T>();
        } else {
            throw new Error('Invalid pagination type');
        }
    }

    paginate(model: Model<T>, options: Options): Promise<PaginationResult<T>> {
        return this.strategy.paginate(model, options);
    }
}

export default PaginationFactory;
