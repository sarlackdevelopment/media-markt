import { useReactiveVar } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { dataVar } from '../../lib/cache';
import { usePagination } from '../../hooks/usePagination';

export const useTableLogic = () => {
    const data = useReactiveVar(dataVar);
    const columns = useMemo(() => [{
        id: 'Number',
        header: 'Number'
    },
    {
        id: 'title',
        header: 'Title'
    },
    {
        id: 'url',
        header: 'url'
    },
    {
        id: 'state',
        header: 'state'
    }], []);
    const {
        fetchFirstIssuesQueryHandler,
        error,
        loading,
        pagination
    } = usePagination();
    useEffect(() => {
        (async () => {
            await fetchFirstIssuesQueryHandler();
        })();
    }, [pagination.size]);
    return {
        data, columns, error, loading
    };
};
