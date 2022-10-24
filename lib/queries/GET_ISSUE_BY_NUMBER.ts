import { gql } from '@apollo/client';

export const GET_ISSUE_BY_NUMBER = gql`
    query Issue($number: Int!, $owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            issue(number: $number) {
                id, title, body, url
            }
        }
    }
`;
