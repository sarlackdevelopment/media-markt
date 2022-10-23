import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    ColumnDef,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable
} from '@tanstack/react-table';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { TIssue } from '../index';
import { dataVar, paginationVar } from '../../../lib/cache';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';
import { GET_LAST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_LAST_ISSUES_FROM_REPOSITORY';
import { GET_NEXT_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_NEXT_ISSUES_FROM_REPOSITORY';
import { GET_PREV_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_PREV_ISSUES_FROM_REPOSITORY';

//#Спросить - как переиспользовать стили

const StyledPagination = styled.div`
  margin: 1em;
  .pagination-container {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .pagination-adjustment {
    display: flex;
    margin-left: 1em;
    //margin-right: 1em;
  }
  .pagination-size {
    //display: flex;
    margin-left: 1em;
    margin-right: 1em;
    color: #232323;
    background: transparent;
    border: 1px solid #232323;
    position: relative;
    font-size: 14px;
    letter-spacing: .3em;
    font-family: 'Montserrat', sans-serif;
    padding: 10px 20px 10px 20px;
    transition: .2s ease-in-out;
    cursor: pointer;
  }
  .pagination-button {
    color: #232323;
    background: transparent;
    border: 1px solid #232323;
    position: relative;
    font-size: 14px;
    letter-spacing: .3em;
    font-family: 'Montserrat', sans-serif;
    padding: 10px 20px 10px 20px;
    transition: .2s ease-in-out;
    cursor: pointer;
  }
  .pagination-button:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 100%;
    height: 100%;
    background: linear-gradient(#9595b6, #5a567f);
    z-index: -1;
    transition: .25s ease;
    transform: translate(0, 0);
  }
  .pagination-button:hover:before {
    transform: translate(4px, 4px);
  }
`;

const Pagination = () => {
    const pagination = useReactiveVar(paginationVar);
    const [fetchFirstIssuesQuery] = useLazyQuery(GET_FIRST_ISSUES_FROM_REPOSITORY);
    const [fetchLastIssuesQuery] = useLazyQuery(GET_LAST_ISSUES_FROM_REPOSITORY);
    const [fetchNextIssuesQuery] = useLazyQuery(GET_NEXT_ISSUES_FROM_REPOSITORY);
    const [fetchPrevIssuesQuery] = useLazyQuery(GET_PREV_ISSUES_FROM_REPOSITORY);
    const fetchFirstIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchFirstIssuesQuery({
            variables: {
                owner: 'facebook',
                name: 'react',
                first: 10,
                states: null,
                orderBy: {
                    field: 'CREATED_AT',
                    direction: 'ASC'
                }
            }
        });
        const { edges, pageInfo } = response.data.repository.issues;
        paginationVar({ ...pagination, endCursor: pageInfo.startCursor });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    const fetchLastIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchLastIssuesQuery({
            variables: {
                owner: 'facebook',
                name: 'react',
                last: 10,
                states: null,
                orderBy: {
                    field: 'CREATED_AT',
                    direction: 'ASC'
                }
            }
        });
        const { edges, pageInfo } = response.data.repository.issues;
        paginationVar({ ...pagination, startCursor: pageInfo.startCursor });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    const fetchNextIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchNextIssuesQuery({
            variables: {
                owner: 'facebook',
                name: 'react',
                first: 10,
                states: null,
                cursor: pagination.endCursor,
                orderBy: {
                    field: 'CREATED_AT',
                    direction: 'ASC'
                }
            }
        });
        const { edges, pageInfo } = response.data.repository.issues;
        paginationVar({ ...pagination, endCursor: pageInfo.endCursor });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    const fetchPrevIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchPrevIssuesQuery({
            variables: {
                owner: 'facebook',
                name: 'react',
                last: 10,
                states: null,
                cursor: pagination.startCursor,
                orderBy: {
                    field: 'CREATED_AT',
                    direction: 'ASC'
                }
            }
        });
        const { edges, pageInfo } = response.data.repository.issues;
        paginationVar({ ...pagination, startCursor: pageInfo.startCursor });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    return (<StyledPagination>
        <div className='pagination-container'>
            <button
                className='pagination-button'
                onClick={fetchFirstIssuesQueryHandler}
                //disabled={!table.getCanPreviousPage()}
            >
                {'<<'}
            </button>
            <button
                className='pagination-button'
                onClick={fetchPrevIssuesQueryHandler}
                //disabled={!table.getCanPreviousPage()}
            >
                {'<'}
            </button>
            <button
                style={{ border: '1px solid blue' }}
                className='pagination-button'
                onClick={fetchNextIssuesQueryHandler}
                //onClick={() => table.nextPage()}
                //disabled={!table.getCanNextPage()}
            >
                {'>'}
            </button>
            <button
                className='pagination-button'
                onClick={fetchLastIssuesQueryHandler}
                // disabled={!table.getCanNextPage()}
            >
                {'>>'}
            </button>
            <select
                className='pagination-size'
                // value={table.getState().pagination.pageSize}
                // onChange={(e) => {
                //     table.setPageSize(Number(e.target.value));
                // }}
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            {/*<div className='pagination-adjustment'>*/}
            {/*    <span>Page</span>*/}
            {/*    /!*<strong>*!/*/}
            {/*    /!*    {table.getState().pagination.pageIndex + 1} of{' '}*!/*/}
            {/*    /!*    {table.getPageCount()}*!/*/}
            {/*    /!*</strong>*!/*/}
            {/*</div>*/}
        </div>
    </StyledPagination>);
};

export default Pagination;
