import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useMemo } from 'react';
import { dataVar, filtersVar, paginationVar } from '../../../lib/cache';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';
import { GET_LAST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_LAST_ISSUES_FROM_REPOSITORY';
import { GET_NEXT_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_NEXT_ISSUES_FROM_REPOSITORY';
import { GET_PREV_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_PREV_ISSUES_FROM_REPOSITORY';
import { ORDER_BY, OWNER, REPOSITORY_NAME } from '../../../constants';

export const usePagination = () => {
    const pagination = useReactiveVar(paginationVar);
    const filters = useReactiveVar(filtersVar);
    const [fetchFirstIssuesQuery, {
        loading: loadingFirstIssues, error: errorFirstIssues
    }] = useLazyQuery(GET_FIRST_ISSUES_FROM_REPOSITORY);
    const [fetchLastIssuesQuery, {
        loading: loadingLastIssues, error: errorLastIssues
    }] = useLazyQuery(GET_LAST_ISSUES_FROM_REPOSITORY);
    const [fetchNextIssuesQuery, {
        loading: loadingNextIssues, error: errorNextIssues
    }] = useLazyQuery(GET_NEXT_ISSUES_FROM_REPOSITORY);
    const [fetchPrevIssuesQuery, {
        loading: loadingPrevIssues, error: errorPrevIssues
    }] = useLazyQuery(GET_PREV_ISSUES_FROM_REPOSITORY);
    const setPaginationSize = (props: { target: { value: string; }; }) => paginationVar(
        { ...pagination, size: Number(props.target.value) });
    const storeTableData = (issues) => {
        const {
            edges,
            pageInfo: {
                startCursor,
                endCursor,
                hasNextPage,
                hasPreviousPage
            }
        } = issues;
        paginationVar({
            ...pagination,
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage
        });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    const commonParamsFactory = useMemo(() => ({
        owner: OWNER,
        name: REPOSITORY_NAME,
        orderBy: ORDER_BY
    }), []);
    const fetchFirstIssuesQueryHandler = async () => {
        const response = await fetchFirstIssuesQuery({
            variables: {
                ...commonParamsFactory,
                first: pagination.size,
                states: filters.STATUS
            }
        });
        storeTableData(response.data.repository.issues);
    };
    const fetchLastIssuesQueryHandler = async () => {
        const response = await fetchLastIssuesQuery({
            variables: {
                ...commonParamsFactory,
                last: pagination.size,
                states: filters.STATUS
            }
        });
        storeTableData(response.data.repository.issues);
    };
    const fetchNextIssuesQueryHandler = async () => {
        const response = await fetchNextIssuesQuery({
            variables: {
                ...commonParamsFactory,
                first: pagination.size,
                states: filters.STATUS,
                cursor: pagination.endCursor
            }
        });
        storeTableData(response.data.repository.issues);
    };
    const fetchPrevIssuesQueryHandler = async () => {
        const response = await fetchPrevIssuesQuery({
            variables: {
                ...commonParamsFactory,
                last: pagination.size,
                states: filters.STATUS,
                cursor: pagination.startCursor
            }
        });
        storeTableData(response.data.repository.issues);
    };
    return {
        fetchFirstIssuesQueryHandler,
        fetchLastIssuesQueryHandler,
        fetchNextIssuesQueryHandler,
        fetchPrevIssuesQueryHandler,
        setPaginationSize,
        pagination,
        loading: loadingLastIssues || loadingFirstIssues || loadingNextIssues || loadingPrevIssues,
        error: errorLastIssues || errorFirstIssues || errorNextIssues || errorPrevIssues
    };
};
