import React from 'react';
import './App.css';
import Header from './components/Header'
import Navigation from './components/Navigation'
function App() {
  return (
    <div className="App">
          <Header/>
          <div className="App-content">
              <Navigation />
          </div>
    </div>
  );
}

export default App;
