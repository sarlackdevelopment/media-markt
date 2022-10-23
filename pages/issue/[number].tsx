import React, { useEffect } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import ClipLoader from 'react-spinners/ClipLoader';
import { OWNER, REPOSITORY_NAME } from '../../constants';
import { GET_ISSUE_BY_NUMBER } from '../../lib/queries/GET_ISSUE_BY_NUMBER';
import { errorVar } from '../../lib/cache';

const Issue = () => {
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
    return (<>
        <div>{data?.repository?.issue.title}</div>
        <ClipLoader
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </>);
};

export default Issue;
