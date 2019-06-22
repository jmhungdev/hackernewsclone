import 'Styles/normalizer.css';
import 'Styles/global.css';

import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense } from 'react';
import { NavLink as Link, Redirect, Route, Switch } from 'react-router-dom';

import { header, env } from './Root.css';

const AsyncTopStoriesComponent = lazy(() => (
  import('Pages/FrontPage')
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
    <>
      <header>
        <h1>YCombinator News Feed</h1>
        <nav className="menu">
          <ul>
            <li> <Link to="/">Front Page</Link> </li>
            <li> <Link to="/top-domains">Top Domains</Link> </li>
            <li> <Link to="/search">Search</Link> </li>
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={ <LoadingComponent /> }>
          <Switch>
            <Route exact path="/" component={ AsyncTopStoriesComponent } />
            <Route path="/top-domains" component={ AsyncTopDomainsComponent } />
            <Route path="/search" component={ AsyncSearchComponent } />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>
      <footer>
        footer
      </footer>
    </>
  );
};


export default hot(Root);
