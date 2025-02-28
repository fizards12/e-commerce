interface PaginationStrategy {
    paginate(query: any, options: any): Promise<any>;
}

type Options = {
    page?:number;
    limit?: number;
    cursor?: string;
}


class OffsetPagination implements PaginationStrategy {
    async paginate(query: any, options: Options): Promise<any> {
        const { page, limit } = options;
        const skip = ((page || 0) - 1) * (limit || 0);
        return query.skip(skip).limit(limit).exec();
    }
}

class CursorPagination implements PaginationStrategy {
    async paginate(query: any, options: any): Promise<any> {
        const { cursor, limit } = options;
        if (cursor) {
            query.where('_id').gt(cursor);
        }
        return query.limit(limit).exec();
    }
}

class PaginationFactory {
    private strategy: PaginationStrategy;

    constructor(type: string) {
        if (type === 'offset') {
            this.strategy = new OffsetPagination();
        } else if (type === 'cursor') {
            this.strategy = new CursorPagination();
        } else {
            throw new Error('Invalid pagination type');
        }
    }

    paginate(query: any, options: any): Promise<PaginationStrategy> {
        return this.strategy.paginate(query, options);
    }
}

export default PaginationFactory;
