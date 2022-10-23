import { gql } from '@apollo/client';

export const GET_NEXT_ISSUES_FROM_REPOSITORY = gql`
    query (
        $owner: String!, 
        $name: String!,
        $orderBy: IssueOrder,
        $first: Int!,
        $states: [IssueState!],
        $cursor: String!) 
    {
        repository(owner: $owner, name: $name) {
            issues(first: $first, states: $states, after: $cursor, orderBy: $orderBy) {
                edges {
                    cursor
                    node {title, url, state}
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
    }
`;
