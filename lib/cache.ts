import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client';
import { TIssue } from '../pages/issueList';

type TPagination = {
    startCursor: string,
    endCursor: string,
    size: number,
    currentPage: number,
    totalPage: number
}

export const dataVar: ReactiveVar<TIssue> = makeVar<TIssue>([]);
export const paginationVar: ReactiveVar<TPagination> = makeVar<TPagination>({
    startCursor: '',
    endCursor: '',
    size: 10,
    currentPage: 1,
    totalPage: 0
});

export const createCache = () => new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                data: {
                    read() {
                        return dataVar();
                    }
                },
                pagination: {
                    read() {
                        return paginationVar();
                    }
                }
            }
        }
    }
});
