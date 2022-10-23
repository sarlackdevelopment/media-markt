import React, {
    useCallback, useEffect, useMemo, useState
} from 'react';
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
import { OWNER, REPOSITORY_NAME, ORDER_BY } from '../../../constants';

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
  .pagination-button:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
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
                owner: OWNER,
                name: REPOSITORY_NAME,
                first: pagination.size,
                states: null,
                orderBy: ORDER_BY
            }
        });
        const {
            edges,
            pageInfo: {
                startCursor,
                endCursor,
                hasNextPage,
                hasPreviousPage
            }
        } = response.data.repository.issues;
        paginationVar({
            ...pagination,
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage
        });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    const fetchLastIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchLastIssuesQuery({
            variables: {
                owner: OWNER,
                name: REPOSITORY_NAME,
                last: pagination.size,
                states: null,
                orderBy: ORDER_BY
            }
        });
        const {
            edges,
            pageInfo: {
                startCursor,
                endCursor,
                hasNextPage,
                hasPreviousPage
            }
        } = response.data.repository.issues;
        paginationVar({
            ...pagination,
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage
        });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    const fetchNextIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchNextIssuesQuery({
            variables: {
                owner: OWNER,
                name: REPOSITORY_NAME,
                first: pagination.size,
                states: null,
                cursor: pagination.endCursor,
                orderBy: ORDER_BY
            }
        });
        const {
            edges,
            pageInfo: {
                startCursor,
                endCursor,
                hasNextPage,
                hasPreviousPage
            }
        } = response.data.repository.issues;
        paginationVar({
            ...pagination,
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage
        });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    const fetchPrevIssuesQueryHandler = async () => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchPrevIssuesQuery({
            variables: {
                owner: OWNER,
                name: REPOSITORY_NAME,
                last: pagination.size,
                states: null,
                cursor: pagination.startCursor,
                orderBy: ORDER_BY
            }
        });
        const {
            edges,
            pageInfo: {
                startCursor,
                endCursor,
                hasNextPage,
                hasPreviousPage
            }
        } = response.data.repository.issues;
        paginationVar({
            ...pagination,
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage
        });
        dataVar(edges.map(({ node }) => ({ ...node })));
    };
    // const data = useReactiveVar(dataVar);
    // const columns = useMemo<ColumnDef<TIssue>[]>(
    //     () => [{
    //         header: 'Issue',
    //         footer: (props) => props.column.id,
    //         columns: [
    //             {
    //                 id: 'title',
    //                 accessorKey: 'title',
    //                 header: () => <span>Title</span>,
    //                 cell: (info) => info.getValue()
    //                 //footer: (props) => props.column.id
    //             },
    //             {
    //                 id: 'url',
    //                 accessorKey: 'url',
    //                 //accessorFn: (row) => row.lastName,
    //                 header: () => <span>url</span>,
    //                 cell: (info) => info.getValue()
    //                 //footer: (props) => props.column.id
    //             },
    //             {
    //                 id: 'state',
    //                 accessorKey: 'state',
    //                 //accessorFn: (row) => row.lastName,
    //                 header: () => <span>status</span>,
    //                 cell: (info) => info.getValue()
    //                 //footer: (props) => props.column.id
    //             }
    //         ]
    //     }],
    //     []
    // );
    // const table = useReactTable({
    //     data,
    //     columns,
    //     // Pipeline
    //     getCoreRowModel: getCoreRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     //
    //     debugTable: true
    // });
    const setPaginationSize = useCallback((props) => paginationVar(
        { ...pagination, size: Number(props.target.value) }), []);
    return (<StyledPagination>
        <div className='pagination-container'>
            <button
                className='pagination-button'
                onClick={fetchFirstIssuesQueryHandler}
                disabled={!pagination.hasPreviousPage}
            >
                {'<<'}
            </button>
            <button
                className='pagination-button'
                onClick={fetchPrevIssuesQueryHandler}
                disabled={!pagination.hasPreviousPage}
            >
                {'<'}
            </button>
            <button
                className='pagination-button'
                onClick={fetchNextIssuesQueryHandler}
                disabled={!pagination.hasNextPage}
            >
                {'>'}
            </button>
            <button
                className='pagination-button'
                onClick={fetchLastIssuesQueryHandler}
                disabled={!pagination.hasNextPage}
            >
                {'>>'}
            </button>
            <select
                className='pagination-size'
                onChange={setPaginationSize}
                value={pagination.size}
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
