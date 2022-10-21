import {NextPage} from "next";
import client from "../apollo-client";
import {gql} from "@apollo/client";
import styled from 'styled-components';

const IssueListWrapper = styled.button`
  /* Adapt the colors based on primary prop */
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export async function getStaticProps() {
    const { data } = await client.query({
        query: gql`
      query {
        repository(owner:"facebook", name:"react") {
          issues(last:20, states:CLOSED) {
            edges {
              node {title, url}
            }
          }
        }
      }
    `,
    });

    return {
        props: {
            data
        },
    };
}

const IssueList: NextPage = (props) => {
    console.log('-----------');
    console.log(props);
    return <>It works!<IssueListWrapper>Some</IssueListWrapper></>
}

export default IssueList
