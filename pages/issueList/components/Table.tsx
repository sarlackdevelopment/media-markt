import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender
} from '@tanstack/react-table';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { TIssue } from '../index';
import { dataVar, paginationVar } from '../../../lib/cache';
import { ORDER_BY, OWNER, REPOSITORY_NAME } from '../../../constants';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';

const StyledTable = styled.table`
  margin: 1em;
  background: #f5ffff;
  border-collapse: collapse;
  text-align: left;
  th {
    border-top: 1px solid #777777;
    border-bottom: 1px solid #777777;
    box-shadow: inset 0 1px 0 #999999, inset 0 -1px 0 #999999;
    background: linear-gradient(#9595b6, #5a567f);
    color: white;
    padding: 10px 15px;
    position: relative;
  }
  th:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 25%;
    height: 25%;
    width: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255,255,255,.08));
  }
  tr:nth-child(odd) {
    background: #ebf3f9;
  }
  th:first-child {
    border-left: 1px solid #777777;
    border-bottom: 1px solid #777777;
    box-shadow: inset 1px 1px 0 #999999, inset 0 -1px 0 #999999;
  }
  th:last-child {
    border-right: 1px solid #777777;
    border-bottom: 1px solid #777777;
    box-shadow: inset -1px 1px 0 #999999, inset 0 -1px 0 #999999;
  }
  td {
    border: 1px solid #e3eef7;
    padding: 10px 15px;
    position: relative;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  tbody:hover td {
    color: transparent;
    text-shadow: 0 0 3px #a09f9d;
  }
  tbody:hover tr:hover td {
    color: #444444;
    text-shadow: none;
  }
`;

const Table = () => {
    const data = useReactiveVar(dataVar);
    const pagination = useReactiveVar(paginationVar);
    const [fetchIssuesQuery] = useLazyQuery(GET_FIRST_ISSUES_FROM_REPOSITORY);
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
    const columns = [{
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
    }];
    // const table = useReactTable({
    //     data,
    //     columns,
    //     getCoreRowModel: getCoreRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     debugTable: true
    // });
    useEffect(() => {
        (async () => {
            const response = await fetchIssuesQuery({
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
        })();
    }, [pagination.size]);
    return (<StyledTable>
        <table>
            {/*<thead>*/}
            {/*    {table.getHeaderGroups().map((headerGroup) => (*/}
            {/*        <tr key={headerGroup.id}>*/}
            {/*            {headerGroup.headers.map((header) => (*/}
            {/*                <th key={header.id} colSpan={header.colSpan}>*/}
            {/*                    {header.isPlaceholder ? null : (*/}
            {/*                        <div>*/}
            {/*                            {flexRender(*/}
            {/*                                header.column.columnDef.header,*/}
            {/*                                header.getContext()*/}
            {/*                            )}*/}
            {/*                            /!*{header.column.getCanFilter() ? (*!/*/}
            {/*                            /!*    <div>*!/*/}
            {/*                            /!*        <Filter column={header.column} table={table} />*!/*/}
            {/*                            /!*    </div>*!/*/}
            {/*                            /!*) : null}*!/*/}
            {/*                        </div>*/}
            {/*                    )}*/}
            {/*                </th>*/}
            {/*            ))}*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*</thead>*/}
            <thead>
                {columns.map(({ id, header }) => <th key={id}>{header}</th>)}
            </thead>
            <tbody>
                {data.map(({ title, url, state }) => (<tr key={title}>
                    <td>{title}</td>
                    <td>{url}</td>
                    <td>{state}</td>
                </tr>))}
                {/*{table.getRowModel().rows.map((row) => (*/}
                {/*    <tr key={row.id}>*/}
                {/*        {row.getVisibleCells().map((cell) => (*/}
                {/*            <td key={cell.id}>*/}
                {/*                {flexRender(*/}
                {/*                    cell.column.columnDef.cell,*/}
                {/*                    cell.getContext()*/}
                {/*                )}*/}
                {/*            </td>*/}
                {/*        ))}*/}
                {/*    </tr>*/}
                {/*))}*/}
            </tbody>
        </table>
    </StyledTable>);
};

export default Table;
