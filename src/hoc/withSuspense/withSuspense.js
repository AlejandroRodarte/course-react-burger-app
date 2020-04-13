import React, { Suspense } from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';

const withSuspense = WrappedComponent => props => (
    <Suspense fallback={ <Spinner /> }>
        <WrappedComponent { ...props } />
    </Suspense>
);

export default withSuspense;
