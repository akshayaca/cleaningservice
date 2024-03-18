import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ServiceListing from './ServiceListing';
import RequestDetails from './RequestDetails'; // Placeholder for the details page
import Footer from './Footer';
import '../css/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className='main-content'>
          <Switch>
            <Route path="/" exact component={ServiceListing} />
            <Route path="/request/:id" component={RequestDetails} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
