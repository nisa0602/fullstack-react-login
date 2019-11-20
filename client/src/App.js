import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Related authentication
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';

//Related to store
import { Provider } from 'react-redux';
import store from './store/store';

//Importing Component
import Navbar from './components/layout/layout/Navbar';
import Landing from './components/layout/layout/Landing';
import Register from './components/layout/auth/Register';
import Login from './components/layout/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/layout/auth/Dashboard';


//Check for token to keep user logged in
if (localStorage.jwtToken) {
  //set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //decode token and get user info and exp
  const decoded = jwt_decode(token);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000; //to get in millisecond
  if ( decoded.exp < currentTime ) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = './login';
    // window.localStorage.href = './login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
  
          <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
     
    
  );
}

export default App;
