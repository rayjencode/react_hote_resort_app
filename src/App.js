import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';

// Import Components
import Navbar from './components/Navbar';

// Import Context API

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/rooms" component={Rooms} />
                <Route exact path="/rooms/:slug" component={SingleRoom} />
                <Route component={Error} />
            </Switch>
        </>
    );
}

export default App;
