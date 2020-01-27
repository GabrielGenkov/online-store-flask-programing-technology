import React from 'react';

import{
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import MyOffers from './pages/MyOffers/MyOffers'
import PurchasedOffers from './pages/PurchasedOffers/PurchasedOffers'
import EditOffer from './pages/EditOffer/EditOffer'
import NewOffer from './pages/NewOffer/NewOffer'

const App = () => (
    <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/add_offer" exact component={NewOffer} />
            <Route path="/profile" exact render={() => <Redirect to="/profile/myoffers" />} />
            <Route path="/profile/myoffers" exact component={MyOffers} />
            <Route path="/profile/myoffers/:offer_id/edit" exact component={EditOffer} />
            <Route path="/profile/purchasedoffers" exact component={PurchasedOffers} />
            <Route render={() => <div>404 Not Found</div>}/>
        </Switch>
    </Router>
);

export default App;
