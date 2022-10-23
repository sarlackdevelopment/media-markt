import React, { useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { gql, useLazyQuery, useReactiveVar } from '@apollo/client';

import { ColumnDef } from '@tanstack/react-table';

import Table from './components/Table';
import Pagination from './components/Pagination';
import { dataVar, paginationVar } from '../../lib/cache';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';

export type TIssue = {
    title: string,
    url: string,
    status: string
}

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

const DataTable = ({
    data,
    columns
}: {
    data: TIssue[]
    columns: ColumnDef<TIssue>[]
}) => {
    console.log(888);

    return (
        <>
            <Table data={data} columns={columns} />
            <Pagination />
            {/*  <div>{table.getRowModel().rows.length} Rows</div>*/}
            {/*  <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>*/}
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

const IssueList: NextPage = () => {
    const [fetchIssuesQuery] = useLazyQuery(GET_FIRST_ISSUES_FROM_REPOSITORY);
    //const [data, setData] = useState([]);
    const data = useReactiveVar(dataVar);
    const pagination = useReactiveVar(paginationVar);

    useEffect(() => {
        (async () => {
            const response = await fetchIssuesQuery({
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
            paginationVar({ ...pagination, endCursor: pageInfo.endCursor });
            dataVar(edges.map(({ node }) => ({ ...node })));
            // setData(() => response.data.repository.issues.edges.map(({ node }) => ({ ...node })));
        })();
    }, []);
    const columns = useMemo<ColumnDef<TIssue>[]>(
        () => [{
            header: 'Issue',
            footer: (props) => props.column.id,
            columns: [
                {
                    id: 'title',
                    accessorKey: 'title',
                    header: () => <span>Title</span>,
                    cell: (info) => info.getValue()
                    //footer: (props) => props.column.id
                },
                {
                    id: 'url',
                    accessorKey: 'url',
                    //accessorFn: (row) => row.lastName,
                    header: () => <span>url</span>,
                    cell: (info) => info.getValue()
                    //footer: (props) => props.column.id
                },
                {
                    id: 'state',
                    accessorKey: 'state',
                    //accessorFn: (row) => row.lastName,
                    header: () => <span>status</span>,
                    cell: (info) => info.getValue()
                    //footer: (props) => props.column.id
                }
            ]
        }
            // {
            //     header: 'Title',
            //     footer: (props) => props.column.id,
            //     columns: [
            //         {
            //             accessorKey: 'firstName',
            //             cell: (info) => info.getValue(),
            //             footer: (props) => props.column.id
            //         },
            //         {
            //             accessorFn: (row) => row.lastName,
            //             id: 'lastName',
            //             cell: (info) => info.getValue(),
            //             header: () => <span>Last Name</span>,
            //             footer: (props) => props.column.id
            //         }
            //     ]
            // },
            // {
            //     header: 'Info',
            //     footer: (props) => props.column.id,
            //     columns: [
            //         {
            //             accessorKey: 'age',
            //             header: () => 'Age',
            //             footer: (props) => props.column.id
            //         },
            //         {
            //             header: 'More Info',
            //             columns: [
            //                 {
            //                     accessorKey: 'visits',
            //                     header: () => <span>Visits</span>,
            //                     footer: (props) => props.column.id
            //                 },
            //                 {
            //                     accessorKey: 'status',
            //                     header: 'Status',
            //                     footer: (props) => props.column.id
            //                 },
            //                 {
            //                     accessorKey: 'progress',
            //                     header: 'Profile Progress',
            //                     footer: (props) => props.column.id
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ],
        []
    );
    //const [data, setData] = useState(() => propsPage.data.repository.issues.edges.map(({ node }) => ({ ...node })));
    //const refreshData = () => setData(() => makeData(10));

    //console.log('-----------');
    //console.log(propsPage.data.repository.issues.edges.map(({ node }) => ({ ...node })));

    return (
        <>
            <DataTable
                {...{
                    data,
                    columns
                }}
            />
            {/*<hr />*/}
            {/*<div>*/}
            {/*    <button onClick={() => rerender()}>Force Rerender</button>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <button onClick={() => refreshData()}>Refresh Data</button>*/}
            {/*</div>*/}
        </>
    );
    // return <>It works!<IssueListWrapper>Some</IssueListWrapper></>
};

export default IssueList;
