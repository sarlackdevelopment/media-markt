import React, { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { dataVar, errorVar, paginationVar } from '../../../lib/cache';
import { ORDER_BY, OWNER, REPOSITORY_NAME } from '../../../constants';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';
import Filters from './Filters';
import { SpinnerWrapper } from '../../../components/SpinnerWrapper';
import { usePagination } from './usePagination';

const StyledTable = styled.div`
   margin: 1em;
   background: #f5ffff;
   border-collapse: collapse;
   text-align: left;
  .table {
    display: flex; 
    flex-direction: column;
    width: 100%;
  }
  .table-header {
    display: flex;
  }
   .th {
     border-top: 1px solid #777777;
     border-bottom: 1px solid #777777;
     box-shadow: inset 0 1px 0 #999999, inset 0 -1px 0 #999999;
     background: linear-gradient(#9595b6, #5a567f);
     color: white;
     padding: 10px 15px;
     position: relative;
   }
   .th:after {
     content: "";
     display: block;
     position: absolute;
     left: 0;
     top: 25%;
     height: 25%;
     width: 100%;
   }
     .th:first-child {
       border-left: 1px solid #777777;
       border-bottom: 1px solid #777777;
       width: 10%;
     }
  .th:not(first-child) {
    border-left: 1px solid #777777;
    border-bottom: 1px solid #777777;
    width: 30%;
  }
  .tr {
    display: flex;
  }
   .tr:nth-child(odd) {
     background: #ebf3f9;
   }
   .td {
     border: 1px solid #e3eef7;
     padding: 10px 15px;
     position: relative;
     transition: all 0.5s ease;
     cursor: pointer;
   }
  .td:first-child {
    width: 10%;
  }
  .td:not(first-child) {
    width: 30%;
  }
`;

const Table: FC = () => {
    const data = useReactiveVar(dataVar);
    const columns = useMemo(() => [{
        id: 'Number',
        header: 'Number'
    },
    {
        id: 'title',
        header: 'Title'
    },
    {
        id: 'url',
        header: 'url'
    },
    {
        id: 'state',
        header: 'state'
    }], []);
    const {
        fetchFirstIssuesQueryHandler,
        error,
        loading,
        pagination
    } = usePagination();
    useEffect(() => {
        (async () => {
            await fetchFirstIssuesQueryHandler();
        })();
    }, [pagination.size]);
    if (error) {
        errorVar(error);
    }
    return (
        <StyledTable>
            <Filters />
            <div className='table'>
                <div className='table-header'>
                    {columns.map(({ id, header }) => <span className='th' key={id}>{header}</span>)}
                </div>
                {data?.map(({
                    title, url, state, number
                }) => (
                    <Link key={number} href={{ pathname: `/issue/${number}` }}>
                        <div data-testid={`issue-list-number-${number}`} className='tr' key={title}>
                            <span className='td'>{number}</span>
                            <span className='td'>{title}</span>
                            <span className='td'>{url}</span>
                            <span className='td'>{state}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <SpinnerWrapper loading={loading} />
        </StyledTable>);
};

export default Table;
