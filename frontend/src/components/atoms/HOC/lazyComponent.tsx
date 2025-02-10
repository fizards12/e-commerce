import React, { lazy, Suspense } from 'react';
import Loading from '../../Loading';

// ...existing code...

const LazyComponent = <P extends object>(importFunc: () => Promise<{ default: React.ComponentType<P> }>) => {
    const Component = lazy(importFunc);

    return (props: P) => (
        <Suspense fallback={<Loading/>}>
            <Component {...props} />
        </Suspense>
    );
};

export default LazyComponent;
