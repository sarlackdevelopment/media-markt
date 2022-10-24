import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { filtersVar } from '../../lib/cache';
import { usePagination } from '../../hooks/usePagination';

export const useFilterLogic = () => {
    const filters = useReactiveVar(filtersVar);
    const { fetchFirstIssuesQueryHandler, error, loading } = usePagination();
    useEffect(() => {
        (async () => {
            await fetchFirstIssuesQueryHandler();
        })();
    }, [filters]);
    const handlerFilter = (currentState: string) => {
        filtersVar({ ...filters, STATUS: currentState });
    };
    return { handlerFilter, error, loading };
};
