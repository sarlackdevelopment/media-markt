import React from 'react';
import styled from 'styled-components';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender
} from '@tanstack/react-table';
import { TIssue } from '../index';

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

const Table = ({
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
    return (<StyledTable>
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <div>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {/*{header.column.getCanFilter() ? (*/}
                                        {/*    <div>*/}
                                        {/*        <Filter column={header.column} table={table} />*/}
                                        {/*    </div>*/}
                                        {/*) : null}*/}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </StyledTable>);
};

export default Table;
