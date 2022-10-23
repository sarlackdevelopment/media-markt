import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import { dataVar, paginationVar } from '../../../lib/cache';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';
import { GET_LAST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_LAST_ISSUES_FROM_REPOSITORY';
import { GET_NEXT_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_NEXT_ISSUES_FROM_REPOSITORY';
import { GET_PREV_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_PREV_ISSUES_FROM_REPOSITORY';
import { ORDER_BY, OWNER, REPOSITORY_NAME } from '../../../constants';

export const usePagination = () => {
    const pagination = useReactiveVar(paginationVar);
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
    const setPaginationSize = useCallback((props: { target: { value: string; }; }) => paginationVar(
        { ...pagination, size: Number(props.target.value) }), []);
    const storeTableData = useCallback((issues) => {
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
    }, []);
    const commonParamsFactory = useMemo(() => ({
        owner: OWNER,
        name: REPOSITORY_NAME,
        orderBy: ORDER_BY
    }), []);
    const fetchFirstIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchFirstIssuesQuery({
            variables: {
                ...commonParamsFactory,
                first: pagination.size,
                states: null
            }
        });
        storeTableData(response.data.repository.issues);
    };
    const fetchLastIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchLastIssuesQuery({
            variables: {
                ...commonParamsFactory,
                last: pagination.size,
                states: null
            }
        });
        storeTableData(response.data.repository.issues);
    };
    const fetchNextIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchNextIssuesQuery({
            variables: {
                ...commonParamsFactory,
                first: pagination.size,
                states: null,
                cursor: pagination.endCursor
            }
        });
        storeTableData(response.data.repository.issues);
    };
    const fetchPrevIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchPrevIssuesQuery({
            variables: {
                ...commonParamsFactory,
                last: pagination.size,
                states: null,
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