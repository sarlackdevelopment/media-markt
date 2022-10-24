import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ISSUE_BY_NUMBER } from '../../lib/queries/GET_ISSUE_BY_NUMBER';
import { OWNER, REPOSITORY_NAME } from '../../constants';
import { errorVar } from '../../lib/cache';

export const useIssueDetails = () => {
    const router = useRouter();
    const [fetchIssuesQuery, { loading, error, data }] = useLazyQuery(GET_ISSUE_BY_NUMBER);
    useEffect(() => {
        fetchIssuesQuery({
            variables: {
                owner: OWNER,
                name: REPOSITORY_NAME,
                number: Number(router.query.number)
            }
        });
    }, [router.query.number]);
    if (error) {
        errorVar(error);
    }
    const issue = data?.repository?.issue;
    return {
        loading,
        error,
        data: {
            id: issue?.id,
            title: issue?.title,
            body: issue?.body,
            url: issue?.url
        }
    };
};
