import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { ORDER_BY, OWNER, REPOSITORY_NAME } from '../../../constants';
import { dataVar, paginationVar } from '../../../lib/cache';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';

const StyledFilters = styled.div`
  margin: 1em;
  .d-flex {
    display: flex;
    align-items: center;
  }
  .d-flex-column {
    display: flex;
    flex-direction: column;
  }
  .m-1 {
    margin-right: 1em
  }
  .select-style {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

const Filters = () => {
    const pagination = useReactiveVar(paginationVar);
    const [fetchIssuesQuery] = useLazyQuery(GET_FIRST_ISSUES_FROM_REPOSITORY);
    const handlerFilter = async (currentState) => {
        //#Спросить - нормальна ли такая реализация
        const response = await fetchIssuesQuery({
            variables: {
                owner: OWNER,
                name: REPOSITORY_NAME,
                first: pagination.size,
                states: currentState,
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
    return <StyledFilters>
        <div className='d-flex'>
            <span className='m-1'>state</span>
            <select
                defaultValue='CLOSED'
                onChange={(e) => handlerFilter(e.target.value)}
                className='m-1 select-style'>
                <option key={'OPEN'} value={'OPEN'}>
                    OPEN
                </option>
                <option key={'CLOSED'} value={'CLOSED'}>
                    CLOSED
                </option>
            </select>
        </div>
        {/*<input className='m-1 input-style' defaultValue='state' />*/}

        {/*<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr' }}>*/}
        {/*    <span style={{ alignSelf: 'center' }}>Server side filters</span>*/}
        {/*    <input className='m-1 input-style' defaultValue='state' />*/}
        {/*    <div />*/}

        {/*    /!*<div className='d-flex'>*!/*/}
        {/*    /!*    <span>Server side filters</span>*!/*/}
        {/*    /!*    <div className='d-flex'>*!/*/}
        {/*    /!*        <span className='m-1'>state</span>*!/*/}
        {/*    /!*        <input className='m-1 input-style' defaultValue='state' />*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<div className='d-flex'>*!/*/}
        {/*    /!*    <span>Client side filters</span>*!/*/}
        {/*    /!*    <div className='d-flex'>*!/*/}
        {/*    /!*        <span className='m-1'>title</span>*!/*/}
        {/*    /!*        <input className='m-1 input-style' defaultValue='title' />*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*    <div className='d-flex'>*!/*/}
        {/*    /!*        <span className='m-1'>url</span>*!/*/}
        {/*    /!*        <input className='m-1 input-style' defaultValue='url' />*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*</div>*/}

        {/*<div className='d-flex-column'>*/}
        {/*    <div className='d-flex'>*/}
        {/*        <span>Server side filters</span>*/}
        {/*        <div className='d-flex'>*/}
        {/*            <span className='m-1'>state</span>*/}
        {/*            <input className='m-1 input-style' defaultValue='state' />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className='d-flex'>*/}
        {/*        <span>Client side filters</span>*/}
        {/*        <div className='d-flex'>*/}
        {/*            <span className='m-1'>title</span>*/}
        {/*            <input className='m-1 input-style' defaultValue='title' />*/}
        {/*        </div>*/}
        {/*        <div className='d-flex'>*/}
        {/*            <span className='m-1'>url</span>*/}
        {/*            <input className='m-1 input-style' defaultValue='url' />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </StyledFilters>;
};

export default Filters;
