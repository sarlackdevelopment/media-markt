import ClipLoader from 'react-spinners/ClipLoader';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
`;

type TSpinnerWrapper = {
    loading: boolean;
}

export const SpinnerWrapper: FC<TSpinnerWrapper> = ({ loading }) => (
    loading ? <StyledSpinner>
        <ClipLoader
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </StyledSpinner> : null
);
