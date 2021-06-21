import Widget1 from './components/widget1';
import Widget2 from './components/widget2';
import Widget3 from './components/widget3';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import ReactGa from 'react-ga';

function App() {
  useEffect(() => {
    ReactGa.initialize('UA-76564619-3');

    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Widget1} exact />
          <Route path='/sport' component={Widget2} />
          <Route path='/day' component={Widget3}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
