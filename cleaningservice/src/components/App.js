import React from 'react';
import Header from './Header'
import '../css/App.css';
import Footer from './Footer';
import Layout from './Layout';



const App = () => {
  return (
    <div className="App">
      <Header /> 
      <body>
      <main className='main-content'>
      
      <Layout />
     </main>
      </body>
      <Footer />
    </div>
  );
}

export default App;
