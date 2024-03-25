import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ServiceListing from './ServiceListing';
import RequestDetails from './RequestDetails';
import Login from './Login';
import '../css/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        
        <main className='main-content'>
          <Switch>
            <Route path="/login">
              {isLoggedIn ? <Redirect to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
            </Route>
            <Route path="/" exact>
              {isLoggedIn ? <ServiceListing /> : <Redirect to="/login" />}
            </Route>
            <Route path="/request/:id" component={RequestDetails} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
