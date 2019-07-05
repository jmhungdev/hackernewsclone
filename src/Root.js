import 'Styles/normalizer.css';
import 'Styles/global.css';

import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const AsyncHomeComponent = lazy(() => (
  import('Pages/Home')
));
const AsyncTopDomainsComponent = lazy(() => (
  import('Pages/TopDomains')
));
const AsyncSearchComponent = lazy(() => (
  import('Pages/Search')
));


const LoadingComponent = () => <h3>please wait...</h3>;
const Root = () => {
  return (
    <Suspense fallback={ <LoadingComponent /> }>
      <Switch>
        <Route exact path="/" component={ AsyncHomeComponent } />
        <Route path="/top-domains" component={ AsyncTopDomainsComponent } />
        <Route path="/search" component={ AsyncSearchComponent } />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};


export default hot(Root);
