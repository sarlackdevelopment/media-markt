import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { errorVar } from '../../lib/cache';

export const BoundaryErrorsAPI = () => {
    const error = useReactiveVar(errorVar);
    if (error) {
        return <div>{error.message}</div>;
    }
    return null;
};
