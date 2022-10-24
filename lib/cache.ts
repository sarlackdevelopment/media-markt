import {
    ApolloError, InMemoryCache, makeVar, ReactiveVar
} from '@apollo/client';
import { TIssue } from '../pages/issueList';
import { STATES } from '../constants';

type TPagination = {
    startCursor: string,
    endCursor: string,
    size: number,
    currentPage: number,
    totalPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}

export const dataVar: ReactiveVar<TIssue[]> = makeVar<TIssue[]>([]);
export const errorVar: ReactiveVar<ApolloError | null> = makeVar<ApolloError | null>(null);
export const paginationVar: ReactiveVar<TPagination> = makeVar<TPagination>({
    startCursor: '',
    endCursor: '',
    size: 10,
    currentPage: 1,
    totalPage: 0,
    hasNextPage: false,
    hasPreviousPage: false
});
export const filtersVar: ReactiveVar<Record<string, string>> = makeVar<Record<string, string>>({
    STATUS: STATES.CLOSED
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
                },
                error: {
                    read() {
                        return errorVar();
                    }
                },
                filters: {
                    read() {
                        return filtersVar();
                    }
                }
            }
        }
    }
});
