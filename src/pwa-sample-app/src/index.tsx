import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import { Message } from 'components/Message/message.component';
import { NavigationBar } from 'components/NavigationBar/navigation-bar.component';

// import GeolocationComponent from 'components/Geolocation/geolocation.component';
// import CameraComponent from 'components/Camera/camera.component';

const GeolocationComponent = lazy(() => import('components/Geolocation/geolocation.component'));
const CameraComponent = lazy(() => import('components/Camera/camera.component'));

declare global {
  interface Window { ga: any; }
}

var history = createBrowserHistory();

history.listen((location) => {
  console.log("Send page view: " + location.pathname + location.search);
  if (!window.ga)
    return;

  window.ga('set', 'page', location.pathname + location.search);
  window.ga('send', 'pageview');
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Message message="Loading..." />}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/geolocation" component={GeolocationComponent} />
          <Route exact path="/camera" component={CameraComponent} />
          <Route exact path="/404" >
            <Message message="404 Not found" />
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Suspense>
      <NavigationBar history={history} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
