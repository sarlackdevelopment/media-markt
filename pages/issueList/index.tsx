import React from 'react';
import { NextPage } from 'next';

import Table from './components/Table';
import Pagination from './components/Pagination';

export type TIssue = {
    title: string,
    url: string,
    state: string,
    number: number
}

const DataTable = () => {
    console.log(888);

    return (
        <>
            <Table />
            <Pagination />
        </>
    );
};

const IssueList: NextPage = () => <DataTable />;

export default IssueList;
