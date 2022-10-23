import { gql } from '@apollo/client';

export const GET_LAST_ISSUES_FROM_REPOSITORY = gql`
    query ($owner: String!, $name: String!, $orderBy: IssueOrder, $last: Int!, $states: [IssueState!]) {
        repository(owner: $owner, name: $name) {
            issues(last: $last, states: $states, orderBy: $orderBy) {
                edges {
                    cursor
                    node {title, url, state}
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
    }
`;
