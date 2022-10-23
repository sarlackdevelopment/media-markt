import { gql } from '@apollo/client';

export const GET_PREV_ISSUES_FROM_REPOSITORY = gql`
    query (
        $owner: String!, 
        $name: String!,
        $orderBy: IssueOrder,
        $last: Int!,
        $states: [IssueState!],
        $cursor: String!) 
    {
        repository(owner: $owner, name: $name) {
            issues(last: $last, states: $states, before: $cursor, orderBy: $orderBy) {
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
