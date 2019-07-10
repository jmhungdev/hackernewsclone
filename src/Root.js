import 'Styles/normalizer.css';
import 'Styles/global.css';

import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const AsyncHomeComponent = lazy(() => import('Pages/Home'));
const AsyncTopDomainsComponent = lazy(() => import('Pages/TopDomains'));
const AsyncSearchComponent = lazy(() => import('Pages/Search'));
const AsyncStoryCommentsComponent = lazy(() => import('Pages/StoryComments'));

const LoadingComponent = () => <h3>please wait...</h3>;
const Root = () => (
  <Suspense fallback={<LoadingComponent />}>
    <Switch>
      <Route exact path="/" component={AsyncHomeComponent} />
      <Route exact path="/top-domains" component={AsyncTopDomainsComponent} />
      <Route exact path="/search" component={AsyncSearchComponent} />
      <Route exact path="/comments" component={AsyncStoryCommentsComponent} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
);


export default hot(Root);
