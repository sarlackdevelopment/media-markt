import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import {
    ORDER_BY, OWNER, REPOSITORY_NAME, STATES
} from '../../constants';
import {
    dataVar, errorVar, filtersVar, paginationVar
} from '../../lib/cache';
import { GET_FIRST_ISSUES_FROM_REPOSITORY } from '../../lib/queries/GET_FIRST_ISSUES_FROM_REPOSITORY';
import { SpinnerWrapper } from '../SpinnerWrapper';
import { usePagination } from '../../hooks/usePagination';
import { useFilterLogic } from './useFilterLogic';

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

const Filters: FC = () => {
    const { error, loading, handlerFilter } = useFilterLogic();
    if (error) {
        errorVar(error);
    }
    return <StyledFilters>
        <div className='d-flex'>
            <span className='m-1'>state</span>
            <select
                data-testid={'filter-by-state'}
                defaultValue='CLOSED'
                onChange={(e) => handlerFilter(e.target.value)}
                className='m-1 select-style'>
                <option
                    data-testid={`filter-by-state-${STATES.OPEN}`}
                    key={STATES.OPEN}
                    value={STATES.OPEN}
                >
                    {STATES.OPEN}
                </option>
                <option
                    key={STATES.CLOSED}
                    value={STATES.CLOSED}
                    data-testid={`filter-by-state-${STATES.CLOSED}`}
                >
                    {STATES.CLOSED}
                </option>
            </select>
        </div>
        <SpinnerWrapper loading={loading} />
    </StyledFilters>;
};

export default Filters;
