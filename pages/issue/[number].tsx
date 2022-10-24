import React from 'react';
import { GetStaticPaths, NextPage } from 'next';
import IssueDetails from '../../components/IssueDetails';
import client from '../apollo-client';
import { GET_ISSUE_BY_NUMBER } from '../../lib/queries/GET_ISSUE_BY_NUMBER';
import { OWNER, REPOSITORY_NAME } from '../../constants';

type TIssue = {
    data: {
        id: string;
        title: string;
        body: string;
        url: string;
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
});

export async function getStaticProps(context: { params: { number: any; }; }) {
    const { data: response } = await client.query({
        query: GET_ISSUE_BY_NUMBER,
        variables: {
            owner: OWNER,
            name: REPOSITORY_NAME,
            number: Number(context.params.number)
        }
    });
    return {
        props: {
            data: response?.repository?.issue ?? {}
        }
    };
}

const Issue: NextPage<TIssue> = (props) => <IssueDetails data={props.data}/>;

export default Issue;
