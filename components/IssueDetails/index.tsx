import React, { FC } from 'react';
import styled from 'styled-components';
import { SpinnerWrapper } from '../SpinnerWrapper';
import { errorVar } from '../../lib/cache';
import { useIssueDetails } from './useIssueDetails';

const StyledPagination = styled.div`
  margin: 1em;
  background: #f5ffff;
  border-collapse: collapse;
  text-align: left;
  .table {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
  }
  .tr {
    display: flex;
    flex-direction: column;
  }
  .tr:nth-child(odd) {
    background: #ebf3f9;
  }
  .td {
    display: flex;
    border: 1px solid #e3eef7;
    padding: 10px 15px;
    position: relative;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  .m-1 {
    margin-right: 5em;
  }
  .header {
    text-align: center;
  }
`;

const IssueDetails: FC = () => {
    const {
        loading, error, data: {
            id, title, body, url
        }
    } = useIssueDetails();
    if (error) {
        errorVar(error);
    }
    return (<StyledPagination>
        <h3 className='header'>Issue: {id}</h3>
        <div className='table'>
            <div data-testid={`issue-list-id-${id}`} className='tr' key={id}>
                <div className='td'>
                    <span className='m-1'><b>title: </b></span>
                    <span>{title}</span>
                </div>
                <div className='td'>
                    <span className='m-1'><b>body: </b></span>
                    <span>{body}</span>
                </div>
                <div className='td'>
                    <span className='m-1'><b>url: </b></span>
                    <span>{url}</span>
                </div>
            </div>
        </div>
        <SpinnerWrapper loading={loading}/>
    </StyledPagination>);
};

export default IssueDetails;
