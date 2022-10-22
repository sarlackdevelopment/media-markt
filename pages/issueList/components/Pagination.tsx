import React from 'react';
import styled from 'styled-components';
import {
    ColumnDef,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable
} from '@tanstack/react-table';
import { TIssue } from '../index';

const StyledPagination = styled.div`
  margin: 1em;
  .pagination-container {
    display: flex;
    justify-content: start;
    align-items: center;
    border: 1px solid yellow; 
  }
  .pagination-adjustment {
    display: flex;
  }
`;

const Pagination = ({
    data,
    columns
}: {
    data: TIssue[]
    columns: ColumnDef<TIssue>[]
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true
    });
    return (<StyledPagination>
        <div className='pagination-container'>
            <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                {'<<'}
            </button>
            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                {'<'}
            </button>
            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                {'>'}
            </button>
            <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                {'>>'}
            </button>
            <div className='pagination-adjustment'>
                <span>Page</span>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </strong>
            </div>
            <span>Go to page:
                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        table.setPageIndex(page);
                    }}
                    className="border p-1 rounded w-16"
                />
            </span>
            <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                }}
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    </StyledPagination>);
};

export default Pagination;
