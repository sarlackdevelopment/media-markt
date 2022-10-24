import React, { FC } from 'react';
import styled from 'styled-components';
import { errorVar } from '../../../lib/cache';
import { usePagination } from './usePagination';
import { SpinnerWrapper } from '../../../components/SpinnerWrapper';
import { PAGINATION_SIZES } from '../../../constants';

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
  }
  .pagination-size {
    margin-left: 1em;
    margin-right: 1em;
    display: block;
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
  .pagination-button {
    color: #232323;
    background: transparent;
    border: 1px solid #e3eef7;
    position: relative;
    font-size: 14px;
    letter-spacing: .3em;
    font-family: 'Montserrat', sans-serif;
    padding: 10px 20px 10px 20px;
    border-radius: 0.25rem;
    margin-right: 0.1em;
    margin-left: 0.1em;
    cursor: pointer;
  }
  .pagination-button:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

const Pagination: FC = () => {
    const {
        fetchFirstIssuesQueryHandler,
        fetchLastIssuesQueryHandler,
        fetchNextIssuesQueryHandler,
        fetchPrevIssuesQueryHandler,
        setPaginationSize,
        pagination,
        error,
        loading
    } = usePagination();
    if (error) {
        errorVar(error);
    }
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
                {PAGINATION_SIZES.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <SpinnerWrapper loading={loading} />
        </div>
    </StyledPagination>);
};

export default Pagination;

//-#Решить проблему пагинации с фильтром
//-#Решить проблему сброса размера
//-#Решить проблему централизации спиннера
//-#Как быть с gitignore
//#Как вернуться на предыдущий роут
//-#Переложить на индекс страницу со списком и проверить e2e
