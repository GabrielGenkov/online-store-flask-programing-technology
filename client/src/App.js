import React from 'react';

import{
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import MyOffers from './pages/MyOffers/MyOffers'

const App = () => (
    <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/profile/myoffers" exact component={MyOffers} />
            <Route render={() => <div>404 Not Found</div>}/>
        </Switch>
    </Router>
);

export default App;
