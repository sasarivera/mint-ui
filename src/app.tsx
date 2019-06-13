import React from 'react';
import logo from './logo.svg';
import './app.css';

const App: React.FC = () => {
    //test
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.<br />
                    Running app in <i>{process.env.REACT_APP_NODE_ENV}</i> environment
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
        </a>
            </header>
        </div>
    );
}

export default App;
