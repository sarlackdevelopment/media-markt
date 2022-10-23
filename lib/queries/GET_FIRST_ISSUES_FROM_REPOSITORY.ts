import { gql } from '@apollo/client';

export const GET_FIRST_ISSUES_FROM_REPOSITORY = gql`
    query ($owner: String!, $name: String!, $orderBy: IssueOrder, $first: Int!, $states: [IssueState!]) {
        repository(owner: $owner, name: $name) {
            issues(first: $first, states: $states, orderBy: $orderBy) {
                edges {
                    cursor
                    node {title, url, state, number}
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
