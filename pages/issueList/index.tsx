import React, { useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { gql, useLazyQuery, useReactiveVar } from '@apollo/client';

import { ColumnDef } from '@tanstack/react-table';

import Table from './components/Table';
import Pagination from './components/Pagination';
import { dataVar, paginationVar } from '../../lib/cache';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';

import { OWNER, REPOSITORY_NAME, ORDER_BY } from '../../constants';
import client from '../apollo-client';

export type TIssue = {
    title: string,
    url: string,
    state: string,
    number: number
}
//
// export async function getStaticProps() {
//     const { data } = await client.query({
//         query: GET_FIRST_ISSUES_FROM_REPOSITORY,
//         variables: {
//             owner: OWNER,
//             name: REPOSITORY_NAME,
//             first: 10,
//             states: null,
//             orderBy: ORDER_BY
//         }
//     });
//     const { edges, pageInfo } = data.repository.issues;
//
//     return edges.map(({ node }) => ({ ...node }));
// }

// export async function getStaticProps() {
//     const { data } = await client.query({
//         query: gql`
//       query {
//         repository(owner:"facebook", name:"react") {
//           issues(last:20, states:CLOSED) {
//             edges {
//               node {title, url}
//             }
//           }
//         }
//       }
//     `
//     });
//
//     return {
//         props: {
//             data
//         }
//     };
// }

const DataTable = () => {
    console.log(888);

    return (
        <>
            <Table />
            <Pagination />
        </>
    );
};
// function Filter({
//     column,
//     table
// }: {
//     column: Column<any, any>
//     table: ReactTable<any>
// }) {
//     const firstValue = table
//         .getPreFilteredRowModel()
//         .flatRows[0]?.getValue(column.id);
//
//     const columnFilterValue = column.getFilterValue();
//
//     return typeof firstValue === 'number' ? (
//         <div className="flex space-x-2">
//             <input
//                 type="number"
//                 value={(columnFilterValue as [number, number])?.[0] ?? ''}
//                 onChange={(e) => column.setFilterValue((old: [number, number]) => [
//                     e.target.value,
//                     old?.[1]
//                 ])
//                 }
//                 placeholder={'Min'}
//                 className="w-24 border shadow rounded"
//             />
//             <input
//                 type="number"
//                 value={(columnFilterValue as [number, number])?.[1] ?? ''}
//                 onChange={(e) => column.setFilterValue((old: [number, number]) => [
//                     old?.[0],
//                     e.target.value
//                 ])
//                 }
//                 placeholder={'Max'}
//                 className="w-24 border shadow rounded"
//             />
//         </div>
//     ) : (
//         <input
//             type="text"
//             value={(columnFilterValue ?? '') as string}
//             onChange={(e) => column.setFilterValue(e.target.value)}
//             placeholder={'Search...'}
//             className="w-36 border shadow rounded"
//         />
//     );
// }

const IssueList: NextPage = () => <DataTable />;

export default IssueList;
